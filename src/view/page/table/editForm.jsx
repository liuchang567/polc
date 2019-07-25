import React from 'react';
import { Form, Radio, Input } from 'antd';

class editForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 20 }
            },
        };
        const { getFieldDecorator } = this.props.form;
        const data = this.props.data;
        return (
            <Form {...formItemLayout} >
                <Form.Item label="username">
                    {getFieldDecorator('username', {
                        initialValue: data.username,
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            placeholder="Username"
                            className="index-input"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="age">
                    {getFieldDecorator('age', {
                        initialValue: data.age,
                        rules: [{ required: true, message: 'Please input your age!' }],
                    })(
                        <Input
                            placeholder="age"
                            className="index-input"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="sex">
                    {getFieldDecorator('sex', {
                        initialValue: data.sex + '',
                        rules: [{ required: true, message: 'Please input your sex!' }],
                    })(
                        <Radio.Group>
                            <Radio value="1">man</Radio>
                            <Radio value="2">woman</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item>
                <Form.Item label="address">
                    {getFieldDecorator('address', {
                        initialValue: data.address,
                        rules: [{ required: true, message: 'Please input your address!' }],
                    })(
                        <Input
                            placeholder="address"
                            className="index-input"
                        />,
                    )}
                </Form.Item>
            </Form>
        );
    }
}

const EditForm = Form.create()(editForm);


export default EditForm