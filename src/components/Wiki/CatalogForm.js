import React, {useEffect, useState} from 'react';
import {Form, Input, Popconfirm, Select, Switch, TreeSelect} from 'antd';
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import {tryCreateCatalog, tryDeleteCatalog, tryUpdateCatalog} from "../../store/action/wikiActions";

const CatalogForm = ({catalog, close, catalogs, tryUpdateCatalog, tryCreateCatalog, tryDeleteCatalog}) => {
    const [form] = Form.useForm()
    const [inheritance, setInheritance] = useState(catalog.inheritance)
    const [access, setAccess] = useState(catalog.inheritance ? catalog.parent?.access : catalog.access)
    const [accessEdit, setAccessEdit] = useState(catalog.inheritance ? catalog.parent?.access_edit : catalog.access_edit)

    const okText = catalog.create ? 'Создать' : 'Редактировать'
    const parent_id = catalog.create ? catalog.id : catalog.parent?.id

    useEffect(() => {
        if (inheritance && catalog.parent) {
            setAccess(catalog.parent.access)
            setAccessEdit(catalog.parent.access_edit)
        } else {
            setAccess(catalog.access)
            setAccessEdit(catalog.access_edit)
        }
    }, [inheritance])

    useEffect(() => {
        if (access && accessEdit) {
            form.setFieldsValue({access: access, access_edit: accessEdit})
        }
    }, [access, accessEdit])

    const treeData = [...catalogs]
    const recursiveTreeData = (tree) => {
        return tree.reduce((result, element) => {
            if (catalog.create || element.id !== catalog.id) {
                result.push({
                    title: element.name,
                    value: element.id,
                    children: recursiveTreeData(element.children)
                })
            }
            return result
        }, [])
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
        if (catalog.create) {
            tryCreateCatalog(values)
        } else {
            tryUpdateCatalog(catalog.id, values)
        }
        close()
    }

    return (
        <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            onFinish={formFinish}
            initialValues={{
                inheritance: inheritance,
                name: catalog.name,
                parent_id: parent_id,
                ord: catalog.ord ? catalog.ord : 0,
                access: access,
                access_edit: accessEdit,
                publish: true,
            }}
        >
            <Form.Item
                name="parent_id"
                label="Родитель"
            >
                <TreeSelect
                    onChange={(val) => inheritance ? recursiveFindAccess(val, catalogs) : null}
                    treeData={[{title: '', value: ''}, ...recursiveTreeData(treeData)]}
                />
            </Form.Item>
            <Form.Item
                name="name"
                label="Название"
                rules={[{required: true, message: 'Введите название каталога!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="ord"
                label="Сортировка"
            >
                <Input type={'number'}/>
            </Form.Item>
            <Form.Item name='publish' label="Опубликовать" valuePropName="checked">
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
                {!catalog.create ?
                    <Popconfirm title={'Вы уверены что хотите удалить каталог?'} okText={'Да'} cancelText={'Нет'}
                                onConfirm={() => {
                                    tryDeleteCatalog(catalog.id)
                                    close()
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
    tryCreateCatalog: (values) => dispatch(tryCreateCatalog(values)),
    tryUpdateCatalog: (id, values) => dispatch(tryUpdateCatalog(id, values)),
    tryDeleteCatalog: (id) => dispatch(tryDeleteCatalog(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogForm)