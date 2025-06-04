import { defineStore } from "pinia"

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const APPROVALS = "Purchase Order"
export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]
export const usePurchaseOrderStore = defineStore("purchaseOrderStore", {
    state: () => ({
        itemList: {
            isLoading: false,
            isLoaded: false,
            data: {
                date: "February 7, 2025",
                supplier_name: "Pate and Parks Trading",
                payment_terms: "Ratione est irure",
                availability: "Available",
                delivery_terms: "Nihil laboris omnis",
                supplier_address: "Quia culpa eaque min",
                contact_number: "9093115537",
                project_code: "132SA321W",
                name_on_the_receipt: "Incidunt deserunt q",
                rs_no: "132SA321W",
                deliver_to: "Velit eos suscipit",
                equipment_no: "132SA321W",
                po_number: "132SA321W",
                total_amount: "295,000.00",
                list: [
                    {
                        item_description: "Foods",
                        specification: "",
                        qty: "13",
                        unit: "PCS",
                        apqs: "",
                        unit_price: "160,000.00",
                        net_vat: "185",
                        input_vat: "22",
                        net_amount: "295,000.00",
                    },
                ],
                approvals: [
                    {
                        type: "HEAD",
                        status: "Approved",
                        selector_type: null,
                        user_id: "19",
                        remarks: null,
                        date_approved: "December 10, 2024 05:04 AM",
                        date_approved_human: "December 10, 2024 05:04 AM",
                        date_denied: null,
                        date_denied_human: null,
                        employee_name: "RICHE CAPILITAN DALAUTA",
                        employee_position: "DIRECTOR",
                        user_name: "riche",
                        employee_signature: null
                    }
                ],
            },
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        allRequests: {
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
        async getOne (id: number) {
            return await useInventoryApiO(
                "/api/purchase-order/resource/" + id,
                {
                    method: "GET",
                    params: this.itemList.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.itemList.data = response._data.data
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getAllRequests () {
            await useInventoryApi(
                "/api/procurement/procurement/all-request",
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
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
    },
})
