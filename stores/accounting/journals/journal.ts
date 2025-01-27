import { defineStore } from "pinia"

export const useJournalStore = defineStore("journalStore", {
    state: () => ({
        journal: {
            isLoading: false,
            isLoaded: false,
            id: null,
            journal_no: "",
            voucher_id: "",
            entry_date: "",
            status: "open",
            period_id: "",
            remarks: "",
            total: 0,
            reference_no: "",
            details: [],
            errorMessage: "",
            successMessage: "",
        },
        paymentRequestEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        postedEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        unpostedEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        openEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        forPaymentEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        disbursementEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        cashEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        voidEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        forDisbursementVoucherEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        forCashVoucherEntries: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        draftedEntries: {
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
        async addJournal () {
            this.journal.successMessage = ""
            this.journal.errorMessage = ""
            await useAccountingApiO(
                "/api/journal-entry/resource",
                {
                    method: "POST",
                    body: this.journal,
                    watch: false,
                    onRequest: () => {
                        this.journal.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        this.journal.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.journal.isLoading = false
                        if (response.ok) {
                            this.reloadResources()
                            this.journal.successMessage = response._data.message
                        } else {
                            this.journal.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getPaymentRequestEntries () {
            this.paymentRequestEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/payment-request-entries",
                {
                    method: "GET",
                    params: this.paymentRequestEntries.params,
                    onRequest: () => {
                        this.paymentRequestEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.paymentRequestEntries.isLoading = false
                        if (response.ok) {
                            this.paymentRequestEntries.list = response._data.data.data
                            this.paymentRequestEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getOpenEntries () {
            this.openEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/open-entries",
                {
                    method: "GET",
                    params: this.openEntries.params,
                    onRequest: () => {
                        this.openEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.openEntries.isLoading = false
                        if (response.ok) {
                            this.openEntries.list = response._data.data.data
                            this.openEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getCashJournalEntries () {
            this.cashEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/cash-entries",
                {
                    method: "GET",
                    params: this.cashEntries.params,
                    onRequest: () => {
                        this.cashEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.cashEntries.isLoading = false
                        if (response.ok) {
                            this.cashEntries.list = response._data.data.data
                            this.cashEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getDisbursementJournalEntries () {
            this.disbursementEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/disbursement-entries",
                {
                    method: "GET",
                    params: this.disbursementEntries.params,
                    onRequest: () => {
                        this.disbursementEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.disbursementEntries.isLoading = false
                        if (response.ok) {
                            this.disbursementEntries.list = response._data.data.data
                            this.disbursementEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getForPaymentJournalEntries () {
            this.forPaymentEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/for-payment-entries",
                {
                    method: "GET",
                    params: this.forPaymentEntries.params,
                    onRequest: () => {
                        this.forPaymentEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.forPaymentEntries.isLoading = false
                        if (response.ok) {
                            this.forPaymentEntries.list = response._data.data.data
                            this.forPaymentEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getVoidEntries () {
            this.voidEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/void-entries",
                {
                    method: "GET",
                    params: this.voidEntries.params,
                    onRequest: () => {
                        this.voidEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.voidEntries.isLoading = false
                        if (response.ok) {
                            this.voidEntries.list = response._data.data.data
                            this.voidEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getPostedEntries () {
            this.postedEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/posted-entries",
                {
                    method: "GET",
                    params: this.postedEntries.params,
                    onRequest: () => {
                        this.postedEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.postedEntries.isLoading = false
                        if (response.ok) {
                            this.postedEntries.list = response._data.data.data
                            this.postedEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getUnpostedEntries () {
            this.unpostedEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/unposted-entries",
                {
                    method: "GET",
                    params: this.unpostedEntries.params,
                    onRequest: () => {
                        this.unpostedEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.unpostedEntries.isLoading = false
                        if (response.ok) {
                            this.unpostedEntries.list = response._data.data.data
                            this.unpostedEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },

        // Disbursement Fetch For voucher entries
        async getForDisbursementVoucherEntries () {
            this.forDisbursementVoucherEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/for-voucher-entries-disbursement",
                {
                    method: "GET",
                    params: this.forDisbursementVoucherEntries.params,
                    onRequest: () => {
                        this.forDisbursementVoucherEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.forDisbursementVoucherEntries.isLoading = false
                        if (response.ok) {
                            this.forDisbursementVoucherEntries.list = response._data.data.data
                            this.forDisbursementVoucherEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getForCashVoucherEntries () {
            this.forCashVoucherEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/for-voucher-entries-cash",
                {
                    method: "GET",
                    params: this.forCashVoucherEntries.params,
                    onRequest: () => {
                        this.forCashVoucherEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.forCashVoucherEntries.isLoading = false
                        if (response.ok) {
                            this.forCashVoucherEntries.list = response._data.data.data
                            this.forCashVoucherEntries.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async generateJournalNumber () {
            await useAccountingApi(
                "/api/journal-entry/generate-journal-number",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.journal.journal_no = response._data.data
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.openEntries.isLoaded) {
                callFunctions.push(this.getOpenEntries)
            }
            if (this.paymentRequestEntries.isLoaded) {
                callFunctions.push(this.getPaymentRequestEntries)
            }
            if (this.voidEntries.isLoaded) {
                callFunctions.push(this.getVoidEntries)
            }
            if (this.postedEntries.isLoaded) {
                callFunctions.push(this.getPostedEntries)
            }
            if (this.forDisbursementVoucherEntries.isLoaded) {
                callFunctions.push(this.getForDisbursementVoucherEntries)
            }
            if (this.forCashVoucherEntries.isLoaded) {
                callFunctions.push(this.getForCashVoucherEntries)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
