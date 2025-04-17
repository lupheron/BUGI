import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';

function Edit({ isEditing, handleClose, selectedItem, handleUpdate }) {
    const [form] = useForm();

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                id: selectedItem.id, // Ensure ID is set
                name: selectedItem.name
            });
        }
    }, [selectedItem]);
    return (
        <div>
            <Modal width={800} open={isEditing} onCancel={handleClose} footer={false} title="Tahrirlash">
                <Form
                    onFinish={(values) => {
                        handleUpdate(values);
                        form.resetFields();
                    }}
                    layout="vertical"
                    form={form}
                >
                    <Row gutter={16}>
                        <Form.Item hidden name={'id'}>
                            <Input />
                        </Form.Item>
                        <Col span={8}>
                            <Form.Item name="name" label="Member's Name" rules={[{ required: true, message: "Name is required" }]}>
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Save</Button>
                        <Button style={{ marginLeft: "10px" }} onClick={handleClose}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Edit;