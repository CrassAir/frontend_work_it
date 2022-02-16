import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {ConfigProvider, DatePicker, Form, Input, Modal, Select} from "antd";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import SimpleBar from "simplebar-react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ProductsForm from "../Catalog/Products/form";
import {addOrder, deleteOrderProduct, editOrder, getOrderLocations} from "../../store/action/ordersActions";
import locale from "antd/lib/locale/ru_RU";
import moment from "moment";

const OrderForm = (props) => {
    const [newOrderProd, setNewOrderProd] = useState([])
    const [createProduct, setCreateProduct] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState(null);

    useEffect(() => {
        if (!props.orderLocations) props.getOrderLocations()
    }, [])

    let data
    if (props.copy >= 0) data = props.orderProducts?.map((val, index) => {
        let newVal = {
            catalog_id: val.catalog?.id,
            count: val.count,
            comment: val.comment,
            deadline: moment(val.deadline)
        }
        newOrderProd.push({
            key: index,
            value: val?.catalog
        })
        return newVal
    })

    if (props.edit >= 0) data = props.orderProducts?.map((val, index) => {
        let newVal = {
            id: val.id,
            catalog_id: val.catalog?.id,
            count: val.count,
            comment: val.comment,
            deadline: moment(val.deadline)
        }
        newOrderProd.push({
            key: index,
            value: val?.catalog
        })
        return newVal
    })

    // useEffect(() => {
    //     data?.forEach((val, index) => {
    //         val.catalog_id = val.catalog?.id
    //         newOrderProd.push({
    //             key: index,
    //             value: val.catalog
    //         })
    //     })
    // }, [])


    const closeModal = () => {
        setCreateProduct(false)
    }

    const modal = () => {
        return <Modal
            visible={!!createProduct}
            onCancel={closeModal}
            closable
            footer={null}
            destroyOnClose
        >
            <ProductsForm name={createProduct} closeForm={closeModal}/>
        </Modal>
    }

    return (
        <Paper className={'order_container'}>
            {props.copy || props.edit ? <Button sx={{float: 'right'}} variant={'text'} size={'small'}
                                                onClick={() => props.closeForm()}>Назад</Button> : null}
            <Typography noWrap>Новый заказ</Typography>
            <ConfigProvider locale={locale}>
                <Form className={'order_form'}
                      onFinish={(values) => {
                          if (!values.products) return
                          if (props.copy || !data) {
                              props.addOrder(values)
                          } else {
                              props.editOrder(props.edit, values)
                          }
                          props.closeForm()
                      }} autoComplete="off">
                    <Form.List name="products" initialValue={data}>
                        {(fields, {add, remove}) => {
                            return (
                                <TableContainer component={Box}>
                                    <SimpleBar style={{maxHeight: '75vh'}}>
                                        <Table size={'small'} stickyHeader={true} sx={{minWidth: 650}}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell/>
                                                    <TableCell>№</TableCell>
                                                    <TableCell>Наименование и харакстеристики</TableCell>
                                                    <TableCell>Производитель</TableCell>
                                                    <TableCell>Количество</TableCell>
                                                    <TableCell>Ед. изм</TableCell>
                                                    <TableCell>Объект</TableCell>
                                                    <TableCell>Крайний срок</TableCell>
                                                    <TableCell>Комментарий</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {fields.map(({key, name, ...restField}) => {
                                                    let product = newOrderProd.find(val => val.key === key)?.value
                                                    return <TableRow key={'tr_' + key}>
                                                        <TableCell>
                                                            <IconButton
                                                                onClick={() => {
                                                                    if (data && data[name]?.id) props.deleteOrderProduct(data[name].id)
                                                                    remove(name)
                                                                }}>
                                                                <RemoveIcon/>
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>{name + 1}</TableCell>
                                                        <TableCell>
                                                            <Form.Item
                                                                style={{minWidth: 300, maxWidth: 600}}
                                                                name={[name, 'catalog_id']}
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Пожалуйста выберите товар!'
                                                                }]}
                                                            >
                                                                <Select
                                                                    showSearch
                                                                    placeholder="Товар"
                                                                    onSearch={(e) => setSearchValue(e)}
                                                                    onSelect={(inx) => {
                                                                        if (inx === "search") {
                                                                            setCreateProduct(searchValue)
                                                                            remove(name)
                                                                            add()
                                                                            return
                                                                        }
                                                                        let prod = newOrderProd.find(val => val.key === key)
                                                                        if (prod) prod.value = props.products.find(val => val.id === inx)
                                                                        else newOrderProd.push({
                                                                            key: key,
                                                                            value: props.products.find(val => val.id === inx)
                                                                        })
                                                                        setNewOrderProd([...newOrderProd])
                                                                    }}
                                                                    filterOption={(input, option) => {
                                                                        if (option.key === "search") {
                                                                            return true
                                                                        }
                                                                        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                    }}
                                                                >
                                                                    {props.products?.map(val => {
                                                                        return <Select.Option
                                                                            key={val.id} value={val.id}>
                                                                            {`${val.name} ${val?.feature}`}
                                                                        </Select.Option>
                                                                    })}
                                                                    <Select.Option key="search" value="search">
                                                                        <Typography
                                                                            sx={{cursor: 'pointer', color: 'black'}}
                                                                            variant={'caption'}>
                                                                            Добавить в справочник "{searchValue}"
                                                                        </Typography>
                                                                    </Select.Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </TableCell>
                                                        <TableCell>{product?.manufacturer}</TableCell>
                                                        <TableCell>
                                                            <Form.Item
                                                                name={[name, 'count']}
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Пожалуйста укажите количество'
                                                                }]}
                                                            >
                                                                <Input style={{padding: 2, textAlign: 'center'}}
                                                                       maxLength={10}
                                                                       type={"number"}
                                                                       size="small"
                                                                />
                                                            </Form.Item>
                                                        </TableCell>
                                                        <TableCell>{product?.unit}</TableCell>
                                                        <TableCell>
                                                            <Form.Item
                                                                name={[name, 'location_id']}
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Пожалуйста укажите объект'
                                                                }]}
                                                            >
                                                                <Select
                                                                    style={{minWidth: 130}}
                                                                    placeholder="Объект"
                                                                >
                                                                    {props.orderLocations?.map(val => {
                                                                        return <Select.Option
                                                                            key={val.id} value={val.id}>
                                                                            {val.name}
                                                                        </Select.Option>
                                                                    })}
                                                                </Select>
                                                            </Form.Item>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Form.Item
                                                                name={[name, 'deadline']}
                                                                rules={[{
                                                                    required: true,
                                                                    message: 'Пожалуйста укажите срок'
                                                                }]}
                                                            >
                                                                <DatePicker
                                                                    style={{minWidth: 130}}
                                                                    disabledDate={(current) => current && current < moment().endOf('day')}
                                                                />
                                                            </Form.Item>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Form.Item
                                                                name={[name, 'comment']}
                                                            >
                                                                <Input.TextArea autoSize={{minRows: 1, maxRows: 6}}
                                                                                size={"small"}
                                                                                style={{minWidth: 150}}
                                                                />
                                                            </Form.Item>
                                                        </TableCell>
                                                    </TableRow>
                                                })}
                                            </TableBody>
                                        </Table>
                                        <Button className={'add_field_btn'}
                                                startIcon={<AddIcon/>}
                                                fullWidth
                                                onClick={() => add()}>
                                            Добавить товар
                                        </Button>
                                    </SimpleBar>
                                </TableContainer>
                            )
                        }}
                    </Form.List>
                    <Form.Item>
                        <Button style={{float: 'right'}} variant={'contained'} color={'success'}
                                type={'submit'}>Создать</Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
            {modal()}
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    orders: state.orders,
    products: state.products,
    orderProducts: state.orderProducts,
    orderLocations: state.orderLocations,
})

const mapDispatchToProps = (dispatch) => ({
    addOrder: (values) => dispatch(addOrder(values)),
    editOrder: (order_id, values) => dispatch(editOrder(order_id, values)),
    deleteOrderProduct: (product_id) => dispatch(deleteOrderProduct(product_id)),
    getOrderLocations: () => dispatch(getOrderLocations())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)