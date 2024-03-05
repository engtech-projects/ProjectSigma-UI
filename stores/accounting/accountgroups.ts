import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useAccountGroupStore = defineStore("accountGroupStore", {
    state: () => ({
        accountGroup: {
            account_group_id: null,
            account_group_name: null,
            accounts: [],
            account_id: []
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
        async getAccountGroups () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/v1/account-group",
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
                        this.list = response._data.account_group
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

        async showAccountGroup (id:any) {
            const { data, error } = await useFetch(
                "/api/v1/account-group/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.accountGroup = response._data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createAccountGroup () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/account-group",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.accountGroup,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 201) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getAccountGroups()
                            // this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editAccountGroup () {
            this.successMessage = ""
            this.errorMessage = ""
            this.accountGroup.account_id = []
            this.accountGroup.accounts.forEach((element) => {
                this.accountGroup.account_id.push(element.account_id)
            })
            const { data, error } = await useFetch(
                "/api/v1/account-group/" + this.accountGroup.account_group_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.accountGroup,
                    watch: false,
                }
            )
            if (data.value) {
                this.getAccountGroups()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteAccountType (id: number) {
            const { data, error } = await useFetch(
                "/api/v1/account-group/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.accountGroup,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getAccountGroups()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.accountGroup = {
                account_group_id: null,
                account_group_name: null,
                accounts: [],
                account_id: []
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
