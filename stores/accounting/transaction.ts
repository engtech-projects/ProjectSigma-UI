import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useTransactionStore = defineStore("transactionStore", {
    state: () => ({
        transaction: {
            transaction_id: null,
            transaction_no: null,
            transaction_date: null,
            transaction_type_id: null,
            reference_no: null,
            amount: null,
            stakeholder_id: null,
            details: null,
            period_id: null,
            status: "posted",
            note: "None",
            description: "No comment"
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        isEdit: false
    }),
    actions: {
        async getTransactions (params:any = null) {
            const url = !params ? "/api/v1/transactions" : "/api/v1/transactions?transaction_type=" + params
            this.isLoading = true
            const { data, error } = await useFetch(
                url,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.data
                        this.pagination = {
                            first_page: response._data.first_page_url,
                            pages: response._data.links,
                            last_page: response._data.last_page_url,
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

        async showTransaction (id:any) {
            const url = "/api/v1/transactions/" + id
            this.isLoading = true
            const { data, error } = await useFetch(
                url,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.transaction = response._data.data
                        console.log(this.transaction)
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createTransaction () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/transactions",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.transaction,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getTransactions()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editTransaction () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/v1/transaction/" + this.transaction.transaction_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.transaction,
                    watch: false,
                }
            )
            if (data.value) {
                this.getTransactions()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteTransaction (id: number) {
            const { data, error } = await useFetch(
                "/api/v1/transaction/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.transaction,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getTransactions()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.transaction = {
                transaction_id: null,
                transaction_no: null,
                transaction_date: null,
                transaction_type_id: null,
                reference_no: null,
                period_id: null,
                status: "posted",
                note: "None",
                description: "No comment"
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
