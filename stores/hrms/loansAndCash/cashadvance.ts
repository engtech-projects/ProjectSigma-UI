import { defineStore } from "pinia"

export const WEEKLY = "weekly"
export const MONTHLY = "monthly"
export const BIMONTHLY = "bimonthly"
export const TERMS = [
    WEEKLY,
    MONTHLY,
    BIMONTHLY,
]

export interface CashAdvance {

    id: null | Number,
    employee_id: null | Number,
    department_id: null | Number,
    project_id: null | Number,
    terms_of_payment: null | Number,
    no_of_installment: null | Number,
    installment_deduction: null | Number,
    deduction_date_start: String,
    amount: null | Number,
    purpose: String,
    remarks: String,
    request_status: String,
    approvals: String
}
export const useCashadvanceStore = defineStore("Cashadvances", {
    state: () => ({
        isEdit: false,
        cashadvance: {
            id: null,
            employee_id: null,
            department_id: null,
            project_id: null,
            terms_of_payment: null,
            no_of_installment: null,
            installment_deduction: null,
            deduction_date_start: "",
            amount: null,
            purpose: null,
            remarks: "",
            request_status: "",
            approvals: [],
            cash_advance_payments: [],
        },

        list: [],
        myApprovalRequestList: [],
        myRequestList: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getCA () {
            await useHRMSApi(
                "/api/cash-advance/resource",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data.data.data
                            this.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useHRMSApi(
                "/api/cash-advance/my-request",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequestList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useHRMSApi(
                "/api/cash-advance/my-approvals",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovalRequestList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },

        async createRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/cash-advance/resource",
                {
                    method: "POST",
                    body: this.cashadvance,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.getCA()
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async editRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/cash-advance/resource/" + this.cashadvance.id,
                {
                    method: "PATCH",
                    body: this.cashadvance,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.getCA()
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async deleteRequest (id: number) {
            const { data, error } = await useHRMSApi(
                "/api/cash-advance/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.$reset()
                            this.getCA()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
            if (error.value) {
                this.errorMessage = error.value.data.message
                throw new Error(this.errorMessage)
                return error
            }
            if (data.value) {
                this.getCA()
                return data
            }
        },
        // async approveApprovalForm (id: number) {
        //     this.successMessage = ""
        //     this.errorMessage = ""
        //     await useHRMSApiO(
        //         "/api/approvals/approve/ManpowerRequest/" + id,
        //         {
        //             method: "POST",
        //             onResponseError: ({ response }) => {
        //                 this.errorMessage = response._data.message
        //                 throw new Error(response._data.message)
        //             },
        //             onResponse: ({ response }) => {
        //                 if (response.ok) {
        //                     this.successMessage = response._data.message
        //                     this.getMyApprovalRequests()
        //                     this.getManpower()
        //                     this.getMyRequests()
        //                     return response._data
        //                 } else {
        //                     this.errorMessage = response._data.message
        //                     throw new Error(response._data.message)
        //                 }
        //             },
        //         }
        //     )
        // },
        // async denyApprovalForm (id: String) {
        //     this.successMessage = ""
        //     this.errorMessage = ""
        //     const formData = new FormData()
        //     formData.append("id", id)
        //     formData.append("remarks", this.remarks)
        //     await useHRMSApiO(
        //         "/api/approvals/disapprove/ManpowerRequest/" + id,
        //         {
        //             method: "POST",
        //             body: formData,
        //             onResponseError: ({ response }) => {
        //                 this.errorMessage = response._data.message
        //                 throw new Error(response._data.message)
        //             },
        //             onResponse: ({ response }) => {
        //                 if (response.ok) {
        //                     this.successMessage = response._data.message
        //                     this.getMyApprovalRequests()
        //                     this.getManpower()
        //                     this.getMyRequests()
        //                     return response._data
        //                 }
        //             },
        //         }
        //     )
        // },
    },
})
