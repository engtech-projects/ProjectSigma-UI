import { defineStore } from "pinia"

export const useVoucherStore = defineStore("voucherStore", {
    state: () => ({
        voucher: {
            payee: null,
            voucher_no: "AJE-202402-0567",
            particulars: null,
            net_amount: null,
            amount_in_words: null,
            date_encoded: null,
            voucher_date: null,
            created_by: 1,
            line_items: [],
            status: "pending",
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        isEdit: false
    }),
    actions: {
        async getVouchers () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/v1/voucher",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.account
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

        async createVoucher () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/v1/voucher",
                {
                    method: "POST",
                    body: this.voucher,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.successMessage = "New voucher successfully created."
                            this.getVouchers()
                            this.reset()
                        }
                    },
                }
            )
        },

        async editAccount () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/v1/account/" + this.account.account_id,
                {
                    method: "PATCH",
                    body: this.account,
                    watch: false,
                }
            )
            if (data.value) {
                this.getAccounts()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        reset () {
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
