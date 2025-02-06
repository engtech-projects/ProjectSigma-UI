import { defineStore } from "pinia"

export const useSalaryDisbursementStore = defineStore("SalaryDisbursement", {
    state: () => ({
        isEdit: false,
        generateDraftRequest: {
            isLoading: false,
            data: {
                payroll_date: "",
                payroll_type: "",
                release_type: "",
                approvals: [],
            },
            errorMessage: "",
            successMessage: "",
        },
        createRequestData: {
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
            pagination: {},
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
            isLoaded: false,
            list: [],
            params: {
                payroll_date: null,
            },
            pagination: {},
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
            this.allRequests.isLoaded = true
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
            this.myRequests.isLoaded = true
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
                            this.myRequests.list = response._data.data.data
                            this.myRequests.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
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
            this.myApprovals.isLoaded = true
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
                            this.myApprovals.list = response._data.data.data
                            this.myApprovals.successMessage = response._data.message
                            this.myApprovals.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.myApprovals.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getPayslipReadyRecords () {
            this.payslipReadyRecords.isLoaded = true
            await useHRMSApi(
                "/api/salary-disbursement/payslip-ready",
                {
                    method: "GET",
                    params: this.payslipReadyRecords.params,
                    onRequest: () => {
                        this.payslipReadyRecords.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.payslipReadyRecords.isLoading = false
                        if (response.ok) {
                            this.payslipReadyRecords.list = response._data.data.data
                            this.payslipReadyRecords.successMessage = response._data.message
                            this.payslipReadyRecords.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.payslipReadyRecords.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getOnePayslipReady (id: any): Promise<any> {
            return await useHRMSApiO(
                "/api/salary-disbursement/payslip-ready/" + id,
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
                            this.createRequestData.data = response._data.data
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
            if (this.createRequestData.isLoading) { return }
            await useHRMSApiO(
                "/api/salary-disbursement/resource",
                {
                    method: "POST",
                    body: this.createRequestData.data,
                    onRequest: () => {
                        this.createRequestData.isLoading = true
                    },
                    onResponse: ({ response }: any) => {
                        this.createRequestData.isLoading = false
                        if (response.ok) {
                            this.reloadResources()
                            this.createRequestData.successMessage = response._data.message
                        } else {
                            this.createRequestData.errorMessage = response._data.message
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
                "/api/approvals/approve/RequestSalaryDisbursement/" + id,
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
                "/api/approvals/disapprove/RequestSalaryDisbursement/" + id,
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
        async submitToAccounting (id: number) {
            await useHRMSApiO(
                "/api/salary-disbursement/submit-to-accounting/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
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
            if (this.payslipReadyRecords.isLoaded) {
                callFunctions.push(this.getPayslipReadyRecords)
            }
            this.$reset()
            this.generateDraftRequest.data.approvals = backup
            callFunctions.forEach((element) => {
                element()
            })
        }
    },
})
