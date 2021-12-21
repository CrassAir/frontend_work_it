import {Form, Popconfirm, Space, Tooltip} from "antd";
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
import {TextField} from "@mui/material";
import React, {useState} from "react";


export const corpsForm = (value) => {
    return (
        <Form
            onFinish={(values) => {
                console.log(values)
            }}
        >
            <Form.Item
                name="title"
                getValueProps={(e) => {
                }}
                required={true}
                initialValue={value}
            >
                <TextField
                    required
                    label="Культура"
                    variant="standard"
                    defaultValue={value}
                    // fullWidth
                />
            </Form.Item>
            <Form.Item>
                <Box sx={{mb: 2}}>
                    <Button
                        variant="contained"
                        color={'success'}
                        type={'submit'}
                        sx={{mt: 1, mr: 1}}
                    >
                        {value ? 'Изменить' : 'Создать'}
                    </Button>
                </Box>
            </Form.Item>
        </Form>
    )
}

const CropsBody = (props) => {
    const [editData, setEditData] = useState(-1)
    const [newData, setNewData] = useState(false)
    const [data, setData] = useState([1, 2, 3, 4])

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
                        data.splice(index, 1);
                        setData([...data])
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

    if (editData >= 0) {
        return (
            <>
                <Button className={'add_btn'} variant={'text'}
                        size={'small'} onClick={() => setEditData(-1)}>Назад</Button>
                {corpsForm(data[editData])}
            </>
        )
    }

    if (newData) {
        return (
            <>
                <Button className={'add_btn'} variant={'text'}
                        size={'small'} onClick={() => setNewData(false)}>Назад</Button>
                {corpsForm()}
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
                                <TableCell className={'fixed'}>Культура</TableCell>
                                <TableCell className={'fixed'}>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((val, index) => (
                                <TableRow>
                                    <TableCell className={'fixed'} component={'th'}
                                               scope="row">{val}</TableCell>
                                    <TableCell className={'fixed'} component={'th'}
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

export default CropsBody