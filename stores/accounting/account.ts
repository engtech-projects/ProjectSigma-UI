import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useAccountStore = defineStore("accountStore", {
    state: () => ({
        account: {
            account_id: null,
            account_number: null,
            account_name: null,
            account_description: null,
            parent_account: null,
            bank_reconciliation: "no",
            statement: null,
            type_id: null,
            opening_balance: 0
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        isEdit: false
    }),
    getters: {
        types () {
            return this.list.reduce((uniqueTypes, account) => {
                if (!uniqueTypes.some(item => item.id === account.account_type.type_id)) {
                    uniqueTypes.push(
                        {
                            id: account.account_type.type_id,
                            type: account.account_type.account_type_name,
                            collapse: false
                        }
                    )
                }
                return uniqueTypes
            }, [])
        },
        byTypes () {
            const btypes = JSON.parse(JSON.stringify(this.types))
            btypes.forEach((type) => {
                type.types = []
                this.list.forEach((account) => {
                    if (account.account_type.type_id === type.id) {
                        account.checked = false
                        type.types.push(account)
                    }
                })
            })
            return btypes
        }
    },
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
                        this.list = response._data.account
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
                        if (!response.ok) {
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

        async editAccount () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/v1/account/" + this.account.account_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.account,
                    watch: false,
                }
            )
            if (data.value) {
                this.getAccounts()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        reset () {
            this.account = {
                account_id: null,
                account_number: null,
                account_name: null,
                account_description: null,
                parent_account: null,
                bank_reconciliation: "no",
                statement: null,
                type_id: null,
                opening_balance: 0
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
