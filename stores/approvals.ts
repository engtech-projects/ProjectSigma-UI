import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const USER_SELECTOR1 = "1"
export const USER_SELECTOR2 = "2"
export const SELECTOR = [
    USER_SELECTOR1,
    USER_SELECTOR2
]

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
            const { data, error } = await useFetch(
                "/api/approvals",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data.map((val) => {
                            return {
                                id: val.id,
                                form: val.form,
                                approvals: JSON.parse(val.approvals),
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

        async createApproval () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/approvals",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.formApproval,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getApproval()
                            this.reset()
                            this.successMessage = response._data.message
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
            const { data, error } = await useFetch(
                "/api/approvals/" + this.formApproval.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.formApproval,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getApproval()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                this.getApproval()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.message
                return error
            }
        },
        async deleteApproval (id: number) {
            await useFetch(
                "/api/approvals/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                        this.getApproval()
                    },
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message
                    },
                }
            )
        },

        reset () {
            this.approval = {
                id: null,
                form: null,
                approvals: [],
            }
            this.approvals = []
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
