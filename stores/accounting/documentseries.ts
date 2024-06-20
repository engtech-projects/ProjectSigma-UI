import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useDocumentSeriesStore = defineStore("documentSeriesStore", {
    state: () => ({
        documentSeries: {
            series_id: null,
            series_scheme: null,
            series_description: null,
            next_number: null,
            transaction_type_id: null,
            status: "active"
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
        async getSeries () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/v1/document-series",
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
                        this.list = response._data.document_series
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

        async createSeries () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/v1/document-series",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.documentSeries,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getSeries()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editSeries () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/v1/document-series/" + this.documentSeries.series_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.documentSeries,
                    watch: false,
                }
            )
            if (data.value) {
                this.getSeries()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteSeries (id: number) {
            const { data, error } = await useFetch(
                "/api/v1/document-series/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.documentSeries,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getSeries()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.documentSeries = {
                series_id: null,
                series_scheme: null,
                series_description: null,
                next_number: null,
                transaction_type_id: null,
                status: "active",
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
