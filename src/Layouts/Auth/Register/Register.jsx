import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import css from "../../../assets/css/index.module.css";
import { useAuth } from '../AuthStore';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from "react-router-dom";

function Register() {
    const { handleRegisterFam, status } = useAuth();
    const [members, setMembers] = useState([{ key: 0 }, { key: 1 }]);
    const [form] = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === "success") {
            message.success("Registration successful!");
            navigate("/fam-sign");
        } else if (status === "error") {
            message.error("Registration failed. Please try again.");
        }
    }, [status]);

    const handleAddMember = () => {
        setMembers([...members, { key: members.length }]);
    };

    const handleRemoveMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const onFinish = (values) => {
        const memberNames = members.map((_, index) => values[`member_${index}`]).filter(Boolean);
        const payload = {
            primary_username: values.primary_username,
            email: values.email,
            password: values.password,
            members: memberNames
        };
        handleRegisterFam(payload);
    };

    return (
        <div className={css.register_container}>
            <Form
                className={css.auth_form}
                layout="vertical"
                onFinish={onFinish}
                form={form}
            >
                <h1>Family Registration</h1>

                <Form.Item
                    label="Primary User's Name"
                    name="primary_username"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                    <Input placeholder="Enter your name" />
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

                {members.map((member, index) => (
                    <Form.Item
                        key={member.key}
                        label={`Family Member ${index + 1}`}
                        name={`member_${index}`}
                        rules={[{ required: true, message: 'Please enter the member name!' }]}
                    >
                        <Input
                            placeholder={`Enter name of family member ${index + 1}`}
                            addonAfter={
                                <Button
                                    type="text"
                                    danger
                                    onClick={() => handleRemoveMember(index)}
                                >
                                    Remove
                                </Button>
                            }
                        />
                    </Form.Item>
                ))}

                <Button type="dashed" onClick={handleAddMember} block>
                    <PlusCircleOutlined style={{ color: "blue" }} /> Add Member
                </Button>

                <Form.Item style={{ marginTop: '20px' }}>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;
