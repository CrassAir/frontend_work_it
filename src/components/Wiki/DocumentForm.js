import React, {useEffect, useState} from 'react';
import {Form, Input, Popconfirm, Select, Switch, TreeSelect} from 'antd';
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import {tryCreateDocument, tryUpdateDocument} from "../../store/action/wikiActions";

const DocumentForm = ({create, catalogs, document, close, tryCreateDocument, tryUpdateDocument}) => {
    const [form] = Form.useForm()
    const [inheritance, setInheritance] = useState(true)
    const [access, setAccess] = useState(document.catalog.access)
    const [accessEdit, setAccessEdit] = useState(document.catalog.access_edit)

    const okText = create ? 'Создать' : 'Редактировать'

    const initialValues = {
        inheritance: true,
        name: document.name,
        ord: document.ord ? document.ord : 0,
        catalog_id: document.catalog.id,
        access: access,
        access_edit: accessEdit,
        publish: document?.publish,
    }

    useEffect(() => {
        if (document) {
            setInheritance(document?.inheritance)
            setAccess(document?.inheritance ? document.catalog.access : document?.access)
            setAccessEdit(document?.inheritance ? document.catalog.access_edit : document?.access_edit)
            initialValues.inheritance = document?.inheritance
            form.setFieldsValue(initialValues)
        }
    }, [document])


    useEffect(() => {
        if (inheritance) {
            setAccess(document.catalog.access)
            setAccessEdit(document.catalog.access_edit)
        } else {
            setAccess(document?.access)
            setAccessEdit(document?.access_edit)
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
        if (create) {
            tryCreateDocument(values)
        } else {
            tryUpdateDocument(document.id, values)
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
            <Form.Item hidden={create} name='publish' label="Опубликовать" valuePropName="checked">
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
                {!create ?
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
    document: state.document,
})

const mapDispatchToProps = (dispatch) => ({
    tryCreateDocument: (values) => dispatch(tryCreateDocument(values)),
    tryUpdateDocument: (id, values) => dispatch(tryUpdateDocument(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm)