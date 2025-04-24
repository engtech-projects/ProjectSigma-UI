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

export interface PriceQuotationDetails {
    date: string;
    supplier_name: string;
    address: string;
    contact_person: string;
    equipment_no: string;
    conso_reference_no: string;
    contact_number: string;
}
export interface PriceQuotationItems {
    item_id: string;
    specification: string;
    qty: string;
    unit: string;
    preferred_brand: string;
    actual_brand: string;
    unit_price: string;
    remarks: string;
}

export const usePriceQuotationStore = defineStore("priceQuotationStore", {
    state: () => ({
        priceQuotation: {
            isLoading: false,
            isLoaded: false,
            form: {} as PriceQuotationDetails,
            items: [] as Array<PriceQuotationItems>,
            params: {
                department_id: null as null | Number,
            },
            list: [] as Array<PriceQuotationDetails>,
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
                "/api/request-price-quotation/all-request",
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
                "/api/request-price-quotation/my-request",
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
                "/api/request-price-quotation/my-approvals",
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
                "/api/request-price-quotation/resource",
                {
                    method: "GET",
                    params: this.priceQuotation.params,
                    onRequest: () => {
                        this.priceQuotation.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.priceQuotation.isLoading = false
                        if (response.ok) {
                            this.priceQuotation.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchPriceQuotationDetails (id: any) {
            await useInventoryApi(
                "/api/request-price-quotation/resource/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.priceQuotation.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.priceQuotation.isLoading = false
                        if (response.ok) {
                            this.priceQuotation.details = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchPriceQuotationByWarehouseId (id: any) {
            await useInventoryApi(
                "/api/request-price-quotation/warehouse/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.priceQuotation.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.priceQuotation.isLoading = false
                        if (response.ok) {
                            this.priceQuotation.details = response._data.data
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
                "/api/request-price-quotation/resource",
                {
                    method: "POST",
                    body: {
                        ...this.priceQuotation.form,
                        details: this.priceQuotation.details, // Include details
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
                "/api/request-price-quotation/resource/" + id,
                {
                    method: "GET",
                    params: this.priceQuotation.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.priceQuotation.details = response._data.data
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
                "/api/approvals/approve/PriceQuotation/" + id,
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
                "/api/approvals/disapprove/PriceQuotation/" + id,
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
                `/api/request-price-quotation/item/${id}/accept-all`,
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
                `/api/request-price-quotation/item/${id}/accept-with-details`,
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
                `/api/request-price-quotation/item/${id}/reject`,
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
