import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Box, Button, Step, StepContent, StepLabel, Stepper, TextField} from "@mui/material";
import {Form} from "antd";
import {Calendar} from "react-big-calendar";
import RowTasks from "../RowTasks/RowTasks";
import {localize_messages, localizer} from "./CalendarTasks";
import moment from "moment";
import SimpleBar from "simplebar-react";

const StepperCreate = (props) => {
    const [activeStep, setActiveStep] = useState(0)
    const [newEvents, setNewEvents] = useState([])
    const [newEventTitle, setNewEventTitle] = useState()
    const [selectedRow, setSelectedRow] = useState([])

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
                        messages={localize_messages}
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
                    <RowTasks sendSelectRow={sendSelectRow}/>
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

    return (
        <SimpleBar style={{maxHeight: '100%'}}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {Step1()}
                {Step2()}
                {Step3()}
            </Stepper>
        </SimpleBar>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(StepperCreate)
