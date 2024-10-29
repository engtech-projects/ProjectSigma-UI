import { defineStore } from "pinia"

export const useVoucherStore = defineStore("voucherStore", {
    state: () => ({
        voucher: {
            stakeholder_id: null,
            book_id: null,
            voucher_no: "",
            account_id: null,
            particulars: "Nothing in particular",
            net_amount: 0,
            amount_in_words: null,
            date_encoded: null,
            voucher_date: null,
            created_by: 1,
            check_no: null,
            details: [],
            form_type: null,
            reference_no: null,
            status: "pending",
        },
        filter: {
            name: null,
            value: ""
        },
        formTypes: [],
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            list: false,
            create: false,
            show: false,
            edit: false,
            delete: false
        },
        isEdit: false
    }),
    getters: {
        filteredList () {
            if (this.filter.value.length > 0 && this.filter.name.length > 0) {
                return this.list.filter(v => v[this.filter.name].toString().toLowerCase().includes(this.filter.value.toString().toLowerCase()))
            }
            return this.list
        }
    },
    actions: {
        async getVouchers () {
            this.isLoading.list = true
            const { data, error } = await useAccountingApi(
                "/api/voucher",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
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
            this.isLoading.create = true
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/voucher",
                {
                    method: "POST",
                    body: this.voucher,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.create = false
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

        async editVoucher () {
            this.isLoading.edit = false
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useAccountingApi(
                "/api/voucher/" + this.voucher.id,
                {
                    method: "PATCH",
                    body: this.voucher,
                    watch: false,
                }
            )
            if (data.value) {
                this.isLoading.edit = false
                this.getVouchers()
                this.successMessage = "Voucher successfully updated."
                return data
            } else if (error.value) {
                this.isLoading.edit = false
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async generateVoucherNumber (code:String) {
            this.isLoading.create = true
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApi(
                "/api/voucher/number/" + code,
                {
                    method: "GET",
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.create = false
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
            this.isLoading.show = true
            const { data, error } = await useAccountingApi(
                "/api/voucher/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading.show = false
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

        async getFormTypes () {
            const { data, error } = await useAccountingApi(
                "/api/form-types",
                {
                    method: "GET",
                    params: this.getParams,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.formTypes = response._data.forms
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
                particulars: "Nothing in particular",
                net_amount: 0,
                amount_in_words: null,
                date_encoded: null,
                voucher_date: null,
                created_by: 1,
                check_no: null,
                form_type: null,
                reference_no: null,
                details: [],
                status: "pending",
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
