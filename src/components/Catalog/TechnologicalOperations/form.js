import {ConfigProvider, Form} from "antd";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {getCrops} from "../../../store/action/catalogActions/catalogActions";
import locale from "antd/lib/locale/ru_RU";
import {
    getOperationalStandards
} from "../../../store/action/catalogActions/operationalStandardsActions";
import {getOperationsCategory} from "../../../store/action/catalogActions/operationCategoryActions";
import {
    addTechnologicalOperation,
    editTechnologicalOperation
} from "../../../store/action/catalogActions/technologicalOperationsActions";


const TechnologicalOperationsForm = (props) => {
    let data
    if (props.index >= 0) data = props.technologicalOperations[props.index]

    useEffect(() => {
        if (!props.crops) props.getCrops()
        if (!props.operationalStandards) props.getOperationalStandards()
        if (!props.operationsCategory) props.getOperationsCategory()
    }, [])

    const [selectCrop, setSelectCrop] = useState(data?.crop?.id)
    const [selectСategory, setSelectCategory] = useState(data?.category?.id)
    const [selectStandard, setSelectStandard] = useState(data?.standards?.id)

    if (!props.crops || !props.operationalStandards || !props.operationsCategory) return null

    return (
        <ConfigProvider locale={locale}>
            <Form
                className={'catalog_form'}
                onFinish={(values) => {
                    console.log(values)
                    if (!data) {
                        props.addTechnologicalOperation(values)
                    } else {
                        props.editTechnologicalOperation(data.id, values)
                    }
                    props.closeForm()
                }}
            >
                <Form.Item
                    name="name"
                    getValueProps={(e) => {
                    }}
                    initialValue={data?.name}
                >
                    <TextField
                        label="Наименование"
                        variant="standard"
                        defaultValue={data?.name}
                        fullWidth
                    />
                </Form.Item>
                <Form.Item
                    name="crop_id"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectCrop}
                >
                    <TextField label="Культура"
                               value={selectCrop ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectCrop(e.target.value)}
                    >
                        {props.crops.map(value => <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>)}
                    </TextField>
                </Form.Item>
                <Form.Item
                    name="category"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectСategory}
                >
                    <TextField label="Частота выполнения операции"
                               value={selectСategory ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectCategory(e.target.value)}
                    >
                        {props.operationsCategory.map(value => <MenuItem value={value.id}
                                                                          key={value.id}>{value.name}</MenuItem>)}
                    </TextField>
                </Form.Item>
                <Form.Item
                    name="standards"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectStandard}
                >
                    <TextField label="Технологический период"
                               value={selectStandard ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectStandard(e.target.value)}
                    >
                        {props.operationalStandards.map(value => <MenuItem value={value.id}
                                                                           key={value.id}>{value.name}</MenuItem>)}
                    </TextField>
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
        </ConfigProvider>
    )
}

const mapStateToProps = (state) => ({
    technologicalOperations: state.technologicalOperations,
    operationalStandards: state.operationalStandards,
    operationsCategory: state.operationsCategory,
    crops: state.crops,
})

const mapDispatchToProps = (dispatch) => ({
    getCrops: () => dispatch(getCrops()),
    getOperationalStandards: () => dispatch(getOperationalStandards()),
    getOperationsCategory: () => dispatch(getOperationsCategory()),
    addTechnologicalOperation: (values) => dispatch(addTechnologicalOperation(values)),
    editTechnologicalOperation: (id, values) => dispatch(editTechnologicalOperation(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TechnologicalOperationsForm)