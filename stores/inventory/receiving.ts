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
        items: {
            isLoading: false,
            isLoaded: false,
            details: {} as ReceivingItem,
            list: [],
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
                "/api/material-receiving/all-request",
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
                "/api/material-receiving/my-request",
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
                "/api/material-receiving/my-approvals",
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
                "/api/material-receiving/warehouse/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.receiving.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.receiving.isLoading = false
                        if (response.ok) {
                            this.receiving.details = response._data.data.data
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
                "/api/material-receiving/resource",
                {
                    method: "POST",
                    body: {
                        ...this.receiving.form,
                        details: this.receiving.details, // Include details
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
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useInventoryApi(
                "/api/approvals/approve/RequestStock/" + id,
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
                "/api/approvals/disapprove/RequestStock/" + id,
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
        async acceptQtyRemarks (id: number, data: { acceptedQty: number, remarks: string }) {
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

        async autoSaveReceivingData (id: number, payload: Record<string, any>) {
            this.errorMessage = ""
            this.successMessage = ""

            try {
                await useInventoryApi(
                    `/api/material-receiving/${id}/save-details`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(payload),
                        watch: false,
                        onRequest: () => {
                            this.receiving.isLoading = true
                        },
                        onResponseError: ({ response }: any) => {
                            this.receiving.isLoading = false
                            // Handle validation errors (422)
                            if (response.status === 422 && response._data.errors) {
                                const errorMessages = Object.values(response._data.errors).flat().join(", ")
                                this.errorMessage = `Validation error: ${errorMessages}`
                            } else {
                                this.errorMessage = response._data.message || "Auto-save failed"
                            }
                            throw new Error(this.errorMessage)
                        },
                        onResponse: ({ response }: any) => {
                            this.receiving.isLoading = false
                            if (response.ok && response._data.success) {
                                // Update the local receiving details with the refreshed data from backend
                                if (response._data.data && this.receiving.details) {
                                    // Update supplier_id in the main object if it was updated
                                    if (payload.supplier_id !== undefined) {
                                        this.receiving.details.supplier_id = response._data.data.supplier_id
                                    }

                                    // Update metadata with the saved values
                                    if (!this.receiving.details.metadata) {
                                        this.receiving.details.metadata = {}
                                    }

                                    // Merge the updated metadata from the response
                                    this.receiving.details.metadata = merge(this.receiving.details.metadata, response._data.data.metadata)
                                }

                                // Optionally show success message (uncomment if needed)
                                this.successMessage = response._data.message

                                return response._data
                            } else {
                                this.errorMessage = response._data.message || "Auto-save failed"
                                throw new Error(this.errorMessage)
                            }
                        },
                    }
                )
            } catch (error) {
                this.receiving.isLoading = false
                throw error
            }
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
