import axios from "axios";
import { create } from "zustand";

export const useAuth = create((set, get) => ({
    fam: [],
    status: "",

    setFormData: (data) => set({ formData: data }),

    getFamily: () => {
        axios.get("http://bugi.test/api/families")
            .then(res => {
                set({ users: res.data });
            }).catch(error => {
                console.log(error)
            })
    },

    handleRegisterFam: (value) => {
        axios.post("http://bugi.test/api/family/register", value)
            .then(res => {
                set({ status: "success" });
                get().getFamily();
            })
            .catch(error => {
                set({ status: "error" });
                console.log(error);
            });
    },

    getAlone: () => {
        axios.get("http://bugi.test/api/alone-users")
            .then(res => {
                set({ users: res.data });
            }).catch(error => {
                console.log(error)
            })
    },

    handleRegisterAlone: (value) => {
        axios.post("http://bugi.test/api/alone-reg", value)
            .then(res => {
                set({ status: "success" });
                get().getAlone();
            })
            .catch(error => {
                set({ status: "error" });
                console.log(error);
            });
    },
}));
