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
import SimpleBar from "simplebar-react";
import {deleteProduct, getProducts} from "../../../store/action/catalogActions/productsActions";
import ProductsForm from "./form";

const ProductsBody = (props) => {
    const [editData, setEditData] = useState(-1)
    const [newData, setNewData] = useState(false)


    useEffect(() => {
        props.getProducts()
    }, [])

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
                        props.deleteProduct(props.products[index].id)
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
                <ProductsForm index={editData} closeForm={closeForm}/>
            </>
        )
    }

    if (newData) {
        return (
            <>
                <Button className={'add_btn'} variant={'text'}
                        size={'small'} onClick={() => setNewData(false)}>Назад</Button>
                <ProductsForm closeForm={closeForm}/>
            </>
        )
    }

     if (!props.products) return null

    console.log(props.products)
    return (
        <Box>
            <Button className={'add_btn'} variant={'text'} startIcon={<AddIcon/>}
                    size={'small'} onClick={() => setNewData(true)}>Добавить</Button>
            <TableContainer component={Box} className={'tabel_container'}>
                <SimpleBar style={{maxHeight: '100%'}}>
                    <Table size={'small'} stickyHeader={true} sx={{minWidth: 650}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Наименование</TableCell>
                                <TableCell>Производитель</TableCell>
                                <TableCell>Харакстеристики</TableCell>
                                <TableCell>Еденица измерения</TableCell>
                                <TableCell align={'right'}>Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.products.map((val, index) => (
                                <TableRow key={index}>
                                    <TableCell scope="row">{val.name}</TableCell>
                                    <TableCell scope="row">{val.manufacturer}</TableCell>
                                    <TableCell scope="row">{val.feature}</TableCell>
                                    <TableCell scope="row">{val.unit}</TableCell>
                                    <TableCell align={'right'} scope="row">{actionsBtn(index)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SimpleBar>
            </TableContainer>
        </Box>
    )
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(getProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsBody)
