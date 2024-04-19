import { defineStore } from "pinia"
const { token } = useAuth()

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]
export interface CashAdvance {
    id: null | Number,
    employee_id: null | Number,
    project_id: null | Number,
    department_id: null | Number,
    amount_requested: null | Number,
    amount_approved: null | Number,
    purpose: String,
    terms_of_cash_advance: String,
    remarks: String,
    approvals: String,
    request_status: String
    released_by: String
}

export const useCashadvanceStore = defineStore("Cashadvances", {
    state: () => ({
        isEdit: false,
        createData: {
            data: {
                id: null,
                employee_id: null,
                project_id: null,
                department_id: null,
                amount_requested: null,
                amount_approved: null,
                purpose: null,
                terms_of_cash_advance: null,
                remarks: null,
                approvals: null,
                request_status: "",
                released_by: ""
            } as CashAdvance,
            successMessage: "",
            errorMessage: "",
        },
        editData: {
            data: {
                id: null,
                employee_id: null,
                project_id: null,
                department_id: null,
                amount_requested: null,
                amount_approved: null,
                purpose: null,
                terms_of_cash_advance: null,
                remarks: null,
                approvals: null,
                request_status: "",
                released_by: ""
            } as CashAdvance,
            successMessage: "",
            errorMessage: "",
        },
        allList: {
            data: [] as CashAdvance[],
            successMessage: "",
            errorMessage: "",
            loading: "",
        },
        cashadvance: {
            id: null,
            employee_id: null,
            project_id: null,
            department_id: null,
            amount_requested: null,
            amount_approved: null,
            purpose: null,
            terms_of_cash_advance: null,
            remarks: null,
            approvals: null,
            request_status: "",
            released_by: ""
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
        async getCA () {
            await useHRMSApi("/api/loans/resource", {
                method: "GET",
                headers: {
                    Authorization: token.value + "",
                    Accept: "application/json"
                },
                onResponseError: ({ response }) => {
                    this.allList.errorMessage = response._data.message
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }) => {
                    if (response.ok) {
                        this.allList.data = response._data.data
                        this.allList.successMessage = response._data.message
                    }
                },
            }
            )
        },
        async getMyRequests () {
            await useHRMSApi(
                "/api/cash-advance/my-request",
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
                "/api/cash-advance/my-approvals",
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
                "/api/cash-advance/resource",
                {
                    method: "POST",
                    body: this.cashadvance,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getCA()
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
                "/api/cash-advance/resource/" + this.cashadvance.id,
                {
                    method: "PATCH",
                    body: this.cashadvance,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getCA()
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
                "/api/cash-advance/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.getCA()
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
