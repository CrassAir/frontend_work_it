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
    const [selectedRow, setSelectedRow] = useState(new Set())
    let timer;

    useEffect(() => {
        if (paperList.length > 0) return
        for (let i = 1; i < 73; i++) {
            paperList.push({index: i, title: i})
        }
        setPaperList([...paperList])
    }, [])

    useEffect(() => {
        if (props.sendSelectRow) props.sendSelectRow([...selectedRow])
    }, [selectedRow])

    const rowGen = () => {
        let rows = []
        let className = 'g_row'
        for (let i = 0; i < paperList.length; i++) {
            if (selectedRow.has(paperList[i].index)) {
                className = 'selected'
            } else {
                className = null
            }
            rows.push(
                <Card className={'g_row'} elevation={3} key={'g_row_' + i}
                      onMouseDown={(e) => onStartSelect(e, paperList[i].index)}
                      onMouseOver={(e) => onSelect(e, paperList[i].index)}>
                    <CardActionArea>
                        <div className={className}>
                            <span>{paperList[i].title}</span>
                        </div>
                    </CardActionArea>
                </Card>
            )
        }
        return rows
    }

    const onStartSelect = (e, i) => {
        if (selectedRow.has(i)) {
            setStartDeselect(true)
            selectedRow.delete(i)
            if (e.target.nodeName === "DIV") e.target.classList.remove('selected')
            return
        }
        if (e.target.nodeName === "DIV") e.target.classList.add('selected')
        setStartSelect(true)
        selectedRow.add(i)
    }

    const onSelect = (e, i) => {
        if (startDeselect && selectedRow.has(i)) {
            selectedRow.delete(i)
            if (e.target.nodeName === "DIV") e.target.classList.remove('selected')
            return
        }
        if (startSelect) {
            if (e.target.nodeName === "DIV") e.target.classList.add('selected')
            selectedRow.add(i)
        }
    }

    const selectRowByCount = (startIndex, endIndex) => {
        for (startIndex; startIndex <= endIndex; startIndex++) {
            if (!selectedRow.has(startIndex)) {
                selectedRow.add(startIndex)
            }
        }
        setSelectedRow(new Set(selectedRow))
    }

    return (
        <Space direction={'vertical'} align={'end'}>
            <div className={'main_grid'} onMouseUp={() => {
                setStartSelect(false)
                setStartDeselect(false)
                console.log(selectedRow)
                setSelectedRow(new Set(selectedRow))
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
                <Button color={selectedRow.size > 0 ? 'error' : 'primary'}
                        onClick={() => {
                            if (selectedRow.size > 0) {
                                setSelectedRow(new Set())
                                return
                            }
                            setSelectedRow(new Set(paperList.map(value => value.index)))
                        }}>
                    {selectedRow.size > 0 ? 'Отменить' : 'Выбрать все'}
                </Button>
            </ButtonGroup>
        </Space>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(RowTasks)
