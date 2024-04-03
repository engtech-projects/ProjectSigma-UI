import { defineStore } from "pinia"
export interface SalaryGrade {
    id: null | Number,
    employee_id: Number,
    loan_amount: Number,
    installment_deduction: Number,
    terms_length: number,
    period_start: Date,
    period_end: Date,
}
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
            await useHRMSApi(
                "/api/loans/resource",
                {
                    method: "GET",
                    watch: false,
                    onResponseError: ({ response }) => {
                        this.allList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.allList.data = response._data.data
                            this.allList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async createResource () {
            await useHRMSApi(
                "/api/loans/resource",
                {
                    method: "POST",
                    watch: false,
                    body: this.createData.data,
                    onResponseError: ({ response }) => {
                        this.createData.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.createData.data = response._data.data
                            this.createData.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async editResource () {
            await useHRMSApi(
                "/api/loans/resource",
                {
                    method: "POST",
                    watch: false,
                    body: this.editData.data,
                    onResponseError: ({ response }) => {
                        this.editData.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.editData.data = response._data.data
                            this.editData.successMessage = response._data.message
                        }
                    },
                }
            )
        },
    },
})
