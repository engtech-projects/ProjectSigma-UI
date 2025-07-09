import { defineStore } from "pinia"

export const WEEKLY = "weekly"
export const MONTHLY = "monthly"
export const BIMONTHLY = "bimonthly"
export const TERMS = [
    MONTHLY,
    BIMONTHLY,
    WEEKLY,
]
const utils = useUtilities()

export interface CashAdvance {
    id: null | Number,
    employee_id: null | Number,
    department_id: null | Number,
    project_id: null | Number,
    terms_of_payment: null | Number,
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
        createData: {
            isLoading: false,
            errorMessage: "",
            successMessage: "",
            params: {},
        },
        isEdit: false,
        cashadvance: {
            id: null,
            employee_id: null,
            department_id: null,
            project_id: null,
            terms_of_payment: null,
            installment_deduction: null,
            deduction_date_start: "",
            amount: null,
            purpose: null,
            remarks: "",
            request_status: "",
            approvals: [],
            cash_advance_payments: [],
        },
        newPayment: {
            id: null,
            cashadvance_id: null,
            amount_paid: null,
            date_paid: utils.value.dateToString(new Date()),
            payment_type: "Manual",
            posting_status: "Posted",
            paymentAmount: null,
        },
        ca: [],
        cashAdvanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myApprovalRequestList: {
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
        paidCashAdvanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        ongoingCashAdvanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        paymentCashAdvanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        paymentData: {
            cashadvance_id: null,
            data: {
                paymentAmount: 0,
            },
            successMessage: "",
            errorMessage: "",
        },
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getOne (id: any) {
            return await useHRMSApiO(
                "/api/cash-advance/resource/" + id,
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
        async getCA () { // GET ALL CA
            this.cashAdvanceList.isLoaded = true
            await useHRMSApi(
                "/api/cash-advance/resource",
                {
                    method: "GET",
                    params: this.cashAdvanceList.params,
                    onRequest: () => {
                        this.cashAdvanceList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.cashAdvanceList.isLoading = false
                        if (response.ok) {
                            this.cashAdvanceList.list = response._data.data
                            this.cashAdvanceList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            this.myRequestList.isLoaded = true
            await useHRMSApi(
                "/api/cash-advance/my-request",
                {
                    method: "GET",
                    params: this.getParams,
                    onRequest: () => {
                        this.myRequestList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myRequestList.isLoading = false
                        if (response.ok) {
                            this.myRequestList.list = response._data.data
                            this.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getOngoingCashAdvance () {
            await useHRMSApi(
                "/api/cash-advance/ongoing",
                {
                    method: "GET",
                    params: this.getParams,
                    onRequest: () => {
                        this.ongoingCashAdvanceList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.ongoingCashAdvanceList.isLoading = false
                        if (response.ok) {
                            this.ongoingCashAdvanceList.list = response._data.data
                            this.ongoingCashAdvanceList.isLoaded = true
                            this.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getPaidCashAdvance () {
            await useHRMSApi(
                "/api/cash-advance/paid",
                {
                    method: "GET",
                    params: this.getParams,
                    onRequest: () => {
                        this.paidCashAdvanceList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.paidCashAdvanceList.isLoading = false
                        if (response.ok) {
                            this.paidCashAdvanceList.list = response._data.data
                            this.paidCashAdvanceList.isLoaded = true
                            this.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            this.myApprovalRequestList.isLoaded = true
            await useHRMSApi(
                "/api/cash-advance/my-approvals",
                {
                    method: "GET",
                    params: this.getParams,
                    onRequest: () => {
                        this.myApprovalRequestList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myApprovalRequestList.isLoading = false
                        if (response.ok) {
                            this.myApprovalRequestList.list = response._data.data
                            this.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getPaymentsCashAdvance () {
            await useHRMSApi(
                "/api/cash-advance/payments",
                {
                    method: "GET",
                    params: this.getParams,
                    onRequest: () => {
                        this.paymentCashAdvanceList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.paymentCashAdvanceList.isLoading = false
                        if (response.ok) {
                            this.paymentCashAdvanceList.list = response._data.data
                            this.paymentCashAdvanceList.isLoaded = true
                            this.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async createRequest () {
            if (this.createData.isLoading) { return }
            const backupEmployee = this.cashadvance.employee_id
            const backupApprovals = this.cashadvance.approvals
            await useHRMSApiO(
                "/api/cash-advance/resource",
                {
                    method: "POST",
                    body: this.cashadvance,
                    onRequest: () => {
                        this.createData.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createData.isLoading = false
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.createData.isLoading = false
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                            this.cashadvance.employee_id = backupEmployee
                            this.cashadvance.approvals = backupApprovals
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async editRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/cash-advance/resource/" + this.cashadvance.id,
                {
                    method: "PATCH",
                    body: this.cashadvance,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async deleteRequest (id: number) {
            return await useHRMSApiO(
                "/api/cash-advance/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                            return response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            return response._data.message
                        }
                    },
                }
            )
        },
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals/approve/CashAdvance/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
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
        async denyApprovalForm (id: string) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/CashAdvance/" + id,
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
                            // this.getManpower()
                            // this.getMyRequests()
                            return response._data
                        }
                    },
                }
            )
        },
        async submitPayment (id: any) {
            return await useHRMSApiO(
                "/api/cash-advance/manual-payment/" + id,
                {
                    method: "POST",
                    body: this.paymentData.data,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.paymentData.successMessage = response._data.message
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.cashAdvanceList.isLoaded) {
                callFunctions.push(this.getCA)
            }
            if (this.myRequestList.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            if (this.myApprovalRequestList.isLoaded) {
                callFunctions.push(this.getMyApprovalRequests)
            }
            if (this.ongoingCashAdvanceList.isLoaded) {
                callFunctions.push(this.getOngoingCashAdvance)
            }
            if (this.paidCashAdvanceList.isLoaded) {
                callFunctions.push(this.getPaidCashAdvance)
            }
            if (this.paymentCashAdvanceList.isLoaded) {
                callFunctions.push(this.getPaymentsCashAdvance)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
