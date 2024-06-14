import { defineStore } from "pinia"

export const TIME_IN = "In"
export const TIME_OUT = "Out"
export const LOG_TYPE = [
    TIME_IN, TIME_OUT
]

export const useFailToLogStore = defineStore("Failtologs", {
    state: () => ({
        isEdit: false,
        failtolog:
        {
            id: null,
            employee_id: null,
            date: "",
            time: "",
            log_type: null,
            reason: null,
            approvals: [],
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
        async getAllList () {
            await useHRMSApi(
                "/api/attendance/failed-log",
                {
                    method: "GET",
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
                "/api/attendance/failure-to-log/my-requests",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequestList = response._data.data.data
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
                "/api/attendance/failure-to-log/my-approvals",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovalRequestList = response._data.data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },

        async createLog () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/attendance/failed-log",
                {
                    method: "POST",
                    body: this.failtolog,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.$reset()
                            this.getAllList()
                            this.getMyApprovalRequests()
                            this.getMyRequests()
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
        async editLog () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance/failed-log/" + this.failtolog.id,
                {
                    method: "PATCH",
                    body: this.failtolog,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.$reset()
                            this.getAllList()
                            this.getMyApprovalRequests()
                            this.getMyRequests()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async deleteLog (id: number) {
            const { data, error } = await useHRMSApi(
                "/api/attendance/failed-log/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.$reset()
                            this.getAllList()
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
                this.getAllList()
                return data
            }
        },
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals/approve/FailureToLog/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getMyApprovalRequests()
                            this.getAllList()
                            this.getMyRequests()
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyApprovalForm (id: String) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/FailureToLog/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getMyApprovalRequests()
                            this.getAllList()
                            this.getMyRequests()
                            return response._data
                        }
                    },
                }
            )
        },
    },
})
