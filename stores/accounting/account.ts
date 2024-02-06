import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useAccountStore = defineStore("accountStore", {
    state: () => ({
        account: {
            id: null,
            account_number: null,
            account_name: null,
            account_description: null,
            parent_account: null,
            bank_reconciliation: "no",
            statement: null,
            account_type_id: null,
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
    }),
    actions: {
        async getAccounts () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/v1/accounts",
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
                        this.list = response._data
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

        async createAccount () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/accounts",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.account,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 201) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getAccounts()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        reset () {
            this.account = {
                id: null,
                account_number: null,
                account_name: null,
                account_description: null,
                parent_account: null,
                bank_reconciliation: null,
                statement: null,
                account_type_id: null
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
