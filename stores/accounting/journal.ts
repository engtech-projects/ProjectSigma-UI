import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useJournalStore = defineStore("journalStore", {
    state: () => ({
        journal: {
            transaction_id: null,
            transaction_no: null,
            transaction_date: null,
            transaction_type_id: null,
            reference_no: null,
            amount: null,
            stakeholder_id: null,
            details: null,
            period_id: null,
            status: "open",
            record_type: "Journal",
            note: "",
            description: "No comment"
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
        async baseData () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/v1/journal",
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
                        this.base = response._data.data
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
                "/api/v1/journal",
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
                            this.successMessage = response._data.message
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
