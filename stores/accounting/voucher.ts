import { defineStore } from "pinia"

export const useVoucherStore = defineStore("voucherStore", {
    state: () => ({
        voucher: {
            stakeholder_id: null,
            book_id: null,
            voucher_no: "",
            account_id: null,
            particulars: null,
            net_amount: null,
            amount_in_words: null,
            date_encoded: null,
            voucher_date: null,
            created_by: 1,
            check_no: null,
            details: [],
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
                "/api/voucher",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data
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
                "/api/voucher",
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
                        }
                    },
                }
            )
        },

        async getVouchers () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/voucher",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data
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

        async generateVoucherNumber (code:String) {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/voucher/number/" + code,
                {
                    method: "GET",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.voucher.voucher_no = response._data.voucher_no
                        }
                    },
                }
            )
        },

        async showVoucher (id: any) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/voucher/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.voucher = response._data
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

        reset () {
            this.voucher = {
                stakeholder_id: null,
                book_id: null,
                voucher_no: "",
                account_id: null,
                particulars: null,
                net_amount: null,
                amount_in_words: null,
                date_encoded: null,
                voucher_date: null,
                created_by: 1,
                check_no: null,
                details: [],
                status: "pending",
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
