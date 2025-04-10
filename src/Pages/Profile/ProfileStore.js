import { create } from "zustand";
import { Button, Space } from "antd";

export const useProfile = create((set, get) => ({
    boxes: [],
    section: [],
    selectedProduct: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

    columns: [
        {
            title: 'Fullname',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Uskunalar',
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