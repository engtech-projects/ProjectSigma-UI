import { defineStore } from "pinia"

export const PREPAYMENT_IN_FULL = "PREPAYMENT IN FULL"
export const CREDIT_7_DAYS = "CREDIT 7 DAYS"
export const CREDIT_15_DAYS = "CREDIT 15 DAYS"
export const CREDIT_30_DAYS = "CREDIT 30 DAYS"
export const PROGRESS_BILLING = "PROGRESS BILLING"
export const DOWNPAYMENT_50_50 = "50% DOWNPAYMENT, 50% UPON PICK UP"
export const DOWNPAYMENT_30_70 = "30% DOWNPAYMENT, 70% UPON PICK UP"
export const TERMS = [
    PREPAYMENT_IN_FULL,
    CREDIT_7_DAYS,
    CREDIT_15_DAYS,
    CREDIT_30_DAYS,
    PROGRESS_BILLING,
    DOWNPAYMENT_50_50,
    DOWNPAYMENT_30_70
]

export const AVAILABLE = "AVAILABLE"
export const UNAVAILABLE = "UNAVAILABLE"
export const ORDER_BASIS_7_DAYS = "ORDER BASIS 7 DAYS"
export const ORDER_BASIS_10_DAYS = "ORDER BASIS 10 DAYS"
export const AVAILABILITY = [
    AVAILABLE,
    UNAVAILABLE,
    ORDER_BASIS_7_DAYS,
    ORDER_BASIS_10_DAYS,
]

export const PICKUP = "PICKUP"
export const DELIVERED_ON_SITE = "DELIVERED ON SITE"
export const FOR_SHIPMENT = "FOR SHIPMENT"
export const DELIVERY_TERMS = [
    PICKUP,
    DELIVERED_ON_SITE,
    FOR_SHIPMENT,
]

export interface CanvassSummaryDetails {
    id?: string;
    price_quotation_id: string;
    cs_number?: string;
    terms_of_payment: string;
    availability: string;
    delivery_terms: string;
    remarks: string;
    metadata?: any;
    approvals?: any[];
    request_status?: string;
    created_by?: string;
    created_at?: string;
    updated_at?: string;
    // Additional fields from price quotation relationship
    date?: string;
    project_code?: string;
    conso_reference_no?: string;
}

export interface CanvassSummaryItems {
    id?: string;
    request_canvass_summary_id?: string;
    item_id: string;
    metadata?: any;
    specification?: string;
    qty?: string;
    unit?: string;
    total_amount?: string;
    remarks?: string;
}

export interface SupplierDetails {
    supplier_id: string;
    sup_address: string;
    contact_no: string;
    contact_person: string;
    remarks: string;
}

export interface CanvassSummaryForm {
    price_quotation_id: number;
    terms_of_payment: string;
    availability: string;
    delivery_terms: string;
    remarks: string;
    items: any[];
    approvals: any[];
}

