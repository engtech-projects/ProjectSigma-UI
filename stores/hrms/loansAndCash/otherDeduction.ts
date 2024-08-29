import { defineStore } from "pinia"

export const WEEKLY = "weekly"
export const MONTHLY = "monthly"
export const BIMONTHLY = "bimonthly"
export const TERMS = [
    WEEKLY,
    MONTHLY,
    BIMONTHLY,
]

export interface Loan {
    id: null | Number;
    employee_id: null | Number;
    amount: null | Number;
    installment_deduction: null | Number;
    deduction_date_start: String,
    terms_of_payment: String,
}
export const useOtherDeductionStore = defineStore("OtherDeductionsStore", {
    state: () => ({
        allList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        ongoingList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        paidList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        paymentsList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        createData: {
            isLoading: false,
            data: {
                id: null,
                otherdeduction_name: "",
                amount: null,
                terms_of_payment: null,
                installment_deduction: null,
                employees: [],
                deduction_date_start: ""
            },
            successMessage: "",
            errorMessage: "",
        },
        editData: {
            data: {
                id: null,
                otherdeduction_name: "",
                amount: null,
                terms_of_payment: null,
                installment_deduction: null,
                employees: [],
                deduction_date_start: ""
            },
            successMessage: "",
            errorMessage: "",
        },
        paymentData: {
            otherdeduction_id: null,
            data: {
                paymentAmount: 0,
            },
            successMessage: "",
            errorMessage: "",
        }
    }),
    actions: {
        async getAllList () {
            return await useHRMSApi("/api/other-deduction/resource", {
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
                        this.allList.isLoaded = true
                        this.allList.list = response._data.data.data
                        this.allList.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    }
                },
            })
        },
        async getOngoingList () {
            return await useHRMSApi("/api/other-deduction/ongoing", {
                method: "GET",
                params: this.ongoingList.params,
                onRequest: () => {
                    this.ongoingList.isLoading = true
                },
                onResponseError: ({ response }) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }) => {
                    this.ongoingList.isLoading = false
                    if (response.ok) {
                        this.ongoingList.isLoaded = true
                        this.ongoingList.list = response._data.data.data
                        this.ongoingList.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    }
                },
            })
        },
        async getPaidList () {
            return await useHRMSApi("/api/other-deduction/paid", {
                method: "GET",
                params: this.paidList.params,
                onRequest: () => {
                    this.paidList.isLoading = true
                },
                onResponseError: ({ response }) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }) => {
                    this.paidList.isLoading = false
                    if (response.ok) {
                        this.paidList.isLoaded = true
                        this.paidList.list = response._data.data.data
                        this.paidList.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    }
                },
            })
        },
        async getPaymentsList () {
            return await useHRMSApi("/api/other-deduction/payments", {
                method: "GET",
                params: this.paymentsList.params,
                onRequest: () => {
                    this.paymentsList.isLoading = true
                },
                onResponseError: ({ response }) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }) => {
                    this.paymentsList.isLoading = false
                    if (response.ok) {
                        this.paymentsList.isLoaded = true
                        this.paymentsList.list = response._data.data.data
                        this.paymentsList.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    }
                },
            })
        },
        async createResource () {
            await useHRMSApi("/api/other-deduction/resource", {
                method: "POST",
                watch: false,
                body: this.createData.data,
                onRequest: () => {
                    this.createData.isLoading = true
                },
                onResponseError: ({ response }) => {
                    this.createData.errorMessage = response._data.message
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }) => {
                    this.createData.isLoading = false
                    if (response.ok) {
                        this.reloadResources()
                        this.createData.data = response._data.data
                        this.createData.successMessage = response._data.message
                    }
                },
            })
        },
        async editResource () {
            await useHRMSApi("/api/other-deduction/resource", {
                method: "POST",
                watch: false,
                body: this.editData.data,
                onResponseError: ({ response }) => {
                    this.editData.errorMessage = response._data.message
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }) => {
                    if (response.ok) {
                        this.reloadResources()
                        this.editData.data = response._data.data
                        this.editData.successMessage = response._data.message
                    }
                },
            })
        },
        async submitPayment (id: any) {
            return await useHRMSApiO(
                "/api/other-deduction/manual-payment/" + id,
                {
                    method: "POST",
                    body: this.paymentData.data,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.paymentData.successMessage = response._data.message
                            this.reloadResources()
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.allList.isLoaded) {
                callFunctions.push(this.getAllList)
            }
            if (this.ongoingList.isLoaded) {
                callFunctions.push(this.getOngoingList)
            }
            if (this.paidList.isLoaded) {
                callFunctions.push(this.getPaidList)
            }
            if (this.paymentsList.isLoaded) {
                callFunctions.push(this.getPaymentsList)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
