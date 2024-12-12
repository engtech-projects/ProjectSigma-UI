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
    request_to: String,
    conso_period: String,
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
            this.$reset()
        },
    },
})
