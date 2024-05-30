import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useStakeholderGroupStore = defineStore("stakeholderGroupStore", {
    state: () => ({
        stakeholderGroup: {
            stakeholder_group_id: null,
            stakeholder_group_name: null,
            stakeholder_type_id: null
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
            const { data, error } = await useFetch(
                "/api/v1/stakeholder-group",
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

        async createStakeholderGroup () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/stakeholder-group",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
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
            const { data, error } = await useFetch(
                "/api/v1/stakeholder-group/" + this.stakeholderGroup.stakeholder_group_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
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
            const { data, error } = await useFetch(
                "/api/v1/stakeholder-group/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
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
                stakeholder_type_id: null
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
