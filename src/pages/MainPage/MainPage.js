import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {AppBar, Toolbar, Button, Tabs, Tab} from '@mui/material'
import {Outlet, useNavigate} from "react-router-dom"


const MainPage = (props) => {
    const [tabVal, setTabVal] = useState(1)
    const navigate = useNavigate()

    const listUrl = ['calendar', 'row', 'other2']

    useEffect(() => {
        navigate(listUrl[1])
    }, [])


    const onSelectTab = (_, index) => {
        navigate(listUrl[index])
        setTabVal(index)
    }

    return (
        <div>
            <AppBar position="static" color='inherit'>
                <Toolbar>
                    <Tabs value={tabVal} sx={{flexGrow: 1}} onChange={onSelectTab}>
                        <Tab label="Планировщик задач" index={0}/>
                        <Tab label="Ряды" index={1}/>
                        <Tab label="Item Three" index={2}/>
                    </Tabs>
                    <Button color="inherit">Выход</Button>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

