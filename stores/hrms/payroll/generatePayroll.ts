import { defineStore } from "pinia"

export const WEEKLY = "weekly"
export const BI_MONTHLY = "bi-monthly"
export const MONTHLY = "monthly"
export const PAYROLL_TYPE = [
    WEEKLY, BI_MONTHLY, MONTHLY
]
export const ATM = "atm"
export const CASH = "cash"
export const RELEASE_TYPE = [
    ATM, CASH
]

export interface PayrollAdjustment {
    id: number;
    adjustment_name: string;
    adjustment_amount: string;
}

// export interface PayrollData {
//     id: null | Number,
//     employee_ids: null | Number,
//     project_id: null | Number,
//     department_id: null | Number,
//     payroll_date: String,
//     payroll_type: String,
//     release_type: String,
//     cutoff_start: String,
//     cutoff_end: String,
//     group_type: String,
//     deduct_sss: boolean,
//     deduct_philhealth: boolean,
//     deduct_pagibig: boolean,
//     adjustment: Array<PayrollAdjustment>,
// }

export const useGeneratePayrollStore = defineStore("GeneratePayrolls", {
    state: () => ({
        isEdit: false,
        generatePayroll: {
            id: null,
            employee_ids: [] as any[],
            project_id: null,
            department_id: null,
            payroll_date: "",
            payroll_type: null,
            release_type: null,
            cutoff_start: "",
            cutoff_end: "",
            group_type: null,
            deduct_sss: 0,
            deduct_philhealth: 0,
            deduct_pagibig: 0,
            approvals: [],
            adjustment: [],
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
        async getGPayroll () {
            const payload = {
                ...this.generatePayroll,
                employee_ids: JSON.stringify(this.generatePayroll.employee_ids),
                approvals: JSON.stringify(this.generatePayroll.approvals),
            }
            await useHRMSApi(
                "/api/payroll/generate-payroll",
                {
                    method: "GET",
                    params: payload,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data.data
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
                "/api/payroll/my-request",
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
                "/api/payroll/my-approvals",
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
            await useHRMSApi(
                "/api/payroll/create-payroll",
                {
                    method: "POST",
                    body: this.generatePayroll,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getGPayroll()
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
                "/api/payroll/resource/" + this.generatePayroll.id,
                {
                    method: "PATCH",
                    body: this.generatePayroll,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getGPayroll()
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
                "/api/payroll/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.getGPayroll()
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
                this.getGPayroll()
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
