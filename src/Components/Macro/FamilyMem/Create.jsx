import { Button, Form, Input, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

function Create({ isCreating, handleClose, handleCreate }) {
    const [form] = useForm();

    return (
        <div>
            <Modal width={800} open={isCreating} onCancel={handleClose} footer={false} title="Adding a family member">
                <Form
                    onFinish={(values) => {
                        handleCreate(values);
                        form.resetFields();
                    }}
                    layout="vertical"
                    form={form}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="name" label="Family Member's Name" rules={[{ required: true, message: "Name is required" }]}>
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

export default Create;