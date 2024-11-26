import { defineStore } from "pinia"

export const useAccountGroupStore = defineStore("accountGroupStore", {
    state: () => ({
        accountGroup: {
            id: null,
            name: null,
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
            const { data, error } = await useAccountingApi(
                "/api/account-group",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.data.data
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
            const { data, error } = await useAccountingApi(
                "/api/account-group/" + id,
                {
                    method: "GET",
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
            await useAccountingApi(
                "/api/account-group",
                {
                    method: "POST",
                    body: this.accountGroup,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
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
            const { data, error } = await useAccountingApi(
                "/api/account-group/" + this.accountGroup.id,
                {
                    method: "PATCH",
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

        async deleteAccountGroup (id: number) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/account-group/" + id,
                {
                    method: "DELETE",
                    body: this.accountGroup,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response._data.success) {
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                this.getAccountGroups()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Something went wrong"
                return error
            }
        },

        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },

        reset () {
            this.accountGroup = {
                id: null,
                name: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
