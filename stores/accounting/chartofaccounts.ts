import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useChartOfAccountsStore = defineStore("chartOfAccounts", {
    state: () => ({
        account: {
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
    }),
    actions: {
        async getAccounts () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/v1/chart-of-accounts",
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
                        this.list = response._data.data
                        this.pagination = {
                            first_page: response._data.first_page_url,
                            pages: response._data.links,
                            last_page: response._data.last_page_url,
                        }
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
    },
})
