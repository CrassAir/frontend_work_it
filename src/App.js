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
import {SnackbarProvider} from "notistack";
import Catalog from "./components/Catalog/Catalog";
import Order from "./components/Order/Order";
import Wiki from "./components/Wiki/Wiki";


const App = (props) => {
    const location = useLocation()

    useEffect(() => {
        props.authCheckState()
    }, [])

    const routesOnRules = () => {
        if (!props.user) return null
        let rules = props.user.rules_template_account
        let route = []
        if (rules.can_make_order) {
            route.push(<Route path="order" element={<Order/>}>
                <Route path=":orderId" element={<Order/>}/>
            </Route>)
        }
        return route
    }

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
                        <Route path="catalog" element={<Catalog/>}/>
                        <Route path="row" element={<RowTasks/>}/>
                        <Route path="tabel" element={<Tabel/>}/>
                        <Route path="order" element={<Order/>}>
                            <Route path=":orderId" element={<Order/>}/>
                        </Route>
                        <Route path="wiki" element={<Wiki/>}>
                            <Route path=":docId" element={<Wiki/>}/>
                        </Route>
                    </Route>
                </Routes>
            )
        }
        if (props.user.change_password) {
            return (
                <Routes>
                    <Route path={'*'} element={<Navigate replace to={'change_password'}/>}/>
                    <Route exact path="change_password" element={<ChangePassword/>}/>
                </Routes>
            )
        }
        return (
            <Routes>
                <Route exact path="login" element={<Navigate to={'/'}/>}/>
                <Route exact path="change_password" element={<Navigate to={'/'}/>}/>
                <Route path="/" element={<MainPage/>}>
                    <Route path="tabel" element={<Tabel/>}/>
                    {routesOnRules()}
                </Route>
            </Routes>
        )
    }

    return (
        <SnackbarProvider maxSnack={3}>
            <div className="App">
                {routes()}
            </div>
        </SnackbarProvider>
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