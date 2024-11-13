import { defineStore } from "pinia"

export const usePaymentRequestStore = defineStore("paymentRequestStore", {
    state: () => ({
        paymentRequest: {
            id: null,
            prf_no: null,
            stakeholder_id: null,
            request_date: null,
            total: 0,
            descripton: "",
            details: []
        },
        list: [],
        pagination: {},
        getParams: {},
        params: {
            status: ""
        },
        errorMessage: "",
        successMessage: "",
        isLoading: {
            list: false,
            show: false,
            create: false,
            edit: false,
            delete: false
        },
        isEdit: false
    }),
    actions: {
        async getPaymentRequests () {
            this.isLoading.list = true
            const { data, error } = await useAccountingApi(
                "/api/payment-request",
                {
                    method: "GET",
                    params: this.params,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
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

        async createPaymentRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            this.isLoading.create = true
            await useAccountingApi(
                "/api/payment-request",
                {
                    method: "POST",
                    body: this.paymentRequest,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.create = false
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.successMessage = "New payment request successfully created."
                            this.getPaymentRequests()
                        }
                    },
                }
            )
        },

        async getPaymentRequest (id:any) {
            this.isLoading.show = true
            const { data, error } = await useAccountingApi(
                "/api/payment-request/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading.show = false
                        this.paymentRequest = response._data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async editPaymentRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            this.isLoading.edit = true
            const { data, error } = await useAccountingApi(
                "/api/payment-request/" + this.paymentRequest.id,
                {
                    method: "PATCH",
                    body: this.paymentRequest,
                    watch: false,
                }
            )
            this.isLoading.edit = false
            if (data.value) {
                this.getPaymentRequests()
                this.successMessage = "Payment request successfully updated."
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async editForm (id:any, type:any) {
            this.isLoading.show = true
            this.isLoading.edit = true
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/form/" + type + "/" + id,
                {
                    method: "PUT",
                    body: {},
                    watch: false,
                }
            )
            if (data.value) {
                this.isLoading.show = false
                this.isLoading.edit = false
                this.getPaymentRequests()
                this.successMessage = "Form successfully updated"
                return data
            } else if (error.value) {
                this.isLoading.edit = false
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async approve () {
            await this.editForm(this.paymentRequest.form?.id, "approved")
            this.paymentRequest.form.status = "approved"
        },

        async issue () {
            await this.editForm(this.paymentRequest.form?.id, "issued")
            this.paymentRequest.form.status = "issued"
        },

        async reject () {
            await this.editForm(this.paymentRequest.form?.id, "rejected")
            this.paymentRequest.form.status = "rejected"
        },

        reset () {
            this.paymentRequest = {
                id: null,
                prf_no: null,
                stakeholder_id: null,
                request_date: null,
                total: 0,
                descripton: "",
                details: []
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
