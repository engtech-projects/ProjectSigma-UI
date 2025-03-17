import { defineStore } from "pinia"

export const useAccountTypeStore = defineStore("accountTypeStore", {
    state: () => ({
        accountType: {
            id: null,
            account_type: "",
            account_category: "",
            balance_type: "",
            notation: ""
        },
        list: [],
        categories: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            list: false,
            show: false,
            edit: false,
            delete: false
        },
        isEdit: false
    }),
    actions: {
        async getAccountTypes () {
            this.isLoading.list = true
            const { data, error } = await useAccountingApi(
                "/api/account-type",
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

        async getAccountCategories () {
            const { data, error } = await useAccountingApi(
                "/api/account-category",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.categories = response._data.account_category
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
            await useAccountingApi(
                "/api/account-type",
                {
                    method: "POST",
                    body: this.accountType,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getAccountTypes()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editAccountType () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/account-type/" + this.accountType.id,
                {
                    method: "PATCH",
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

        async deleteAccountType (id) {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/account-type/" + id,
                {
                    method: "DELETE",
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

        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },

        reset () {
            this.accountType = {
                id: null,
                account_type: "",
                account_category: "",
                balance_type: "",
                notation: ""
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
