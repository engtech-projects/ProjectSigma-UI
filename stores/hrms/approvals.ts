import { defineStore } from "pinia"

export const APPROVAL_MANPOWERREQ = "Manpower Request"

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
export const useApprovalStore = defineStore("approvals", {
    state: () => ({
        isEdit: false,
        formApproval: {} as Approval,
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getApproval () {
            const { data, error } = await useHRMSApi(
                "/api/approvals",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data.map((val: any) => {
                            return {
                                id: val.id,
                                form: val.form,
                                approvals: val.approvals,
                            }
                        })
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async getApprovalByName (approvalName: String) {
            const { data } = await useHRMSApi<Approval>(
                "/api/get-form-requests/" + approvalName,
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            return response._data.data.approvals.map((approv: any) => {
                                return {
                                    type: approv.type,
                                    status: "Pending",
                                    user_id: approv.user_id,
                                    userselector: approv.userselector,
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
                return data.value.approvals.map((approv: any) => {
                    return {
                        type: approv.type,
                        status: "Pending",
                        user_id: approv.user_id,
                        userselector: approv.userselector,
                        date_approved: "",
                        remarks: "",
                        employee: approv.employee,
                    }
                })
            }
        },

        async createApproval () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals",
                {
                    method: "POST",
                    body: this.formApproval,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getApproval()
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
        async editApprovals () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useHRMSApiO(
                "/api/approvals/" + this.formApproval.id,
                {
                    method: "PATCH",
                    body: this.formApproval,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getApproval()
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                this.getApproval()
                this.$reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.message
                return error
            }
        },
        async deleteApproval (id: number) {
            await useHRMSApiO(
                "/api/approvals/" + id,
                {
                    method: "DELETE",
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.successMessage = response._data.message
                            this.getApproval()
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message
                    },
                }
            )
        },

    },
})
