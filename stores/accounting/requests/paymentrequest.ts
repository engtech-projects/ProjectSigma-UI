import { defineStore } from "pinia"

export const usePaymentRequestStore = defineStore("paymentRequestStore", {
    state: () => ({
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        myRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        myApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        paymentRequest: {
            isLoading: false,
            id: null,
            prf_no: null,
            stakeholder_id: null,
            request_date: null,
            total: 0,
            descripton: "",
            approvals: [],
            details: [],
            stakeholderInformation: {},
            errorMessage: "",
            successMessage: "",
        },
        vat: null,
        list: [],
        pagination: {},
        getParams: {},
        params: {},
        isLoading: {
            list: false,
            show: false,
            create: false,
            edit: false,
            delete: false
        },
        isEdit: false
    }),
    getters: {},
    actions: {

        async getAllRequests () {
            this.allRequests.isLoaded = true
            await useAccountingApi(
                "/api/npo/resource",
                {
                    method: "GET",
                    params: this.allRequests.params,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allRequests.isLoading = false
                        if (response.ok) {
                            this.allRequests.list = response._data.data.data
                            this.allRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            this.myRequests.isLoaded = true
            await useAccountingApi(
                "/api/npo/my-requests",
                {
                    method: "GET",
                    params: this.myRequests.params,
                    onRequest: () => {
                        this.myRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myRequests.isLoading = false
                        if (response.ok) {
                            this.myRequests.list = response._data.data.data
                            this.myRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        } else {
                            this.myRequests.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovals () {
            this.myApprovals.isLoaded = true
            await useAccountingApi(
                "/api/npo/my-approvals",
                {
                    method: "GET",
                    params: this.myApprovals.params,
                    onRequest: () => {
                        this.myApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myApprovals.isLoading = false
                        if (response.ok) {
                            this.myApprovals.list = response._data.data
                        } else {
                            this.myApprovals.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async addPaymentRequest () {
            this.paymentRequest.successMessage = ""
            this.paymentRequest.errorMessage = ""
            await useAccountingApi(
                "/api/payment-requests",
                {
                    method: "POST",
                    body: this.paymentRequest,
                    watch: false,
                    onRequest: () => {
                        this.paymentRequest.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        this.paymentRequest.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.paymentRequest.isLoading = false
                        if (response.ok) {
                            this.reloadResources()
                            this.paymentRequest.successMessage = response._data.message
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },

        async getPaymentRequest (id:any) {
            this.isLoading.show = true
            const { data, error } = await useAccountingApi(
                "/api/payment-requests/" + id,
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

        async getVat () {
            this.isLoading.show = true
            const { data, error } = await useAccountingApi(
                "/api/vat-value",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading.show = false
                        this.vat = response._data.vat
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
            this.paymentRequest.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/payment-requests/" + this.paymentRequest.id,
                {
                    method: "PATCH",
                    body: this.paymentRequest,
                    watch: false,
                    onRequest: () => {
                        this.paymentRequest.isLoading = true
                    },
                }
            )
            this.paymentRequest.isLoading = false
            if (data.value) {
                this.paymentRequest.successMessage = "Payment request successfully updated."
                return data
            } else if (error.value) {
                this.paymentRequest.errorMessage = error.value.data.message
                return error
            }
        },
        async editForm (id:any, type:any) {
            this.isLoading.show = true
            this.isLoading.edit = true
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
                this.paymentRequest.successMessage = "Form successfully updated"
                return data
            } else if (error.value) {
                this.isLoading.edit = false
                this.paymentRequest.errorMessage = error.value.data.message
                return error
            }
        },
        reloadResources () {
            const backup = this.paymentRequest.approvals
            const callFunctions = []
            if (this.allRequests.isLoaded) {
                callFunctions.push(this.getAllRequests)
            }
            if (this.myRequests.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            if (this.myApprovals.isLoaded) {
                callFunctions.push(this.getMyApprovals)
            }
            this.$reset()
            this.paymentRequest.approvals = backup
            callFunctions.forEach((element) => {
                element()
            })
        },
        generatePrNo () {
            return "PR-" + randomInt(100001, 999999) + "-" + randomInt(1000, 9999)
        },
    },
})