export const useCanvassSummaryStore = defineStore("canvassSummaryStore", {
    state: () => ({
        canvassSummary: {
            isLoading: false,
            isLoaded: false,
            form: {} as CanvassSummaryDetails,
            items: [] as Array<CanvassSummaryItems>,
            details: null as CanvassSummaryDetails | null,
            params: {},
            list: [] as Array<CanvassSummaryDetails>,
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        createRequest: {
            isLoading: false,
            isLoaded: false,
            form: {
                price_quotation_id: 0,
                terms_of_payment: "",
                availability: "",
                delivery_terms: "",
                remarks: "",
                items: [],
                approvals: []
            } as CanvassSummaryForm,
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        myApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [] as Array<CanvassSummaryDetails>,
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [] as Array<CanvassSummaryDetails>,
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        approvalList: {
            isLoading: false,
            isLoaded: false,
            list: [] as Array<CanvassSummaryDetails>,
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        items: {
            isLoading: false,
            isLoaded: false,
            list: [] as Array<CanvassSummaryItems>,
        },
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getAllRequests () {
            await useInventoryApi(
                "/api/procurement-request/canvass-summary/all-request",
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

        async getMyApprovals () {
            await useInventoryApi(
                "/api/procurement-request/canvass-summary/my-approvals",
                {
                    method: "GET",
                    params: this.myApprovals.params,
                    onRequest: () => {
                        this.myApprovals.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.myApprovals.isLoading = false
                        this.myApprovals.errorMessage = response?._data?.message || "Unexpected server error while fetching my approvals."
                        throw new Error(this.errorMessage || "Unexpected server error while fetching my approvals.")
                    },
                    onResponse: ({ response }) => {
                        this.myApprovals.isLoading = false
                        if (response.ok) {
                            this.myApprovals.list = response._data.data
                            this.myApprovals.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },

        async getCanvassSummaryResource () {
            await useInventoryApi(
                "/api/procurement-request/canvass-summary/resource",
                {
                    method: "GET",
                    params: this.canvassSummary.params,
                    onRequest: () => {
                        this.canvassSummary.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.canvassSummary.isLoading = false
                        this.canvassSummary.errorMessage = response?._data?.message || "Unexpected server error while fetching canvass summary."
                        throw new Error(this.canvassSummary.errorMessage || "Unexpected server error while fetching canvass summary.")
                    },
                    onResponse: ({ response }: any) => {
                        this.canvassSummary.isLoading = false
                        if (response.ok) {
                            this.canvassSummary.list = response._data.data
                            this.canvassSummary.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                            this.canvassSummary.isLoaded = true
                        }
                    },
                }
            )
        },

        async getOne (id: number) {
            return await useInventoryApiO(
                "/api/procurement-request/canvass-summary/" + id,
                {
                    method: "GET",
                    params: this.canvassSummary.params,
                    onRequest: () => {
                        this.canvassSummary.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.canvassSummary.isLoading = false
                        this.canvassSummary.errorMessage = response?._data?.message || "Unexpected server error while fetching canvass summary."
                        throw new Error(this.canvassSummary.errorMessage || "Unexpected server error while fetching canvass summary.")
                    },
                    onResponse: ({ response }: any) => {
                        this.canvassSummary.isLoading = false
                        if (response.ok) {
                            this.canvassSummary.details = response._data.data
                            this.canvassSummary.isLoaded = true
                            return response._data.data
                        }
                    },
                }
            )
        },

        async fetchCanvassSummaryByWarehouseId (id: any) {
            await useInventoryApi(
                "/api/procurement-request/canvass-summary/warehouse/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.canvassSummary.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.canvassSummary.isLoading = false
                        this.canvassSummary.errorMessage = response?._data?.message || "Unexpected server error while creating canvass summary."
                        throw new Error(this.canvassSummary.errorMessage || "Unexpected server error while creating canvass summary.")
                    },
                    onResponse: ({ response }) => {
                        this.canvassSummary.isLoading = false
                        if (response.ok) {
                            this.canvassSummary.details = response._data.data
                        }
                    },
                }
            )
        },

        async storeRequest () {
            this.clearMessages()
            await useInventoryApiO(
                "/api/procurement-request/canvass-summary/resource",
                {
                    method: "POST",
                    body: this.createRequest.form,
                    watch: false,
                    onRequest: () => {
                        this.createRequest.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createRequest.isLoading = false
                        this.createRequest.errorMessage = response?._data?.message || "Unexpected server error while creating canvass summary."
                        throw new Error(this.createRequest.errorMessage || "Unexpected server error while creating canvass summary.")
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.createRequest.successMessage = response._data.message
                        }
                        this.createRequest.isLoading = false
                    },
                }
            )
        },

        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useInventoryApi(
                "/api/approvals/approve/RequestCanvassSummary/" + id,
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
                "/api/approvals/disapprove/RequestCanvassSummary/" + id,
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

        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
            this.approvalList.errorMessage = ""
            this.approvalList.successMessage = ""
        },

        resetForm () {
            this.canvassSummary.form = {} as CanvassSummaryDetails
            this.canvassSummary.items = []
            this.canvassSummary.details = null
            this.createRequest.form = {
                price_quotation_id: 0,
                terms_of_payment: "",
                availability: "",
                delivery_terms: "",
            } as CanvassSummaryForm
        },

        reloadResources () {
            const backup = this.approvalList.list
            const callFunctions = []
            if (this.myRequests.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            if (this.myApprovals.isLoaded) {
                callFunctions.push(this.getMyApprovals)
            }
            if (this.canvassSummary.isLoaded) {
                callFunctions.push(this.getCanvassSummaryResource)
            }

            this.$reset()
            this.approvalList.list = backup

            callFunctions.forEach((fn) => {
                fn()
            })
        },
    },
})
