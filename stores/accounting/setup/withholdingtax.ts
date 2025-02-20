import { defineStore } from "pinia"

export const useWithholdingTaxStore = defineStore("useWithholdingTaxStore", {
    state: () => ({
        withholdingTax: {
            id: null,
            account: {},
            wtax_name: null,
            account_id: null,
            vat_type: null,
            wtax_percentage: null
        },
        list: [],
        chart: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            list: false,
            chart: false,
            show: false,
            edit: false,
            delete: false
        },
        isEdit: false
    }),

    actions: {
        async getWithholdingTaxes () {
            this.isLoading.list = true
            const { data, error } = await useAccountingApi(
                "/api/withholding-tax",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        this.list = response._data.data
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

        async getChart () {
            this.isLoading.chart = true
            const { data, error } = await useAccountingApi(
                "/api/chart-of-accounts",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.chart = false
                        this.chart = response._data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createWithholdingTax () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/withholding-tax",
                {
                    method: "POST",
                    body: this.withholdingTax,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getWithholdingTaxes()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editWithholdingTax () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/withholding-tax/" + this.withholdingTax.id,
                {
                    method: "PUT",
                    body: this.withholdingTax,
                    watch: false,
                }
            )
            if (data.value) {
                this.getWithholdingTaxes()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteWithholdingTax (id) {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/withholding-tax/" + id,
                {
                    method: "DELETE",
                    body: this.withholdingTax,
                    watch: false,
                }
            )
            if (data.value) {
                this.getWithholdingTaxes()
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

        reset () {
            this.withholdingTax = {
                id: null,
                account: {},
                wtax_name: null,
                account_id: null,
                vat_type: null,
                wtax_percentage: null
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
