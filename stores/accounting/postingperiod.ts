import { defineStore } from "pinia"

export const usePostingPeriodStore = defineStore("postingPeriodStore", {
    state: () => ({
        postingPeriod: {
            period_id: null,
            period_start: null,
            period_end: null,
            status: "open"
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
        async getPostingPeriods () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/v1/posting-period",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data
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

        async createPostingPeriod () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/v1/posting-period",
                {
                    method: "POST",
                    body: this.postingPeriod,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getPostingPeriods()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editPostingPeriod () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/v1/posting-period/" + this.postingPeriod.period_id,
                {
                    method: "PATCH",
                    body: this.postingPeriod,
                    watch: false,
                }
            )
            if (data.value) {
                this.getPostingPeriods()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deletePostingPeriod (id: number) {
            const { data, error } = await useAccountingApi(
                "/api/v1/posting-period/" + id,
                {
                    method: "DELETE",
                    body: this.postingPeriod,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getPostingPeriods()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.postingPeriod = {
                period_id: null,
                period_start: null,
                period_end: null,
                status: "active"
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
