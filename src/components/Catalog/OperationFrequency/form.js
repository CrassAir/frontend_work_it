import {Form} from "antd";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import React from "react";
import {
    addOperationFrequency,
    editOperationFrequency
} from "../../../store/action/catalogActions/operationFrequencyActions";

const OperationFrequencyForm = (props) => {
    let data
    if (props.index >= 0) data =  props.operationsFrequency[props.index]
    return (
        <Form
            className={'catalog_form'}
            onFinish={(values) => {
                if (!data) {
                    props.addOperationFrequency(values)
                } else {
                    props.editOperationFrequency(data.id, values)
                }
                props.closeForm()
            }}
        >
            <Form.Item
                name="name"
                getValueProps={(e) => {
                }}
                required={true}
                initialValue={data?.name}
            >
                <TextField
                    required
                    label="Категория операции"
                    variant="standard"
                    defaultValue={data?.name}
                    fullWidth
                />
            </Form.Item>
             <Form.Item
                name="step"
                getValueProps={(e) => {
                }}
                required={true}
                initialValue={data?.step}
            >
                <TextField
                    required
                    label="Шаг отступа"
                    variant="standard"
                    defaultValue={data?.step}
                    fullWidth
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
                        {data ? 'Изменить' : 'Создать'}
                    </Button>
                </Box>
            </Form.Item>
        </Form>
    )
}

const mapStateToProps = (state) => ({
     operationsFrequency: state.operationsFrequency,
})

const mapDispatchToProps = (dispatch) => ({
    addOperationFrequency: (values) => dispatch(addOperationFrequency(values)),
    editOperationFrequency: (id, values) => dispatch(editOperationFrequency(id, values))
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationFrequencyForm)