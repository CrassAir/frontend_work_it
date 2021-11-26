import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
    Button, ButtonGroup,
    Card,
    CardActionArea,
} from "@mui/material";
import {Space} from "antd";

const RowTasks = (props) => {
    const [startSelect, setStartSelect] = useState(false)
    const [startDeselect, setStartDeselect] = useState(false)
    const [paperList, setPaperList] = useState([])
    const [selectedRow, setSelectedRow] = useState([])

    useEffect(() => {
        if (paperList.length > 0) return
        for (let i = 1; i < 73; i++) {
            paperList.push({index: i, title: i})
        }
        setPaperList([...paperList])
    }, [])

    useEffect(() => {
        if (props.sendSelectRow) props.sendSelectRow(selectedRow)
    }, [selectedRow])

    const rowGen = () => {
        let rows = []
        let className = 'g_row'
        for (let i = 0; i < paperList.length; i++) {
            if (selectedRow.includes(paperList[i].index)) {
                className = 'g_row selected'
            } else {
                className = 'g_row'
            }
            rows.push(
                <Card className={className} elevation={3} key={'g_row_' + i}
                      onMouseDown={(e) => onStartSelect(e, paperList[i].index)}
                      onMouseEnter={(e) => onSelect(e, paperList[i].index)}>
                    <CardActionArea>
                        <div>
                            <span>{paperList[i].title}</span>
                        </div>
                    </CardActionArea>
                </Card>
            )
        }
        return rows
    }

    const onStartSelect = (e, i) => {
        if (selectedRow.includes(i)) {
            setStartDeselect(true)
            selectedRow.splice(selectedRow.indexOf(i), 1)
            setSelectedRow([...selectedRow])
            return
        }
        setStartSelect(true)
        selectedRow.push(i)
        setSelectedRow([...selectedRow])
    }

    const onSelect = (e, i) => {
        if (startDeselect && selectedRow.includes(i)) {
            selectedRow.splice(selectedRow.indexOf(i), 1)
            setSelectedRow([...selectedRow])
            return
        }
        if (startSelect && !selectedRow.includes(i)) {
            selectedRow.push(i)
            setSelectedRow([...selectedRow])
        }
    }

    const selectRowByCount = (startIndex, endIndex) => {
        for (startIndex; startIndex <= endIndex; startIndex++) {
            if (!selectedRow.includes(startIndex)) {
                selectedRow.push(startIndex)
            }
        }
        setSelectedRow([...selectedRow])
    }

    return (
        <Space direction={'vertical'} align={'end'}>
            <div className={'main_grid'} onMouseUp={() => {
                setStartSelect(false)
                setStartDeselect(false)
            }}>
                {rowGen()}
            </div>
            <ButtonGroup variant="contained">
                <Button onClick={() => selectRowByCount(1, 18)}>
                    1 - 18
                </Button>
                <Button onClick={() => selectRowByCount(19, 36)}>
                    19 - 36
                </Button>
                <Button onClick={() => selectRowByCount(37, 54)}>
                    37 - 54
                </Button>
                <Button onClick={() => selectRowByCount(55, 72)}>
                    55 - 72
                </Button>
                <Button color={selectedRow.length > 0 ? 'error' : 'primary'}
                        onClick={() => {
                            if (selectedRow.length > 0) {
                                setSelectedRow([])
                                return
                            }
                            setSelectedRow([...paperList.map(value => value.index)])
                        }}>
                    {selectedRow.length > 0 ? 'Отменить' : 'Выбрать все'}
                </Button>
            </ButtonGroup>
        </Space>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(RowTasks)
