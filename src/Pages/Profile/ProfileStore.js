import { create } from "zustand";
import { message } from "antd";
import axios from "axios";

export const useProfile = create((set, get) => ({
    family: [],

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
    }
}));