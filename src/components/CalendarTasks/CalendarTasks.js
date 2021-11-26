import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import {
    TextField,
    Paper,
    MenuList,
    MenuItem,
    ListItemIcon,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Box, Button, Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment'
import 'moment/locale/ru'
import {Form, Row, Col} from "antd";
import RowTasks from "../RowTasks/RowTasks";  // without this line it didn't work
moment.locale('ru')

const localizer = momentLocalizer(moment)

const CalendarTasks = (props) => {
    const [create, setCreate] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [newEvents, setNewEvents] = useState([])
    const [newEventTitle, setNewEventTitle] = useState()
    const [selectedRow, setSelectedRow] = useState([])
    const [events, setEvents] = useState([])


    const messages = {
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

    const onNewSelectSlot = (e) => {
        if (moment(e.start).diff(moment.now(), 'day') < 0) {
            return
        }
        let dataDiff = moment(e.end).diff(moment(e.start), 'day')
        let index = -1
        newEvents.forEach((val, i) => {
            if (moment(val.start).valueOf() === moment(e.start).valueOf()) {
                index = i
            }
        })
        if (index >= 0) {
            newEvents.splice(index, 1)
            setNewEvents([...newEvents])
        } else {
            let eventList = [{title: newEventTitle, start: e.start, end: e.start}]
            if (dataDiff > 0) {
                for (let i = 1; i < dataDiff; i++) {
                    let newStart = moment(e.start).add(i, 'day')
                    eventList.push({title: newEventTitle, start: newStart, end: newStart})
                }
            }
            setNewEvents([...newEvents, ...eventList])
        }
    }

    const onCancel = () => {
        setCreate(false)
        setNewEvents([])
        setActiveStep(0)
    }

    const sendSelectRow = (rows) => {
        setSelectedRow(rows)
    }

    const Step1 = () =>
        <Step key={0}>
            <StepLabel>
                Step 1
            </StepLabel>
            <StepContent>
                <Form
                    onFinish={(values) => {
                        setNewEventTitle(values.title)
                        setActiveStep(activeStep + 1)
                    }}
                >
                    <Form.Item
                        name="title"
                        getValueProps={(e) => {
                        }}
                        required={true}
                    >
                        <TextField
                            required
                            label="Название"
                            variant="standard"
                            // fullWidth
                        />
                    </Form.Item>
                    <Form.Item>
                        <Box sx={{mb: 2}}>
                            <Button
                                variant="contained"
                                type={'submit'}
                                sx={{mt: 1, mr: 1}}
                            >
                                Продолжить
                            </Button>
                        </Box>
                    </Form.Item>
                </Form>
            </StepContent>
        </Step>

    const Step2 = () =>
        <Step key={1}>
            <StepLabel>
                Step 2
            </StepLabel>
            <StepContent>
                <Box sx={{height: '50vh'}}>
                    <Calendar
                        selectable
                        popup
                        messages={messages}
                        localizer={localizer}
                        events={newEvents}
                        className={'calendar_stepper'}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month']}
                        onSelectSlot={onNewSelectSlot}
                        onSelectEvent={onNewSelectSlot}
                        // style={{flex:}}
                    />
                </Box>
                <Box sx={{mb: 2}}>
                    <div>
                        <Button
                            variant="contained"
                            disabled={newEvents.length === 0}
                            onClick={() => setActiveStep(activeStep + 1)}
                            sx={{mt: 1, mr: 1}}
                        >
                            Продолжить
                        </Button>
                        <Button
                            onClick={() => {
                                setActiveStep(activeStep - 1)
                                setNewEvents([])
                            }}
                            sx={{mt: 1, mr: 1}}
                        >
                            Назад
                        </Button>
                    </div>
                </Box>
            </StepContent>
        </Step>

    const Step3 = () =>
        <Step key={2}>
            <StepLabel>
                Step 3
            </StepLabel>
            <StepContent>
                <Box>
                    {<RowTasks sendSelectRow={sendSelectRow}/>}
                </Box>
                <Box sx={{mb: 2}}>
                    <Button
                        onClick={() => {
                            console.log(selectedRow)
                            setActiveStep(activeStep - 1)
                            setSelectedRow([])
                        }}
                        sx={{mt: 1, mr: 1}}
                    >
                        Назад
                    </Button>
                </Box>
            </StepContent>
        </Step>

    const centerPaperGen = () => {
        if (create) {
            return <Stepper activeStep={activeStep} orientation="vertical">
                {Step1()}
                {Step2()}
                {Step3()}
            </Stepper>
        }
        return <Calendar
            popup
            messages={messages}
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


    return (
        <Row gutter={16} className={'calendar_row'}>

            <Col span={3}>
                {/*{editable ?*/}
                <Paper className={'paper'}>
                    <MenuList>
                        <MenuItem>Теплица 1</MenuItem>
                        <MenuItem>Теплица 2</MenuItem>
                        <MenuItem>Теплица 3</MenuItem>
                    </MenuList>
                </Paper>
                {/*: null}*/}
            </Col>

            <Col span={17}>
                <Paper className={'center_paper'}>
                    {centerPaperGen()}
                </Paper>
            </Col>
            <Col span={4}>
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
                                Отмена
                            </MenuItem>
                        </MenuList>
                    }
                </Paper>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTasks)

