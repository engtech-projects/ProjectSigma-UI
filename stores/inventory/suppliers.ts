import { defineStore } from "pinia"

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const APPROVALS = "Supplier Approvals"

export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]
export interface SupplierForm {
    supplier_code: string,
    company_name: string,
    company_address: string,
    company_contact_number: string,
    company_email: string,
    contact_person_name: string,
    contact_person_number: string,
    contact_person_designation: string,
    type_of_ownership: string,
    nature_of_business: string,
    products_services: string,
    classification: string,
    tin: string,
    terms_and_conditions: string,
    filled_by: string,
    filled_designation: string,
    filled_date: string,
    attachments: any,
    requirements_complete: string,
    remarks: string,
}
export interface Attachments {
    type: String,
    other_type: String,
    value: any,
}
export const useSupplierStore = defineStore("SupplierStore", {
    state: () => ({
        createRequest: {
            isLoading: false,
            isLoaded: false,
            list: [],
            details: {},
            form: {
                attachments: [] as Array<Attachments>,
            } as SupplierForm,
            params: {},
            pagination: {},
        },
        editRequest: {
            isLoading: false,
            isLoaded: false,
            form: {
                attachments: [] as Array<Attachments>,
            } as SupplierForm,
            params: {},
            pagination: {},
        },
        approvedSuppliers: {
            isLoading: false,
            isLoaded: false,
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
                "/api/request-supplier/resource",
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
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useInventoryApi(
                "/api/request-supplier/my-request",
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
                "/api/request-supplier/my-approvals",
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
        async storeRequest () {
            await useInventoryApiO(
                "/api/request-supplier/resource",
                {
                    method: "POST",
                    body: this.createRequest.form,
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
                "/api/request-supplier/resource/" + id,
                {
                    method: "GET",
                    params: this.createRequest.details.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.createRequest.details.list = response._data.data
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getApprovedSuppliers () {
            await useInventoryApi(
                "/api/request-supplier/approved-request",
                {
                    method: "GET",
                    params: this.approvedSuppliers.params,
                    watch: false,
                    onRequest: () => {
                        this.approvedSuppliers.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.approvedSuppliers.isLoading = false
                        if (response.ok) {
                            this.approvedSuppliers.isLoaded = true
                            this.approvedSuppliers.list = response._data.data
                            this.approvedSuppliers.pagination = {
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
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useInventoryApi(
                "/api/approvals/approve/RequestSupplier/" + id,
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
                "/api/approvals/disapprove/RequestSupplier/" + id,
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
            if (this.approvedSuppliers.isLoaded) {
                callFunctions.push(this.getApprovedSuppliers)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
