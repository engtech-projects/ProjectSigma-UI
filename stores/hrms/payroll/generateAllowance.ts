import { defineStore } from "pinia"

export const useGenerateAllowanceStore = defineStore("GenerateAllowances", {
    state: () => ({
        isEdit: false,
        generateAllowance: {
            id: null,
            employees: [] as any[],
            project_id: null,
            department_id: null,
            cutoff_start: "",
            cutoff_end: "",
            allowance_date: "",
            total_days: null,
            group_type: null,
            approvals: []
        },
        allRequests: {
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myApprovals: {
            isLoaded: false,
            list: [],
            params: {},
        },
        myRequests: {
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        pagination: {},
        getParams: {
        },
        allowanceRecords: {
            data: {},
            params: {
                group_type: null,
                department_id: "",
                project_id: "",
                charge_assignment: "",
                allowance_date: "",
            },
        },
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getAllowanceRecords () {
            await useHRMSApi(
                "/api/employee-allowance/view-allowance",
                {
                    method: "GET",
                    params: this.allowanceRecords.params,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.allowanceRecords.data = response._data.data
                        }
                    },
                }
            )
        },
        async getAllRequests () {
            await useHRMSApi(
                "/api/employee-allowance/resource",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
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
                "/api/employee-allowance/my-requests",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequests.list = response._data.data.data
                            this.myRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovals () {
            await useHRMSApi(
                "/api/employee-allowance/my-approvals",
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
        async createRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/employee-allowance/resource",
                {
                    method: "POST",
                    body: this.generateAllowance,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            // this.getGA()
                            // this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async editRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee-allowance/resource/" + this.generateAllowance.id,
                {
                    method: "PATCH",
                    body: this.generateAllowance,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.getGA()
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async deleteRequest (id: number) {
            const { data, error } = await useHRMSApi(
                "/api/employee-allowance/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
            if (error.value) {
                this.errorMessage = error.value.data.message
                throw new Error(this.errorMessage)
                return error
            }
            if (data.value) {
                this.reloadResources()
                return data
            }
        },
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals/approve/GenerateAllowance/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
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
            await useHRMSApiO(
                "/api/approvals/disapprove/GenerateAllowance/" + id,
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
                            this.reloadResources()
                            return response._data
                        }
                    },
                }
            )
        },
        reloadResources () {
            const backup = this.generateAllowance.approvals
            this.$reset()
            this.generateAllowance.approvals = backup
            if (this.allRequests.isLoaded) {
                this.getAllRequests()
            }
            if (this.myRequests.isLoaded) {
                this.getMyRequests()
            }
            if (this.myApprovals.isLoaded) {
                this.getMyApprovals()
            }
        }
    },
})
