import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import Paper from "@mui/material/Paper";
import SimpleBar from "simplebar-react";
import {MenuItem, MenuList} from "@mui/material";
import {Input, Select, Space, Button as AntBtn} from "antd";
import moment from "moment";
import Typography from "@mui/material/Typography";
import {
    deleteOrder,
    editOrder,
    editOrderProduct,
    tryGetOrderProducts,
    tryGetOrders
} from "../../store/action/ordersActions";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
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
import OrderForm from "./OrderForm";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ButtonGroup from "@mui/material/ButtonGroup";


const Orders = (props) => {
    const [selectOrder, setSelectOrder] = useState(null)
    const [created, setCreated] = useState(false)
    const [copy, setCopy] = useState(null)
    const [edit, setEdit] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [searchValue, setSearchValue] = useState(null)
    const [reasonInput, setReasonInput] = useState(null)
    const [switchStatus, setSwitchStatus] = useState('all')
    const [initSplitter] = useState([30, 70])

    useEffect(() => {
        props.tryGetOrders()
    }, [])

    useEffect(() => {
        if (!props.products) props.getProducts()
    }, [edit, copy, created])

    const product_status = {
        processed: 'Обрабатывается',
        canceling: 'Снят с производства',
        delivered: 'Доставлен',
    }

    const order_status = {
        all: 'Все',
        created: 'Создан',
        canceling: 'Отменен',
        agreed: 'Согласован',
        not_agreed: 'Не согласован',
        delivered: 'Доставлен',
    }

    const generateTabel = () => {
        if (props.loading) return null
        if (created) {
            const closeForm = () => {
                setSelectOrder(null)
                setCreated(false)
            }
            return <OrderForm closeForm={closeForm}/>
        }
        if (copy) {
            const closeForm = () => {
                setCopy(null)
            }
            return <OrderForm copy={copy} closeForm={closeForm}/>
        }
        if (edit) {
            const closeForm = () => {
                setEdit(null)
            }
            return <OrderForm edit={edit} closeForm={closeForm}/>
        }
        if (!selectOrder) return null
        if (!props.orderProducts) return null

        const button = () => {
            let coordBtn
            if (selectOrder.coordinator_id === props.user.username) {
                if (selectOrder.actions[0].status === 'created') {
                    coordBtn = <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button variant={'contained'} startIcon={<CheckIcon/>}
                                color={'success'}
                                size={'small'}
                                onClick={() => {
                                    props.editOrder(selectOrder.id, {action: 'agreed'})
                                }}
                        >Согласовать</Button>
                        <Button variant={'contained'} startIcon={<ClearIcon/>}
                                color={'error'}
                                size={'small'}
                                onClick={() => {
                                    props.editOrder(selectOrder.id, {action: 'not_agreed'})
                                }}
                        >Отклонить</Button>
                    </ButtonGroup>
                }
                if (selectOrder.actions[0].status === 'not_agreed') {
                    coordBtn = <Button variant={'contained'} startIcon={<CheckIcon/>}
                                       color={'success'}
                                       size={'small'}
                                       onClick={() => {
                                           props.editOrder(selectOrder.id, {action: 'agreed'})
                                       }}
                    >Согласовать</Button>
                }
            }
            if (selectOrder.executor_id === props.user.username && selectOrder.actions[0].status === 'agreed') {
                coordBtn = <Button variant={'contained'} startIcon={<CheckIcon/>}
                                   color={'success'}
                                   size={'small'}
                                   onClick={() => {
                                       props.editOrder(selectOrder.id, {action: 'delivered'})
                                   }}
                >Доставлен</Button>
            }
            return (
                <Space direction={"horizontal"} className={'send_btn'}>
                    {coordBtn}
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        size={'small'}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {
                            setCopy(selectOrder.id)
                            setAnchorEl(null)
                        }}>
                            <ListItemIcon>
                                <ContentCopyIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>Создать копию</ListItemText>
                        </MenuItem>
                        {selectOrder.creator_id === props.user.username ?
                            <>
                                <MenuItem onClick={() => {
                                    setEdit(selectOrder.id)
                                    setAnchorEl(null)
                                }}>
                                    <ListItemIcon>
                                        <EditIcon fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText>Изменить</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    props.deleteOrder(selectOrder.id)
                                    setAnchorEl(null)
                                }}>
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText>Отменить</ListItemText>
                                </MenuItem>
                            </> : null}
                    </Menu>
                </Space>
            )
        }

        return (
            <Paper className={'tabel_container'}>
                <Space direction={"vertical"}>
                    <Typography noWrap>{selectOrder.title}</Typography>
                    <Typography noWrap>Статус: {order_status[selectOrder.actions[0].status]}</Typography>
                    {selectOrder.actions[0].status === 'not_agreed' ?
                        <Typography noWrap>По причине: {selectOrder.comment}</Typography> : null}
                </Space>
                {button()}
                <TableContainer component={Box}>
                    <SimpleBar style={{maxHeight: '100%'}}>
                        <Table size={'small'} stickyHeader={true} sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell>Наименование</TableCell>
                                    <TableCell>Производитель</TableCell>
                                    <TableCell>Харакстеристики</TableCell>
                                    <TableCell>Количество</TableCell>
                                    <TableCell>Комментарий</TableCell>
                                    <TableCell>Крайний срок</TableCell>
                                    <TableCell>Статус</TableCell>
                                    <TableCell>Причина</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.orderProducts.map((prod, index) => {
                                    let deadline = prod.deadline ? moment(prod.deadline).format('DD-MM-YYYY') : ''
                                    let actions = product_status[prod.actions[0].status]
                                    let reason = prod.actions[0].reason
                                    if (selectOrder.executor_id === props.user.username && selectOrder.actions[0].status === 'agreed') {
                                        actions = <Select
                                            defaultValue={prod.actions[0].status}
                                            size={"small"}
                                            onSelect={inx => {
                                                if (inx === prod.actions[0].status) return
                                                props.editOrderProduct(prod.id, {action: inx, reason: reasonInput})
                                                setReasonInput(null)
                                            }}
                                        >
                                            {Object.keys(product_status).map(key => <Select.Option
                                                key={key} value={key}>{product_status[key]}</Select.Option>)}
                                        </Select>
                                        reason = <Input autoSize={{minRows: 1, maxRows: 6}} size={"small"}
                                                        style={{minWidth: 150}}
                                                        defaultValue={prod.actions[0].reason}
                                                        onChange={e => setReasonInput(e.target.value)}/>
                                    }
                                    return <TableRow key={'tr_' + index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell sx={{minWidth: '200px'}}>{prod.catalog?.name}</TableCell>
                                        <TableCell>{prod.catalog?.manufacturer}</TableCell>
                                        <TableCell>{prod.catalog?.feature}</TableCell>
                                        <TableCell>{prod.count} {prod.catalog?.unit}</TableCell>
                                        <TableCell>{prod.comment}</TableCell>
                                        <TableCell>{deadline}</TableCell>
                                        <TableCell>{actions}</TableCell>
                                        <TableCell>{reason}</TableCell>
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
                      minWidths={[500, 500]}>
                <Paper className={'paper'}>
                    <SimpleBar style={{maxHeight: '100%'}}>
                        <Space direction='horizontal' style={{margin: 10}}>
                            <TextField
                                label="Поиск"
                                // variant="standard"
                                onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
                                size={'small'}
                                sx={{minWidth: 200}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                fullWidth
                            />
                            <Select
                                defaultValue={switchStatus}
                                size={"large"}
                                style={{minWidth: 150}}
                                onSelect={(inx) => {
                                    setSwitchStatus(inx)
                                }}
                            >
                                {Object.keys(order_status).map(key => <Select.Option
                                    key={key} value={key}>{order_status[key]}</Select.Option>)}
                            </Select>
                            <Button variant={'contained'} startIcon={<AddIcon/>} color={'success'}
                                    onClick={() => {
                                        setCreated(true)
                                    }}
                            >Создать</Button>
                        </Space>
                        <MenuList disableListWrap>
                            {!props.orders ? null :
                                props.orders.map(order => {
                                    if (switchStatus !== 'all') {
                                        if (order.actions[0].status !== switchStatus) return null
                                    }
                                    if (searchValue) {
                                        if (!order.products.some(val => val.name.toLowerCase().includes(searchValue)) &&
                                            !order.creator_fio.toLowerCase().includes(searchValue)) return null
                                    }
                                    let ordre_id = `${order.id}`.padStart(6, '0')
                                    let date_create = moment(order.date_create)
                                    let deadline = moment(order.products[0].deadline)
                                    order.products.forEach(val => {
                                        if (moment(deadline).isAfter(val.deadline)) deadline = moment(val.deadline)
                                    })
                                    order['title'] = `№${ordre_id}, ${order.creator_fio} от ${date_create.format('DD-MM-YYYY')} к ${deadline.format('DD-MM-YYYY')}`
                                    return <MenuItem
                                        selected={order === selectOrder}
                                        key={order.id}
                                        onClick={() => {
                                            setSelectOrder(order)
                                            setCreated(false)
                                            setCopy(false)
                                            setEdit(false)
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    orders: state.orders,
    orderProducts: state.orderProducts,
    products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
    tryGetOrders: () => dispatch(tryGetOrders()),
    tryGetOrderProducts: (order_id) => dispatch(tryGetOrderProducts(order_id)),
    getProducts: () => dispatch(getProducts()),
    editOrder: (order_id, values) => dispatch(editOrder(order_id, values)),
    editOrderProduct: (prod_id, values) => dispatch(editOrderProduct(prod_id, values)),
    deleteOrder: (order_id) => dispatch(deleteOrder(order_id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)


