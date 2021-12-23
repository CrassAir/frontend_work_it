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
    deleteOperationCategory,
    getOperationsCategory
} from "../../../store/action/catalogActions/operationCategoryActions";
import OperationCategoryForm from "./form";


const OperationCategoryBody = (props) => {
    const [editData, setEditData] = useState(-1)
    const [newData, setNewData] = useState(false)

    useEffect(() => {
        props.getOperationsCategory()
    }, [])

    if (!props.operationsCategory) return null

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
                        props.deleteOperationCategory(props.operationsCategory[index].id)
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
                <OperationCategoryForm index={editData} closeForm={closeForm}/>
            </>
        )
    }

    if (newData) {
        return (
            <>
                <Button className={'add_btn'} variant={'text'}
                        size={'small'} onClick={() => setNewData(false)}>Назад</Button>
                <OperationCategoryForm closeForm={closeForm}/>
            </>
        )
    }

    return (
        <>
            <Button className={'add_btn'} variant={'text'} startIcon={<AddIcon/>}
                    size={'small'} onClick={() => setNewData(true)}>Добавить</Button>
            <TableContainer component={Box} className={'tabel_container'}>
                <SimpleBar style={{maxHeight: '100%'}}>
                    <Table size={'small'} className={'tabel_table'} stickyHeader={true} sx={{minWidth: 650}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Наименование</TableCell>
                                <TableCell align={'right'}>Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.operationsCategory.map((val, index) => (
                                <TableRow key={index}>
                                    <TableCell scope="row">{val.name}</TableCell>
                                    <TableCell align={'right'} scope="row">{actionsBtn(index)}</TableCell>
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
    operationsCategory: state.operationsCategory,
})

const mapDispatchToProps = (dispatch) => ({
    getOperationsCategory: () => dispatch(getOperationsCategory()),
    deleteOperationCategory: (id) => dispatch(deleteOperationCategory(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationCategoryBody)
