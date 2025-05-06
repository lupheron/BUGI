import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import { useCalStore } from './CalStore';

const ReminderForm = ({ visible, setVisible, fam_id }) => {
    const [form] = Form.useForm();
    const [familyMembers, setFamilyMembers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    const createReminder = useCalStore(state => state.createReminder);

    useEffect(() => {
        if (fam_id) {
            axios.get(`http://bugi.test/api/family-members?fam_id=${fam_id}`)
                .then(res => setFamilyMembers(res.data));
        }
    }, [fam_id]);

    const fetchCategories = (memberId) => {
        setSelectedMember(memberId);
        axios.get(`http://bugi.test/api/fam-category/by-member?member_id=${memberId}`)
            .then(res => setCategories(res.data));
    };

    const onFinish = async (values) => {
        const payload = {
            fam_id,
            fam_mem_id: values.fam_mem_id,
            cat_id: values.cat_id,
            description: values.description,
            date: values.date.format('YYYY-MM-DD'),
        };
        try {
            await createReminder(payload);
            setVisible(false);
            form.resetFields();
        } catch (error) {
            console.error("Failed to create reminder:", error);
        }
    };

    return (
        <Modal
            title="New Reminder"
            open={visible}
            onCancel={() => setVisible(false)}
            onOk={() => form.submit()} // Triggers `onFinish`
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="fam_mem_id" label="Choose a family member" rules={[{ required: true, message: "Please select a family member" }]}>
                    <Select
                        showSearch
                        placeholder="Select member"
                        options={familyMembers.map(m => ({ label: m.name, value: m.id }))}
                        onChange={fetchCategories}
                    />
                </Form.Item>

                <Form.Item name="cat_id" label="Select Category" rules={[{ required: true, message: "Please select a category" }]}>
                    <Select
                        placeholder="Select category"
                        disabled={!selectedMember}
                        options={categories.map(cat => ({ label: cat.name, value: cat.id }))}
                    />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input.TextArea placeholder="Optional details" />
                </Form.Item>

                <Form.Item name="date" label="Date" rules={[{ required: true, message: "Date is required" }]}>
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReminderForm;
