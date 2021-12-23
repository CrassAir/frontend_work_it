import {ConfigProvider, DatePicker, Form} from "antd";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {getCrops, getVegetationPhases} from "../../../store/action/catalogActions/catalogActions";
import locale from "antd/lib/locale/ru_RU";
import moment from "moment";
import {choices, phaseChoice} from "../Catalog";


const OperationalStandardForm = (props) => {
    let data
    if (props.index >= 0) data = props.technologicalPeriods[props.index]

    useEffect(() => {
        if (!props.crops) props.getCrops()
        if (!props.vegetationPhases) props.getVegetationPhases()
    }, [])

    const [selectCrop, setSelectCrop] = useState(data?.crop?.id)
    const [selectVegetationPhase, setSelectVegetationPhase] = useState(data?.phase?.id)

    if (!props.crops || !props.vegetationPhases) return null

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
                    name="phase"
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
                    name="crop"
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
    crops: state.crops,
    vegetationPhases: state.vegetationPhases,
})

const mapDispatchToProps = (dispatch) => ({
    getCrops: () => dispatch(getCrops()),
    getVegetationPhases: () => dispatch(getVegetationPhases()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OperationalStandardForm)