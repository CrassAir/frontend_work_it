import './App.less';
import 'simplebar/dist/simplebar.min.css';

import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import MainPage from './pages/MainPage/MainPage';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import {authCheckState, logout} from './store/action/authActions';
import CalendarTasks from "./components/CalendarTasks/CalendarTasks";
import RowTasks from "./components/RowTasks/RowTasks";
import Tabel from "./components/Tabel/Tabel";
import ChangePassword from "./pages/LoginPage/ChangePassword";


const App = (props) => {
    const location = useLocation()

    useEffect(() => {
        props.authCheckState()
    }, [])

    const routes = () => {
        if (location.pathname === '/logout') {
            props.logout()
            return <Navigate replace to={'login'}/>
        }
        if (props.token === null) {
            return (
                <Routes>
                    <Route path={'*'} element={<Navigate replace to={'login'}/>}/>
                    <Route exact path="login" element={<LoginPage/>}/>
                </Routes>
            )
        }
        if (!props.user) return null
        if (props.user.is_admin || props.user.is_superuser) {
            return (
                <Routes>
                    <Route exact path="login" element={<Navigate to={'/'}/>}/>
                    <Route exact path="change_password" element={<Navigate to={'/'}/>}/>
                    <Route path="/" element={<MainPage/>}>
                        <Route path="calendar" element={<CalendarTasks/>}/>
                        <Route path="row" element={<RowTasks/>}/>
                        <Route path="tabel" element={<Tabel/>}/>
                    </Route>
                </Routes>
            )
        }
        if (props.user.change_password) {
            return (
                <Routes>
                    <Route path={'*'} element={<Navigate replace to={'change_password'}/>}/>
                    <Route exact path="change_password" element={<ChangePassword />}/>
                </Routes>
            )
        }
        return (
                <Routes>
                    <Route exact path="login" element={<Navigate to={'/'}/>}/>
                    <Route exact path="change_password" element={<Navigate to={'/'}/>}/>
                    <Route path="/" element={<MainPage/>}>
                        <Route path="tabel" element={<Tabel/>}/>
                    </Route>
                </Routes>
        )
    }

    return (
            <div className="App">
                {routes()}
            </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.token,
    user: state.user,
    error: state.error,
})

const mapDispatchToProps = dispatch => ({
    authCheckState: () => dispatch(authCheckState()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)