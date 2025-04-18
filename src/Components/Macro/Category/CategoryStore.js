import { create } from "zustand";
import { Button, message, Space } from "antd";
import axios from "axios";

export const useCategory = create((set, get) => ({
    category: [],
    selectedcategory: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

    columns: [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Family category',
            dataIndex: "name",
            key: "name"
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

    getCategory: () => {
        axios.get(`http://bugi.test/api/fam-category`)
            .then(res => {
                set({ category: res.data });
            }).catch(error => {
                console.log(error)
            })
    },

    handleEdit: (fam_mem) => {
        // console.log("Editing product:", wh); // Debugging: Log the product being edited
        set({ selectedcategory: fam_mem, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        const fam_id = localStorage.getItem("fam_id");
        if (!fam_id || !values.id) {
            message.error("Missing required IDs");
            return;
        }

        axios.put(`http://bugi.test/api/fam-category/${values.id}`, {
            name: values.name // Only send the name to update
        })
            .then(() => {
                message.success("category updated successfully");
                get().getFamilyMem(fam_id); // Refresh the list
                set({ isEditing: false });
            })
            .catch(error => {
                console.error("Update error:", error);
                message.error("Failed to update category");
            });
    },

    handleDelete: (id) => {
        const fam_id = localStorage.getItem("fam_id");
        axios.delete(`http://bugi.test/api/fam-category/${id}?fam_id=${fam_id}`)
            .then(() => get().getFamilyMem(fam_id))
            .catch((error) => console.error("Error deleting category:", error));
    },

    handleCreate: (formData) => {
        const fam_id = localStorage.getItem("fam_id");
        axios.post("http://bugi.test/api/fam-category", {
            ...formData,
            fam_id // Include fam_id in creation
        })
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedcategory: null });
                    get().getFamilyMem(fam_id);
                }
            })
            .catch((error) => console.error("Error creating category:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedcategory: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedcategory: null }), // Close both modals
}));