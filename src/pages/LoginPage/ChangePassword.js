import React from 'react'
import {connect} from 'react-redux'
import {Form, Card} from "antd";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {changePassword} from "../../store/action/authActions";

const ChangePassword = (props) => {
    return (
        <Card className={'login_card'}>
            <Form
                onFinish={(values) => {
                    props.changePassword(props.user.username, values.password)
                }}
            >
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
                        variant="standard"
                        fullWidth
                    />

                </Form.Item>
                <Form.Item
                    name="password2"
                    getValueProps={(e) => {}}
                    dependencies={['password']}
                    required={true}
                    rules={[
                        {required: true, message: 'Please input your username!'},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <TextField
                        required
                        label="Подтверждение пароля"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='Submit' variant="contained">Сменить пароль</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}


const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    changePassword: (username, password) => dispatch(changePassword(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
