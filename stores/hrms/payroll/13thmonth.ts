import { defineStore } from "pinia"

export const FORM_APPROVAL_NAME = "13th Month Request"

export const use13thMonthStore = defineStore("13thmonthStore", {
    state: () => ({
        isEdit: false,
        generateDraftRequest: {
            isLoading: false,
            data: {
                date_from: "",
                date_to: "",
                total_days: 0,
                date_requested: "",
                employee_ids: [],
                days_advance: 0,
                charging_type: "",
                charging_id: null,
            },
            errorMessage: "",
            successMessage: "",
        },
        createRequestData: {
            isLoading: false,
            data: {}, // Will be set By Generate Draft
            resourceData: {}, // Will be set By Generate Draft
            errorMessage: "",
            successMessage: "",
        },
        createApprovalsBackup: [],
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
        summary: {
            isLoading: false,
            isLoaded: false,
            data: [],
            params: {
                date_requested: "",
            },
            errorMessage: "",
            successMessage: "",
        }
    }),
    actions: {
        async getOne (id: any): Promise<any> {
            return await useHRMSApiO(
                "/api/13th-month/resource/" + id,
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
                "/api/13th-month/resource",
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
                "/api/13th-month/my-requests",
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
                "/api/13th-month/my-approvals",
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
        async generateDraft () {
            await useHRMSApiO(
                "/api/13th-month/draft",
                {
                    method: "POST",
                    body: this.generateDraftRequest.data,
                    onRequest: () => {
                        this.generateDraftRequest.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.generateDraftRequest.isLoading = false
                        this.generateDraftRequest.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.generateDraftRequest.isLoading = false
                        this.createRequestData.data = response._data.data.json
                        this.createRequestData.resourceData = response._data.data.model
                        this.generateDraftRequest.successMessage = response._data.message
                    },
                }
            )
        },
        async createRequest () {
            if (this.createRequestData.isLoading) { return }
            await useHRMSApiO(
                "/api/13th-month/resource",
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
                "/api/13th-month/resource/" + id,
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
                "/api/approvals/approve/Request13thMonth/" + id,
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
                "/api/approvals/disapprove/Request13thMonth/" + id,
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
        async getSummary () {
            await useHRMSApi(
                "/api/13th-month/summary",
                {
                    method: "GET",
                    params: this.summary.params,
                    onRequest: () => {
                        this.summary.isLoading = true
                    },
                    onResponseError: ({ response }) => {
                        this.summary.isLoading = false
                        this.summary.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.summary.isLoading = false
                        this.summary.data = response._data.data
                        this.summary.successMessage = response._data.message
                    },
                }
            )
        },
        reloadResources () {
            const backup = this.createApprovalsBackup
            this.generateDraftRequest.data.employee_ids = []
            const formBackup = this.generateDraftRequest.data
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
            this.createApprovalsBackup = backup
            this.generateDraftRequest.data = formBackup
            callFunctions.forEach((element) => {
                element()
            })
        }
    },
})
