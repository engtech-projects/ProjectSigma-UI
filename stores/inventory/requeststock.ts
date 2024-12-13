import { defineStore } from "pinia"

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const APPROVALS = "Request Stocks"
export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]
export interface RsDetails {
    office_project: String,
    equipment_no: String,
    list: any,
    project_address: String,
    deliver_to: String,
    date_needed: String,
    conso_period: String,
    request_to: String,
    contact_number: String,
    remarks: String,
    smr: String,
}
export interface RsList {
    quantity: String,
    unit: String,
    sku: String,
    item_description: String,
    specification: String,
    preferred_brand: String,
    reason_for_requests: String,
    turn_over: String,
}

export const useRequestStockStore = defineStore("requestStockStore", {
    state: () => ({
        requestStock: {
            isLoading: false,
            isLoaded: false,
            list: [] as Array<RsList>,
            form: {} as RsDetails,
            details: [] as Array<RsList>,
            params: {},
            pagination: {},
        },
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        approvalList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getAllRequests () {
            await useInventoryApi(
                "/api/request-stock/all-request",
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
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                            this.allRequests.isLoaded = true
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useInventoryApi(
                "/api/request-stock/my-request",
                {
                    method: "GET",
                    params: this.myRequests.params,
                    onRequest: () => {
                        this.myRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myRequests.isLoading = false
                        if (response.ok) {
                            this.myRequests.isLoaded = true
                            this.myRequests.list = response._data.data.data
                            this.myRequests.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovals () {
            await useInventoryApi(
                "/api/request-stock/my-approvals",
                {
                    method: "GET",
                    params: this.myApprovals.params,
                    onRequest: () => {
                        this.myApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myApprovals.isLoading = false
                        if (response.ok) {
                            this.myApprovals.isLoaded = true
                            this.myApprovals.list = response._data.data.data
                            this.myApprovals.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchRs () {
            await useInventoryApi(
                "/api/request-stock/resource",
                {
                    method: "GET",
                    params: this.requestStock.params,
                    onRequest: () => {
                        this.requestStock.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.requestStock.isLoading = false
                        if (response.ok) {
                            this.requestStock.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchRsDetails (id: any) {
            await useInventoryApi(
                "/api/rs/overview/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.requestStock.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.requestStock.isLoading = false
                        if (response.ok) {
                            this.requestStock.details = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async storeRequest () {
            await useInventoryApiO(
                "/api/request-supplier/resource",
                {
                    method: "POST",
                    body: this.requestStock.form,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        reloadResources () {
            const backup = this.approvalList.list
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
            this.approvalList.list = backup
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
