import {ConfigProvider, Form, Modal, Space, Tooltip, Upload} from "antd";
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
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {
    addTechnologicalOperation,
    editTechnologicalOperation
} from "../../../store/action/catalogActions/technologicalOperationsActions";
import OperationalStandardForm from "../OperationalStandards/form";
import OperationCategoryForm from "../OperationCategory/form";
import {InboxOutlined} from "@material-ui/icons";
import {uploadPriceFile} from "../../../api/api";


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

    const [visibleModal, setVisibleModal] = useState(false)

    const actionBtn = (value) => {
        return <Tooltip title={'Создать'} placement={"bottom"}>
            <IconButton className={'add_btn'} variant={'contained'} size={'small'} color={'success'}
                        onClick={() => setVisibleModal(value)}><AddIcon/></IconButton>
        </Tooltip>
    }

    const formModal = () => {
        const closeModal = () => {
            setVisibleModal(false)
        }
        const component = {
            'standards': {
                title: 'Норма выполнения операции',
                form: <OperationalStandardForm closeForm={closeModal}/>
            },
            'category': {
                title: 'Категория операции',
                form: <OperationCategoryForm closeForm={closeModal}/>
            }
        }
        if (!visibleModal) return null
        return (
            <Modal
                title={component[visibleModal].title}
                visible={visibleModal}
                onCancel={closeModal}
                maskClosable closable footer={null}
            >
                {component[visibleModal].form}
            </Modal>
        )
    }

    const normFile = (e) => {
        console.log('Upload event:', e)
        if (!e.file) return null
        uploadPriceFile(e.file)

        if (Array.isArray(e)) {
            return e
        }

        return e && e.fileList;
    }

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
                <Space>
                    <Form.Item
                        name="category_id"
                        getValueProps={(e) => {
                        }}
                        required
                        initialValue={selectСategory}
                    >
                        <TextField label="Категория операции"
                                   value={selectСategory ?? ''}
                                   variant="standard" sx={{width: 260}} select required
                                   onChange={(e) => setSelectCategory(e.target.value)}
                        >
                            {props.operationsCategory ?
                                props.operationsCategory.map(value => <MenuItem value={value.id}
                                                                                key={value.id}>{value.name}</MenuItem>)
                                : <MenuItem value=''/>}
                        </TextField>
                    </Form.Item>
                    {actionBtn('category')}
                </Space>
                <Space>
                    <Form.Item
                        name="standards_id"
                        getValueProps={(e) => {
                        }}
                        required
                        initialValue={selectStandard}
                    >
                        <TextField label="Норма выполнения операции"
                                   value={selectStandard ?? ''}
                                   variant="standard" sx={{width: 260}} select required
                                   onChange={(e) => setSelectStandard(e.target.value)}
                        >
                            {props.operationalStandards ?
                                props.operationalStandards.map(value => <MenuItem value={value.id}
                                                                                  key={value.id}>{value.name}</MenuItem>)
                                : <MenuItem value=''/>}
                        </TextField>
                    </Form.Item>
                    {actionBtn('standards')}
                </Space>
                <Form.Item
                    name="goal"
                    getValueProps={(e) => {
                    }}
                    required
                    initialValue={selectStandard}
                >
                    <TextField label="Норма выполнения операции"
                               type={'number'}
                               variant="standard"
                               fullWidth
                    />
                </Form.Item>
                <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" customRequest={() => true}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
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
            {formModal()}
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