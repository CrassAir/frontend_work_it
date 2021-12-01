import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Col, ConfigProvider, DatePicker, Form, Input, Row, Space, Tooltip} from "antd";
import {getTabels, trySendCellsData} from "../../store/action/tabelActions";
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
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";


const Tabel = (props) => {
    const now = moment()
    const yesterday = now.subtract(1, 'day')
    const [dayInMonth, setDayInMonth] = useState(now.daysInMonth())
    const [month, setMonth] = useState(now)
    const [data, setData] = useState([])
    const [selectTabel, setSelectTabel] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!props.tabels) return
        if (props.tabels?.length === 0) {
            setData([])
        }
        changeData(props.tabels)
    }, [props.tabels])

    useEffect(() => {
        setLoading(true)
        props.getTabels(month.toISOString())
    }, [month])

    const changeData = (data) => {
        setTimeout(() => {
            // setMonth(moment(props.tabels[0].date_create))
            // setDayInMonth(moment(props.tabels[0].date_create).daysInMonth())
            setData(data)
            setSelectTabel(data[0])
            setLoading(false)
            setTimeout(() => document.getElementsByClassName('now')[0]?.scrollIntoView({
                inline: "center",
                behavior: "smooth"
            }), 1000)
        }, 300)
    }

    const removeEmpty = (obj) => {
        Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
        return obj;
    };

    const setCellClassName = (index) => {
        if (month.month() === yesterday.month() && yesterday.date() === index + 1) return 'now'
        if ([6, 7].includes(moment(month).day(index + 1).isoWeekday())) return 'weekend'
    }

    const generateTabel = () => {
        if (!selectTabel) return null
        if (loading) return <Paper className={'loading_paper'}><LinearProgress/></Paper>
        return (
            <Form
                onFinish={values => {
                    removeEmpty(values)
                    props.trySendCellsData(values)
                }}
            >
                <Paper className={'tabel_container'}>
                    {selectTabel.department_name}
                    <Button className={'send_btn'} variant={'contained'} type={'submit'}>Отправить</Button>
                    <TableContainer component={Paper}>
                        <Table size={'small'} className={'tabel_table'} stickyHeader={true} sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Сотрудник</TableCell>
                                    <TableCell align="center">Табельный номер</TableCell>
                                    <TableCell align="center">Должность</TableCell>
                                    {Array.from({length: dayInMonth}, (_, index) => (
                                        <TableCell
                                            className={setCellClassName(index)}
                                            align="center">{index + 1}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? 'loading' :
                                    selectTabel.cells.map((row) => (
                                        <TableRow>
                                            <TableCell className={'fixed'} component={'th'}
                                                       scope="row">{row.full_name}</TableCell>
                                            <TableCell align="center">{row.employee_code}</TableCell>
                                            <TableCell align="center">{row.post}</TableCell>
                                            {Array.from({length: dayInMonth}, (_, index) => {
                                                let data = row.cells[index]
                                                if (data?.can_edit) {
                                                    return <TableCell
                                                        className={setCellClassName(index)}
                                                        align="center">
                                                        <Form.Item style={{width: 40, margin: 'auto'}}
                                                                   initialValue={data.hours_manual}
                                                                   name={data.pk} getValueProps={e => {
                                                        }}>
                                                            <Input style={{padding: 2, textAlign: 'center'}}
                                                                   maxLength={2}
                                                                   size="small"/>
                                                        </Form.Item>
                                                    </TableCell>
                                                }
                                                return <TableCell
                                                    className={setCellClassName(index)}
                                                    align="center">
                                                    <Space direction={"vertical"}>
                                                        <Tooltip title={'Фактические часы'}
                                                                 placement={"right"}>{data?.hours_manual}</Tooltip>
                                                        <Tooltip title={'Часы перко'}
                                                                 placement={"right"}>{data?.hours_perco}</Tooltip>
                                                    </Space>
                                                </TableCell>
                                            })}
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Form>
        )
    }

    return (
        <Row gutter={16} className={'calendar_row'}>
            <Col span={4}>
                <Paper className={'paper'}>
                    {loading ? <LinearProgress /> : <div style={{height: 4}}/>}
                    <MenuList>
                        <MenuItem sx={{marginBottom: 3}}>
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
                        {loading ? null :
                            data.map(tabel => {
                                return <MenuItem onClick={() => setSelectTabel(tabel)}>
                                    <Typography noWrap>{tabel.department_name}</Typography>
                                </MenuItem>
                            })
                        }
                    </MenuList>
                </Paper>
            </Col>
            <Col span={20}>
                {generateTabel()}
            </Col>
        </Row>
    )
}


const mapStateToProps = (state) => ({
    tabels: state.tabels,
})

const mapDispatchToProps = (dispatch) => ({
    getTabels: (dateTime) => dispatch(getTabels(dateTime)),
    trySendCellsData: (cells) => dispatch(trySendCellsData(cells)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabel)
