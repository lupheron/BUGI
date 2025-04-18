import { Button, Form, Input, Modal, Row, Col, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';

function CreateCat({ isCreating, handleClose, handleCreate, selectedMember, currentCount }) {
    const [form] = useForm();

    useEffect(() => {
        if (isCreating && selectedMember) {
            form.setFieldsValue({
                member_name: selectedMember.name,
                member_id: selectedMember.id
            });
        } else if (!isCreating) {
            form.resetFields();
        }
    }, [isCreating, selectedMember]);

    const onFinish = (values) => {
        if (currentCount >= 3) {
            message.error("Maximum 3 categories allowed per member");
            return;
        }
        handleCreate(values);
    };

    return (
        <Modal
            width={800}
            open={isCreating}
            onCancel={handleClose}
            footer={false}
            title="Create a New Category"
            destroyOnClose
        >
            <Form
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Category Name"
                            rules={[{ required: true, message: "Category name is required!" }]}
                        >
                            <Input placeholder="Enter category name" />
                        </Form.Item>

                        <Form.Item
                            name="member_name"
                            label={`Family Member (${currentCount}/3)`}
                        >
                            <Input
                                readOnly
                                disabled
                                style={{
                                    color: 'rgba(0, 0, 0, 0.85)',
                                    backgroundColor: '#fafafa'
                                }}
                            />
                        </Form.Item>

                        <Form.Item name="member_id" hidden>
                            <Input type="hidden" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={currentCount >= 3}
                    >
                        Create Category
                    </Button>
                    <Button style={{ marginLeft: "10px" }} onClick={handleClose}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateCat;