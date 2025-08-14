import { defineStore } from "pinia"

export interface PriceQuotationItemForm {
    price_quotation_id: number,
    item_id: number,
    item_description: string,
    specification: string,
    quantity: number,
    uom: string,
    preferred_brand: string,
    actual_brand: string,
    unit_price: number,
    remarks_during_canvass: string
}
export interface PriceQuotationForm {
    supplier_id: number,
    date?: string,
    address?: string,
    contact_person?: string,
    contact_no?: string,
    conso_reference_no?: string,
    quotation_no?: string,
    items: Array<PriceQuotationItemForm>
}
export interface PriceQuotationMetadata {
    date?: string,
    address?: string,
    contact_person?: string,
    contact_no?: string,
    conso_reference_no?: string,
    quotation_no?: string,
}
export interface PriceQuotationItemMetadata {
    item_description?: string,
    specification?: string,
    qty?: number,
    uom?: string,
    preferred_brand?: string,
}
export interface PriceQuotationItemDisplay {
    id: number,
    price_quotation_id: number,
    item_id: number,
    actual_brand?: string,
    unit_price?: number,
    remarks_during_canvass?: string,
    created_at: string,
    updated_at: string,
    request_stock_item?: {
        id: number,
        item_profile: {
            id: number,
            name: string,
            description: string,
        },
        uom: {
            id: number,
            name: string,
        },
    }
}
export interface PriceQuotationDisplay {
    id: number,
    request_procurement_id: number,
    supplier_id: number,
    metadata?: any,
    created_at: string,
    updated_at: string,
    supplier?: {
        id: number,
        name: string,
        address: string,
        contact_person: string,
        contact_number: string,
    },
    items: Array<PriceQuotationItemDisplay>
}

export const usePriceQuotationStore = defineStore("priceQuotationStore", {
    state: () => ({
        allPQList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        createRequest: {
            isLoading: false,
            isLoaded: false,
            list: [],
            details: {},
            form: {
                supplier_id: 0,
                date: "",
                address: "",
                contact_person: "",
                contact_no: "",
                conso_reference_no: "",
                quotation_no: "",
                items: []
            } as PriceQuotationForm,
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        editRequest: {
            isLoading: false,
            isLoaded: false,
            details: {} as any,
            form: {
                supplier_id: 0,
                date: "",
                address: "",
                contact_person: "",
                contact_no: "",
                conso_reference_no: "",
                quotation_no: "",
                items: []
            } as PriceQuotationForm,
            params: {},
            pagination: {},
        },
        priceQuotationList: {
            isLoading: false,
            isLoaded: false,
            list: [] as PriceQuotationDisplay[],
            details: {},
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        priceQuotation: {
            isLoading: false,
            isLoaded: false,
            list: [],
            details: {},
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        selectedItem: "",
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getQuotationsForCanvass (id: number) {
            await useInventoryApi(
                "/api/procurement-request/quotations-for-canvass/" + id,
                {
                    method: "GET",
                    params: this.priceQuotation.params,
                    onRequest: () => {
                        this.priceQuotation.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.priceQuotation.isLoading = false
                        this.priceQuotation.errorMessage = response?._data?.message || "Unexpected server error while creating canvass summary."
                        throw new Error(this.priceQuotation.errorMessage || "Unexpected server error while creating canvass summary.")
                    },
                    onResponse: ({ response }) => {
                        this.priceQuotation.isLoading = false
                        if (response.ok) {
                            this.priceQuotation.isLoaded = true
                            this.priceQuotation.list = response._data.data
                            this.priceQuotation.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async storeRequest (id: any) {
            this.clearMessages()
            await useInventoryApiO(`/api/procurement-request/${id}/create-price-quotation`, {
                method: "POST",
                body: this.createRequest.form,
                onRequest: () => {
                    this.createRequest.isLoading = true
                },
                onResponse: ({ response }) => {
                    if (response.ok) {
                        this.reloadResources()
                        this.createRequest.successMessage = response._data.message
                        this.createRequest.form = {
                            supplier_id: 0,
                            date: "",
                            address: "",
                            contact_person: "",
                            contact_no: "",
                            conso_reference_no: "",
                            quotation_no: "",
                            items: []
                        }
                    }
                    this.createRequest.isLoading = false
                },
                onResponseError: ({ response }) => {
                    this.createRequest.isLoading = false
                    this.createRequest.errorMessage = response?._data?.message || "Unexpected server error while creating price quotation."
                    throw new Error(this.createRequest.errorMessage || "Unexpected server error while creating price quotation.")
                }
            })
        },
        async getPriceQuotationDetails (id: number) {
            return await useInventoryApiO(
                "/api/procurement-request/price-quotation/" + id,
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

        async updatePriceQuotationItem (itemId: number, itemData: Partial<PriceQuotationItemForm>) {
            try {
                this.priceQuotationList.isLoading = true
                this.clearMessages()

                return await useInventoryApiO(
                    `/api/procurement-request/price-quotation-item/${itemId}`,
                    {
                        method: "PUT",
                        body: itemData,
                        watch: false,
                        onResponse: ({ response }) => {
                            this.priceQuotationList.isLoading = false
                            if (response.ok) {
                                this.successMessage = response._data.message
                                return response._data.data
                            } else {
                                this.errorMessage = response._data.message
                                throw new Error(response._data.message)
                            }
                        },
                    }
                )
            } catch (error) {
                this.priceQuotationList.isLoading = false
                this.errorMessage = error.message || "Failed to update price quotation item"
                throw error
            }
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
            this.priceQuotationList.errorMessage = ""
            this.priceQuotationList.successMessage = ""
        },
        reloadResources () {
            const callFunctions = []
            let reloadOne = null
            if (this.priceQuotation.isLoaded) {
                reloadOne = this.priceQuotation.details.id
            }
            if (this.priceQuotationList.isLoaded) {
                callFunctions.push(() => this.getPriceQuotationList(this.priceQuotationList.details.request_procurement_id))
            }

            this.$reset()

            callFunctions.forEach((element) => {
                element()
            })

            if (reloadOne) {
                this.getPriceQuotationList(reloadOne)
            }
        },
    },
})
