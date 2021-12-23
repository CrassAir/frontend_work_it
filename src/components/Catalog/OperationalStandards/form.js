import {ConfigProvider, DatePicker, Form, Modal, Space, Tooltip} from "antd";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {choices} from "./body";
import MenuItem from "@mui/material/MenuItem";
import {getGreenhouses} from "../../../store/action/locationActions";
import {getCrops, getHybrids} from "../../../store/action/catalogActions/catalogActions";
import {
    addTechnologicalPeriod,
    editTechnologicalPeriod
} from "../../../store/action/catalogActions/technologicalPeriodsActions";
import locale from "antd/lib/locale/ru_RU";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";


const TechnologicalPeriodForm = (props) => {
    let data
    if (props.index >= 0) data = props.technologicalPeriods[props.index]

    useEffect(() => {
        if (!props.greenhouses) props.getGreenhouses()
        if (!props.crops) props.getCrops()
        if (!props.hybrids) props.getHybrids()
    }, [])

    const [selectType, setSelectType] = useState(data?.type)
    const [selectGreenhouse, setSelectGreenhouse] = useState(data?.greenhouse?.id)
    const [selectCrops, setSelectCrops] = useState(data?.crop?.id)
    const [selectHybrids, setSelectHybrids] = useState(data?.hybrid?.id)

    // const [visibleModal, setVisibleModal] = useState(false)

    if (!props.greenhouses || !props.crops || !props.hybrids) return null

    // const actionBtn = (value) => {
    //     return <Space direction={"horizontal"} className={'send_btn'}>
    //         <Tooltip title={'Редактировать'} placement={"bottom"}>
    //             <IconButton className={'add_btn'} variant={'contained'} size={'small'}
    //                         onClick={() => setVisibleModal(value)}><EditIcon/></IconButton>
    //         </Tooltip>
    //         <Tooltip title={'Создать'} placement={"bottom"}>
    //             <IconButton className={'add_btn'} variant={'contained'} size={'small'} color={'success'}
    //                         onClick={() => setVisibleModal(value)}><AddIcon/></IconButton>
    //         </Tooltip>
    //     </Space>
    // }

    // const formModal = () => {
    //     const component = {
    //         name: 'greenhouse', form: ''
    //     }
    //     const closeModal = () => {
    //         setVisibleModal(false)
    //     }
    //     return (
    //         <Modal
    //             // title="Basic Modal"
    //             visible={visibleModal}
    //             onCancel={closeModal}
    //             maskClosable closable footer={null}
    //         >
    //             <p>Some contents...</p>
    //             <p>Some contents...</p>
    //             <p>Some contents...</p>
    //         </Modal>
    //     )
    // }

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
                    name="greenhouse"
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
                        {props.greenhouses.map(value => <MenuItem value={value.id}
                                                                  key={value.id}>{value.name}</MenuItem>)}
                    </TextField>
                </Form.Item>
                <Form.Item
                    name="crop"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectCrops}
                >
                    <TextField label="Культура"
                               value={selectCrops ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectCrops(e.target.value)}
                    >
                        {props.crops.map(value => <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>)}
                    </TextField>
                </Form.Item>
                <Form.Item
                    name="hybrid"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectHybrids}
                >
                    <TextField label="Гибрид"
                               value={selectHybrids ?? ''}
                               variant="standard" fullWidth select required
                               onChange={(e) => setSelectHybrids(e.target.value)}
                    >
                        {props.hybrids.map(value => <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>)}
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
})

const mapDispatchToProps = (dispatch) => ({
    getGreenhouses: () => dispatch(getGreenhouses()),
    getCrops: () => dispatch(getCrops()),
    getHybrids: () => dispatch(getHybrids()),
    addTechnologicalPeriod: (values) => dispatch(addTechnologicalPeriod(values)),
    editTechnologicalPeriod: (id, values) => dispatch(editTechnologicalPeriod(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TechnologicalPeriodForm)