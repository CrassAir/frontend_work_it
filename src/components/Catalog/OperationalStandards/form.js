import {ConfigProvider, Form} from "antd";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {getCrops, getVegetationPhases} from "../../../store/action/catalogActions/catalogActions";
import locale from "antd/lib/locale/ru_RU";
import {phaseChoice} from "../Catalog";
import {getTechnologicalPeriods} from "../../../store/action/catalogActions/technologicalPeriodsActions";
import {getOperationsFrequency} from "../../../store/action/catalogActions/operationFrequencyActions";
import {
    addOperationalStandard,
    editOperationalStandard
} from "../../../store/action/catalogActions/operationalStandardsActions";


const OperationalStandardForm = (props) => {
    let data
    if (props.index >= 0) data = props.operationalStandards[props.index]

    useEffect(() => {
        if (!props.crops) props.getCrops()
        if (!props.vegetationPhases) props.getVegetationPhases()
        if (!props.technologicalPeriods) props.getTechnologicalPeriods()
        if (!props.operationsFrequency) props.getOperationsFrequency()
    }, [])

    const [selectCrop, setSelectCrop] = useState(data?.crop?.id)
    const [selectVegetationPhase, setSelectVegetationPhase] = useState(data?.phase?.id)
    const [selectPeriod, setSelectPeriod] = useState(data?.period?.id)
    const [selectFrequency, setSelectFrequency] = useState(data?.frequency?.id)

    if (!props.crops || !props.vegetationPhases || !props.technologicalPeriods || !props.operationsFrequency) return null

    return (
        <ConfigProvider locale={locale}>
            <Form
                className={'catalog_form'}
                onFinish={(values) => {
                    console.log(values)
                    if (!data) {
                        props.addOperationalStandard(values)
                    } else {
                        props.editOperationalStandard(data.id, values)
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
                    name="phase_id"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectVegetationPhase}
                >
                    <TextField label="Фаза вегетации"
                               value={selectVegetationPhase ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectVegetationPhase(e.target.value)}
                    >
                        {props.vegetationPhases.map(value => <MenuItem value={value.id}
                                                                       key={value.id}>{phaseChoice[value.name]}</MenuItem>)}
                    </TextField>
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
                    name="frequency_id"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectFrequency}
                >
                    <TextField label="Частота выполнения операции"
                               value={selectFrequency ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectFrequency(e.target.value)}
                    >
                        {props.operationsFrequency.map(value => <MenuItem value={value.id}
                                                                          key={value.id}>{value.name}</MenuItem>)}
                    </TextField>
                </Form.Item>
                <Form.Item
                    name="period_id"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectPeriod}
                >
                    <TextField label="Технологический период"
                               value={selectPeriod ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectPeriod(e.target.value)}
                    >
                        {props.technologicalPeriods.map(value => <MenuItem value={value.id}
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
    operationalStandards: state.operationalStandards,
    technologicalPeriods: state.technologicalPeriods,
    operationsFrequency: state.operationsFrequency,
    crops: state.crops,
    vegetationPhases: state.vegetationPhases,
})

const mapDispatchToProps = (dispatch) => ({
    getCrops: () => dispatch(getCrops()),
    getVegetationPhases: () => dispatch(getVegetationPhases()),
    getTechnologicalPeriods: () => dispatch(getTechnologicalPeriods()),
    getOperationsFrequency: () => dispatch(getOperationsFrequency()),
    addOperationalStandard: (values) => dispatch(addOperationalStandard(values)),
    editOperationalStandard: (id, values) => dispatch(editOperationalStandard(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationalStandardForm)