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
export const useLoansStore = defineStore("LoansStore", {
    state: () => ({
        createData: {
            isLoading: false,
            data: {
                id: null,
                employee_id: null,
                name: "",
                amount: null,
                installment_deduction: null,
                deduction_date_start: "",
                terms_of_payment: "",
            } as Loan,
            successMessage: "",
            errorMessage: "",
        },
        editData: {
            data: {
                id: null,
                employee_id: null,
                name: "'",
                amount: null,
                installment_deduction: null,
                deduction_date_start: "",
                terms_of_payment: "",
            } as Loan,
            successMessage: "",
            errorMessage: "",
        },
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
        paymentData: {
            cashadvance_id: null,
            data: {
                paymentAmount: 0,
            },
            successMessage: "",
            errorMessage: "",
        },
        pagination: {},
        getParams: {},
    }),
    actions: {
        async getAllList () {
            await useHRMSApi("/api/loans/resource", {
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
        async getOngoingList () {
            return await useHRMSApi("/api/loans/ongoing", {
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
                        this.ongoingList.list = response._data.data
                        this.ongoingList.pagination = {
                            first_page: response._data.links.first,
                            pages: response._data.meta.links,
                            last_page: response._data.links.last,
                        }
                    }
                },
            })
        },
        async getPaidList () {
            return await useHRMSApi("/api/loans/paid", {
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
                        this.paidList.list = response._data.data
                        this.paidList.pagination = {
                            first_page: response._data.links.first,
                            pages: response._data.meta.links,
                            last_page: response._data.links.last,
                        }
                    }
                },
            })
        },
        async getPaymentsList () {
            return await useHRMSApi("/api/loans/payments", {
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
                        this.paymentsList.list = response._data.data
                        this.paymentsList.pagination = {
                            first_page: response._data.links.first,
                            pages: response._data.meta.links,
                            last_page: response._data.links.last,
                        }
                    }
                },
            })
        },
        async createResource () {
            if (this.createData.isLoading) { return }
            const backupEmployee = this.createData.data.employee_id
            await useHRMSApiO("/api/loans/resource", {
                method: "POST",
                body: this.createData.data,
                onRequest: () => {
                    this.createData.isLoading = true
                },
                onResponseError: ({ response }: any) => {
                    this.createData.errorMessage = response._data.message
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }: any) => {
                    this.createData.isLoading = false
                    if (response.ok) {
                        this.reloadResources()
                        this.createData.data.employee_id = backupEmployee
                        this.createData.successMessage = response._data.message
                    }
                },
            })
        },
        async editResource () {
            await useHRMSApi("/api/loans/resource", {
                method: "POST",
                watch: false,
                body: this.editData.data,
                onResponseError: ({ response }) => {
                    this.editData.errorMessage = response._data.message
                    throw new Error(response._data.message)
                },
                onResponse: ({ response }) => {
                    if (response.ok) {
                        this.editData.data = response._data.data
                        this.editData.successMessage = response._data.message
                    }
                },
            })
        },
        async submitPayment (id: any) {
            return await useHRMSApiO(
                "/api/loans/manual-payment/" + id,
                {
                    method: "POST",
                    body: this.paymentData.data,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.paymentData.successMessage = response._data.message
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
