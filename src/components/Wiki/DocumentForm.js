import React, {useEffect, useState} from 'react';
import {Form, Input, Popconfirm, Select, Switch, TreeSelect} from 'antd';
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import {tryCreateDocument} from "../../store/action/wikiActions";

const DocumentForm = ({data, catalogs, document, close, tryCreateDocument}) => {
    const [form] = Form.useForm()
    const [inheritance, setInheritance] = useState(true)
    const [access, setAccess] = useState(data.catalog.access)
    const [accessEdit, setAccessEdit] = useState(data.catalog.access_edit)

    const okText = data.create ? 'Создать' : 'Редактировать'

    const initialValues = {
        inheritance: true,
        name: data.document?.name,
        ord: data.document?.ord ? data.document?.ord : 0,
        catalog_id: data.catalog.id,
        access: access,
        access_edit: accessEdit,
        publish: document?.publish,
    }

    useEffect(() => {
        if (document) {
            setInheritance(data.document?.inheritance)
            setAccess(data.document?.inheritance ? data.catalog.access : data.document?.access)
            setAccessEdit(data.document?.inheritance ? data.catalog.access_edit : data.document?.access_edit)
            initialValues.inheritance = data.document?.inheritance
            form.setFieldsValue(initialValues)
        }
    }, [document])


    useEffect(() => {
        if (inheritance) {
            setAccess(data.catalog.access)
            setAccessEdit(data.catalog.access_edit)
        } else {
            setAccess(data.document?.access)
            setAccessEdit(data.document?.access_edit)
        }
    }, [inheritance])

    useEffect(() => {
        if (access && accessEdit) {
            form.setFieldsValue({access: access, access_edit: accessEdit})
        }
    }, [access, accessEdit])

    const treeData = [...catalogs]
    const recursiveTreeData = (tree) => {
        return tree.map(val => {
            return {
                title: val.name,
                value: val.id,
                children: recursiveTreeData(val.children)
            }
        })
    }

    const recursiveFindAccess = (id, catalogs) => {
        catalogs.forEach(cat => {
            if (cat.id === id) {
                setAccess(cat.access)
                setAccessEdit(cat.access_edit)
                return
            }
            recursiveFindAccess(id, cat.children)
        })
    }

    const formFinish = values => {
        if (data.create) {
            console.log('create', values)
            tryCreateDocument(values)
        } else {
            // tryUpdateCatalog(catalog.id, values)
        }
        if (close) close()
    }

    return (
        <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            onFinish={formFinish}
            initialValues={initialValues}
        >
            <Form.Item
                name="name"
                label="Название"
                rules={[{required: true, message: 'Введите название каталога!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="catalog_id"
                label="Каталог"
            >
                <TreeSelect
                    onChange={(val) => inheritance ? recursiveFindAccess(val, catalogs) : null}
                    treeData={recursiveTreeData(treeData)}
                />
            </Form.Item>
            <Form.Item
                name="ord"
                label="Сортировка"
            >
                <Input type={'number'}/>
            </Form.Item>
            <Form.Item hidden={data.create} name='publish' label="Опубликовать" valuePropName="checked">
                <Switch/>
            </Form.Item>
            <Form.Item name='inheritance' label="Наследование прав" valuePropName="checked">
                <Switch onChange={setInheritance}/>
            </Form.Item>
            <Form.Item
                name="access"
                label="Чтение/Просмотр"
            >
                <Select disabled={inheritance} placeholder="Выберите доступ" mode={'multiple'}>
                    {access?.map((val, index) => (
                        <Select.Option key={`access_${index}`} value={val}>{val}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="access_edit"
                label="Редактирование"
            >
                <Select disabled={inheritance} placeholder="Выберите редакторов" mode={'multiple'}>
                    {accessEdit?.map((val, index) => (
                        <Select.Option key={`access_edit_${index}`} value={val}>{val}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item style={{margin: 0}}>
                <Button style={{float: 'right'}} variant={'contained'} color={'success'}
                        type={'submit'}>{okText}</Button>
                {!data.create ?
                    <Popconfirm title={'Вы уверены что хотите удалить каталог?'} okText={'Да'} cancelText={'Нет'}
                                onConfirm={() => {
                                    // tryDeleteCatalog(catalog.id)
                                    if (close) close()
                                }}>
                        <Button style={{float: 'left'}} variant={'contained'} color={'error'}>Удалить</Button>
                    </Popconfirm> : null}
            </Form.Item>
        </Form>
    )
}
const mapStateToProps = (state) => ({
    catalogs: state.catalogs,
})

const mapDispatchToProps = (dispatch) => ({
    tryCreateDocument: (values) => dispatch(tryCreateDocument(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm)