import {Form} from "antd";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
    addOperationCategory,
    editOperationCategory
} from "../../../store/action/catalogAction/operationCategoryActions";
import {connect} from "react-redux";
import React from "react";

const OperationCategoryForm = (props) => {
    let data
    if (props.index >= 0) data =  props.operationsCategory[props.index]
    return (
        <Form
            onFinish={(values) => {
                if (!data) {
                    props.addOperationCategory(values)
                } else {
                    props.editOperationCategory(data.id, values)
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
                        {data ? 'Изменить' : 'Создать'}
                    </Button>
                </Box>
            </Form.Item>
        </Form>
    )
}

const mapStateToProps = (state) => ({
     operationsCategory: state.operationsCategory,
})

const mapDispatchToProps = (dispatch) => ({
    addOperationCategory: (values) => dispatch(addOperationCategory(values)),
    editOperationCategory: (id, values) => dispatch(editOperationCategory(id, values))
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationCategoryForm)