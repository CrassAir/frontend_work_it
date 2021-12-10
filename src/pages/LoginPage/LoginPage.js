import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {authLogin} from '../../store/action/authActions'
import {Form, Card} from 'antd'
import {useSnackbar} from "notistack";


const LoginPage = (props) => {
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (props.error) {
            enqueueSnackbar(props.error.response.data.detail, {variant: 'error'});
        }
    }, [props.error])

    return (
        <Card className={'login_card'}>
            <Form
                onFinish={(values) => {
                    props.auth(values.username, values.password)
                }}
            >
                <Form.Item
                    name="username"
                    getValueProps={(e) => {}}
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
                    getValueProps={(e) => {}}
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
    )
}

const mapStateToProps = (state) => ({
    error: state.error
})

const mapDispatchToProps = (dispatch) => ({
    auth: (username, password) => dispatch(authLogin(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
