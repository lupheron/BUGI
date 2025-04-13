import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from "../../../assets/css/index.module.css";

function AloneSign() {
    const navigate = useNavigate();

    const handleLogin = (values) => {
        axios.post('http://bugi.test/api/alone-sign', values)
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("alone_username", res.data.name);
                    navigate('/mainpage');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    };

    return (
        <div className={css.register_container}>
            <Form
                className={css.auth_form}
                layout="vertical"
                onFinish={handleLogin}
            >
                <h1>Login</h1>

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

                <Form.Item style={{ marginTop: '20px' }}>
                    <Button type="primary" htmlType="submit" block>
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AloneSign;