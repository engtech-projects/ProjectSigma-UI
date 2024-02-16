import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useAccountCategory = defineStore("accountCategory", {
    state: () => ({
        accountCategory: {
            id: null,
            account_category: null,
            to_increase: null,
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
    }),
    actions: {
        async getAccountCategories () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/v1/account/category",
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

        async createAccountCategory () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/account/category",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.accountCategory,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 201) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getAccountCategories()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        reset () {
            this.accountCategory = {
                id: null,
                account_category: null,
                to_increase: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
