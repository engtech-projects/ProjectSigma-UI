import { defineStore } from "pinia"

export const useAccountStore = defineStore("accountStore", {
    state: () => ({
        url: "",
        params: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        isEdit: false
    }),
    actions: {
        async syncAccountingData () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                this.url,
                {
                    method: "POST",
                    params: this.params,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        reset () {
            this.account = {
                account_id: null,
                account_number: null,
                account_name: null,
                account_description: null,
                parent_account: null,
                bank_reconciliation: "no",
                statement: null,
                type_id: null,
                opening_balance: 0
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
