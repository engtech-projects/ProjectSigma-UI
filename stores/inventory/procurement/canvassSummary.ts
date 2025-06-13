import { defineStore } from "pinia"

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const APPROVALS = "Price Quotation"
export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]

export const PREPAYMENT_IN_FULL = "PREPAYMENT IN FULL"
export const CREDIT_7_DAYS = "CREDIT 7 DAYS"
export const CREDIT_15_DAYS = "CREDIT 15 DAYS"
export const CREDIT_30_DAYS = "CREDIT 30 DAYS"
export const PROGRESS_BILLING = "PROGRESS BILLING"
export const TERMS = [
    PREPAYMENT_IN_FULL,
    CREDIT_7_DAYS,
    CREDIT_15_DAYS,
    CREDIT_30_DAYS,
    PROGRESS_BILLING
]

export const AVAILABLE = "AVAILABLE"
export const UNAVAILABLE = "UNAVAILABLE"
export const ORDER_BASIS_7_DAYS = "ORDER BASIS 7 DAYS"
export const ORDER_BASIS_15_DAYS = "ORDER BASIS 15 DAYS"
export const ORDER_BASIS_30_DAYS = "ORDER BASIS 30 DAYS"
export const AVAILABILITY = [
    AVAILABLE,
    UNAVAILABLE,
    ORDER_BASIS_7_DAYS,
    ORDER_BASIS_15_DAYS,
    ORDER_BASIS_30_DAYS,
]

export const PICKUP = "PICKUP"
export const DELIVERED_ON_SITE = "DELEIVERED ON SITE"
export const FOR_SHIPMENT = "FOR SHIPMENT"
export const DELIVERY_TERMS = [
    PICKUP,
    DELIVERED_ON_SITE,
    FOR_SHIPMENT,
]
export interface CanvassSummaryDetails {
    date: string;
    rs_no: string;
    project_code: string;
    proj_address: string;
    equipment_no: string;
    cs_number: string;
    conso_reference_no: string;
}
export interface CanvassSummaryItems {
    id: string;
    item_id: string;
    specification: string;
    qty: string;
    unit: string;
    total_amount: string;
    terms_and_conditions: string;
    availability: string;
    delivery_terms: string;
    remarks: string;
}
export interface SupplierDetails {
    supplier_id: string;
    sup_address: string;
    contact_no: string;
    contact_person: string;
    unit_price: string;
    remarks: string;
}

export const useCanvassSummaryStore = defineStore("canvassSummaryStore", {
    state: () => ({
        canvassSummary: {
            isLoading: false,
            isLoaded: false,
            form: {} as CanvassSummaryDetails,
            items: [] as Array<CanvassSummaryItems>,
            params: {
                department_id: null as null | Number,
            },
            list: [] as Array<CanvassSummaryDetails>,
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
                "/api/canvass-summary/all-request",
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
                "/api/canvass-summary/my-request",
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
                "/api/canvass-summary/my-approvals",
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
        async fetchQuotations () {
            await useInventoryApi(
                "/api/canvass-summary/resource",
                {
                    method: "GET",
                    params: this.canvassSummary.params,
                    onRequest: () => {
                        this.canvassSummary.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.canvassSummary.isLoading = false
                        if (response.ok) {
                            this.canvassSummary.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchCanvassSummaryDetails (id: any) {
            await useInventoryApi(
                "/api/canvass-summary/resource/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.canvassSummary.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.canvassSummary.isLoading = false
                        if (response.ok) {
                            this.canvassSummary.details = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchCanvassSummaryByWarehouseId (id: any) {
            await useInventoryApi(
                "/api/canvass-summary/warehouse/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.canvassSummary.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.canvassSummary.isLoading = false
                        if (response.ok) {
                            this.canvassSummary.details = response._data.data
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
                "/api/canvass-summary/resource",
                {
                    method: "POST",
                    body: {
                        ...this.canvassSummary.form,
                        details: this.canvassSummary.details, // Include details
                    },
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
        async getOne (id: number) {
            return await useInventoryApiO(
                "/api/canvass-summary/resource/" + id,
                {
                    method: "GET",
                    params: this.canvassSummary.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.canvassSummary.details = response._data.data
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useInventoryApi(
                "/api/approvals/approve/CanvassSummary/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        }
                    },
                }
            )
        },
        async denyApprovalForm (id: string) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useInventoryApi(
                "/api/approvals/disapprove/CanvassSummary/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        }
                    },
                }
            )
        },
        async acceptAllItem (id: number, data: { remarks: string }) {
            this.errorMessage = ""
            this.successMessage = ""

            await useInventoryApi(
                `/api/canvass-summary/item/${id}/accept-all`,
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
        async acceptQtyRemarks (id: number, data: { acceptedQty: number, remarks: string }) {
            this.errorMessage = ""
            this.successMessage = ""

            await useInventoryApi(
                `/api/canvass-summary/item/${id}/accept-with-details`,
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
                `/api/canvass-summary/item/${id}/reject`,
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
