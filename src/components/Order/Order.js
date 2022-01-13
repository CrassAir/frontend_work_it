import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import Paper from "@mui/material/Paper";
import SimpleBar from "simplebar-react";
import {MenuItem, MenuList} from "@mui/material";
import {Col, ConfigProvider, DatePicker, Modal, Row, Space} from "antd";
import locale from "antd/lib/locale/ru_RU";
import moment from "moment";
import Typography from "@mui/material/Typography";
import {tryGetOrderProducts, tryGetOrders} from "../../store/action/ordersActions";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/Add";
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

const {RangePicker} = DatePicker;
const filter = createFilterOptions();

const Orders = (props) => {
    const [selectOrder, setSelectOrder] = useState(null)
    const [created, setCreated] = useState(false)
    const [newOrderProd, setNewOrderProd] = useState([])
    const [value, setValue] = React.useState('');
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

    const createTable = () => {
        if (!props.products) return null

        const filterOptions = (options, params) => {
            const filtered = filter(options, params);
            const {inputValue} = params;
            const isExisting = options.some((option) => inputValue === option.name);
            if (inputValue !== '' && !isExisting) {
                filtered.push({
                    inputValue,
                    name: `Добавить "${inputValue}"`,
                    clearName: inputValue,
                });
            }
            return filtered;
        }

        return <Paper className={'tabel_container'}>
            <Typography noWrap>Новый заказ</Typography>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newOrderProd.map((prod, index) => {
                                if (!prod) return null
                                return <TableRow key={'tr_' + index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{prod.name}</TableCell>
                                    <TableCell>{prod.manufacturer}</TableCell>
                                    <TableCell>{prod.feature}</TableCell>
                                    <TableCell>{prod.count} {prod.unit}</TableCell>
                                    <TableCell>{prod.comment}</TableCell>
                                    <TableCell>{'deadline'}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                    <Row justify="space-between" align="middle">
                        <Col span={8}>
                            <Autocomplete
                                id="free-solo-users"
                                // freeSolo
                                options={props.products}
                                getOptionLabel={(option) => option.name ? option.name : ''}
                                disableClearable
                                sx={{paddingTop: 2, paddingBottom: 2, maxWidth: 500}}
                                onChange={(_, opt) => {
                                    if (opt.name.startsWith('Добавить')) {
                                        setCreateProduct(opt.clearName)
                                        setValue('')
                                    } else {
                                        setValue('')
                                        setNewOrderProd([...newOrderProd, opt])
                                    }
                                }}
                                filterOptions={filterOptions}
                                inputValue={value}
                                onInput={(e) => setValue(e.target.value)}
                                renderInput={(params) => <TextField {...params} label="Добавить товар"/>}
                            />
                        </Col>
                        <Col>
                            <Button variant={'contained'} color={'success'}
                                    type={'submit'}>На согласование</Button>
                        </Col>
                    </Row>
                </SimpleBar>
            </TableContainer>
        </Paper>
    }

    const generateTabel = () => {
        if (props.loading) return null
        if (created) return createTable()
        if (!selectOrder) return null
        if (!props.orderProducts) return null

        const button = () => {
            return <Space direction={"horizontal"} className={'send_btn'}>
                <Button variant={'contained'} startIcon={<AddIcon/>} color={'success'}
                        size={'small'} type={'submit'}>Создать</Button>
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


