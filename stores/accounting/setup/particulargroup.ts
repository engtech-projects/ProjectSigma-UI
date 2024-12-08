import { defineStore } from "pinia"

export const useParticularGroupStore = defineStore("particularGroupStore", {
    state: () => ({
        particularGroup: {
            id: null,
            name: null,
            description: null
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
        async getParticularGroups () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/particular-group",
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

        async showParticularGroup (id:any) {
            const { data, error } = await useAccountingApi(
                "/api/account-group/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.particularGroup = response._data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createParticularGroup () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/particular-group",
                {
                    method: "POST",
                    body: this.particularGroup,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getParticularGroups()
                            this.successMessage = "Particular group successfully created."
                        }
                    },
                }
            )
        },

        async editParticularGroup () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/particular-group/" + this.particularGroup.id,
                {
                    method: "PATCH",
                    body: this.particularGroup,
                    watch: false,
                }
            )
            if (data.value) {
                this.getParticularGroups()
                this.successMessage = "Particular group successfully updated"
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteParticularGroup (id: number) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/particular-group/" + id,
                {
                    method: "DELETE",
                    body: this.particularGroup,
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
                this.getParticularGroups()
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
            this.particularGroup = {
                id: null,
                name: null,
                description: null
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
