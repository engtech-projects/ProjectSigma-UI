import { defineStore } from "pinia"
export const EMPLOYMENT_REGULAR = "Regular"
export const EMPLOYMENT_PROBATIONARY = "Probationary"
export const EMPLOYMENT_PARTTIME = "Part Time"
export const EMPLOYMENT_PROJECTBASED = "Project Based"
export const EMPLOYMENT_CONTRACTUAL = "Contractual"
export const EMPLOYMENT_TYPE = [
    EMPLOYMENT_PROBATIONARY,
    EMPLOYMENT_REGULAR,
    EMPLOYMENT_PARTTIME,
    EMPLOYMENT_PROJECTBASED,
    EMPLOYMENT_CONTRACTUAL
]

export const usePayrollParticularTerms = defineStore("PayrollParticularTerms", {
    state: () => ({
        allList: {
            isLoaded: false,
            isLoading: false,
            list: [],
            pagination: {},
            params: {} as any,
            successMessage: "",
        },
        createData: {
            isLoading: false,
            params: {
                type: "",
                local_particular_name: "",
                accounting_particular_name: "",
                description: "",
            },
            successMessage: "",
        },
        isEdit: false,
        editData: {
            isLoading: false,
            params: {} as any,
            successMessage: "",
        },
        deleteData: {
            isLoading: false,
            successMessage: "",
        }
    }),
    actions: {
        async getAllList () {
            return await useHRMSApi("/api/setup/payroll-particular-terms", {
                method: "GET",
                params: this.allList.params,
                onRequest: () => {
                    this.allList.isLoading = true
                },
                onResponseError: ({ response }) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }) => {
                    this.allList.isLoading = false
                    if (response.ok) {
                        this.allList.list = response._data.data
                        this.allList.isLoaded = true
                        this.allList.pagination = {
                            first_page: response._data.links.first,
                            pages: response._data.meta.links,
                            last_page: response._data.links.last,
                        }
                    }
                },
            })
        },
        async sendCreateResource () {
            return await useHRMSApiO("/api/setup/payroll-particular-terms", {
                method: "POST",
                body: this.createData.params,
                onRequest: () => {
                    this.createData.isLoading = true
                },
                onResponseError: ({ response }: any) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }: any) => {
                    this.createData.isLoading = false
                    if (response.ok) {
                        this.reloadResources()
                        this.createData.successMessage = response._data.message
                    }
                },
            })
        },
        async sendEditResource () {
            return await useHRMSApiO("/api/setup/payroll-particular-terms/" + this.editData.params.id, {
                method: "PUT",
                body: this.editData.params,
                onRequest: () => {
                    this.editData.isLoading = true
                },
                onResponseError: ({ response }: any) => {
                    throw new Error(response._data.message)
                },
                onResponse: async ({ response }: any) => {
                    this.editData.isLoading = false
                    if (response.ok) {
                        await this.reloadResources()
                        this.editData.successMessage = response._data.message
                    }
                },
            })
        },
        async sendDeleteResource (id: string) {
            return await useHRMSApiO("/api/setup/payroll-particular-terms/" + id, {
                method: "DELETE",
                onRequest: () => {
                    this.deleteData.isLoading = true
                },
                onResponseError: ({ response }: any) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }: any) => {
                    this.deleteData.isLoading = false
                    if (response.ok) {
                        this.reloadResources()
                        this.deleteData.successMessage = response._data.message
                    }
                },
            })
        },
        reloadResources () {
            const callFunctions = []
            if (this.allList.isLoaded) {
                callFunctions.push(this.getAllList)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        }
    },
})
