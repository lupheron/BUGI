import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import css from "../../../assets/css/index.module.css"

const { Option } = Select;

function Register() {
    const [members, setMembers] = useState([]);

    const handleAddMember = () => {
        setMembers([...members, { key: members.length }]);
    };

    const handleRemoveMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const handleStatusChange = (value) => {
        if (value === 'Single') {
            setMembers([]); // Clear members if "Single" is selected
        } else if (value === 'Family') {
            // Add at least two family member inputs when "Family" is selected
            setMembers([{ key: 0 }, { key: 1 }]);
        }
    };

    return (
        <div className={css.register_container}>
            <Form className={css.auth_form} layout="vertical">
                <h1>Register</h1>
                <Form.Item
                    label="Primary User's Name"
                    name="name"
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
                    rules={[
                        { required: true, message: 'Please enter your password!' },
                        { type: 'email', message: 'Please enter a valid password!' },
                    ]}
                >
                    <Input placeholder="Enter your password" />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    initialValue="Single"
                >
                    <Select onChange={handleStatusChange}>
                        <Option value="Single">Single</Option>
                        <Option value="Family">Family</Option>
                    </Select>
                </Form.Item>

                {members.map((member, index) => (
                    <Form.Item
                        key={member.key}
                        label={`Family Member ${index + 1}`}
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

                {members.length > 0 && (
                    <Button type="dashed" onClick={handleAddMember} block>
                        <PlusCircleOutlined style={{ color: "blue" }} /> Add Member
                    </Button>
                )}

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