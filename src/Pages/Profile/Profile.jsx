import React, { useEffect, useState } from 'react';
import Header from '../../Components/Micro/Header/Header';
import { Button, Form, Input, message, Table, Upload } from 'antd';
import { useProfile } from './ProfileStore';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import css from "../../assets/css/index.module.css"
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function Profile() {
    const { family, family_mem, getFamilyMem, getFamily, columns, handleEdit } = useProfile();
    const location = useLocation();
    const [form] = useForm();
    const [familyId, setFamilyId] = useState();
    const [imageUrl, setImageUrl] = useState(null);

    const props = {
        name: 'img',
        action: 'http://bugi.test/api/families/upload-img',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'done') {
                setImageUrl(info.file.response.url);
                message.success(`Image uploaded successfully`);
                // Hide the success message after 2 seconds
                setTimeout(() => message.destroy(), 2000);
            } else if (info.file.status === 'error') {
                message.error(`Image upload failed`);
            }
        },
        showUploadList: false, // This hides the file list
    };

    const expandedRowRender = (items) => (
        <Table
            columns={""}
            dataSource={items}
            pagination={false}
            rowKey={'id'}
        />
    );

    const generateBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter((p) => p);
        let fullPath = '';
        return paths.map((part, i) => {
            fullPath += `/${part}`;
            const name = part.charAt(0).toUpperCase() + part.slice(1);
            return (
                <span key={i}>
                    <Link to={fullPath} className={css.breadcrumbs}>{name}</Link>
                    {i < paths.length - 1 && ' / '}
                </span>
            );
        });
    };

    useEffect(() => {
        getFamily();
        getFamilyMem();
        const fam_id = localStorage.getItem("fam_id");
        if (fam_id) {
            setFamilyId(fam_id);
            form.setFieldsValue({ id: fam_id });
        }
    }, []);

    useEffect(() => {
        if (family.length > 0 && familyId) {
            const currentFamily = family.find(f => f.id == familyId);
            if (currentFamily) {
                form.setFieldsValue({
                    primary_username: currentFamily.primary_username,
                    email: currentFamily.email,
                });
                if (currentFamily.img) {
                    setImageUrl(`http://bugi.test/${currentFamily.img}`);
                }
            }
        }
    }, [family, familyId]);

    const handleFormSubmit = (values) => {
        handleEdit({
            ...values,
            img: imageUrl ? imageUrl.replace('http://bugi.test/', '') : null
        });
    };

    return (
        <div className={css.profile_page}>
            <Header />

            <header className={css.breadcrumb_nav}>
                <Link to="/" className={css.breadcrumbs}>Home</Link>
                {location.pathname !== '/' && ' / '}
                {generateBreadcrumbs()}
            </header>

            <main className={css.profile_main}>
                <h1 className={css.profile_title}>Hello Nuriddinov's Family</h1>

                <div className={css.settings_container}>
                    <div className={css.image_upload_container}>
                        <Upload {...props}>
                            <Button className={css.upload_image} icon={<UploadOutlined />}>
                                Click to upload
                            </Button>
                        </Upload>
                    </div>

                    <div className={css.settings_form}>
                        <Form
                            onFinish={handleFormSubmit}
                            style={{ width: '350px' }}
                            layout="vertical"
                            form={form}
                        >
                            <h1 style={{ textAlign: "center" }}>
                                Family settings
                            </h1>

                            <Form.Item hidden name="id">
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Your Name"
                                name="primary_username"
                                rules={[{ required: true, message: 'Please enter your username!' }]}
                            >
                                <Input placeholder="Enter a primary_username" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' },
                                ]}
                            >
                                <Input placeholder="Enter an email" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: false }]}
                            >
                                <Input.Password placeholder="Enter a new password (optional)" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Save Changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <div className={css.profile_table}>
                    <h1>Members of Family</h1>
                    <Table
                        rowKey={'id'}
                        columns={columns}
                        dataSource={family_mem}
                        bordered
                    />
                </div>
            </main>
        </div>
    );
}

export default Profile;