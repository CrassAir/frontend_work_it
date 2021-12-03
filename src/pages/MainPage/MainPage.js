import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {AppBar, Toolbar, Button, Tabs, Tab} from '@mui/material'
import {Outlet, useNavigate} from "react-router-dom"
import {getGreenhouses} from "../../store/action/locationActions";
import LinearProgress from "@mui/material/LinearProgress";
import {logout} from "../../store/action/authActions";
import {useLocation} from "react-router";


const MainPage = (props) => {
    const [tabVal, setTabVal] = useState(0)
    const navigate = useNavigate()
    let location = useLocation();

    const listUrl = ['/calendar', '/row', '/tabel']

    useEffect(() => {
        if (location.pathname !== '/'){
            setTabVal(listUrl.indexOf(location.pathname))
        } else {
            setTabVal(0)
            navigate(listUrl[0])
        }
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
                    <Button color="inherit" onClick={() => props.logout()}>Выход</Button>
                </Toolbar>
                {props.loading ? <LinearProgress/> : <div style={{height: 4}}/>}
            </AppBar>
            <Outlet/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
    getGreenhouses: () => dispatch(getGreenhouses()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

