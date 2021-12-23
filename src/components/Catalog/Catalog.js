import React, {useState} from 'react'
import {connect} from 'react-redux'
import Splitter, {SplitDirection} from "@devbookhq/splitter";
import {MenuItem, MenuList, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import OperationCategoryBody from "./OperationCategory/body";
import OperationFrequencyBody from "./OperationFrequency/body";
import TechnologicalPeriodBody from "./TechnologicalPeriods/body";
import TechnologicalOperationsBody from "./TechnologicalOperations/body";
import OperationalStandardBody from "./OperationalStandards/body";

export const choices = {сultivation: 'Оборот', liquidation: 'Ликвидация', repairs: 'Ремонт', other: 'Другое'}
export const phaseChoice = {
    "fruiting": 'Плодоношение',
    "vegetation": 'Вегетация',
    "seedling": 'Рассада',
    "liquidation": 'Ликвидация'
}

const Catalog = (props) => {
    const [selectedCatalog, setSelectedCatalog] = useState(0)
    const [initSplitter] = useState([20, 80])

    const menuItem = [
        {title: 'Категория операций', body: <OperationCategoryBody/>},
        {title: 'Частоты выполнения операции', body: <OperationFrequencyBody/>},
        {title: 'Технологические периоды', body: <TechnologicalPeriodBody/>},
        {title: 'Нормы выполнения операции', body: <OperationalStandardBody/>},
        {title: 'Технологические операции', body: <TechnologicalOperationsBody/>},
    ]

    const generateMenuItem = () => {
        return menuItem.map((item, index) => (
            <MenuItem
                selected={selectedCatalog === index}
                key={index}
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
