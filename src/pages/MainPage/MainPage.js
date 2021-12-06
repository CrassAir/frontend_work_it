import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {AppBar, Toolbar, Button, Tabs, Tab} from '@mui/material'
import {Outlet, useNavigate} from "react-router-dom"
import {getGreenhouses} from "../../store/action/locationActions";
import LinearProgress from "@mui/material/LinearProgress";
import {logout} from "../../store/action/authActions";
import {useLocation} from "react-router";
import {cleanup} from "@testing-library/react";


const MainPage = (props) => {
    const listAdminUrl = ['/calendar', '/row', '/tabel']
    const listUrl = ['/tabel']

    const [tabVal, setTabVal] = useState(0)
    const [activeList, setActiveList] = useState(listUrl)
    const navigate = useNavigate()
    let location = useLocation();

    useEffect(() => {
        let aList = listUrl
        if (props.user.is_admin || props.user.is_superuser) {
            aList = listAdminUrl
            setActiveList(listAdminUrl)
        }
        if (location.pathname !== '/') {
            setTabVal(aList.indexOf(location.pathname))
        } else {
            navigate(aList[0])
        }
        props.getGreenhouses()
    }, [])


    const onSelectTab = (_, index) => {
        setTabVal(index)
        navigate(activeList[index])
    }

    if (props.user.is_admin || props.user.is_superuser) {
        return (
            <div>
                <AppBar position="static" color='inherit'>
                    <Toolbar>
                        <Tabs value={tabVal} sx={{flexGrow: 1}} onChange={onSelectTab}>
                            <Tab label="Планировщик задач" index={0}/>
                            <Tab label="Ряды" index={1}/>
                            <Tab label="Табель" index={2}/>
                        </Tabs>
                        <Button color="inherit" onClick={() => {
                            props.logout()
                            cleanup()
                        }}>Выход</Button>
                    </Toolbar>
                    {props.loading ? <LinearProgress/> : <div style={{height: 4}}/>}
                </AppBar>
                <Outlet/>
            </div>
        )
    }

    return (
        <div>
            <AppBar position="static" color='inherit'>
                <Toolbar>
                    <Tabs value={tabVal} sx={{flexGrow: 1}} onChange={onSelectTab}>
                        <Tab label="Табель" index={0}/>
                    </Tabs>
                    <Button color="inherit" onClick={() => props.logout()}>Выход</Button>
                </Toolbar>
                {props.loading ? <LinearProgress/> : <div style={{height: 4}}/>}
            </AppBar>
            <Outlet/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    getGreenhouses: () => dispatch(getGreenhouses()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

