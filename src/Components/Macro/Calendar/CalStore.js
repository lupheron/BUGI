import { create } from "zustand";
import axios from "axios";

export const useCalStore = create((set, get) => ({
    reminders: [],
    fetchReminders: async (fam_id) => {
        try {
            const res = await axios.get(`http://bugi.test/api/reminders?fam_id=${fam_id}`);
            set({ reminders: res.data });
        } catch (err) {
            console.error('Error fetching reminders', err);
        }
    },
    createReminder: async (data) => {
        try {
            await axios.post(`http://bugi.test/api/reminders`, data);
            get().fetchReminders(data.fam_id);
        } catch (err) {
            console.error("Error creating reminder", err);
        }
    }
}));
