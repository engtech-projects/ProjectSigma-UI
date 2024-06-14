import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useAccountType = defineStore("accountType", {
    state: () => ({
        accountType: {
            type_id: null,
            account_type_name: null,
            account_category: null,
            balance_type: null,
            notation: null,
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
        async getAccountTypes () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/v1/account/type",
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
                        this.list = response._data.account_type.data
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

        async createAccountType () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/account/type",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.accountType,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getAccountTypes()
                            // this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editAccountType () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/v1/account/type/" + this.accountType.type_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.accountType,
                    watch: false,
                }
            )
            if (data.value) {
                this.getAccountTypes()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteAccountType (id: number) {
            const { data, error } = await useFetch(
                "/api/v1/account/type/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.accountType,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getAccountTypes()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.accountType = {
                type_id: null,
                account_type_name: null,
                account_category: null,
                balance_type: null,
                notation: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
