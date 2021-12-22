import {Popconfirm, Space, Tooltip} from "antd";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    deleteTechnologicalPeriod,
    getTechnologicalPeriods
} from "../../../store/action/catalogActions/technologicalPeriodsActions";
import TechnologicalPeriodForm from "./form";
import moment from "moment";

export const choices = {сultivation: 'Оборот', liquidation: 'Ликвидация', repairs: 'Ремонт', other: 'Другое'}

const TechnologicalPeriodBody = (props) => {
    const [editData, setEditData] = useState(-1)
    const [newData, setNewData] = useState(false)


    useEffect(() => {
        props.getTechnologicalPeriods()
    }, [])

    if (!props.technologicalPeriods) return null

    const actionsBtn = (index) => {
        return <Space direction={"horizontal"} className={'send_btn'}>
            <Tooltip title={'Редактировать'} placement={"bottom"}>
                <IconButton className={'add_btn'} variant={'contained'} size={'small'}
                            onClick={() => setEditData(index)}><EditIcon/></IconButton>
            </Tooltip>
            <Tooltip title={'Удалить'} placement={"bottom"}>
                <Popconfirm
                    title="Вы уверены что хотите удалить культуру?"
                    onConfirm={() => {
                        // data.splice(index, 1);
                        // setData([...data])
                        props.deleteTechnologicalPeriod(props.technologicalPeriods[index].id)
                    }}
                    okText="Да"
                    cancelText="Нет"
                >
                    <IconButton className={'add_btn'} variant={'contained'} color={'error'}
                                size={'small'}><DeleteIcon/></IconButton>
                </Popconfirm>
            </Tooltip>
        </Space>
    }

    const closeForm = () => {
        setEditData(-1)
        setNewData(false)
    }

    if (editData >= 0) {
        return (
            <>
                <Button className={'add_btn'} variant={'text'}
                        size={'small'} onClick={() => setEditData(-1)}>Назад</Button>
                <TechnologicalPeriodForm index={editData} closeForm={closeForm}/>
            </>
        )
    }

    if (newData) {
        return (
            <>
                <Button className={'add_btn'} variant={'text'}
                        size={'small'} onClick={() => setNewData(false)}>Назад</Button>
                <TechnologicalPeriodForm closeForm={closeForm}/>
            </>
        )
    }

    console.log(props.technologicalPeriods)
    return (
        <>
            <Button className={'add_btn'} variant={'text'} startIcon={<AddIcon/>}
                    size={'small'} onClick={() => setNewData(true)}>Добавить</Button>
            <TableContainer component={Box}>
                <Table size={'small'} stickyHeader={true} sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Наименование</TableCell>
                            <TableCell>Тип периода</TableCell>
                            <TableCell>Теплица</TableCell>
                            <TableCell>Гибрид</TableCell>
                            <TableCell>Начало периода</TableCell>
                            <TableCell>Культура</TableCell>
                            <TableCell align={'right'}>Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.technologicalPeriods.map((val, index) => (
                            <TableRow key={index}>
                                <TableCell scope="row">{val.name}</TableCell>
                                <TableCell scope="row">{choices[val.type]}</TableCell>
                                <TableCell scope="row">{val.greenhouse?.name}</TableCell>
                                <TableCell scope="row">{val.hybrid?.name}</TableCell>
                                <TableCell
                                    scope="row">{moment(val.date_time_start).format('DD-MM-YYYY')}</TableCell>
                                <TableCell scope="row">{val.crop?.name}</TableCell>
                                <TableCell align={'right'} scope="row">{actionsBtn(index)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    technologicalPeriods: state.technologicalPeriods
})

const mapDispatchToProps = (dispatch) => ({
    getTechnologicalPeriods: () => dispatch(getTechnologicalPeriods()),
    deleteTechnologicalPeriod: (id) => dispatch(deleteTechnologicalPeriod(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TechnologicalPeriodBody)
