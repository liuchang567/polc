import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import './login.less'
import TipBox from '../../../utils/tipbox'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAxios } from '../../../utils/api'

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.isLogging = false;
    }

    componentDidMount() {
        TipBox.box('success', '登录账号', 'admin && 123456');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.isLogging = true;
                getAxios('/api/login', { username:values.username, password:values.password })
                .then( (response) => {
                    if (response.data.code === '200') {
                        sessionStorage.setItem('userName', values.username);
                        this.isLogging = false;
                        let toPath = this.props.toPath === '' ?  '/home' :  this.props.toPath;
                        this.props.history.push(toPath);
                    } else {
                        TipBox.box('warning', '登录失败', response.data.msg)
                    }
                }).catch(function (error) {
                    TipBox.box('warning', '登录失败', '数据异常!')
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        // const userInfo = this.props.userInfo;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            className="index-input"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            className="index-input"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox className="mr-lt50">Remember me</Checkbox>)}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const loginState = ({ loginState }) => ({
	toPath: loginState.toPath
})

export default withRouter(connect(
		loginState
)(WrappedNormalLoginForm))