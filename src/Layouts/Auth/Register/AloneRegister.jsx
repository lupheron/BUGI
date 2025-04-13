import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useAuth } from '../AuthStore';
import css from "../../../assets/css/index.module.css"

function AloneRegister() {

    const { handleRegisterAlone } = useAuth();
    const [form] = useForm();

    return (
        <div className={css.register_container}>
            <Form
                className={css.auth_form}
                layout="vertical"
                onFinish={(values) => {
                    values.status = "Single";
                    handleRegisterAlone(values);
                    form.resetFields();
                }}
                form={form}
            >
                <h1>Single User Registration</h1>

                <Form.Item
                    label="Your Name"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AloneRegister;