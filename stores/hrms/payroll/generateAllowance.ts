import { defineStore } from "pinia"

export interface GenerateAllowance {

    id: null | Number,
    employee_id: null | Number,
    project_id: null | Number,
    department_id: null | Number,
    total_days: null | Number,
    cutoff_start: String,
    cutoff_end: String,
    allowance_date: String,
    group_type: String,
}
export const useGenerateAllowanceStore = defineStore("GenerateAllowances", {
    state: () => ({
        isEdit: false,
        generateAllowance: {
            id: null,
            employee_id: [] as any[],
            project_id: null,
            department_id: null,
            cutoff_start: "",
            cutoff_end: "",
            allowance_date: "",
            total_days: null,
            group_type: null,
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
        async getGA () {
            await useHRMSApi(
                "/api/employee-allowance/resource",
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
                "/api/employee-allowance/my-request",
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
                "/api/employee-allowance/my-approvals",
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
                "/api/employee-allowance/resource",
                {
                    method: "POST",
                    body: this.generateAllowance,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getGA()
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
                "/api/employee-allowance/resource/" + this.generateAllowance.id,
                {
                    method: "PATCH",
                    body: this.generateAllowance,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getGA()
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
                "/api/employee-allowance/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.getGA()
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
