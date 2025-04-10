import React from 'react';
import { Form, Input, Button } from 'antd';
import css from "../../../assets/css/index.module.css";

function SignIn() {
    const handleLogin = (values) => {
        console.log("Logging in with:", values);
        // You can add your login logic here (e.g., API call)
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

export default SignIn;
