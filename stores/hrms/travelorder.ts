import { defineStore } from "pinia"
export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]

export const useTravelorderStore = defineStore("travels", {
    state: () => ({
        createRequestData: {
            isLoading: false,
            errorMessage: "",
            successMessage: "",
            body: {
                id: null,
                name: "",
                employee_ids: [] as any[],
                requesting_office: null,
                destination: null,
                purpose_of_travel: "",
                date_of_travel: null,
                time_of_travel: null,
                duration_of_travel: null,
                means_of_transportation: null,
                remarks: "",
                charge_type: null,
                project_id: null,
                department_id: null,
                approvals: [],
                request_status: ""
            },
        },
        allList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
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
        myRequestList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getOne (id: any) {
            return await useHRMSApiO(
                "/api/travelorder-request/resource/" + id,
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
        async getTravelorders () {
            await useHRMSApi(
                "/api/travelorder-request/resource",
                {
                    method: "GET",
                    params: this.allList.params,
                    watch: false,
                    onRequest: () => {
                        this.allList.isLoading = true
                        this.allList.list = []
                    },
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.allList.isLoading = false
                        if (response.ok) {
                            this.allList.isLoaded = true
                            this.allList.list = response._data.data
                            this.allList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useHRMSApi(
                "/api/travelorder-request/my-request",
                {
                    method: "GET",
                    params: this.myRequestList.params,
                    watch: false,
                    onRequest: () => {
                        this.myRequestList.isLoading = true
                        this.myRequestList.list = []
                    },
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.myRequestList.isLoading = false
                        if (response.ok) {
                            this.myRequestList.isLoaded = true
                            this.myRequestList.list = response._data.data
                            this.myRequestList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useHRMSApi(
                "/api/travelorder-request/my-approvals",
                {
                    method: "GET",
                    params: this.approvalList.params,
                    watch: false,
                    onRequest: () => {
                        this.approvalList.isLoading = true
                        this.approvalList.list = []
                    },
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.approvalList.isLoading = false
                        if (response.ok) {
                            this.approvalList.isLoaded = true
                            this.approvalList.list = response._data.data
                            this.approvalList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async createRequest () {
            if (this.createRequestData.isLoading) { return }
            await useHRMSApiO(
                "/api/travelorder-request/resource",
                {
                    method: "POST",
                    body: this.createRequestData.body,
                    onRequest: () => {
                        this.createRequestData.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createRequestData.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.createRequestData.isLoading = false
                        if (response.ok) {
                            this.reloadResources()
                            this.createRequestData.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async approveApprovalForm (id: number) {
            await useHRMSApiO(
                "/api/approvals/approve/TravelOrder/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                            return response._data
                        }
                    },
                }
            )
        },
        async denyApprovalForm (id: string) {
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/TravelOrder/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                            return response._data
                        }
                    },
                }
            )
        },
        async voidRequest (id: number | string, remarks: string) {
            await useHRMSApiO(
                "/api/request-voids/void/TravelOrder/" + id,
                {
                    method: "POST",
                    params: { reason_for_void: remarks },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.allList.isLoaded) {
                callFunctions.push(this.getTravelorders)
            }
            if (this.approvalList.isLoaded) {
                callFunctions.push(this.getMyApprovalRequests)
            }
            if (this.myRequestList.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
