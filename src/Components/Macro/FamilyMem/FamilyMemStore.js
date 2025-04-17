import { create } from "zustand";
import { Button, message, Space } from "antd";
import axios from "axios";

export const useFamMem = create((set, get) => ({
    family_mem: [],
    selectedmember: null,
    isEditing: false, // Controls Edit modal visibility
    isCreating: false, // Controls Create modal visibility

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

    getFamilyMem: (fam_id) => {
        axios.get(`http://bugi.test/api/family-members?fam_id=${fam_id}`)
            .then(res => {
                set({ family_mem: res.data });
            }).catch(error => {
                console.log(error)
            })
    },

    handleEdit: (fam_mem) => {
        // console.log("Editing product:", wh); // Debugging: Log the product being edited
        set({ selectedmember: fam_mem, isEditing: true }); // Open the Edit modal and set the selected product
    },

    handleUpdate: (values) => {
        const fam_id = localStorage.getItem("fam_id");
        if (!fam_id || !values.id) {
            message.error("Missing required IDs");
            return;
        }
    
        axios.put(`http://bugi.test/api/family-members/${values.id}`, {
            name: values.name // Only send the name to update
        })
        .then(() => {
            message.success("Member updated successfully");
            get().getFamilyMem(fam_id); // Refresh the list
            set({ isEditing: false });
        })
        .catch(error => {
            console.error("Update error:", error);
            message.error("Failed to update member");
        });
    },

    handleDelete: (id) => {
        const fam_id = localStorage.getItem("fam_id");
        axios.delete(`http://bugi.test/api/family-members/${id}?fam_id=${fam_id}`)
            .then(() => get().getFamilyMem(fam_id))
            .catch((error) => console.error("Error deleting member:", error));
    },

    handleCreate: (formData) => {
        const fam_id = localStorage.getItem("fam_id");
        axios.post("http://bugi.test/api/family-members", {
            ...formData,
            fam_id // Include fam_id in creation
        })
            .then((response) => {
                if (response.data.status === 200) {
                    set({ isCreating: false, selectedmember: null });
                    get().getFamilyMem(fam_id);
                }
            })
            .catch((error) => console.error("Error creating member:", error));
    },

    handleOpenCreate: () => set({ isCreating: true, isEditing: false, selectedmember: null }), // Open Create modal, close Edit modal
    handleClose: () => set({ isCreating: false, isEditing: false, selectedmember: null }), // Close both modals
}));