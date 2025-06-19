import { defineStore } from "pinia"

export const useProcurementRequestStore = defineStore("procurementRequest", {
    state: () => ({
        allRequests: {
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
            details: {},
            params: {},
            pagination: {},
        },
        unServed: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
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
                        console.log(response)
                        this.allRequests.isLoading = false
                        if (response.ok) {
                            this.allRequests.list = response._data.data.data
                            this.allRequests.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
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
                    params: this.unServed.params,
                    onRequest: () => {
                        this.unServed.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.unServed.isLoading = false
                        if (response.ok) {
                            this.unServed.isLoaded = true
                            this.unServed.list = response._data.data.data
                            this.unServed.pagination = {
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
        async getMyRequests (id: number) {
            return await useInventoryApiO(
                "/api/procurement-request/resource/" + id,
                {
                    method: "GET",
                    params: this.myRequests.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.myRequests.details = response._data.data
                            return response._data.data
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
            if (this.myRequests.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            if (this.unServed.isLoaded) {
                callFunctions.push(this.getUnserved)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
