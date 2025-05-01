import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';
import { useCalStore } from './CalStore';
import dayjs from 'dayjs';

const ReminderForm = ({ visible, setVisible, fam_id }) => {
    const [form] = Form.useForm();
    const createReminder = useCalStore(state => state.createReminder);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                title: values.title,
                date: values.date.format('YYYY-MM-DD'),
                fam_id,
            };
            await createReminder(payload);
            setVisible(false);
            form.resetFields();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal title="New Reminder" open={visible} onCancel={() => setVisible(false)} onOk={handleOk}>
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReminderForm;
