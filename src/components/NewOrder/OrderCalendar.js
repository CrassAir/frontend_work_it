import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import {
    Paper,
} from "@mui/material";
import moment from 'moment'
import 'moment/locale/ru'
import {tryGetOrders} from "../../store/action/ordersActions";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import {Popover, Select, Space} from "antd";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

moment.locale('ru')
export const localizer = momentLocalizer(moment)

export const localize_messages = {
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    allDay: 'Целый день',
    week: 'Неделя',
    work_week: 'Work Week',
    day: 'День',
    month: 'Месяц',
    previous: 'Назад',
    next: 'Вперед',
    yesterday: 'Вчера',
    tomorrow: 'Завтра',
    today: 'Сегодня',
    agenda: 'Список',
}

export const order_status = {
    all: {title: 'Все', color: ''},
    created: {title: 'Создан', color: ''},
    in_agreement: {title: 'На согласовании', color: 'hsl(50, 100%, 40%)'},
    canceling: {title: 'Отменен', color: ''},
    agreed: {title: 'Согласован', color: ''},
    not_agreed: {title: 'Не согласован', color: 'hsl(0, 100%, 40%)'},
    delivered: {title: 'Доставлен', color: 'hsl(100, 100%, 40%)'},
    not_delivered: {title: 'Не доставлен', color: ''},
}

const OrderCalendar = (props) => {
    const [events, setEvents] = useState([])
    const [orders, setOrders] = useState([])
    const [searchValue, setSearchValue] = useState(null)
    const [switchStatus, setSwitchStatus] = useState('all')

    let searchTimer;

    useEffect(() => {
        props.tryGetOrders()
    }, [])

    useEffect(() => {
        if (props.orders) {
            let orders = props.orders.map(val => {
                val.title = `Заказ №${val.id} ${val.creator_fio}`
                val.start = new Date(val.date_create)
                val.end = val.products.length > 0 ? new Date(val.products[0].deadline) : new Date(val.date_create)
                val.color = val.actions.length > 0 ? order_status[val.actions[0].status].color : ''
                return val
            })
            setEvents(orders)
            setOrders(orders)
        }
    }, [props.orders])

    useEffect(() => {
        if (switchStatus === 'all') {
            setEvents(orders)
        } else {
            let newVals = []
            orders.forEach(order => {
                if (order.actions[0].status === switchStatus) {
                    newVals.push(order)
                }
            })
            setEvents(newVals)
        }
    }, [switchStatus])

    useEffect(() => {
        if (searchValue) {
            let newVals = []
            orders.forEach(order => {
                if (order.products.some(val => val.name.toLowerCase().includes(searchValue)) || order.creator_fio.toLowerCase().includes(searchValue)) {
                    newVals.push(order)
                }
            })
            setEvents(newVals)
        } else {
            setEvents(orders)
        }
    }, [searchValue])

    const formats = {
        eventTimeRangeFormat: () => {
            return "";
        },
    };

    const eventPropGetter = (event) => {
        const backgroundColor = event.color;
        return {style: {backgroundColor}}
    }

    const searchInOrders = (e) => {
        clearTimeout(searchTimer)
        searchTimer = setTimeout(() => {
            setSearchValue(e.target.value.toLowerCase())
        }, 500)
    }

    const prodSmallView = (event) => {
        return <Table size={'small'} stickyHeader={true}>
            <TableHead>
                <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Наименование</TableCell>
                    {/*<TableCell>Производитель</TableCell>*/}
                    {/*<TableCell>Харакстеристики</TableCell>*/}
                    {/*<TableCell>Количество</TableCell>*/}
                    {/*<TableCell>Объект</TableCell>*/}
                </TableRow>
            </TableHead>
            <TableBody>
                {event.event.products?.map((prod, index) => {
                    return <TableRow key={'tr_' + index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{minWidth: '200px'}}>{prod.name}</TableCell>
                        {/*<TableCell>{prod.manufacturer}</TableCell>*/}
                        {/*<TableCell>{prod.feature}</TableCell>*/}
                        {/*<TableCell>{prod.count} {prod.unit}</TableCell>*/}
                        {/*<TableCell sx={{minWidth: '120px'}}>{prod.location?.name}</TableCell>*/}
                    </TableRow>
                })}
            </TableBody>
        </Table>
    }

    const Event = event => {
        return <Popover placement="right" content={prodSmallView(event)} trigger="hover">
            {event.title}
        </Popover>
    }

    const centerPaperGen = () => {
        return <Calendar
            formats={formats}
            popup
            messages={localize_messages}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className={'main_calendar'}
            views={['week', 'month']}
            defaultView={'week'}
            onSelectEvent={(e) => console.log(e)}
            eventPropGetter={eventPropGetter}
            tooltipAccessor={null}
            components={{event: Event}}
        />
    }

    const searchOrSwitchStatus = () => {
        return <Space direction='horizontal' style={{margin: 10}}>
            <TextField
                label="Поиск"
                // variant="standard"
                onChange={searchInOrders}
                size={'small'}
                sx={{minWidth: 200}}
                InputProps={{
                    endAdornment: (<InputAdornment position="end">
                        <SearchIcon/>
                    </InputAdornment>),
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
                    key={key} value={key}>{order_status[key].title}</Select.Option>)}
            </Select>
        </Space>
    }

    return (
        <div className={'order_calendar'}>
            <Paper className={'top_paper'}>
                {searchOrSwitchStatus()}
            </Paper>
            <Paper className={'center_paper'}>
                {centerPaperGen()}
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) => ({
    orders: state.orders,
})

const mapDispatchToProps = (dispatch) => ({
    tryGetOrders: () => dispatch(tryGetOrders()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCalendar)

