import {Popconfirm, Space, Tooltip} from "antd";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import SimpleBar from "simplebar-react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    deleteOperationFrequency,
    getOperationsFrequency
} from "../../../store/action/catalogAction/operationFrequencyAction";
import OperationFrequencyForm from "./form";


const OperationFrequencyBody = (props) => {
    const [editData, setEditData] = useState(-1)
    const [newData, setNewData] = useState(false)

    useEffect(() => {
        props.getOperationsFrequency()
    }, [])

    if (!props.operationsFrequency) return null

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
                        props.deleteOperationFrequency(props.operationsFrequency[index].id)
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
                <OperationFrequencyForm index={editData} closeForm={closeForm} />
            </>
        )
    }

    if (newData) {
        return (
            <>
                <Button className={'add_btn'} variant={'text'}
                        size={'small'} onClick={() => setNewData(false)}>Назад</Button>
                <OperationFrequencyForm closeForm={closeForm} />
            </>
        )
    }

    return (
        <>
            <Button className={'add_btn'} variant={'text'} startIcon={<AddIcon/>}
                    size={'small'} onClick={() => setNewData(true)}>Добавить</Button>
            <TableContainer component={Box}>
                <SimpleBar style={{maxHeight: '100%'}}>
                    <Table size={'small'} className={'tabel_table'} stickyHeader={true} sx={{minWidth: 650}}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={'fixed'}>Наименование</TableCell>
                                <TableCell className={'fixed'}>Шаг отступа</TableCell>
                                <TableCell className={'fixed'}>Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.operationsFrequency.map((val, index) => (
                                <TableRow key={index}>
                                    <TableCell className={'fixed'}
                                               scope="row">{val.name}</TableCell>
                                    <TableCell className={'fixed'}
                                               scope="row">{val.step}</TableCell>
                                    <TableCell className={'fixed'}
                                               scope="row">{actionsBtn(index)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SimpleBar>
            </TableContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    operationsFrequency: state.operationsFrequency
})

const mapDispatchToProps = (dispatch) => ({
    getOperationsFrequency: () => dispatch(getOperationsFrequency()),
    deleteOperationFrequency: (id) => dispatch(deleteOperationFrequency(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationFrequencyBody)
