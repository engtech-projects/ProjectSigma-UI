import { defineStore } from "pinia"

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const APPROVALS = "Receiving"
export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]
export const PREPAYMENT_IN_FULL = "PREPAYMENT IN FULL"
export const CASH = "CASH"
export const CREDIT_7_DAYS = "CREDIT 7 DAYS"
export const CREDIT_15_DAYS = "CREDIT 15 DAYS"
export const CREDIT_30_DAYS = "CREDIT 30 DAYS"
export const PROGRESS_BILLING = "PROGRESS BILLING"
export const TERMS = [
    PREPAYMENT_IN_FULL,
    CASH,
    CREDIT_7_DAYS,
    CREDIT_15_DAYS,
    CREDIT_30_DAYS,
    PROGRESS_BILLING
]

export interface ReceivingDetails {
    reference_no: string;
    supplier: string;
    reference_code: string;
    terms_of_payment: string;
    particulars: string;
    transaction_date: string;
    project_code: string;
    equipment_no: string;
    source_po: string;
    total_net_vat_cost: string;
    total_input_vat: string;
    grand_total: string;
}
export interface ReceivingItem {
    item_id: string;
    item_code: string;
    item_description: string;
    specification: string;
    actual_brand: string;
    qty: string;
    accepted_qty: string;
    uom: string;
    unit_price: string;
    ext_price: string;
    status: string;
    remarks: string;
}
export interface HeaderColumn {
    name: string
    id: string
    style: string
}

export const useReceivingStore = defineStore("receivingStore", {
    state: () => ({
        receiving: {
            isLoading: false,
            isLoaded: false,
            details: {},
            form: {} as ReceivingDetails,
            items: [] as Array<ReceivingItem>,
            params: {},
            list: [] as Array<ReceivingDetails>,
            pagination: {},
        },
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        warehouseReceivings: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getAllRequests () {
            await useInventoryApi(
                "/api/material-receiving/resource",
                {
                    method: "GET",
                    params: this.allRequests.params,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allRequests.isLoading = false
                        if (response.ok) {
                            this.allRequests.list = response._data.data
                            this.allRequests.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                            this.allRequests.isLoaded = true
                        }
                    },
                }
            )
        },
        async fetchReceivings () {
            await useInventoryApi(
                "/api/material-receiving/resource",
                {
                    method: "GET",
                    params: this.receiving.params,
                    onRequest: () => {
                        this.receiving.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.receiving.isLoading = false
                        if (response.ok) {
                            this.receiving.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchReceivingDetails (id: any) {
            await useInventoryApi(
                "/api/material-receiving/resource/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.receiving.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.receiving.isLoading = false
                        if (response.ok) {
                            this.receiving.details = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchReceivingByWarehouseId (id: any) {
            await useInventoryApi(
                "/api/warehouse/material-receivings/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.warehouseReceivings.isLoading = true
                    },
                    onResponseError: ({ response }) => {
                        this.warehouseReceivings.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.warehouseReceivings.isLoading = false
                        if (response.ok) {
                            this.warehouseReceivings.list = response._data.data
                            this.warehouseReceivings.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last
                            }
                        }
                    },
                }
            )
        },
        async getOne (id: number) {
            return await useInventoryApiO(
                "/api/material-receiving/resource/" + id,
                {
                    method: "GET",
                    params: this.receiving.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.receiving.details = response._data.data
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async updateReceiving (id: number, payload: Record<string, any>) {
            this.errorMessage = ""
            this.successMessage = ""

            await useInventoryApiO(
                `/api/material-receiving/resource/${id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                    watch: false,
                    onRequest: () => {
                        this.receiving.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.receiving.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.receiving.isLoading = false
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        }
                    },
                }
            )
        },
        // ITEMS PROCESSING
        async acceptAllItem (id: number, data: any) {
            this.errorMessage = ""
            this.successMessage = ""

            await useInventoryApi(
                `/api/material-receiving/item/${id}/accept-all`,
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    watch: false,
                    onRequest: () => {
                        this.items.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async acceptQtyRemarks (id: number, data: any) {
            this.errorMessage = ""
            this.successMessage = ""

            await useInventoryApi(
                `/api/material-receiving/item/${id}/accept-with-details`,
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    watch: false,
                    onRequest: () => {
                        this.items.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async rejectItem (id: number, data: { remarks: string }) {
            this.errorMessage = ""
            this.successMessage = ""

            await useInventoryApi(
                `/api/material-receiving/item/${id}/reject`,
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    watch: false,
                    onRequest: () => {
                        this.items.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        reloadResources () {
            const callFunctions = []
            if (this.allRequests.isLoaded) {
                callFunctions.push(this.getAllRequests)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
