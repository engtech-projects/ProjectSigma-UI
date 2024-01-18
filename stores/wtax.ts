import { defineStore } from "pinia"
// const { data: token } = useAuth()
const config = useRuntimeConfig()

export const TERM_DAILY = "Daily"
export const TERM_WEEKLY = "Weekly"
export const TERM_SEMIMONTHLY = "Semi-Monthly"
export const TERM_MONTHLY = "Monthly"
export const TERM = [
    TERM_DAILY,
    TERM_WEEKLY,
    TERM_SEMIMONTHLY,
    TERM_MONTHLY,
]

export const useWtaxStore = defineStore("withholdings", {
    state: () => ({
        isEdit: false,
        withholding:
        {
            id: null,
            range_from: null,
            range_to: null,
            tax_base: null,
            tax_amount: null,
            tax_percent_over_base: null,
            term: "",
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getWithholding () {
            const { data, error } = await useFetch(
                "/api/witholdingtax",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
                        // this.list = response._data.data.data.map((val) => {
                        //     return {
                        //         id: val.id,
                        //         range_from: val.range_from,
                        //         range_to: val.range_to,
                        //         tax_base: val.tax_base,
                        //         tax_amount: val.tax_amount,
                        //         tax_percent_over_base: val.tax_percent_over_base,
                        //         tax_percent_over_base: JSON.parse(val.tax_percent_over_base),
                        //         tax_percent_over_base_view: JSON.parse(val.tax_percent_over_base_view).toString(),
                        //     }
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

        async addWithholding () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/witholdingtax",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },d
                    body: this.withholding,
                    watch: false,
                }
            )
            if (data.value) {
                this.getWithholding()
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
        async editWithholdings () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/witholdingtax/" + this.withholding.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    body: this.withholding,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getWithholding()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deleteWithholding (id : number) {
            const { data, error } = await useFetch(
                "/api/witholdingtax/" + id,
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
                this.getWithholding()
                return data
            } else if (error.value) {
                return error
            }
        },

        reset () {
            this.withholding = {
                id: null,
                range_from: null,
                range_to: null,
                tax_base: null,
                tax_amount: null,
                tax_percent_over_base: null,
                term: "",
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
