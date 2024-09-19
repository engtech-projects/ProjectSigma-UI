import { defineStore } from "pinia"

export const useSalaryDisbursementStore = defineStore("SalaryDisbursement", {
    state: () => ({
        isEdit: false,
        generateDraftRequest: {
            isLoading: false,
            data: {
                payroll_date: "",
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
        payslipReadyRecords: {
            isLoading: false,
            data: {},
            params: {
                payroll_date: null,
            },
            errorMessage: "",
            successMessage: "",
        },
    }),
    actions: {
        async getOne (id: any): Promise<any> {
            return await useHRMSApiO(
                "/api/salary-disbursement/resource/" + id,
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
                "/api/salary-disbursement/resource",
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
                "/api/salary-disbursement/my-requests",
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
                "/api/salary-disbursement/my-approvals",
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
                "/api/salary-disbursement/draft",
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
            await useHRMSApiO(
                "/api/salary-disbursement/resource",
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
                "/api/salary-disbursement/resource/" + id,
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
                            // this.successMessage = response._data.message
                            return response._data
                        }
                    },
                }
            )
        },
        reloadResources () {
            const backup = this.generateDraftRequest.data.approvals
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
            this.generateDraftRequest.data.approvals = backup
            callFunctions.forEach((element) => {
                element()
            })
        }
    },
})
