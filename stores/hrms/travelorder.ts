import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useTravelorderStore = defineStore("travels", {
    state: () => ({
        isEdit: false,
        travel: {
            id: null,
            name: null,
            requesting_office: null,
            destination: null,
            purpose_of_travel: null,
            date_and_time_of_travel: null,
            duration_of_travel: null,
            means_of_transportation: null,
            remarks: null,
            requested_by: null,
            approvals: null,
        },
        list: [],
        myApprovalRequestList: [],
        myRequestList: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getTravelorders () {
            await useFetch(
                "/api/travelorder-request/resource",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useFetch(
                "/api/travelorder-request/my-requests",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.myRequestList = response._data.data
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useHRMSApi(
                "/api/travelorder-request/my-approvals",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovalRequestList = response._data.data
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
            await useHRMSApiO(
                "/api/travelorder-request/resource",
                {
                    method: "POST",
                    body: this.travel,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.getTravelorders()
                            this.reset()
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
        // async editApprovals () {
        //     this.successMessage = ""
        //     this.errorMessage = ""
        //     const { data, error } = await useHRMSApiO(
        //         "/api/approvals/" + this.formApproval.id,
        //         {
        //             method: "PATCH",
        //             body: this.formApproval,
        //             onResponse: ({ response }) => {
        //                 if (response.status >= 200 && response.status <= 299) {
        //                     this.getApproval()
        //                     this.$reset()
        //                     this.successMessage = response._data.message
        //                 } else {
        //                     this.errorMessage = response._data.message
        //                 }
        //             },
        //         }
        //     )
        //     if (data.value) {
        //         this.getApproval()
        //         this.$reset()
        //         this.successMessage = data.value.message
        //         return data
        //     } else if (error.value) {
        //         this.errorMessage = error.value.message
        //         return error
        //     }
        // },
        // async deleteApproval (id: number) {
        //     await useHRMSApiO(
        //         "/api/approvals/" + id,
        //         {
        //             method: "DELETE",
        //             onResponse: ({ response }) => {
        //                 if (response.status >= 200 && response.status <= 299) {
        //                     this.successMessage = response._data.message
        //                     this.getApproval()
        //                 } else {
        //                     this.errorMessage = response._data.message
        //                 }
        //             },
        //             onResponseError: ({ response }) => {
        //                 this.errorMessage = response._data.message
        //             },
        //         }
        //     )
        // },.
        reset () {
            this.travel = {
                id: null,
                name: null,
                requesting_office: null,
                destination: null,
                purpose_of_travel: null,
                date_and_time_of_travel: null,
                duration_of_travel: null,
                means_of_transportation: null,
                remarks: null,
                requested_by: null,
                approvals: null,
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
