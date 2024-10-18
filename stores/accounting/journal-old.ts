import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useJournalStore = defineStore("journalStore", {
    state: () => ({
        journal: {
            entry: {
                transaction_date: "",
                transaction_no: "",
                note: "",
                period_id: "9",
                reference_no: "JE",
                transaction_type_id: 1,
                stakeholder_id: 1,
                description: "Journal Entry",
                amount: 100,
                status: "open"
            },
            details: [
                {
                    transaction_id: "1",
                    stakeholder_id: "1",
                    account_id: 10,
                    debit: 100,
                    credit: 0
                },
            ]
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
                "/api/journal",
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
                "/api/journal",
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
