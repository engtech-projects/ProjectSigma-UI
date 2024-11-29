import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useSubsidiaryStore = defineStore("subsidiaryStore", {
    state: () => ({
        subsidiary: {
            subsidiary_id: null,
            subsidiary_name: null,
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
        async getSubsidiaries () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/subsidiary",
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
                        this.list = response._data.subsidiaries
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
                "/api/subsidiary",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.subsidiary,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getSubsidiaries()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editAccount () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/subsidiary/" + this.subsidiary.subsidiary_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.subsidiary,
                    watch: false,
                }
            )
            if (data.value) {
                this.getSubsidiaries()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteAccount (id: number) {
            const { data, error } = await useFetch(
                "/api/subsidiary/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.subsidiary,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getSubsidiaries()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.subsidiary = {
                subsidiary_id: null,
                subsidiary_name: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
