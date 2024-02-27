import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useStakeholderStore = defineStore("stakeholderStore", {
    state: () => ({
        stakeholder: {
            stakeholder_id: null,
            title: null,
            firstname: null,
            middlename: null,
            lastname: null,
            suffix: null,
            email: null,
            company: null,
            display_name: null,
            street: null,
            city: null,
            state: null,
            country: null,
            phone_number: null,
            mobile_number: null,
            stakeholder_type_id: null,
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
            const { data, error } = await useFetch(
                "/api/v1/stakeholder",
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
                        this.list = response._data.stakeholders
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

        async createStakeholder () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/stakeholder",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.stakeholder,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 201) {
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
            const { data, error } = await useFetch(
                "/api/v1/stakeholder/" + this.stakeholder.stakeholder_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
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
            const { data, error } = await useFetch(
                "/api/v1/stakeholder/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
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

        reset () {
            this.stakeholder = {
                stakeholder_id: null,
                title: null,
                firstname: null,
                middlename: null,
                lastname: null,
                suffix: null,
                email: null,
                company: null,
                display_name: null,
                street: null,
                city: null,
                state: null,
                country: null,
                phone_number: null,
                mobile_number: null,
                stakeholder_type_id: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
