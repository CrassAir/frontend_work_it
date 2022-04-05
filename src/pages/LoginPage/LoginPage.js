import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {authLogin} from '../../store/action/authActions'
import {Form, Card} from 'antd'
import {useSnackbar} from "notistack";
import Loading from '../../components/Loading/Loading'

const LoginPage = (props) => {
    const {enqueueSnackbar} = useSnackbar()
    const {error, loading, auth} = props

    useEffect(() => {
        if (error) {
            if (error.response) {
                enqueueSnackbar(error.response.data.detail, {variant: 'error'});
            } else {
                console.log(error)
                enqueueSnackbar(error.toString(), {variant: 'error'});
            }
        }
    }, [error])

    return (
        <div>{loading ? <Loading/> : null}
            <Card className={'login_card'}>
                <Form
                    onFinish={(values) => {
                        auth(values.username, values.password)
                    }}
                >
                    <Form.Item
                        name="username"
                        getValueProps={(e) => {
                        }}
                        required={true}
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <TextField
                            required
                            label="Логин"
                            variant="standard"
                            fullWidth
                        />

                    </Form.Item>
                    <Form.Item
                        name="password"
                        getValueProps={(e) => {
                        }}
                        required={true}
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <TextField
                            required
                            label="Пароль"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type='Submit' variant="contained">Войти</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => ({
    error: state.error,
    loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
    auth: (username, password) => dispatch(authLogin(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
