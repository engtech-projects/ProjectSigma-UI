import { defineStore } from "pinia"

export const useLoansStore = defineStore("LoansStore", {
    state: () => ({
        createData: {
            data: {

            },
            successMessage: "",
            errorMessage: "",
        },
        editData: {
            data: {

            },
            successMessage: "",
            errorMessage: "",
        },
        allList: {
            data: [],
            successMessage: "",
            errorMessage: "",
            loading: "",
        }
    }),
    actions: {
        async getAllList () {

        },
    },
})
