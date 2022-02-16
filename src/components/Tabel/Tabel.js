import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {ConfigProvider, DatePicker, Form, Input, Modal, Popconfirm, Space, Tooltip} from "antd";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    getTabels,
    tryAddUserInTabel, tryDeleteUserInTabel,
    tryGetCellsByTabel,
    tryOpenCellsInTabel,
    trySendCellsData
} from "../../store/action/tabelActions";
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
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import RemoveIcon from '@mui/icons-material/Remove';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {tryPrintTabel} from "../../api/api";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {tryGetUsers} from "../../store/action/accountActions";
import IconButton from "@mui/material/IconButton";

// import { matchSorter } from 'match-sorter';
//
// const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);


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
    const [visibleReviewDialog, setVisibleReviewDialog] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const [selectUser, setSelectUser] = useState(null)

    useEffect(() => {
        if (!localStorage.getItem('is_rating')) setTimeout(() => setVisibleReviewDialog(true), 15000)
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

    useEffect(() => {
        if (!props.users) props.tryGetUsers()
    }, [modalVisible])

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
                open={visibleReviewDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setVisibleReviewDialog(false)}
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
                            target={'_blank'}
                            onClick={() => {
                                setVisibleReviewDialog(false)
                                localStorage.setItem('is_rating', true)
                            }}>Оценить</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const modal = () => {
        if (!props.users) return null
        const cancel = () => {
            setModalVisible(false)
            setSelectUser(null)
        }
        return (
            <Modal
                visible={modalVisible}
                title={'Добавить сотрудника в табель'}
                onCancel={cancel}
                footer={null}
            >
                <Space className={'center_modal'} direction={"vertical"}>
                    <Autocomplete
                        id="free-solo-users"
                        freeSolo
                        options={props.users}
                        getOptionLabel={(option) => option.full_name}
                        onChange={(_, opt) => setSelectUser(opt)}
                        renderInput={(params) => <TextField {...params} label="Сотрудник"/>}
                    />
                    <Button
                        variant={'contained'} color={'success'}
                        onClick={() => {
                            props.tryAddUserInTabel(selectTabel.id, selectUser.pk)
                            cancel()
                        }}>
                        Добавить
                    </Button>
                </Space>
            </Modal>
        )
    }

    const generateTabel = () => {
        if (!props.cells?.length > 0) return null
        if (!selectTabel) return null
        if (props.loading) return null
        const button = () => {
            let openTabelBtn = null
            if (props.user?.rules_template_account.can_check_cro || props.user?.is_admin || props.user?.is_superuser) {
                openTabelBtn = <Button variant={'contained'} startIcon={<LockOpenIcon/>} size={'small'}
                                       onClick={() => props.tryOpenCellsInTabel(selectTabel.id)}>Открыть табель</Button>
            }
            return <Space direction={"horizontal"}>
                {openTabelBtn}
                <Button variant={'contained'} startIcon={<PersonAddAltIcon/>} size={'small'}
                        onClick={() => setModalVisible(true)}>Добавить сотрудника</Button>
                <Button variant={'contained'} startIcon={<SaveIcon/>} color={'success'}
                        size={'small'} type={'submit'}>Сохранить</Button>
                <Button variant={'contained'} startIcon={<PrintIcon/>} size={'small'}
                        onClick={() => tryPrintTabel(selectTabel.id)}>Печать</Button>
            </Space>
        }
        return (
            <Form
                onFinish={values => {
                    removeEmpty(values)
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
                    <Space direction={"horizontal"} className={'title'}>
                        <Typography className={'tabel_title'}>{selectTabel.department_name}</Typography>
                        {selectTabel.checked_cro ? <CheckCircleIcon color={'success'}/> : null}
                        {button()}
                    </Space>
                    <TableContainer component={Box}>
                        <SimpleBar style={{maxHeight: '100%'}}>
                            <Table size={'small'} className={'tabel_table'} stickyHeader={true} sx={{minWidth: 650}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell key={'tc1'} className={'fixed'}>Сотрудник</TableCell>
                                        <TableCell key={'tc2'} align="center">Табельный номер</TableCell>
                                        <TableCell key={'tc3'} align="center">Должность</TableCell>
                                        {Array.from({length: dayInMonth}, (_, index) => (
                                            <TableCell
                                                key={'th_' + index}
                                                className={setCellClassName(index + 1)}
                                                align="center">{index + 1}</TableCell>
                                        ))}
                                        <TableCell key={'tc4'} align="center">Сумма часов</TableCell>
                                        <TableCell key={'tc5'} align="center">Сумма перко</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.cells.map((row, index) => {
                                        let sum_hours = 0
                                        let sum_perco = 0
                                        let fullName = <div style={{minWidth: 200}}>{row.full_name}</div>
                                        if (props.user?.is_admin || props.user?.is_superuser) {
                                            fullName = <div style={{minWidth: 200}}>
                                                {row.full_name}
                                                <Tooltip title={'Удалить сотрудника'} placement={"right"}>
                                                    <Popconfirm
                                                        title={'Вы уверены что хотите удалить сотрудника?'}
                                                        onConfirm={() => {
                                                            props.tryDeleteUserInTabel(selectTabel.id, row.username)
                                                        }}
                                                        okText='Да' cancelText='Нет'
                                                    >
                                                        <IconButton className={'remove_btn'} variant={'text'}
                                                                    size={'small'} color={"error"}>
                                                            <RemoveIcon/></IconButton>
                                                    </Popconfirm>
                                                </Tooltip>
                                            </div>
                                        }
                                        return <TableRow key={'tb_' + index}>
                                            <TableCell className={'fixed'} component={'th'}
                                                       scope="row">{fullName}</TableCell>
                                            <TableCell align="center">{row.employee_code}</TableCell>
                                            <TableCell align="center">{row.post}</TableCell>
                                            {Array.from({length: dayInMonth}, (_, sub_index) => {
                                                let data = row.cells[sub_index]
                                                if (!data) return false
                                                let hours = data.hours_control ? data.hours_control : data.hours_manual
                                                let className = setCellClassName(sub_index + 1)
                                                // Подсвечивает ячейку если часы перко отличны от часов факт
                                                if (data.hours_perco && data.hours_perco < Math.round(data.hours_manual) && !data.hours_control) className = 'warning'
                                                // Просчет суммы часов
                                                sum_hours += !isNaN(parseInt(hours, 10)) ? parseInt(hours, 10) : 0
                                                sum_perco += data.hours_perco ? data.hours_perco : 0
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
                                                               id={`${index}_${sub_index}`}
                                                               onKeyDown={e => {
                                                                   if (e.key === "ArrowRight") document.getElementById(`${index}_${sub_index + 1}`)?.focus()
                                                                   if (e.key === "ArrowLeft") document.getElementById(`${index}_${sub_index - 1}`)?.focus()
                                                                   if (e.key === "ArrowDown") document.getElementById(`${index + 1}_${sub_index}`)?.focus()
                                                                   if (e.key === "ArrowUp") document.getElementById(`${index - 1}_${sub_index}`)?.focus()
                                                               }}
                                                               size="small"/>
                                                    </Form.Item>

                                                }

                                                return <TableCell
                                                    className={className}
                                                    key={'trtc_' + sub_index}
                                                    align="center">
                                                    <Space direction={"vertical"}>
                                                        {cellComp}
                                                        <Tooltip title={'Часы перко'}
                                                                 placement={"right"}>{data.hours_perco ? Math.round(data.hours_perco) : null}</Tooltip>
                                                    </Space>
                                                </TableCell>
                                            })}
                                            <TableCell key='sumh' align="center">{sum_hours}</TableCell>
                                            <TableCell key='sump' align="center">{Math.round(sum_perco)}</TableCell>
                                        </TableRow>
                                    })}
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
                            <MenuItem sx={{marginBottom: '10px'}} key='date'>
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
                                        key={tabel.id}
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
            {modal()}
        </div>
    )
}


const mapStateToProps = (state) => ({
    tabels: state.tabels,
    cells: state.cells,
    loading: state.loading,
    user: state.user,
    users: state.users,
})

const mapDispatchToProps = (dispatch) => ({
    getTabels: (dateTime) => dispatch(getTabels(dateTime)),
    trySendCellsData: (cells, cro) => dispatch(trySendCellsData(cells, cro)),
    tryGetCellsByTabel: (tabel_id) => dispatch(tryGetCellsByTabel(tabel_id)),
    tryOpenCellsInTabel: (tabel_id) => dispatch(tryOpenCellsInTabel(tabel_id)),
    tryAddUserInTabel: (tabel_id, account_id) => dispatch(tryAddUserInTabel(tabel_id, account_id)),
    tryDeleteUserInTabel: (tabel_id, account_id) => dispatch(tryDeleteUserInTabel(tabel_id, account_id)),
    tryGetUsers: () => dispatch(tryGetUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabel)
