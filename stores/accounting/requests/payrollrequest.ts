import { defineStore } from "pinia"

export const usePayrollRequestStore = defineStore("payrollRequestStore", {
    state: () => ({
        payrollAllRequestList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        payrollMyRequestList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        payrollApprovalRequestList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
    }),
    getters: {},
    actions: {
        async getAllRequests () {
            this.payrollAllRequestList.isLoaded = true
            await useAccountingApi(
                "/api/payroll/resource",
                {
                    method: "GET",
                    params: this.payrollAllRequestList.params,
                    onRequest: () => {
                        this.payrollAllRequestList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.payrollAllRequestList.isLoading = false
                        if (response.ok) {
                            this.payrollAllRequestList.list = response._data.data.data
                            this.payrollAllRequestList.pagination = {
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
            this.payrollMyRequestList.isLoaded = true
            await useAccountingApi(
                "/api/payroll/my-requests",
                {
                    method: "GET",
                    params: this.payrollMyRequestList.params,
                    onRequest: () => {
                        this.payrollMyRequestList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.payrollMyRequestList.isLoading = false
                        if (response.ok) {
                            this.payrollMyRequestList.list = response._data.data.data
                            this.payrollMyRequestList.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyApprovals () {
            this.payrollApprovalRequestList.isLoaded = true
            await useAccountingApi(
                "/api/payroll/my-approvals",
                {
                    method: "GET",
                    params: this.payrollApprovalRequestList.params,
                    onRequest: () => {
                        this.payrollApprovalRequestList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.payrollApprovalRequestList.isLoading = false
                        if (response.ok) {
                            this.payrollApprovalRequestList.list = response._data.data.data
                            this.payrollApprovalRequestList.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.payrollAllRequestList.isLoaded) {
                callFunctions.push(this.getAllRequests)
            }
            if (this.payrollMyRequestList.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            if (this.payrollApprovalRequestList.isLoaded) {
                callFunctions.push(this.getMyApprovals)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
