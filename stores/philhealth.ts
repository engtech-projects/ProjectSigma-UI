import { defineStore } from "pinia"
// const { data: token } = useAuth()
const config = useRuntimeConfig()

export const SHARE_AMOUNT = "Amount"
export const SHARE_PERCENTAGE = "Percentage"
export const SHARE_TYPES = [
    SHARE_AMOUNT,
    SHARE_PERCENTAGE
]

export const usePhilhealthStore = defineStore("contributions", {
    state: () => ({
        isEdit: false,
        contribution: {
            id: null,
            range_from: null,
            range_to: null,
            share: null,
            share_type: "",
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
                "/api/philhealth",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
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
            const { data, error } = await useFetch(
                "/api/philhealth",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },d
                    body: this.contribution,
                    watch: false,
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
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async editContribution () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/philhealth/" + this.contribution.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    body: this.contribution,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data) {
                this.getContribution()
                this.reset()
                return data
            } else if (error) {
                return error
            }
        },
        async deleteContribution (id : number) {
            const { data, error } = await useFetch(
                "/api/philhealth/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    watch: false,
                }
            )
            if (data.value) {
                this.getContribution()
                return data
            } else if (error.value) {
                return error
            }
        },

        reset () {
            this.contribution = {
                id: null,
                range_from: null,
                range_to: null,
                share: null,
                share_type: "",
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
