import { defineStore } from "pinia"

export const useStakeholderGroupStore = defineStore("stakeholderGroupStore", {
    state: () => ({
        stakeholderGroup: {
            stakeholder_group_id: null,
            stakeholder_group_name: null,
            stakeholder_type_id: null,
            type_groups: []
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
        async getStakeholderGroups () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/v1/stakeholder-group",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.stakeholder_group
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

        async getStakeholderGroup (id:any) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/v1/stakeholder-group/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.stakeholderGroup = response._data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createStakeholderGroup () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/v1/stakeholder-group",
                {
                    method: "POST",
                    body: this.stakeholderGroup,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getStakeholderGroups()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editStakeholderGroup () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/v1/stakeholder-group/" + this.stakeholderGroup.stakeholder_group_id,
                {
                    method: "PATCH",
                    body: this.stakeholderGroup,
                    watch: false,
                }
            )
            if (data.value) {
                this.getStakeholderGroups()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteStakeholderGroup (id: number) {
            const { data, error } = await useAccountingApi(
                "/api/v1/stakeholder-group/" + id,
                {
                    method: "DELETE",
                    body: this.stakeholderGroup,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getStakeholderGroups()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.stakeholderGroup = {
                stakeholder_group_id: null,
                stakeholder_group_name: null,
                stakeholder_type_id: null,
                type_groups: []
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
