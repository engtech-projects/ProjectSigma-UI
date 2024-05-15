import { defineStore } from "pinia"

export const EMPLOYEE_WITH_PAY = true
export const EMPLOYEE_WITHOUT_PAY = false

export const EMPLOYEE_SICK_CHECKUP = "Sick/Checkup"
export const EMPLOYEE_SPECIAL = "Special"
export const EMPLOYEE_CELEBRATION = "Celebration"
export const EMPLOYEE_VACATION = "Vacation"
export const EMPLOYEE_MANDATORY = "Mandatory"
export const EMPLOYEE_LEAVE = "Leave"
export const EMPLOYEE_BEREAVEMENT = "Bereavement"
export const EMPLOYEE_MATERNITY_PATERNITY = "Maternity/Paternity"
export const EMPLOYEE_OTHER = "Other"
export const EMPLOYEE_APPROVAL_REQ = "Leave"

export const EMPLOYEE_REQUEST_TYPE_APPROVED = "Approved"
export const EMPLOYEE_REQUEST_TYPE_PENDING = "Pending"
export const EMPLOYEE_REQUEST_TYPE_DENIED = "Denied"
export const EMPLOYEE_REQUEST_TYPE_RELEASED = "Released"

export interface LeaveRequest {
    id: String,
    employee_id: Number | null,
    department_id: Number | null,
    project_id: Number | null,
    leave_id: String,
    other_absence: String,
    date_of_absence_from: String,
    date_of_absence_to: String,
    reason_for_absence: String,
    approvals: String,
    request_status: String,
    number_of_days: Number | null,
    with_pay: Boolean,
}

export const useLeaveRequest = defineStore("LeaveRequest", {
    state: () => ({
        allList: [],
        approvalList: [],
        myRequest: [],
        isEdit: false,
        payload: {
            id: "",
            employee_id: null,
            department_id: null,
            project_id: null,
            leave_id: "",
            other_absence: "",
            date_of_absence_from: "",
            date_of_absence_to: "",
            reason_for_absence: "",
            approvals: "",
            request_status: "",
            number_of_days: null,
            with_pay: false,
        } as LeaveRequest,
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    getters: {},
    actions: {
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async createRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            const requestData = JSON.parse(JSON.stringify(this.payload))
            requestData.approvals = JSON.stringify(requestData.approvals)
            await useHRMSApiO(
                "/api/leave-request/resource",
                {
                    method: "POST",
                    body: requestData,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async allLeaves () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/leave-request/resource",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.allList = response._data.data.data
                            this.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
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
        async approvedRequest (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals/approve/LeaveEmployeeRequest/" + id,
                {
                    method: "POST",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                        this.fetchLeaveRequestList()
                    },
                }
            )
        },
        async denyRequest (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/LeaveEmployeeRequest/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.fetchLeaveRequestList()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        fetchLeaveRequestList () {
            this.$reset()
            this.allLeaves()
            this.allApprovals()
        }
    },
})
