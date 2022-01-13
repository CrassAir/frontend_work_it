import {ConfigProvider, Form} from "antd";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import locale from "antd/lib/locale/ru_RU";

import {addProduct, editProduct} from "../../../store/action/catalogActions/productsActions";


const ProductsForm = (props) => {
    let data
    if (props.index >= 0) data = props.products[props.index]
    if (props.name) data = props

    console.log(data)
    const [selectUnit, setSelectUnit] = useState(data?.unit)

    const unit = ['Шт', 'Кг', 'г', 'л', 'м', 'м3', 'м2']

    // const normFile = (e) => {
    //     console.log('Upload event:', e)
    //     if (!e.file) return null
    //     uploadPriceFile(e.file)
    //
    //     if (Array.isArray(e)) {
    //         return e
    //     }
    //
    //     return e && e.fileList;
    // }

    return (
        <ConfigProvider locale={locale}>
            <Form
                className={'catalog_form'}
                onFinish={(values) => {
                    console.log(values)
                    if (!data) {
                        props.addProduct(values)
                    } else {
                        props.editProduct(data.id, values)
                    }
                    props.closeForm()
                }}
            >
                <Form.Item
                    name="name"
                    getValueProps={(e) => {
                    }}
                    initialValue={data?.name}
                    required
                >
                    <TextField
                        required
                        label="Наименование"
                        variant="standard"
                        defaultValue={data?.name}
                        fullWidth
                    />
                </Form.Item>
                <Form.Item
                    name="manufacturer"
                    getValueProps={(e) => {
                    }}
                    initialValue={data?.manufacturer}
                    required
                >
                    <TextField
                        required
                        label="Производитель"
                        variant="standard"
                        defaultValue={data?.manufacturer}
                        fullWidth
                    />
                </Form.Item>
                <Form.Item
                    name="feature"
                    getValueProps={(e) => {
                    }}
                    initialValue={data?.feature}
                    required
                >
                    <TextField
                        required
                        label="Характеристики"
                        variant="standard"
                        defaultValue={data?.feature}
                        fullWidth
                    />
                </Form.Item>
                <Form.Item
                    name="unit"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectUnit}
                >
                    <TextField label="Ед. измерения"
                               value={selectUnit ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectUnit(e.target.value)}
                    >
                        {unit.map(value => <MenuItem value={value} key={value}>{value}</MenuItem>)}
                    </TextField>
                </Form.Item>

                {/*<Form.Item label="Dragger">*/}
                {/*    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>*/}
                {/*        <Upload.Dragger name="files" customRequest={() => true}>*/}
                {/*            <p className="ant-upload-drag-icon">*/}
                {/*                <InboxOutlined/>*/}
                {/*            </p>*/}
                {/*            <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                {/*            <p className="ant-upload-hint">Support for a single or bulk upload.</p>*/}
                {/*        </Upload.Dragger>*/}
                {/*    </Form.Item>*/}
                {/*</Form.Item>*/}
                <Form.Item>
                    <Box sx={{mb: 2}}>
                        <Button
                            variant="contained"
                            color={'success'}
                            type={'submit'}
                            sx={{mt: 1, mr: 1}}
                        >
                            {data ? 'Изменить' : 'Создать'}
                        </Button>
                    </Box>
                </Form.Item>
            </Form>
        </ConfigProvider>
    )
}

const mapStateToProps = (state) => ({
    products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
    addProduct: (values) => dispatch(addProduct(values)),
    editProduct: (id, values) => dispatch(editProduct(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsForm)