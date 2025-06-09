import { defineStore } from "pinia"

export const useGenerateAllowanceStore = defineStore("GenerateAllowances", {
    state: () => ({
        isEdit: false,
        generateDraftRequest: {
            isLoading: false,
            data: {
                employees: [] as any[],
                project_id: null,
                department_id: null,
                cutoff_start: "",
                cutoff_end: "",
                allowance_date: "",
                total_days: null as Number|null,
                charging_type: null,
                approvals: [],
            },
            errorMessage: "",
            successMessage: "",
        },
        createAllowanceRequest: {
            isLoading: false,
            data: {}, // Will be set By Generate Draft
            errorMessage: "",
            successMessage: "",
        },
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        myApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            errorMessage: "",
            successMessage: "",
        },
        myRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        allowanceRecords: {
            isLoading: false,
            data: {},
            params: {
                group_type: null,
                department_id: null,
                project_id: null,
                charge_assignment: "",
                allowance_date: "",
            },
            errorMessage: "",
            successMessage: "",
        },
        errorMessage: ""
    }),
    actions: {
        async getAllowanceRecords () {
            await useHRMSApi(
                "/api/employee-allowance/view-allowance",
                {
                    method: "GET",
                    params: this.allowanceRecords.params,
                    onRequest: () => {
                        this.allowanceRecords.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allowanceRecords.isLoading = false
                        if (response.ok) {
                            this.allowanceRecords.data = response._data.data
                        }
                    },
                }
            )
        },
        async getOne (id: any): Promise<any> {
            return await useHRMSApiO(
                "/api/allowance-request/resource/" + id,
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getAllRequests () {
            await useHRMSApi(
                "/api/allowance-request/resource",
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
            await useHRMSApi(
                "/api/allowance-request/my-requests",
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
                            this.myRequests.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovals () {
            await useHRMSApi(
                "/api/allowance-request/my-approvals",
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
                            this.myApprovals.list = response._data.data
                            this.myApprovals.successMessage = response._data.message
                        } else {
                            this.myApprovals.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async generateDraft () {
            await useHRMSApiO(
                "/api/allowance-request/draft",
                {
                    method: "POST",
                    body: this.generateDraftRequest.data,
                    onRequest: () => {
                        this.generateDraftRequest.isLoading = true
                    },
                    onResponse: ({ response }: any) => {
                        this.generateDraftRequest.isLoading = false
                        if (response.ok) {
                            this.createAllowanceRequest.data = response._data.data
                            this.generateDraftRequest.successMessage = response._data.message
                        } else {
                            this.generateDraftRequest.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async createRequest () {
            if (this.createAllowanceRequest.isLoading) { return }
            await useHRMSApiO(
                "/api/allowance-request/resource",
                {
                    method: "POST",
                    body: this.createAllowanceRequest.data,
                    onRequest: () => {
                        this.createAllowanceRequest.isLoading = true
                    },
                    onResponse: ({ response }: any) => {
                        this.createAllowanceRequest.isLoading = false
                        if (response.ok) {
                            this.reloadResources()
                            this.createAllowanceRequest.successMessage = response._data.message
                        } else {
                            this.createAllowanceRequest.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async deleteRequest (id: number) {
            return await useHRMSApiO(
                "/api/allowance-request/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            return response._data.message
                        }
                    },
                }
            )
        },
        async approveApprovalForm (id: number) {
            await useHRMSApiO(
                "/api/approvals/approve/GenerateAllowance/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        // this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            // this.successMessage = response._data.message
                            return response._data
                        } else {
                            // this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyApprovalForm (id: string, remarks: string) {
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/GenerateAllowance/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }: any) => {
                        // this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            return response._data
                        }
                    },
                }
            )
        },
        async voidRequest (id: string, remarks: string) {
            const formData = new FormData()
            formData.append("reason_for_void", remarks)
            await useHRMSApiO(
                "/api/request-voids/void/GenerateAllowance/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.getAllRequests()
                            this.getMyApprovals()
                            this.getMyRequests()
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        reloadResources () {
            const backup = this.generateDraftRequest.data
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
            this.generateDraftRequest.data = backup
            callFunctions.forEach((element) => {
                element()
            })
        }
    },
})
