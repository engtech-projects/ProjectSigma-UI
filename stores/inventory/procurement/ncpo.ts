import { defineStore } from "pinia"

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const APPROVALS = "NCPO"
export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]

export interface NCPODetails {
    ncpo_no: String,
    po_number: String,
    po_date: String,
    project_id: String,
    equipment_no: String,
    date: String,
    justification: String,
    total: String,
    new_po_total: String,
    items: any,
    approvals: any,
}
export interface NCPOList {
    item_id: string,
    item_description: String,
    specification: String,
    quantity: String,
    uom: String,
    supplier_id: String,
    unit_price: String,
    net_of_vat: String,
    input_vat: String,
    gross_amount: String,
}

export const useNcpoStore = defineStore("ncpoStore", {
    state: () => ({
        ncpoRequest: {
            isLoading: false,
            isLoaded: false,
            details: {
                isLoading: false,
                isLoaded: false,
                list: [],
                params: {},
            },
            list: [] as Array<NCPOList>,
            form: {} as NCPODetails,
            items: [] as Array<NCPOList>,
            params: {
                project_id: null as null | Number,
            },
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
                "/api/procurement/ncpo/all-request",
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
                "/api/procurement/ncpomy-request",
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
                "/api/procurement/ncpomy-approvals",
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
                "/api/procurement/ncpo/resource",
                {
                    method: "GET",
                    params: this.ncpoRequest.params,
                    onRequest: () => {
                        this.ncpoRequest.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.ncpoRequest.isLoading = false
                        if (response.ok) {
                            this.ncpoRequest.list = response._data.data
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
                        this.ncpoRequest.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.ncpoRequest.isLoading = false
                        if (response.ok) {
                            this.ncpoRequest.details = response._data.data
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
                "/api/procurement/ncpo/resource",
                {
                    method: "POST",
                    body: {
                        ...this.ncpoRequest.form,
                        details: this.ncpoRequest.details, // Include details
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
                "/api/procurement/ncpo/resource/" + id,
                {
                    method: "GET",
                    params: this.ncpoRequest.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.ncpoRequest.details = response._data.data
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
                "/api/approvals/approve/NCPO/" + id,
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
                "/api/approvals/disapprove/NCPO/" + id,
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
