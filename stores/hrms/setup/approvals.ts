import { defineStore } from "pinia"

// HRMS APPROVALS
export const APPROVAL_MANPOWERREQ = "Manpower Request"
export const APPROVAL_TRAVELORDER = "Travel Order"
export const APPROVAL_OVERTIME = "Overtime"
export const APPROVAL_CA = "Cash Advance"
export const APPROVAL_GA = "Generate Allowance"
export const APPROVAL_GP = "Payroll"
export const APPROVAL_LEAVE = "Leave"
export const APPROVAL_FAILTOLOG = "Failure To Log"
export const APPROVAL_SALARYDISBURSEMENT = "Salary Disbursement"
// ACCOUNTING APPROVALS
export const APPROVAL_PAYMENT_REQUEST_NPO = "Payment Request Form (NPO)"
export const APPROVAL_PAYMENT_REQUEST_PO = "Payment Request Form (PO)"
export const APPROVAL_PAYMENT_REQUEST_PAYROLL = "Payment Request Form (PAYROLL)"
export const APPROVAL_DISBURSEMENT_VOUCHER = "Disbursement Voucher Request"
export const APPROVAL_CASH_VOUCHER = "Cash Voucher Request"
// INVENTORY APPROVALS
export const APPROVAL_NEW_ITEM_PROFILE = "New Item Profile"
// PROJECTS APPROVALS

export interface Approver {
    type: string,
    user_id: number | null,
    userselector: boolean
}
export interface Approval {
    id: string | null,
    form: string,
    approvals: Array<Approver>,
}
export const useApprovalStore = defineStore("hrmsapprovals", {
    state: () => ({
        editApproval: {
            errorMessage: "",
            successMessage: "",
        },
        hrmsApprovals: {
            isLoaded: false,
            isLoading: false,
            list: [],
            params: {
                module: "HRMS",
            },
            pagination: {},
            successMessage: "",
            errorMessage: "",
        },
        accountingApprovals: {
            isLoaded: false,
            isLoading: false,
            list: [],
            params: {
                module: "Accounting"
            },
            pagination: {},
            successMessage: "",
            errorMessage: "",
        },
        inventoryApprovals: {
            isLoaded: false,
            isLoading: false,
            list: [],
            params: {
                module: "Inventory"
            },
            pagination: {},
            successMessage: "",
            errorMessage: "",
        },
        projectsApprovals: {
            isLoaded: false,
            isLoading: false,
            list: [],
            params: {
                module: "Projects"
            },
            pagination: {},
            successMessage: "",
            errorMessage: "",
        },
    }),
    actions: {
        async getHrmsApprovals () {
            this.hrmsApprovals.isLoaded = true
            await useHRMSApi(
                "/api/approvals",
                {
                    method: "GET",
                    params: this.hrmsApprovals.params,
                    onRequest: () => {
                        this.hrmsApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.hrmsApprovals.isLoading = false
                        if (response.ok) {
                            this.hrmsApprovals.list = response._data.data.data.map((val: any) => {
                                return {
                                    id: val.id,
                                    form: val.form,
                                    approvals: val.approvals,
                                }
                            })
                            this.hrmsApprovals.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                            this.hrmsApprovals.successMessage = response._data.message
                        }
                    },
                    onResponseError: ({ response }) => {
                        this.hrmsApprovals.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    }
                }
            )
        },
        async getAccountingApprovals () {
            this.accountingApprovals.isLoaded = true
            await useHRMSApi(
                "/api/approvals",
                {
                    method: "GET",
                    params: this.accountingApprovals.params,
                    onRequest: () => {
                        this.accountingApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.accountingApprovals.isLoading = false
                        if (response.ok) {
                            this.accountingApprovals.list = response._data.data.data.map((val: any) => {
                                return {
                                    id: val.id,
                                    form: val.form,
                                    approvals: val.approvals,
                                }
                            })
                            this.accountingApprovals.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                            this.accountingApprovals.successMessage = response._data.message
                        }
                    },
                    onResponseError: ({ response }) => {
                        this.accountingApprovals.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    }
                }
            )
        },
        async getInventoryApprovals () {
            this.inventoryApprovals.isLoaded = true
            await useHRMSApi(
                "/api/approvals",
                {
                    method: "GET",
                    params: this.inventoryApprovals.params,
                    onRequest: () => {
                        this.inventoryApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.inventoryApprovals.isLoading = false
                        if (response.ok) {
                            this.inventoryApprovals.list = response._data.data.data.map((val: any) => {
                                return {
                                    id: val.id,
                                    form: val.form,
                                    approvals: val.approvals,
                                }
                            })
                            this.inventoryApprovals.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                            this.inventoryApprovals.successMessage = response._data.message
                        }
                    },
                    onResponseError: ({ response }) => {
                        this.inventoryApprovals.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    }
                }
            )
        },
        async getProjectsApprovals () {
            this.projectsApprovals.isLoaded = true
            await useHRMSApi(
                "/api/approvals",
                {
                    method: "GET",
                    params: this.projectsApprovals.params,
                    onRequest: () => {
                        this.projectsApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.projectsApprovals.isLoading = false
                        if (response.ok) {
                            this.projectsApprovals.list = response._data.data.data.map((val: any) => {
                                return {
                                    id: val.id,
                                    form: val.form,
                                    approvals: val.approvals,
                                }
                            })
                            this.projectsApprovals.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                            this.projectsApprovals.successMessage = response._data.message
                        }
                    },
                    onResponseError: ({ response }) => {
                        this.projectsApprovals.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    }
                }
            )
        },

        async getApprovalByName (approvalName: String) {
            const { data } = await useHRMSApi<any>(
                "/api/get-form-requests/" + approvalName,
                {
                    method: "GET",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            return response._data.data.approvals.map((approv: any) => {
                                return {
                                    type: approv.type,
                                    status: "Pending",
                                    user_id: approv.user_id,
                                    selector_type: approv.selector_type,
                                    date_approved: "",
                                    remarks: "",
                                    employee: approv.employee,
                                }
                            })
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                return data.value.data.approvals.map((approv: any) => {
                    return {
                        type: approv.type,
                        status: "Pending",
                        user_id: approv.user_id,
                        selector_type: approv.selector_type,
                        date_approved: "",
                        remarks: "",
                        employee: approv.employee,
                    }
                })
            }
        },
        async editApprovals (approval: Approval) {
            await useHRMSApiO(
                "/api/approvals/" + approval.id,
                {
                    method: "PATCH",
                    body: approval,
                    onResponse: ({ response }: any) => {
                        this.reloadResources()
                        if (response.ok) {
                            this.editApproval.successMessage = response._data.message
                        } else {
                            this.editApproval.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.hrmsApprovals.isLoaded) {
                callFunctions.push(this.getHrmsApprovals)
            }
            if (this.accountingApprovals.isLoaded) {
                callFunctions.push(this.getAccountingApprovals)
            }
            if (this.inventoryApprovals.isLoaded) {
                callFunctions.push(this.getInventoryApprovals)
            }
            if (this.projectsApprovals.isLoaded) {
                callFunctions.push(this.getProjectsApprovals)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        }

    },
})
