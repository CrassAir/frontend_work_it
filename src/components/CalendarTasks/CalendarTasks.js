import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import {
    Paper,
    MenuList,
    MenuItem,
    ListItemIcon,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment'
import 'moment/locale/ru'
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import StepperCreate from "./SteperCreate";
import {getGreenhouses} from "../../store/action/locationActions";

moment.locale('ru')
export const localizer = momentLocalizer(moment)

export const localize_messages = {
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    allDay: 'Целый день',
    week: 'Week',
    work_week: 'Work Week',
    day: 'День',
    month: 'Месяц',
    previous: 'Назад',
    next: 'Вперед',
    yesterday: 'Вчера',
    tomorrow: 'Завтра',
    today: 'Сегодня',
    agenda: 'События',
}

const CalendarTasks = (props) => {
    const [create, setCreate] = useState(false)
    const [events] = useState([])
    const [initSplitter] = useState([15, 70, 15])

    useEffect(() => {
        if (!props.greenhouses) props.getGreenhouses()
    })

    const onCancel = () => {
        setCreate(false)
    }

    const centerPaperGen = () => {
        if (create) {
            return <StepperCreate />
        }
        return <Calendar
            popup
            messages={localize_messages}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className={'main_calendar'}
            views={['month', 'agenda']}
            onSelectEvent={(e) => console.log(e)}
            // style={{flex:}}
        />
    }

    const menuItem = () => {
        if (!props.greenhouses) return <MenuItem />
        return props.greenhouses.map(val => <MenuItem key={val.id}>{val.name}</MenuItem>)
    }

    return (
        <div className={'calendar_row'}>
            <Splitter direction={SplitDirection.Horizontal}
                      gutterClassName="custom-gutter-horizontal"
                      draggerClassName="custom-dragger-horizontal"
                      initialSizes={initSplitter}
                      minWidths={[100, 700, 100]}
            >
                <Paper className={'paper'}>
                    <MenuList>
                        {menuItem()}
                    </MenuList>
                </Paper>
                <Paper className={'center_paper'}>
                    {centerPaperGen()}
                </Paper>
                <Paper>
                    {!create ?
                        <MenuList>
                            <MenuItem onClick={() => setCreate(true)}>
                                <ListItemIcon>
                                    <AddIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>Запланировать</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <CreateIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>Редактировать</Typography>
                            </MenuItem>
                        </MenuList>
                        :
                        <MenuList>
                            <MenuItem onClick={onCancel}>
                                <ListItemIcon>
                                    <CancelIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>Отмена</Typography>
                            </MenuItem>
                        </MenuList>
                    }
                </Paper>
            </Splitter>
        </div>
    )
}

const mapStateToProps = (state) => ({
    greenhouses: state.greenhouses
})

const mapDispatchToProps = (dispatch) => ({
    getGreenhouses: () => dispatch(getGreenhouses())
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTasks)

