import React, {useState} from 'react'
import {connect} from 'react-redux'
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import {MenuItem, MenuList, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import CropsBody from "./Crops";
import OperationCategoryBody from "./OperationCategory";


const Catalog = (props) => {
    const [selectedCatalog, setSelectedCatalog] = useState(0)
    const [initSplitter] = useState([20, 80])

    const operationFrequencyBody = () => {
        console.log('operationFrequencyBody')
    }

    const operationalStandardsBody = () => {
        console.log('operationalStandardsBody')
    }

    const technologicalOperationsBody = () => {
        console.log('technologicalOperationsBody')
    }

    const technologicalPeriodsBody = () => {
        console.log('technologicalPeriodsBody')
    }


    const menuItem = [
        {title: 'Культуры', body: <CropsBody/>},
        {title: 'Категория операций', body:  <OperationCategoryBody/>},
        {title: 'Частоты выполнения операции', body: operationFrequencyBody},
        {title: 'Нормы выполнения операции', body: operationalStandardsBody},
        {title: 'Технологические операции', body: technologicalOperationsBody},
        {title: 'Технологические периоды', body: technologicalPeriodsBody},
    ]

    const generateMenuItem = () => {
        return menuItem.map((item, index) => (
            <MenuItem
                selected={selectedCatalog === index}
                onClick={() => {
                    setSelectedCatalog(index)
                }}>
                <Typography noWrap>{item.title}</Typography></MenuItem>
        ))
    }

    return (
        <div className={'main_catalog'}>
            <Splitter direction={SplitDirection.Horizontal}
                      gutterClassName="custom-gutter-horizontal"
                      draggerClassName="custom-dragger-horizontal"
                      initialSizes={initSplitter}
                      minWidths={[200, 700]}
            >
                <Paper className={'paper'}>
                    <MenuList>
                        {generateMenuItem()}
                    </MenuList>
                </Paper>
                <Paper className={'center_paper'}>
                    {menuItem[selectedCatalog].body}
                </Paper>
            </Splitter>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
