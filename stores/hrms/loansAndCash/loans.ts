import { defineStore } from "pinia"

export const WEEKLY = "weekly"
export const MONTHLY = "monthly"
export const BIMONTHLY = "bimonthly"
export const TERMS = [
    WEEKLY,
    MONTHLY,
    BIMONTHLY,
]

export interface Loan {
    id: null | Number;
    employee_id: null | Number;
    amount: null | Number;
    installment_deduction: null | Number;
    deduction_date_start: String,
    terms_of_payment: String,
}
export const useLoansStore = defineStore("LoansStore", {
    state: () => ({
        createData: {
            data: {
                id: null,
                employee_id: null,
                amount: null,
                installment_deduction: null,
                deduction_date_start: "",
                terms_of_payment: "",
            } as Loan,
            successMessage: "",
            errorMessage: "",
        },
        editData: {
            data: {
                id: null,
                employee_id: null,
                amount: null,
                installment_deduction: null,
                deduction_date_start: "",
                terms_of_payment: "",
            } as Loan,
            successMessage: "",
            errorMessage: "",
        },
        allList: {
            data: [] as Loan[],
            successMessage: "",
            errorMessage: "",
            loading: "",
        },
    }),
    actions: {
        async getAllList () {
            await useHRMSApi("/api/loans/resource", {
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
            })
        },
        async createResource () {
            await useHRMSApi("/api/loans/resource", {
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
                        this.getAllList()
                        this.resetCreateData()
                    }
                },
            })
        },
        async editResource () {
            await useHRMSApi("/api/loans/resource", {
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
            })
        },
        resetCreateData () {
            this.createData = {
                data: {
                    id: null,
                    employee_id: null,
                    amount: null,
                    installment_deduction: null,
                    deduction_date_start: "",
                    terms_of_payment: "",
                } as Loan,
                successMessage: "",
                errorMessage: "",
            }
        },
    },
})
