import { defineStore } from "pinia"

export interface LeaveRequest {
    id: String,
    employee_id: String,
    department_id: String,
    project_id: String,
    type: String,
    other_absence: String,
    date_of_absence_from: String,
    date_of_absence_to: String,
    reason_for_absence: String,
    approvals: String,
    request_status: String,
}

export const useLeaveRequest = defineStore("LeaveRequest", {
    state: () => ({
        allList: [],
        requestList: [],
        approvalList: [],
        isEdit: false,
        LeaveRequest: {} as LeaveRequest,
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async allLeaves () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/leave-request/resource",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.allLeaves = response._data.data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async allApprovals () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/leave-request/my-approvals",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.approvalList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async allRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/leave-request/my-request",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.allRequest = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
