import { defineStore } from "pinia"

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const APPROVALS = "Request BOM"

export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]
export interface NewItemBOM {
    id: number,
    request_bom_id: number,
    item_id: number,
    uom_id: number,
    unit_price: number,
    quantity: number,
}

export const useBOMStore = defineStore("BOMStore", {
    state: () => ({
        isEdit: false,
        bomItems: [] as Array<NewItemBOM>,
        bomRequest: {
            isLoading: false,
            isLoaded: false,
            list: [],
            items: [],
            form: {},
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
        approvals: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getApprovalByName (approvalName: String) {
            const { data } = await useHRMSApi<any>(
                "/api/get-form-requests/" + approvalName,
                {
                    method: "GET",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.approvals = response._data.data.approvals.map((approv: any) => {
                                return {
                                    type: approv.type,
                                    status: "Pending",
                                    user_id: approv.user_id,
                                    userselector: approv.userselector,
                                    date_approved: "",
                                    remarks: "",
                                    employee: approv.employee,
                                }
                            })
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                return data.value.data.approvals.map((approv: any) => {
                    return {
                        type: approv.type,
                        status: "Pending",
                        user_id: approv.user_id,
                        userselector: approv.userselector,
                        date_approved: "",
                        remarks: "",
                        employee: approv.employee,
                    }
                })
            }
        },
        async getAllRequests () {
            await useInventoryApi(
                "/api/bom/new-request/all-request",
                {
                    method: "GET",
                    params: this.allRequests.params,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allRequests.isLoading = false
                        if (response.ok) {
                            this.allRequests.isLoaded = true
                            this.allRequests.list = response._data.data.data
                            this.allRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useInventoryApi(
                "/api/bom/new-request/my-request",
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
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
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
                "/api/bom/new-request/my-approvals",
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
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async storeBOM () {
            await useInventoryApi(
                "/api/bom/resource",
                {
                    method: "POST",
                    body: this.bomRequest.form,
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
        async getCurrentBOM () {
            await useInventoryApi(
                "/api/item-profile/list",
                {
                    method: "GET",
                    params: this.bomRequest.params,
                    onRequest: () => {
                        this.bomRequest.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.bomRequest.isLoading = false
                        if (response.ok) {
                            this.bomRequest.isLoaded = true
                            this.bomRequest.list = response._data.data.data
                            this.bomRequest.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useInventoryApi(
                "/api/item-profile/new-request/my-approvals",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovals.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
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
                "/api/approvals/approve/RequestItemProfiling/" + id,
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
                "/api/approvals/disapprove/RequestItemProfiling/" + id,
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
        reloadResources () {
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
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
