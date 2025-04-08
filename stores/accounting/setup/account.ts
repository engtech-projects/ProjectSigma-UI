import { defineStore } from "pinia"

export const useAccountStore = defineStore("useAccountStore", {
    state: () => ({
        account: {
            id: null,
            account_number: null,
            account_name: null,
            account_type_id: null,
            account_description: null,
            report_group_id: null,
            bank_reconciliation: "yes",
            is_active: 1,
            statement: null,
        },
        list: [],
        chart: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            list: false,
            chart: false,
            show: false,
            edit: false,
            delete: false
        },
        isEdit: false
    }),

    actions: {
        async getAccounts () {
            this.isLoading.list = true
            const { data, error } = await useAccountingApi(
                "/api/accounts",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        this.list = response._data.data.data
                        this.pagination = {
                            first_page: response._data.data.links.first,
                            pages: response._data.data.meta.links,
                            last_page: response._data.data.links.last,
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

        async getChart () {
            this.isLoading.chart = true
            const { data, error } = await useAccountingApi(
                "/api/chart-of-accounts",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.chart = false
                        this.chart = response._data.data
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
            await useAccountingApi(
                "/api/accounts",
                {
                    method: "POST",
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
            const { data, error } = await useAccountingApi(
                "/api/accounts/" + this.account.id,
                {
                    method: "PUT",
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

        async deleteAccount (id) {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/accounts/" + id,
                {
                    method: "DELETE",
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

        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },

        reset () {
            this.account = {
                id: null,
                account_number: null,
                account_name: null,
                account_type_id: null,
                account_description: null,
                bank_reconciliation: "yes",
                is_active: 1,
                statement: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
