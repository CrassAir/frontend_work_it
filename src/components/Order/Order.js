import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import Paper from "@mui/material/Paper";
import SimpleBar from "simplebar-react";
import {MenuItem, MenuList} from "@mui/material";
import {Col, ConfigProvider, DatePicker, Form, Input, Modal, Row, Select, Space} from "antd";
import locale from "antd/lib/locale/ru_RU";
import moment from "moment";
import Typography from "@mui/material/Typography";
import {tryGetOrderProducts, tryGetOrders} from "../../store/action/ordersActions";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getProducts} from "../../store/action/catalogActions/productsActions";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import ProductsForm from "../Catalog/Products/form";
import IconButton from "@mui/material/IconButton";
import OrderForm from "./OrderForm";

const {RangePicker} = DatePicker;

const Orders = (props) => {
    const [selectOrder, setSelectOrder] = useState(null)
    const [created, setCreated] = useState(false)
    const [createProduct, setCreateProduct] = React.useState(false);
    const [initSplitter] = useState([30, 70])

    useEffect(() => {
        props.tryGetOrders()
    }, [])

    const product_status = {
        processed: 'Обрабатывается',
        canceling: 'Снят с производства',
        delivered: 'Доставлен',
    }

    const closeForm = () => {
        setCreateProduct(false)
    }

    const modal = () => {
        return <Modal
            visible={!!createProduct}
            onCancel={closeForm}
        >
            <ProductsForm name={createProduct} closeForm={closeForm}/>
        </Modal>
    }

    const generateTabel = () => {
        if (props.loading) return null
        if (created) return <OrderForm/>
        if (!selectOrder) return null
        if (!props.orderProducts) return null

        const button = () => {
            return <Space direction={"horizontal"} className={'send_btn'}>
                <Button variant={'contained'} startIcon={<AddIcon/>} color={'success'}
                        size={'small'} type={'submit'}>Создать копию</Button>
            </Space>
        }

        return (
            <Paper className={'tabel_container'}>
                <Space direction={"horizontal"}>
                    <Typography noWrap>{selectOrder.title}</Typography>
                </Space>
                {button()}
                <TableContainer component={Box}>
                    <SimpleBar style={{maxHeight: '100%'}}>
                        <Table size={'small'} stickyHeader={true} sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Позиция</TableCell>
                                    <TableCell>Наименование</TableCell>
                                    <TableCell>Производитель</TableCell>
                                    <TableCell>Харакстеристики</TableCell>
                                    <TableCell>Количество</TableCell>
                                    <TableCell>Комментарий</TableCell>
                                    <TableCell>Крайний срок</TableCell>
                                    <TableCell>Статус</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.orderProducts.map((prod, index) => {
                                    let deadline = prod.deadline ? moment(prod.deadline).format('DD-MM-YYYY') : ''
                                    return <TableRow key={'tr_' + index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{prod.catalog?.name}</TableCell>
                                        <TableCell>{prod.catalog?.manufacturer}</TableCell>
                                        <TableCell>{prod.catalog?.feature}</TableCell>
                                        <TableCell>{prod.count} {prod.catalog?.unit}</TableCell>
                                        <TableCell>{prod.comment}</TableCell>
                                        <TableCell>{deadline}</TableCell>
                                        <TableCell>{product_status[prod.actions[0].status]}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </SimpleBar>
                </TableContainer>
            </Paper>
        )
    }

    return (
        <div className={'main_tabel'}>
            <Splitter direction={SplitDirection.Horizontal}
                      gutterClassName="custom-gutter-horizontal"
                      draggerClassName="custom-dragger-horizontal"
                      initialSizes={initSplitter}
                      minWidths={[200, 700]}>
                <Paper className={'paper'}>
                    <SimpleBar style={{maxHeight: '100%'}}>
                        <MenuList disableListWrap>
                            <MenuItem sx={{marginBottom: '10px'}} key='date'>
                                <Space direction='horizontal'>
                                    <TextField
                                        label="Заказы"
                                        // variant="standard"
                                        size={'small'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                    <ConfigProvider locale={locale}>
                                        <RangePicker
                                            // onChange={(e) => {
                                            //     setMonth(moment(e))
                                            //     setDayInMonth(moment(e).daysInMonth())
                                            // }}
                                        />
                                    </ConfigProvider>
                                    <Button variant={'contained'} startIcon={<AddIcon/>} color={'success'}
                                            size={'small'}
                                            onClick={() => {
                                                setCreated(true)
                                                props.getProducts()
                                            }}
                                    >Создать</Button>
                                </Space>
                            </MenuItem>
                            {!props.orders ? null :
                                props.orders.map(order => {
                                    let ordre_id = `${order.id}`.padStart(6, '0')
                                    let date_create = moment(order.date_create).format('DD-MM-YYYY')
                                    let count_product = order.products.length
                                    order['title'] = `Заказ №${ordre_id} от ${date_create}, позиций: ${count_product}`
                                    return <MenuItem
                                        selected={order === selectOrder}
                                        key={order.id}
                                        onClick={() => {
                                            setSelectOrder(order)
                                            setCreated(false)
                                            props.tryGetOrderProducts(order.id)
                                        }}>
                                        <Typography noWrap>{order.title}</Typography>
                                    </MenuItem>
                                })
                            }
                        </MenuList>
                    </SimpleBar>
                </Paper>
                {generateTabel()}
            </Splitter>
            {modal()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    orders: state.orders,
    orderProducts: state.orderProducts,
    products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
    tryGetOrders: () => dispatch(tryGetOrders()),
    tryGetOrderProducts: (order_id) => dispatch(tryGetOrderProducts(order_id)),
    getProducts: () => dispatch(getProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)


