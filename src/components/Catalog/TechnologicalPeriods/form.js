import {ConfigProvider, DatePicker, Form} from "antd";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {getGreenhouses} from "../../../store/action/locationActions";
import {getCrops, getHybrids, getVegetationPhases} from "../../../store/action/catalogActions/catalogActions";
import {
    addTechnologicalPeriod,
    editTechnologicalPeriod
} from "../../../store/action/catalogActions/technologicalPeriodsActions";
import locale from "antd/lib/locale/ru_RU";
import moment from "moment";
import {choices, phaseChoice} from "../Catalog";


const TechnologicalPeriodForm = (props) => {
    let data
    if (props.index >= 0) data = props.technologicalPeriods[props.index]

    useEffect(() => {
        if (!props.greenhouses) props.getGreenhouses()
        if (!props.crops) props.getCrops()
        if (!props.hybrids) props.getHybrids()
        if (!props.vegetationPhases) props.getVegetationPhases()
    }, [])

    const [selectType, setSelectType] = useState(data?.type)
    const [selectGreenhouse, setSelectGreenhouse] = useState(data?.greenhouse?.id)
    const [selectCrop, setSelectCrop] = useState(data?.crop?.id)
    const [selectHybrid, setSelectHybrid] = useState(data?.hybrid?.id)
    const [selectVegetationPhase, setSelectVegetationPhase] = useState(data?.phase?.id)

    return (
        <ConfigProvider locale={locale}>
            <Form
                className={'catalog_form'}
                onFinish={(values) => {
                    console.log(values)
                    if (!data) {
                        props.addTechnologicalPeriod(values)
                    } else {
                        props.editTechnologicalPeriod(data.id, values)
                    }
                    props.closeForm()
                }}
            >
                <Form.Item
                    name="date_time_start"
                    required
                    rules={[{required: true, message: 'Пожалуйста введите дату начала перода!'}]}
                    initialValue={data?.date_time_start ? moment(data?.date_time_start) : null}
                >
                    <DatePicker
                        style={{width: '100%'}}
                        format={'DD-MM-YYYY'}
                    />
                </Form.Item>
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
                    name="type"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectType}
                >
                    <TextField label="Тип периода"
                               value={selectType ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectType(e.target.value)}
                    >
                        {Object.keys(choices).map(value => <MenuItem value={value}
                                                                     key={value}>{choices[value]}</MenuItem>)}
                    </TextField>
                </Form.Item>
                <Form.Item
                    name="greenhouse_id"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectGreenhouse}
                >
                    <TextField label="Теплица"
                               value={selectGreenhouse ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectGreenhouse(e.target.value)}
                    >
                        {props.greenhouses ?
                            props.greenhouses.map(value => <MenuItem value={value.id}
                                                                     key={value.id}>{value.name}</MenuItem>)
                            : <MenuItem value=''/>}
                    </TextField>
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
                        {props.vegetationPhases ?
                            props.vegetationPhases.map(value => <MenuItem value={value.id}
                                                                          key={value.id}>{phaseChoice[value.name]}</MenuItem>)
                            : <MenuItem value=''/>}
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
                        {props.crops ?
                            props.crops.map(value => <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>)
                            : <MenuItem value=''/>}
                    </TextField>
                </Form.Item>
                <Form.Item
                    name="hybrid_id"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectHybrid}
                >
                    <TextField label="Гибрид"
                               value={selectHybrid ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectHybrid(e.target.value)}
                    >
                        {props.hybrids ?
                            props.hybrids.map(value => <MenuItem value={value.id}
                                                                 key={value.id}>{value.name}</MenuItem>)
                            : <MenuItem value=''/>}
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
    technologicalPeriods: state.technologicalPeriods,
    greenhouses: state.greenhouses,
    crops: state.crops,
    hybrids: state.hybrids,
    vegetationPhases: state.vegetationPhases,
})

const mapDispatchToProps = (dispatch) => ({
    getGreenhouses: () => dispatch(getGreenhouses()),
    getCrops: () => dispatch(getCrops()),
    getHybrids: () => dispatch(getHybrids()),
    getVegetationPhases: () => dispatch(getVegetationPhases()),
    addTechnologicalPeriod: (values) => dispatch(addTechnologicalPeriod(values)),
    editTechnologicalPeriod: (id, values) => dispatch(editTechnologicalPeriod(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TechnologicalPeriodForm)