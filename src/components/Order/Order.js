import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import Paper from "@mui/material/Paper";
import SimpleBar from "simplebar-react";
import {MenuItem, MenuList} from "@mui/material";
import {Form, Popover, Select, Space} from "antd";
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
import PrintIcon from '@mui/icons-material/Print';
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
import {tryPrintOrder} from "../../api/api";
import {useParams} from "react-router";
import {useNavigate} from 'react-router-dom';


const Orders = (props) => {
    const navigate = useNavigate()
    const {orderId} = useParams()
    const [selectOrder, setSelectOrder] = useState(null)
    const [created, setCreated] = useState(false)
    const [copy, setCopy] = useState(null)
    const [edit, setEdit] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [searchValue, setSearchValue] = useState(null)
    const [formVis, setFormVis] = useState(null)
    const [switchStatus, setSwitchStatus] = useState('all')
    const [initSplitter] = useState([35, 65])

    useEffect(() => {
        props.tryGetOrders()
    }, [])

    useEffect(() => {
        if (props.orders && orderId) {
            setSelectOrder(props.orders.find(val => val.id.toString() === orderId))
            setCreated(false)
            setCopy(false)
            setEdit(false)
            props.tryGetOrderProducts(orderId)
        }
    }, [orderId, props.orders])

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
        in_agreement: 'На согласовании',
        canceling: 'Отменен',
        agreed: 'Согласован',
        not_agreed: 'Не согласован',
        delivered: 'Доставлен',
        not_delivered: 'Не доставлен',
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
                if (selectOrder.actions[0].status === 'in_agreement') {
                    coordBtn = <ButtonGroup variant="contained" size="small">
                        <Button startIcon={<CheckIcon/>}
                                color={'success'}
                                onClick={() => {
                                    props.editOrder(selectOrder.id, {action: 'agreed'})
                                }}
                        >Согласовать</Button>
                        <Button startIcon={<ClearIcon/>}
                                color={'error'}
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
                coordBtn = <ButtonGroup variant="contained" size="small">
                    <Button startIcon={<CheckIcon/>}
                            color={'success'}

                            onClick={() => {
                                props.editOrder(selectOrder.id, {action: 'delivered'})
                            }}
                    >Доставлен</Button>
                    <Button startIcon={<ClearIcon/>}
                            color={'error'}
                            onClick={() => {
                                props.editOrder(selectOrder.id, {action: 'not_delivered'})
                            }}
                    >Не доставлен</Button>
                </ButtonGroup>
            }
            if (selectOrder.creator_id === props.user.username) {
                if (selectOrder.actions[0].status === 'canceling') {
                    coordBtn = <Button variant={'contained'}
                                       size={'small'}
                                       onClick={() => {
                                           props.editOrder(selectOrder.id, {action: 'created'})
                                       }}
                    >Возобновить</Button>
                }
                if (selectOrder.actions[0].status === 'created') {
                    coordBtn = <Button variant={'contained'} startIcon={<CheckIcon/>}
                                       color={'success'}
                                       size={'small'}
                                       onClick={() => {
                                           props.editOrder(selectOrder.id, {action: 'in_agreement'})
                                       }}
                    >На согласование</Button>
                }
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
                        <MenuItem onClick={() => {
                            tryPrintOrder(selectOrder.id)
                        }}>
                            <ListItemIcon>
                                <PrintIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>Печать</ListItemText>
                        </MenuItem>
                        {selectOrder.creator_id === props.user.username && selectOrder.actions[0].status === 'created' ?
                            <MenuItem onClick={() => {
                                setEdit(selectOrder.id)
                                setAnchorEl(null)
                            }}>
                                <ListItemIcon>
                                    <EditIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>Изменить</ListItemText>
                            </MenuItem> : null}
                        {selectOrder.creator_id === props.user.username && selectOrder.actions[0].status !== 'delivered' ?
                            <MenuItem onClick={() => {
                                props.deleteOrder(selectOrder.id)
                                setAnchorEl(null)
                            }}>
                                <ListItemIcon>
                                    <DeleteIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>Отменить</ListItemText>
                            </MenuItem>
                            : null}
                    </Menu>
                </Space>
            )
        }

        const actions = (prod) => {
            if (selectOrder.executor_id === props.user.username && selectOrder.actions[0].status === 'agreed') {
                let content = <Form
                    onFinish={values => {
                        values.action = formVis.selectVal
                        props.editOrderProduct(prod.id, values)
                        setFormVis(null)
                    }}
                >
                    <Form.Item
                        name='reason'
                        getValueProps={(e) => {
                        }}
                        // label='Причина'
                    >
                        <TextField
                            label="Причина"
                            variant="standard"
                            fullWidth
                        />
                    </Form.Item>
                    <Form.Item
                        name='count_result'
                        getValueProps={(e) => {
                        }}
                    >
                        <TextField
                            label="Отгружено"
                            variant="standard"
                            type={'number'}
                            fullWidth
                        />
                    </Form.Item>
                    <ButtonGroup variant="text" size="small">
                        <Button startIcon={<CheckIcon/>}
                                color={'success'}
                                type={'submit'}
                        >Отправить</Button>
                        <Button startIcon={<ClearIcon/>}
                                onClick={() => setFormVis(null)}
                        >Назад</Button>
                    </ButtonGroup>
                </Form>
                return <Popover
                    content={content}
                    placement={'left'}
                    trigger="click"
                    visible={formVis?.prodId === prod.id}
                ><Select
                    value={formVis?.prodId === prod.id ? formVis?.selectVal : prod.actions[0].status}
                    size={"small"}
                    onSelect={inx => {
                        if (inx === prod.actions[0].status) {
                            setFormVis(null)
                            return
                        }
                        setFormVis({prodId: prod.id, selectVal: inx})
                    }}
                >
                    {Object.keys(product_status).map(key => <Select.Option
                        key={key} value={key}>{product_status[key]}</Select.Option>)}
                </Select>
                </Popover>
            }
            return product_status[prod.actions[0].status]
        }

        return (
            <Paper className={'order_container'}>
                <Space direction={"vertical"}>
                    <Typography noWrap>{selectOrder.title}</Typography>
                    <Space direction={"horizontal"} size={'large'}>
                        <Typography noWrap>Статус: {order_status[selectOrder.actions[0].status]}</Typography>
                        <Typography noWrap>Дата:{moment(selectOrder.actions[0].date_create).format('DD-MM-YYYY')}</Typography>
                    </Space>
                    {selectOrder.actions[0].status === 'not_agreed' ?
                        <Typography noWrap>По причине: {selectOrder.comment}</Typography> : null}
                </Space>
                {button()}
                <TableContainer component={Box}>
                    <SimpleBar style={{maxHeight: '75vh'}}>
                        <Table size={'small'} stickyHeader={true} sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell>Наименование</TableCell>
                                    <TableCell>Производитель</TableCell>
                                    <TableCell>Харакстеристики</TableCell>
                                    <TableCell>Количество</TableCell>
                                    <TableCell>Объект</TableCell>
                                    <TableCell>Крайний срок</TableCell>
                                    <TableCell>Комментарий</TableCell>
                                    <TableCell>Отгружено</TableCell>
                                    <TableCell>Дата доставки</TableCell>
                                    <TableCell>Статус</TableCell>
                                    <TableCell>Комментарий исполнителя</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.orderProducts.map((prod, index) => {
                                    let deadline = prod.deadline ? moment(prod.deadline).format('DD-MM-YYYY') : ''
                                    let delivered = ["delivered", "not_delivered"].includes(prod.actions[0].status) ? moment(prod.actions[0].date_create).format('DD-MM-YYYY') : ''
                                    return <TableRow key={'tr_' + index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell sx={{minWidth: '200px'}}>{prod.catalog?.name}</TableCell>
                                        <TableCell>{prod.catalog?.manufacturer}</TableCell>
                                        <TableCell>{prod.catalog?.feature}</TableCell>
                                        <TableCell>{prod.count} {prod.catalog?.unit}</TableCell>
                                        <TableCell sx={{minWidth: '120px'}}>{prod.location?.name}</TableCell>
                                        <TableCell>{deadline}</TableCell>
                                        <TableCell>{prod.comment}</TableCell>
                                        <TableCell>{prod.count_result ? `${prod.count_result} ${prod.catalog?.unit}` : null}</TableCell>
                                        <TableCell>{delivered}</TableCell>
                                        <TableCell>{actions(prod)}</TableCell>
                                        <TableCell>{prod.actions[0].reason}</TableCell>
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
                                    let className
                                    if (order.actions[0].status === 'delivered') {
                                        className = 'delivered'
                                    }
                                    if (order.actions[0].status === 'not_agreed') {
                                        className = 'not_agreed'
                                    }
                                    if (order.actions[0].status === 'in_agreement') {
                                        className = 'in_agreement'
                                    }
                                    if (switchStatus !== 'all') {
                                        if (order.actions[0].status !== switchStatus) return null
                                    }
                                    if (searchValue) {
                                        if (!order.products.some(val => val.name.toLowerCase().includes(searchValue)) &&
                                            !order.creator_fio.toLowerCase().includes(searchValue)) return null
                                    }
                                    let order_id = `${order.id}`.padStart(6, '0')
                                    let date_create = moment(order.date_create)
                                    if (!order.products) return null
                                    let deadline = moment(order.products[0]?.deadline)
                                    order.products.forEach(val => {
                                        if (moment(deadline).isAfter(val.deadline)) deadline = moment(val.deadline)
                                    })
                                    order['title'] = `№${order_id}, ${order.creator_fio} от ${date_create.format('DD-MM-YYYY')} к ${deadline.format('DD-MM-YYYY')}`
                                    return <MenuItem
                                        className={className}
                                        selected={order === selectOrder}
                                        key={order.id}
                                        onClick={() => navigate(`/order/${order.id.toString()}`, {replace: true})}>
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


