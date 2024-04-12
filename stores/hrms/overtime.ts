import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]

export const useOvertimeStore = defineStore("overtimes", {
    state: () => ({
        isEdit: false,
        overtime: {
            id: null,
            employee_id: null,
            project_id: null,
            department_id: null,
            overtime_date: null,
            overtime_start_time: "",
            overtime_end_time: "",
            reason: null,
            approvals: null,
            request_status: ""
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
        async getOvertime () {
            await useFetch(
                "/api/overtime/resource",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useHRMSApi(
                "/api/overtime/my-request",
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
                "/api/overtime/my-approvals",
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
                "/api/overtime/resource",
                {
                    method: "POST",
                    body: this.overtime,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getOvertime()
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
                "/api/overtime/resource/" + this.overtime.id,
                {
                    method: "PATCH",
                    body: this.overtime,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getOvertime()
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
                "/api/overtime/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.getOvertime()
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
                this.getOvertime()
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
