import { defineStore } from "pinia"

export const TIME_IN = "In"
export const TIME_OUT = "Out"
export const LOG_TYPE = [
    TIME_IN, TIME_OUT
]

export const useFailToLogStore = defineStore("FailToLog", {
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
        list: [] as any[],
        myApprovalRequestList: [],
        myRequestList: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getAllList () {
            await useHRMSApi(
                "/api/attendance/failed-log",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
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
                "/api/attendance/failure-to-log/my-approvals",
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
    },
})
