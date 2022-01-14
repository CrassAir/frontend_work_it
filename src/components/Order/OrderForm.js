import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {Form, Input, Select} from "antd";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import SimpleBar from "simplebar-react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React, {useState} from "react";
import {addProduct, editProduct} from "../../store/action/catalogActions/productsActions";
import {connect} from "react-redux";

const OrderForm = (props) => {
    const [newOrderProd, setNewOrderProd] = useState([])
    return (
        <Paper className={'tabel_container'}>
            <Typography noWrap>Новый заказ</Typography>
            <Form className={'order_form'}
                  onFinish={(values) => {
                      console.log(values)
                  }} autoComplete="off">
                <Form.List name="products">
                    {(fields, {add, remove}) => {
                        return (
                            <TableContainer component={Box}>
                                <SimpleBar style={{maxHeight: '100%'}}>
                                    <Table size={'small'} stickyHeader={true} sx={{minWidth: 650}}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell/>
                                                <TableCell>Позиция</TableCell>
                                                <TableCell>Наименование</TableCell>
                                                <TableCell>Производитель</TableCell>
                                                <TableCell>Харакстеристики</TableCell>
                                                <TableCell>Количество</TableCell>
                                                <TableCell>Ед. изм</TableCell>
                                                <TableCell>Комментарий</TableCell>
                                                <TableCell>Крайний срок</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {fields.map(({key, name, ...restField}) => {
                                                let product = newOrderProd.find(val => val.key === key)?.value
                                                return <TableRow key={'tr_' + key}>
                                                    <TableCell><IconButton
                                                        onClick={() => remove(name)}><RemoveIcon/></IconButton></TableCell>
                                                    <TableCell>{name + 1}</TableCell>
                                                    <TableCell>
                                                        <Form.Item
                                                            name={[name, 'catalog_id']}
                                                        >
                                                            <Select
                                                                showSearch
                                                                placeholder="Товар"
                                                                onSelect={(inx) => {
                                                                    let prod = newOrderProd.find(val => val.key === key)
                                                                    if (prod) prod.value = props.products.find(val => val.id === inx)
                                                                    else newOrderProd.push({
                                                                        key: key,
                                                                        value: props.products.find(val => val.id === inx)
                                                                    })
                                                                    setNewOrderProd([...newOrderProd])
                                                                }}
                                                                filterOption={(input, option) =>
                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                {props.products?.map(val => (<Select.Option
                                                                    key={val.id} value={val.id}>
                                                                    {val.name}
                                                                </Select.Option>))}
                                                            </Select>
                                                        </Form.Item>
                                                    </TableCell>
                                                    <TableCell>{product?.manufacturer}</TableCell>
                                                    <TableCell>{product?.feature}</TableCell>
                                                    <TableCell>
                                                        <Form.Item
                                                            name={[name, 'count']}
                                                        >
                                                            <Input style={{padding: 2, textAlign: 'center'}}
                                                                   maxLength={10}
                                                                   type={"number"}
                                                                   size="small"
                                                            />
                                                        </Form.Item>
                                                    </TableCell>
                                                    <TableCell>{product?.unit}</TableCell>
                                                    <TableCell>
                                                        <Form.Item
                                                            name={[name, 'comment']}
                                                        >
                                                            <Input style={{padding: 2, textAlign: 'center'}}
                                                                   maxLength={10}
                                                                   size="small"
                                                            />
                                                        </Form.Item>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Form.Item
                                                            name={[name, 'deadline']}
                                                        >
                                                            <Input style={{padding: 2, textAlign: 'center'}}
                                                                   maxLength={10}
                                                                   size="small"
                                                            />
                                                        </Form.Item>
                                                    </TableCell>

                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                    <Button className={'add_field_btn'}
                                            startIcon={<AddIcon/>}
                                            fullWidth
                                            onClick={() => add()}>
                                        Добавить товар
                                    </Button>
                                </SimpleBar>
                            </TableContainer>
                        )
                    }}
                </Form.List>
                <Form.Item>
                    <Button variant={'contained'} color={'success'}
                            type={'submit'}>На согласование</Button>
                </Form.Item>
            </Form>
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
    addProduct: (values) => dispatch(addProduct(values)),
    editProduct: (id, values) => dispatch(editProduct(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)