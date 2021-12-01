import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {AppBar, Toolbar, Button, Tabs, Tab} from '@mui/material'
import {Outlet, useNavigate} from "react-router-dom"
import {getGreenhouses} from "../../store/action/locationActions";


const MainPage = (props) => {
    const [tabVal, setTabVal] = useState(2)
    const navigate = useNavigate()

    const listUrl = ['calendar', 'row', 'tabel']

    useEffect(() => {
        navigate(listUrl[2])
        props.getGreenhouses()
    }, [])


    const onSelectTab = (_, index) => {
        setTabVal(index)
        navigate(listUrl[index])
    }

    return (
        <div>
            <AppBar position="static" color='inherit'>
                <Toolbar>
                    <Tabs value={tabVal} sx={{flexGrow: 1}} onChange={onSelectTab}>
                        <Tab label="Планировщик задач" index={0}/>
                        <Tab label="Ряды" index={1}/>
                        <Tab label="Табель" index={2}/>
                    </Tabs>
                    <Button color="inherit">Выход</Button>
                </Toolbar>
            </AppBar>
            <Outlet/>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    getGreenhouses: () => dispatch(getGreenhouses())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

