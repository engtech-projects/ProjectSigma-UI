import { defineStore } from "pinia"

export const useTransactionTypeStore = defineStore("transactionTypeStore", {
    state: () => ({
        transactionType: {
            transaction_type_id: null,
            transaction_type_name: null,
            stakeholder_group_id: null,
            book_id: null,
            book: {
                book_id: null
            },
            stakeholder_group: {
                stakeholder_group_id: null
            },
            account_id: null,
            symbol: null,
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
            const { data, error } = await useAccountingApi(
                "/api/transaction-type",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.data
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

        async getTransactionType (id:any) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/transaction-type/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.transactionType = response._data.data
                        if (!this.transactionType.stakeholder_group) {
                            this.transactionType.stakeholder_group = { stakeholder_group_id: null }
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
            await useAccountingApi(
                "/api/transaction-type",
                {
                    method: "POST",
                    body: this.transactionType,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
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
            const { data, error } = await useAccountingApi(
                "/api/transaction-type/" + this.transactionType.transaction_type_id,
                {
                    method: "PATCH",
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
            const { data, error } = await useAccountingApi(
                "/api/transaction-type/" + id,
                {
                    method: "DELETE",
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
                stakeholder_group_id: null,
                book_id: null,
                book: {
                    book_id: null
                },
                stakeholder_group: {
                    stakeholder_group_id: null
                },
                account_id: null,
                symbol: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
