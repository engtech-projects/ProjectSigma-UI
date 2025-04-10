import { defineStore } from "pinia"

export const useTermsStore = defineStore("termsStore", {
    state: () => ({
        term: {
            id: null,
            name: null,
            account_id: null,
            debit_credit: null,
            location: null,
            description: null
        },
        balanceType: [],
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        isEdit: false
    }),
    actions: {
        async getTerms () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/terms",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
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

        async showTerm (id:any) {
            const { data, error } = await useAccountingApi(
                "/api/account-group/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.term = response._data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createTerm () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/terms",
                {
                    method: "POST",
                    body: this.term,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getTerms()
                            this.successMessage = "Term successfully created."
                        }
                    },
                }
            )
        },

        async editTerm () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/terms/" + this.term.id,
                {
                    method: "PATCH",
                    body: this.term,
                    watch: false,
                }
            )
            if (data.value) {
                this.getTerms()
                this.successMessage = "Term successfully updated"
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteTerm (id: number) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/terms/" + id,
                {
                    method: "DELETE",
                    body: this.term,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.getTerms()
                        if (response._data.success) {
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                this.getTerms()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Something went wrong"
                return error
            }
        },

        async getBalanceType () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/balance-type",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.balanceType = response._data.balance_type
                        this.pagination = {
                            first_page: response._data.links.first,
                            pages: response._data.meta.links,
                            last_page: response._data.links.last,
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

        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },

        reset () {
            this.term = {
                id: null,
                name: null,
                debit_credit: null,
                account_id: null,
                description: null
            }
        },
    },
})
