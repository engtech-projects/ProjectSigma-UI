import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useContributionStore = defineStore("sssContrib", {
    state: () => ({
        isEdit: false,
        contribution: {
            id: null,
            range_from: null,
            range_to: null,
            employee_share: null,
            employer_share: null,
            employee_compensation: null,
            employer_compensation: null,
            employee_wisp: null,
            employer_wisp: null,
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getContribution () {
            const { data, error } = await useFetch(
                "/api/sss",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
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

        async addContribution () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/sss",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.contribution,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getContribution()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async editContribution () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/sss/" + this.contribution.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.contribution,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getContribution()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deleteContribution (id : number) {
            const { data, error } = await useFetch(
                "/api/sss/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getContribution()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        reset () {
            this.contribution = {
                id: null,
                range_from: null,
                range_to: null,
                employee_share: null,
                employee_compensation: null,
                employer_share: null,
                employer_compensation: null,
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
