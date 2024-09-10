import { defineStore } from "pinia"

export const usePayrollStore = defineStore("ApprovedPayrolls", {
    state: () => ({
        allRecords: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        } as any,
        createDisbursementRequest: {
            isLoading: false,
            data: {

            },
            successMessage: "",
            errorMessage: "",
        }
    }),
    getters: {
    },
    actions: {
        async getOne (id: any, getParams: any) {
            return await useHRMSApiO(
                "/api/payroll/resource/" + id,
                {
                    method: "GET",
                    params: getParams,
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
        async getAllRecords () {
            await useHRMSApiO(
                "/api/payroll/records",
                {
                    method: "GET",
                    params: this.allRecords.params,
                    onRequest: () => {
                        this.allRecords.isLoading = true
                    },
                    onResponse: ({ response }: any) => {
                        this.allRecords.isLoading = false
                        if (response.ok) {
                            this.allRecords.isLoaded = true
                            this.allRecords.list = response._data.data
                            // this.allRecords.pagination = {
                            //     first_page: response._data.data.first_page_url,
                            //     pages: response._data.data.links,
                            //     last_page: response._data.data.last_page_url,
                            // }
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.allRecords.isLoaded) {
                callFunctions.push(this.getAllRecords)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
