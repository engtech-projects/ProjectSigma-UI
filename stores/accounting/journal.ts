import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useJournalStore = defineStore("journalStore", {
    state: () => ({
        journal: {
            id: null,
            journal_no: null,
            journal_date: null,
            voucher_id: null,
            status: null,
            period_id: null,
            remarks: "",
            reference_no: "",
            details: []
        },
        base: {},
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        isEdit: false
    }),
    actions: {
        async getJournals () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/journal-entry",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createJournal () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/journal-entry",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.journal,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.reset()
                            this.successMessage = "Journal entry successfully created."
                        }
                    },
                }
            )
        },

        reset () {
            this.base = {}
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
