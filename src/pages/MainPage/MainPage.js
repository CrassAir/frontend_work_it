import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {AppBar, Toolbar, Button, Tabs, Tab} from '@mui/material'
import {Outlet, useNavigate} from "react-router-dom"
import LinearProgress from "@mui/material/LinearProgress"
import {authCheckState, getAccount, logout} from "../../store/action/authActions"
import {useLocation} from "react-router"
import {cleanup} from "@testing-library/react"
import {getWsLiveDataUrl} from "../../api/urls";


const MainPage = (props) => {
    const listAdminUrl = ['/calendar', '/catalog', '/row', '/tabel', '/order']
    const listUrl = ['/tabel', '/order']

    const [tabVal, setTabVal] = useState(0)
    const [activeList, setActiveList] = useState(listUrl)
    const [webSocket, setWebSocket] = useState(null)
    const navigate = useNavigate()
    let location = useLocation()

    const connect = () => {
        let ws = new WebSocket(getWsLiveDataUrl())
        let timeout = 500
        let connectInterval

        ws.onopen = () => {
            console.log("connected websocket main component")
            setWebSocket(ws)
            clearTimeout(connectInterval)
        };

        ws.onmessage = ev => {
            let data = JSON.parse(ev.data)
            console.log(data)
            // if (data.logoff === props.user.username) {
            //     props.logout()
            //     return
            // }
            if (data.account_change === props.user.username) {
                props.getAccount(props.user.username)
            }
        }

        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (timeout) / 1000
                )} second.`
            );

            connectInterval = setTimeout(() => {
                if (!webSocket || webSocket.readyState === WebSocket.CLOSED) connect()
            }, Math.min(10000, timeout))
        };

        ws.onerror = err => {
            console.error(
                "Socket encountered error",
                "Closing socket"
            );

            ws.close();
        };
    };

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
        connect()
        return () => {
            webSocket?.close()
            cleanup()
        }
    }, [])


    const onSelectTab = (_, index) => {
        setTabVal(index)
        navigate(activeList[index])
    }

    const tabOnRules = () => {
        if (!props.user) return null
        let rules = props.user.rules_template_account

        if (rules.can_make_order) {
            return <Tab label="Заказы" index={1}/>
        }
    }

    if (props.user.is_admin || props.user.is_superuser) {
        return (
            <div>
                <AppBar position="static" color='inherit'>
                    <Toolbar>
                        <Tabs value={tabVal} sx={{flexGrow: 1}} onChange={onSelectTab}>
                            <Tab label="Планировщик задач" index={0}/>
                            <Tab label="Справочник" index={1}/>
                            <Tab label="Ряды" index={2}/>
                            <Tab label="Табель" index={3}/>
                            <Tab label="Заказы" index={4}/>
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
                        {tabOnRules()}
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
    logout: () => dispatch(logout()),
    authCheckState: () => dispatch(authCheckState()),
    getAccount: (username) => dispatch(getAccount(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

