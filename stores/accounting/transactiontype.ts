import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useTransactionTypeStore = defineStore("transactionTypeStore", {
    state: () => ({
        transactionType: {
            transaction_type_id: null,
            transaction_type_name: null,
            book_id: null,
            account_id: null
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
        async getTransactionTypes () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/v1/transaction-type",
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
                        this.list = response._data.transaction_type
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

        async createTransactionType () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/transaction-type",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.transactionType,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getTransactionTypes()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editTransactionType () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/v1/transaction-type/" + this.transactionType.transaction_type_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.transactionType,
                    watch: false,
                }
            )
            if (data.value) {
                this.getTransactionTypes()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteTransactionType (id: number) {
            const { data, error } = await useFetch(
                "/api/v1/transaction-type/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.transactionType,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getTransactionTypes()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.transactionType = {
                transaction_type_id: null,
                transaction_type_name: null,
                book_id: null,
                account_id: null
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
