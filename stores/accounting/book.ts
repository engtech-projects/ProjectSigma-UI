import { defineStore } from "pinia"

export const useBookStore = defineStore("bookStore", {
    state: () => ({
        book: {
            book_id: null,
            book_name: null,
            account_id: null,
            account_group_id: null,
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
        async getBooks () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/v1/book",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.books
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

        async getBook (id:any) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/v1/book/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.book = response._data
                        this.book.account_id = response._data.accounts.length > 0 ? response._data.accounts[0].account_id : null
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
                "/api/v1/book",
                {
                    method: "POST",
                    body: this.book,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getBooks()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editBook () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/v1/book/" + this.book.book_id,
                {
                    method: "PATCH",
                    body: this.book,
                    watch: false,
                }
            )
            if (data.value) {
                this.getBooks()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteBook (id: number) {
            const { data, error } = await useAccountingApi(
                "/api/v1/book/" + id,
                {
                    method: "DELETE",
                    body: this.book,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getBooks()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.book = {
                book_id: null,
                book_name: null,
                account_id: null,
                account_group_id: null,
                symbol: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
