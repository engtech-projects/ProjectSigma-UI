import { defineStore } from "pinia"

export const useProcurementRequestStore = defineStore("procurementRequestStore", {
    state: () => ({
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        viewRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            details: {},
            params: {},
            pagination: {},
        },
        unserved: {
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
                "/api/procurement-request/resource",
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
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                            this.allRequests.isLoaded = true
                        }
                    },
                }
            )
        },
        async getUnserved () {
            await useInventoryApi(
                "/api/procurement-request/unserved",
                {
                    method: "GET",
                    params: this.unserved.params,
                    onRequest: () => {
                        this.unserved.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.unserved.isLoading = false
                        if (response.ok) {
                            this.unserved.isLoaded = true
                            this.unserved.list = response._data.data.data
                            this.unserved.pagination = {
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
        async getOne (id: number) {
            return await useInventoryApiO(
                "/api/procurement-request/resource/" + id,
                {
                    method: "GET",
                    params: this.viewRequests.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.viewRequests.details = response._data.data
                            return response._data.data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        reloadResources () {
            const callFunctions = []
            if (this.allRequests.isLoaded) {
                callFunctions.push(this.getAllRequests)
            }
            if (this.unserved.isLoaded) {
                callFunctions.push(this.getUnserved)
            }
            if (this.viewRequests.isLoaded) {
                callFunctions.push(this.getOne)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
