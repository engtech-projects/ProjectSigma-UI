import { defineStore } from "pinia"

export const useStakeHolderStore = defineStore("stakeholderStore", {
    state: () => ({
        stakeholder: {
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
        async getStakeholders () {
            this.isLoading = true
            this.getParams.type = "payee"
            const { data, error } = await useAccountingApi(
                "/api/stakeholders",
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

        async createStakeholder () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/stakeholders",
                {
                    method: "POST",
                    body: this.stakeholder,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getStakeholders()
                            // this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editStakeholder () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/stakeholders/" + this.stakeholder.id,
                {
                    method: "PATCH",
                    body: this.stakeholder,
                    watch: false,
                }
            )
            if (data.value) {
                this.getStakeholders()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteStakeholder (id: number) {
            const { data, error } = await useAccountingApi(
                "/api/stakeholders/" + id,
                {
                    method: "DELETE",
                    body: this.stakeholder,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getStakeholders()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },

        reset () {
            this.stakeholder = {
                id: null,
                name: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
