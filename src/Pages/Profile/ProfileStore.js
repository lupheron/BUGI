import { create } from "zustand";
import { Button, message, Space } from "antd";
import axios from "axios";

export const useProfile = create((set, get) => ({
    family: [],
    family_mem: [],

    getFamily: () => {
        axios.get("http://bugi.test/api/families")
            .then(res => {
                set({ family: res.data });
            }).catch(error => {
                console.log(error)
            })
    },

    handleEdit: (values) => {
        if (!values.id) {
            message.error("Cannot update: Missing family ID");
            return;
        }

        const updateData = {
            primary_username: values.primary_username,
            email: values.email,
        };

        if (values.password) {
            updateData.password = values.password;
        }

        if (values.img) {
            updateData.img = values.img;
        }

        axios.put(`http://bugi.test/api/families/${values.id}`, updateData)
            .then((response) => {
                message.success("Family updated successfully");
                get().getFamily();
                get().getFamilyMem();
            })
            .catch((error) => {
                console.error("Error updating family:", error);
                message.error("Failed to update family");
            });
    },

    getFamilyMem: () => {
        axios.get("http://bugi.test/api/family-members")
            .then(res => {
                set({ family_mem: res.data });
            }).catch(error => {
                console.log(error)
            })
    },

    columns: [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tools',
            key: 'actions',
            width: 100,
            render: (_, box) => (
                <Space>
                    <Button onClick={() => get().handleEdit(box)}>✏️</Button>
                    <Button danger onClick={() => get().handleDelete(box.id)}>🗑️</Button>
                </Space>
            )
        }
    ],
}));