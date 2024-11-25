import { defineStore } from "pinia"

export const useJournalStore = defineStore("journalStore", {
    state: () => ({
        journal: {
            id: null,
            journal_no: "",
            journal_date: "",
            voucher_id: "",
            status: "open",
            period_id: "",
            remarks: "",
            reference_no: "",
            details: []
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
    },
})
