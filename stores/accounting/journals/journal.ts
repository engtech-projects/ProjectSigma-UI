import { defineStore } from "pinia"

export const useJournalStore = defineStore("journalStore", {
    state: () => ({
        journal: {
            isLoading: false,
            isLoaded: false,
            id: null,
            journal_no: "",
            journal_date: "",
            voucher_id: "",
            status: "open",
            period_id: "",
            remarks: "",
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
        forVoucherEntries: {
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
        async getDraftedEntries () {
            this.draftedEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/drafted-entries",
                {
                    method: "GET",
                    params: this.draftedEntries.params,
                    onRequest: () => {
                        this.draftedEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.draftedEntries.isLoading = false
                        if (response.ok) {
                            this.draftedEntries.list = response._data.data.data
                            this.draftedEntries.pagination = {
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
        async getForVoucherEntries () {
            this.forVoucherEntries.isLoaded = true
            await useAccountingApi(
                "/api/journal-entry/for-voucher-entries",
                {
                    method: "GET",
                    params: this.forVoucherEntries.params,
                    onRequest: () => {
                        this.forVoucherEntries.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.forVoucherEntries.isLoading = false
                        if (response.ok) {
                            this.forVoucherEntries.list = response._data.data.data
                            this.forVoucherEntries.pagination = {
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
            if (this.paymentRequestEntries.isLoaded) {
                callFunctions.push(this.getPaymentRequestEntries)
            }
            if (this.postedEntries.isLoaded) {
                callFunctions.push(this.getPostedEntries)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
