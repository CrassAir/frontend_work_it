import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {ConfigProvider, DatePicker, Form, Input, Space, Tooltip} from "antd";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {getTabels, tryGetCellsByTabel, trySendCellsData} from "../../store/action/tabelActions";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import {MenuItem, MenuList} from "@mui/material";

import moment from "moment";
import locale from 'antd/lib/locale/ru_RU'
import 'moment/locale/ru'
import Typography from "@mui/material/Typography";
import Splitter, {SplitDirection} from '@devbookhq/splitter'
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {cleanup} from "@testing-library/react";
import SimpleBar from "simplebar-react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Tabel = (props) => {
    const now = moment()
    const yesterday = now.subtract(1, 'day')
    const [dayInMonth, setDayInMonth] = useState(now.daysInMonth())
    const [month, setMonth] = useState(now)
    const [selectTabel, setSelectTabel] = useState([])
    const [initSplitter] = useState([20, 80])
    const [visibleDialog, setVisibleDialog] = useState(false)

    useEffect(() => {
        setTimeout(() => setVisibleDialog(true), 15000)
        return () => cleanup()
    }, [])

    useEffect(() => {
        if (!props.tabels?.length > 0) return
        setSelectTabel(props.tabels[0])
        if (!props.cells?.length > 0) props.tryGetCellsByTabel(props.tabels[0].id)
    }, [props.tabels])

    useEffect(() => {
        setTimeout(() => document.getElementsByClassName('now')[0]?.scrollIntoView({
            block: 'nearest',
            inline: "end",
            behavior: "smooth"
        }), 1000)
    }, [props.cells])

    useEffect(() => {
        props.getTabels(month.toISOString())
    }, [month])

    const removeEmpty = (obj) => {
        Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
        return obj;
    };

    const setCellClassName = (index) => {
        if (month.month() === yesterday.month() && yesterday.date() === index) return 'now'
        if ([6, 7].includes(moment(month).date(index).isoWeekday())) return 'weekend'
    }

    const reviewDialog = () => {
        return (
            <Dialog
                open={visibleDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setVisibleDialog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Спасибо что пользуетесь нашем табелем'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {'Пожалйуста оцените качество табеля'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'}
                            href={'https://docs.google.com/forms/d/e/1FAIpQLSehfH6T0KHkiI9Zf822kjgdcbjd9H_yOHl3MIkTmXdip0uGMA/viewform'}
                            target={'_blank'} onClick={() => setVisibleDialog(false)}>Оценить</Button>
                </DialogActions>
            </Dialog>
        )
    }


    const generateTabel = () => {
        if (!props.cells?.length > 0) return null
        if (!selectTabel) return null
        if (props.loading) return null
        return (
            <Form
                onFinish={values => {
                    removeEmpty(values)
                    console.log(values)
                    // props.tabels
                    props.trySendCellsData(values, props.user?.rules_template_account.can_check_cro)
                    if (props.user?.rules_template_account.can_check_cro) {
                        props.tabels.forEach(tabel => {
                            if (tabel === selectTabel) {
                                tabel.checked_cro = true
                                setSelectTabel(tabel)
                            }
                        })
                    }
                }}
            >
                <Paper className={'tabel_container'}>
                    <Space direction={"horizontal"}>
                        {selectTabel.department_name}
                        {selectTabel.checked_cro ? <CheckCircleIcon color={'success'}/> : null}
                    </Space>
                    <Button className={'send_btn'} variant={'contained'} color={'success'}
                            type={'submit'}>Сохранить</Button>
                    <TableContainer component={Box}>
                        <SimpleBar style={{maxHeight: '100%'}}>
                            <Table size={'small'} className={'tabel_table'} stickyHeader={true} sx={{minWidth: 650}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={'fixed'}>Сотрудник</TableCell>
                                        <TableCell align="center">Табельный номер</TableCell>
                                        <TableCell align="center">Должность</TableCell>
                                        {Array.from({length: dayInMonth}, (_, index) => (
                                            <TableCell
                                                className={setCellClassName(index + 1)}
                                                align="center">{index + 1}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.cells.map((row) => (
                                        <TableRow>
                                            <TableCell className={'fixed'} component={'th'}
                                                       scope="row">{row.full_name}</TableCell>
                                            <TableCell align="center">{row.employee_code}</TableCell>
                                            <TableCell align="center">{row.post}</TableCell>
                                            {Array.from({length: dayInMonth}, (_, index) => {
                                                let data = row.cells[index]
                                                if (!data) return false
                                                let hours = data.hours_control ? data.hours_control : data.hours_manual
                                                let className = setCellClassName(index + 1)
                                                if (data.hours_perco && data.hours_perco < data.hours_manual && !data.hours_control) className = 'warning'
                                                let cellComp = <Tooltip title={'Фактические часы'}
                                                                        placement={"right"}>
                                                    {hours}
                                                </Tooltip>

                                                if (data.can_edit || props.user?.rules_template_account.can_check_cro) {
                                                    cellComp = <Form.Item style={{minWidth: 30, margin: 'auto'}}
                                                                          initialValue={hours}
                                                                          name={data.pk}
                                                    >
                                                        <Input style={{padding: 2, textAlign: 'center'}}
                                                               maxLength={2}
                                                               size="small"/>
                                                    </Form.Item>

                                                }

                                                return <TableCell
                                                    className={className}
                                                    align="center">
                                                    <Space direction={"vertical"}>
                                                        {cellComp}
                                                        <Tooltip title={'Часы перко'}
                                                                 placement={"right"}>{data.hours_perco ? Math.round(data.hours_perco) : null}</Tooltip>
                                                    </Space>
                                                </TableCell>
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </SimpleBar>
                    </TableContainer>
                </Paper>
            </Form>
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
                            <MenuItem sx={{marginBottom: '10px'}}>
                                <ConfigProvider locale={locale}>
                                    <DatePicker
                                        onChange={(e) => {
                                            setMonth(moment(e))
                                            setDayInMonth(moment(e).daysInMonth())
                                        }}
                                        style={{width: '100%'}}
                                        defaultValue={month}
                                        format={'MM-YYYY'}
                                        picker="month"/>
                                </ConfigProvider>
                            </MenuItem>
                            {!props.tabels ? null :
                                props.tabels.map(tabel => {
                                    return <MenuItem
                                        className={tabel.checked_cro ? 'checked' : 'test'}
                                        selected={tabel === selectTabel}
                                        onClick={() => {
                                            setSelectTabel(tabel)
                                            props.tryGetCellsByTabel(tabel.id)
                                        }}>
                                        <Typography noWrap>{tabel.department_name}</Typography>
                                    </MenuItem>
                                })
                            }
                        </MenuList>
                    </SimpleBar>
                </Paper>
                {generateTabel()}
            </Splitter>
            {reviewDialog()}
        </div>
    )
}


const mapStateToProps = (state) => ({
    tabels: state.tabels,
    cells: state.cells,
    loading: state.loading,
    user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
    getTabels: (dateTime) => dispatch(getTabels(dateTime)),
    trySendCellsData: (cells, cro) => dispatch(trySendCellsData(cells, cro)),
    tryGetCellsByTabel: (tabel_id) => dispatch(tryGetCellsByTabel(tabel_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabel)
