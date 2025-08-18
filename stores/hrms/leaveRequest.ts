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
    charging: String,
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
        allList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        approvalList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myRequestList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        isEdit: false,
        payload: {
            id: "",
            employee_id: null,
            charging: "Department",
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
        createData: {
            isLoading: false,
            errorMessage: "",
            successMessage: "",
        },
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
            if (this.createData.isLoading) { return }
            this.createData.isLoading = true
            this.successMessage = ""
            this.errorMessage = ""
            const idBackup = this.payload.employee_id
            const approvalsBackup = this.payload.approvals
            const requestData = JSON.parse(JSON.stringify(this.payload))
            requestData.approvals = JSON.stringify(requestData.approvals)
            await useHRMSApiO(
                "/api/leave-request/resource",
                {
                    method: "POST",
                    body: requestData,
                    onRequest: () => {
                        this.createData.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createData.isLoading = false
                        this.errorMessage = response._data.message
                    },
                    onResponse: ({ response }: any) => {
                        this.createData.isLoading = false
                        if (response.ok) {
                            this.$reset()
                            this.successMessage = response._data.message
                            this.payload.employee_id = idBackup
                            this.payload.approvals = approvalsBackup
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getOne (id: any) {
            return await useHRMSApiO(
                "/api/leave-request/resource/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async allLeaves () {
            await useHRMSApiO(
                "/api/leave-request/resource",
                {
                    method: "GET",
                    params: this.allList.params,
                    onRequest: () => {
                        this.allList.isLoaded = true
                        this.allList.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.allList.isLoading = false
                        if (response.ok) {
                            this.allList.isLoaded = true
                            this.allList.list = response._data.data
                            this.allList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async myRequest () {
            await useHRMSApiO(
                "/api/leave-request/my-request",
                {
                    method: "GET",
                    params: this.myRequestList.params,
                    onRequest: () => {
                        this.myRequestList.isLoaded = true
                        this.myRequestList.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.myRequestList.isLoading = false
                        if (response.ok) {
                            this.myRequestList.isLoaded = true
                            this.myRequestList.list = response._data.data
                            this.myRequestList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async allApprovals () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/leave-request/my-approvals",
                {
                    method: "GET",
                    params: this.approvalList.params,
                    onRequest: () => {
                        this.approvalList.isLoaded = true
                        this.approvalList.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.approvalList.isLoading = false
                        if (response.ok) {
                            this.approvalList.isLoaded = true
                            this.approvalList.list = response._data.data
                            this.approvalList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
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
                    onResponse: ({ response }: any) => {
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
                    onResponse: ({ response }: any) => {
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
        async voidRequest (id: number | string, remarks: string) {
            await useHRMSApiO(
                "/api/request-voids/void/LeaveEmployeeRequest/" + id,
                {
                    method: "POST",
                    params: { reason_for_void: remarks },
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
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
