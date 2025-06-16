import { defineStore } from "pinia"
export const useVoucherStore = defineStore("voucherStore", {
    state: () => ({
        voucherDisbursement: {
            isLoading: false,
            isLoaded: false,
            stakeholder_id: null,
            voucher_no: null,
            particulars: "",
            net_amount: 0,
            amount_in_words: null,
            date_encoded: null,
            voucher_date: null,
            check_no: null,
            details: [],
            reference_no: null,
            approvals: [],
            errorMessage: "",
            successMessage: "",
        },
        voucherCash: {
            isLoading: false,
            isLoaded: false,
            stakeholder_id: null,
            book_id: null,
            voucher_no: "",
            particulars: "",
            net_amount: 0,
            amount_in_words: null,
            date_encoded: null,
            voucher_date: null,
            created_by: 1,
            check_no: null,
            details: [],
            form: {},
            form_type: null,
            reference_no: null,
            status: "pending",
            form_id: null,
            approvals: [],
            errorMessage: "",
            successMessage: "",
        },
        cashReceivedForm: {
            voucher_id: null,
            received_by: null,
            receipt_no: null,
            date_received: null
        },
        cashClearingVoucher: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        cashClearedVoucher: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        allCashVouchers: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        myCashVouchers: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        myCashApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        allDisbursementVouchers: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        myDisbursementVouchers: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        myDisbursementApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        errorMessage: "",
        successMessage: "",
        isEdit: false,
        remarks: ""
    }),
    getters: {},
    actions: {
        async getClearingVouchers () {
            this.cashClearingVoucher.isLoaded = true
            await useAccountingApi(
                "/api/vouchers/cash/get-clearing-vouchers",
                {
                    method: "GET",
                    params: this.cashClearingVoucher.params,
                    onRequest: () => {
                        this.cashClearingVoucher.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.cashClearingVoucher.isLoading = false
                        if (response.ok) {
                            this.cashClearingVoucher.list = response._data.data.data
                            this.cashClearingVoucher.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getClearedVouchers () {
            this.cashClearedVoucher.isLoaded = true
            await useAccountingApi(
                "/api/vouchers/cash/get-cleared-vouchers",
                {
                    method: "GET",
                    params: this.cashClearedVoucher.params,
                    onRequest: () => {
                        this.cashClearedVoucher.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.cashClearedVoucher.isLoading = false
                        if (response.ok) {
                            this.cashClearedVoucher.list = response._data.data.data
                            this.cashClearedVoucher.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getAllCashVouchers () {
            this.allCashVouchers.isLoaded = true
            await useAccountingApi(
                "/api/vouchers/cash/all-list",
                {
                    method: "GET",
                    params: this.allCashVouchers.params,
                    onRequest: () => {
                        this.allCashVouchers.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allCashVouchers.isLoading = false
                        if (response.ok) {
                            this.allCashVouchers.list = response._data.data.data
                            this.allCashVouchers.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyCashVouchers () {
            this.myCashVouchers.isLoaded = true
            await useAccountingApi(
                "/api/vouchers/cash/my-requests",
                {
                    method: "GET",
                    params: this.myCashVouchers.params,
                    onRequest: () => {
                        this.myCashVouchers.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myCashVouchers.isLoading = false
                        if (response.ok) {
                            this.myCashVouchers.list = response._data.data.data
                            this.myCashVouchers.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyCashApprovals () {
            this.myCashApprovals.isLoaded = true
            await useAccountingApi(
                "/api/vouchers/cash/my-approvals",
                {
                    method: "GET",
                    params: this.myCashApprovals.params,
                    onRequest: () => {
                        this.myCashApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myCashApprovals.isLoading = false
                        if (response.ok) {
                            this.myCashApprovals.list = response._data.data.data
                            this.myCashApprovals.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getAllDisbursementVouchers () {
            this.allDisbursementVouchers.isLoaded = true
            await useAccountingApi(
                "/api/vouchers/disbursement/all-list",
                {
                    method: "GET",
                    params: this.allDisbursementVouchers.params,
                    onRequest: () => {
                        this.allDisbursementVouchers.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allDisbursementVouchers.isLoading = false
                        if (response.ok) {
                            this.allDisbursementVouchers.list = response._data.data.data
                            this.allDisbursementVouchers.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyDisbursementVouchers () {
            this.myDisbursementVouchers.isLoaded = true
            await useAccountingApi(
                "/api/vouchers/disbursement/my-requests",
                {
                    method: "GET",
                    params: this.myDisbursementVouchers.params,
                    onRequest: () => {
                        this.myDisbursementVouchers.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myDisbursementVouchers.isLoading = false
                        if (response.ok) {
                            this.myDisbursementVouchers.list = response._data.data.data
                            this.myDisbursementVouchers.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async getMyDisbursementApprovals () {
            this.myDisbursementApprovals.isLoaded = true
            await useAccountingApi(
                "/api/vouchers/disbursement/my-approvals",
                {
                    method: "GET",
                    params: this.myDisbursementApprovals.params,
                    onRequest: () => {
                        this.myDisbursementApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myDisbursementApprovals.isLoading = false
                        if (response.ok) {
                            this.myDisbursementApprovals.list = response._data.data.data
                            this.myDisbursementApprovals.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    },
                }
            )
        },
        async addVoucherDisbursement () {
            await useAccountingApiO(
                "/api/vouchers/disbursement/create-voucher",
                {
                    method: "POST",
                    body: this.voucherDisbursement,
                    watch: false,
                    onRequest: () => {
                        this.voucherDisbursement.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        this.voucherDisbursement.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.voucherDisbursement.isLoading = false
                        if (response.ok) {
                            this.reloadResourcesDisbursement()
                            this.voucherDisbursement.successMessage = response._data.message
                        } else {
                            this.voucherDisbursement.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async addVoucherCash () {
            await useAccountingApiO(
                "/api/vouchers/cash/create-voucher",
                {
                    method: "POST",
                    body: this.voucherCash,
                    watch: false,
                    onRequest: () => {
                        this.voucherCash.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        this.voucherCash.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.voucherCash.isLoading = false
                        if (response.ok) {
                            this.reloadResourcesCash()
                            this.voucherCash.successMessage = response._data.message
                        } else {
                            this.voucherCash.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async generateDisbursementVoucherNo () {
            await useAccountingApi(
                "/api/vouchers/disbursement/generate-number",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.voucherDisbursement.voucher_no = response._data.data
                        }
                    },
                }
            )
        },
        async generateCashVoucherNo () {
            await useAccountingApi(
                "/api/vouchers/cash/generate-number",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.voucherCash.voucher_no = response._data.data
                        }
                    },
                }
            )
        },
        reloadResourcesCash () {
            const backup = this.voucherCash.approvals
            const callFunctions = []
            if (this.allCashVouchers.isLoaded) {
                callFunctions.push(this.getAllCashVouchers)
            }
            if (this.myCashVouchers.isLoaded) {
                callFunctions.push(this.getMyCashVouchers)
            }
            if (this.myCashApprovals.isLoaded) {
                callFunctions.push(this.getMyCashApprovals)
            }
            this.$reset()
            this.voucherCash.approvals = backup
            callFunctions.forEach((element) => {
                element()
            })
        },
        reloadResourcesDisbursement () {
            const backup = this.voucherDisbursement.approvals
            const callFunctions = []
            if (this.myDisbursementApprovals.isLoaded) {
                callFunctions.push(this.getMyDisbursementApprovals)
            }
            if (this.allDisbursementVouchers.isLoaded) {
                callFunctions.push(this.getAllDisbursementVouchers)
            }
            if (this.myDisbursementVouchers.isLoaded) {
                callFunctions.push(this.getMyDisbursementVouchers)
            }
            this.$reset()
            this.voucherDisbursement.approvals = backup
            callFunctions.forEach((element) => {
                element()
            })
        },
        async approveCashVoucher (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApiO(
                "/api/approvals/approve/ACCOUNTING_CASH_REQUEST/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResourcesCash()
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyCashVoucher (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApiO(
                "/api/approvals/disapprove/ACCOUNTING_CASH_REQUEST/" + id,
                {
                    method: "POST",
                    body: { remarks: this.remarks },
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResourcesCash()
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async approveDisbursementVoucher (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApiO(
                "/api/approvals/approve/ACCOUNTING_DISBURSEMENT_REQUEST/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResourcesDisbursement()
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyDisbursementVoucher (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApiO(
                "/api/approvals/disapprove/ACCOUNTING_DISBURSEMENT_REQUEST/" + id,
                {
                    method: "POST",
                    body: { remarks: this.remarks },
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.reloadResourcesDisbursement()
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async cashReceived () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApiO(
                "/api/vouchers/cash/received",
                {
                    method: "POST",
                    body: this.cashReceivedForm,
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
