import { defineStore } from "pinia"
export const LOAN_HDMF_MPL = "HDMF MPL"
export const LOAN_HDMF_MPL_LOAN = "HDMF MPL LOAN"
export const LOAN_COOP = "COOP LOAN"
export const LOAN_SSS = "SSS LOAN"
export const LOAN_CALAMITY = "HDMF CALAMITY LOAN"
export const EMPLOYEE_MASTERLIST = "EMPLOYEE MASTERLIST"
export const EMPLOYEE_NEWHIRE = "EMPLOYEE NEWHIRE"
export const EMPLOYEE_TENURESHIP = "EMPLOYEE TENURESHIP"
export const LOAN_REPORTS = [
    LOAN_HDMF_MPL,
    LOAN_HDMF_MPL_LOAN,
    LOAN_COOP,
    LOAN_SSS,
    LOAN_CALAMITY,
]
export const OD_MP2 = "MP2"
export const OD_REPORTS = [
    OD_MP2,
]
export const useGenerateReportStore = defineStore("GenerateReport", {
    state: () => ({
        loanReports: {
            categoryList: {
                isLoading: false,
                isLoaded: false,
                list: [],
                params: {},
                pagination: {},
                errorMessage: null,
                successMessage: null,
            },
            reportResult: {
                isLoading: false,
                isLoaded: false,
                list: [],
                params: {
                    loan_type: "",
                    charging_type: null,
                },
                pagination: {},
                errorMessage: null,
                successMessage: null,
            },
        },
        administrativeReports: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                report_type: null,
                department_id: null,
                project_id: null,
                group_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        otherDeductionReports: {
            categoryList: {
                isLoading: false,
                isLoaded: false,
                list: [],
                params: {},
                pagination: {},
                errorMessage: null,
                successMessage: null,
            },
            reportResult: {
                isLoading: false,
                isLoaded: false,
                list: [],
                params: {
                    loan_type: "",
                    charging_type: null,
                },
                pagination: {},
                errorMessage: null,
                successMessage: null,
            },
        },
        defaultPaymentReport: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        defaultPaymentGroupReport: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        sssEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        sssGroupSummaryLoan: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                loan_type: "SSS LOAN",
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        hdmfEmployeeLoan: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                loan_type: "HDMF MPL",
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        hdmfGroupSummaryLoan: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                loan_type: "HDMF MPL",
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        coopEmployeeLoan: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                loan_type: "COOP LOANS",
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        coopGroupSummaryLoan: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                loan_type: "COOP LOANS",
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        hdmfCalamityEmployeeLoan: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                loan_type: "CALAMITY LOAN",
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        hdmfCalamityGroupSummaryLoan: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                loan_type: "CALAMITY LOAN",
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        pagibigEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        philhealthEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        sssGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        pagibigGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        philhealthGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        sssRemittanceSummaryList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        pagibigRemittanceSummaryList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        philhealthRemittanceSummaryList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
    }),
    getters: {},
    actions: {
        // REMITTANCE REPORTS
        // PHILHEALTH REMITTANCE
        async getPhilhealthEmployeeRemitance () {
            await useHRMSApiO(
                "/api/reports/philhealth-employee-remittance",
                {
                    method: "GET",
                    params: this.philhealthEmployeeRemitanceList.params,
                    onRequest: () => {
                        this.philhealthEmployeeRemitanceList.isLoading = true
                        this.philhealthEmployeeRemitanceList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.philhealthEmployeeRemitanceList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.philhealthEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.philhealthEmployeeRemitanceList.isLoaded = true
                            this.philhealthEmployeeRemitanceList.list = response._data.data
                            this.philhealthEmployeeRemitanceList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getPhilhealthGroupRemitance () {
            await useHRMSApiO(
                "/api/reports/philhealth-group-remittance",
                {
                    method: "GET",
                    params: this.philhealthGroupRemittance.params,
                    onRequest: () => {
                        this.philhealthGroupRemittance.isLoading = true
                        this.philhealthGroupRemittance.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.philhealthGroupRemittance.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.philhealthGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.philhealthGroupRemittance.isLoaded = true
                            this.philhealthGroupRemittance.list = response._data.data.remittances
                            this.philhealthGroupRemittance.chargingName = response._data.data.charging
                            this.philhealthGroupRemittance.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getPhilhealthRemittanceSummary () {
            await useHRMSApiO(
                "/api/reports/philhealth-remittance-summary",
                {
                    method: "GET",
                    params: this.philhealthRemittanceSummaryList.params,
                    onRequest: () => {
                        this.philhealthRemittanceSummaryList.isLoading = true
                        this.philhealthRemittanceSummaryList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.philhealthRemittanceSummaryList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.philhealthRemittanceSummaryList.isLoading = false
                        if (response.ok) {
                            this.philhealthRemittanceSummaryList.isLoaded = true
                            this.philhealthRemittanceSummaryList.list = response._data.data
                            this.philhealthRemittanceSummaryList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getAdministrativeReport () {
            await useHRMSApiO(
                "/api/reports/administrative",
                {
                    method: "GET",
                    params: this.administrativeReports.params,
                    onRequest: () => {
                        this.administrativeReports.isLoading = true
                        this.administrativeReports.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.administrativeReports.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.administrativeReports.isLoading = false
                        if (response.ok) {
                            this.administrativeReports.isLoaded = true
                            this.administrativeReports.list = response._data.data
                            this.administrativeReports.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        // SSS REMITTANCE
        async getSssEmployeeRemittance () {
            await useHRMSApiO(
                "/api/reports/sss-employee-remittance",
                {
                    method: "GET",
                    params: this.sssEmployeeRemitanceList.params,
                    onRequest: () => {
                        this.sssEmployeeRemitanceList.isLoading = true
                        this.sssEmployeeRemitanceList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.sssEmployeeRemitanceList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.sssEmployeeRemitanceList.isLoaded = true
                            this.sssEmployeeRemitanceList.list = response._data.data
                            this.sssEmployeeRemitanceList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getSssGroupRemitance () {
            await useHRMSApiO(
                "/api/reports/sss-group-remittance",
                {
                    method: "GET",
                    params: this.sssGroupRemittance.params,
                    onRequest: () => {
                        this.sssGroupRemittance.isLoading = true
                        this.sssGroupRemittance.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.sssGroupRemittance.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.sssGroupRemittance.isLoaded = true
                            this.sssGroupRemittance.list = response._data.data.remittances
                            this.sssGroupRemittance.chargingName = response._data.data.charging
                            this.sssGroupRemittance.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getSssRemittanceSummary () {
            await useHRMSApiO(
                "/api/reports/sss-remittance-summary",
                {
                    method: "GET",
                    params: this.sssRemittanceSummaryList.params,
                    onRequest: () => {
                        this.sssRemittanceSummaryList.isLoading = true
                        this.sssRemittanceSummaryList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.sssRemittanceSummaryList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssRemittanceSummaryList.isLoading = false
                        if (response.ok) {
                            this.sssRemittanceSummaryList.isLoaded = true
                            this.sssRemittanceSummaryList.list = response._data.data
                            this.sssRemittanceSummaryList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        // PAGIBIG REMITTANCE
        async getPagibigEmployeeRemitance () {
            await useHRMSApiO(
                "/api/reports/pagibig-employee-remittance",
                {
                    method: "GET",
                    params: this.pagibigEmployeeRemitanceList.params,
                    onRequest: () => {
                        this.pagibigEmployeeRemitanceList.isLoading = true
                        this.pagibigEmployeeRemitanceList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.pagibigEmployeeRemitanceList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.pagibigEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.pagibigEmployeeRemitanceList.isLoaded = true
                            this.pagibigEmployeeRemitanceList.list = response._data.data
                            this.pagibigEmployeeRemitanceList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getPagibigGroupRemitance () {
            await useHRMSApiO(
                "/api/reports/pagibig-group-remittance",
                {
                    method: "GET",
                    params: this.pagibigGroupRemittance.params,
                    onRequest: () => {
                        this.pagibigGroupRemittance.isLoading = true
                        this.pagibigGroupRemittance.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.pagibigGroupRemittance.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.pagibigGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.pagibigGroupRemittance.isLoaded = true
                            this.pagibigGroupRemittance.list = response._data.data.remittances
                            this.pagibigGroupRemittance.chargingName = response._data.data.charging
                            this.pagibigGroupRemittance.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getPagibigRemittanceSummary () {
            await useHRMSApiO(
                "/api/reports/pagibig-remittance-summary",
                {
                    method: "GET",
                    params: this.pagibigRemittanceSummaryList.params,
                    onRequest: () => {
                        this.pagibigRemittanceSummaryList.isLoading = true
                        this.pagibigRemittanceSummaryList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.pagibigRemittanceSummaryList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.pagibigRemittanceSummaryList.isLoading = false
                        if (response.ok) {
                            this.pagibigRemittanceSummaryList.isLoaded = true
                            this.pagibigRemittanceSummaryList.list = response._data.data
                            this.pagibigRemittanceSummaryList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        /*
        * OTHER DEDUCTION REPORTS
        */
        async getLoanCategoryList () {
            await useHRMSApiO(
                "/api/reports/loans/category-list",
                {
                    method: "GET",
                    onRequest: () => {
                        this.loanReports.categoryList.isLoading = true
                        this.loanReports.categoryList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.loanReports.categoryList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.loanReports.categoryList.isLoading = false
                        if (response.ok) {
                            this.loanReports.categoryList.isLoaded = true
                            this.loanReports.categoryList.list = response._data.data
                            this.loanReports.categoryList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getLoanReport () {
            await useHRMSApiO(
                "/api/reports/loans/get",
                {
                    method: "GET",
                    params: this.loanReports.reportResult.params,
                    onRequest: () => {
                        this.loanReports.reportResult.isLoading = true
                        this.loanReports.reportResult.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.loanReports.reportResult.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.loanReports.reportResult.isLoading = false
                        if (response.ok) {
                            this.loanReports.reportResult.isLoaded = true
                            this.loanReports.reportResult.list = response._data.data
                            this.loanReports.reportResult.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getDefaultPaymentReport () {
            await useHRMSApiO(
                "/api/reports/default-loan-employee",
                {
                    method: "GET",
                    params: this.defaultPaymentReport.params,
                    onRequest: () => {
                        this.defaultPaymentReport.isLoading = true
                        this.defaultPaymentReport.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.defaultPaymentReport.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.defaultPaymentReport.isLoading = false
                        if (response.ok) {
                            this.defaultPaymentReport.isLoaded = true
                            this.defaultPaymentReport.list = response._data.data
                            this.defaultPaymentReport.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getHdmfEmployeeLoan () {
            await useHRMSApiO(
                "/api/reports/hdmf-employee-loans",
                {
                    method: "GET",
                    params: this.hdmfEmployeeLoan.params,
                    onRequest: () => {
                        this.hdmfEmployeeLoan.isLoading = true
                        this.hdmfEmployeeLoan.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.hdmfEmployeeLoan.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.hdmfEmployeeLoan.isLoading = false
                        if (response.ok) {
                            this.hdmfEmployeeLoan.isLoaded = true
                            this.hdmfEmployeeLoan.list = response._data.data
                            this.hdmfEmployeeLoan.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getcoopEmployeeLoan () {
            await useHRMSApiO(
                "/api/reports/coop-employee-loans",
                {
                    method: "GET",
                    params: this.coopEmployeeLoan.params,
                    onRequest: () => {
                        this.coopEmployeeLoan.isLoading = true
                        this.coopEmployeeLoan.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.coopEmployeeLoan.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.coopEmployeeLoan.isLoading = false
                        if (response.ok) {
                            this.coopEmployeeLoan.isLoaded = true
                            this.coopEmployeeLoan.list = response._data.data
                            this.coopEmployeeLoan.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getHdmfCalamityEmployeeLoan () {
            await useHRMSApiO(
                "/api/reports/hdmf-calamity-group-summary-loans",
                {
                    method: "GET",
                    params: this.hdmfCalamityEmployeeLoan.params,
                    onRequest: () => {
                        this.hdmfCalamityEmployeeLoan.isLoading = true
                        this.hdmfCalamityEmployeeLoan.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.hdmfCalamityEmployeeLoan.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.hdmfCalamityEmployeeLoan.isLoading = false
                        if (response.ok) {
                            this.hdmfCalamityEmployeeLoan.isLoaded = true
                            this.hdmfCalamityEmployeeLoan.list = response._data.data
                            this.hdmfCalamityEmployeeLoan.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getDefaultPaymentGroupReport () {
            await useHRMSApiO(
                "/api/reports/default-loan-group",
                {
                    method: "GET",
                    params: this.defaultPaymentGroupReport.params,
                    onRequest: () => {
                        this.defaultPaymentGroupReport.isLoading = true
                        this.defaultPaymentGroupReport.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.defaultPaymentGroupReport.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.defaultPaymentGroupReport.isLoading = false
                        if (response.ok) {
                            this.defaultPaymentGroupReport.isLoaded = true
                            this.defaultPaymentGroupReport.list = response._data.data
                            this.defaultPaymentGroupReport.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getCoopGroupSummaryLoan () {
            await useHRMSApiO(
                "/api/reports/coop-employee-loans",
                {
                    method: "GET",
                    params: this.coopEmployeeLoan.params,
                    onRequest: () => {
                        this.coopEmployeeLoan.isLoading = true
                        this.coopEmployeeLoan.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.coopEmployeeLoan.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.coopEmployeeLoan.isLoading = false
                        if (response.ok) {
                            this.coopEmployeeLoan.isLoaded = true
                            this.coopEmployeeLoan.list = response._data.data
                            this.coopEmployeeLoan.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getHdmfCalamityGroupSummaryLoan () {
            await useHRMSApiO(
                "/api/reports/hdmf-calamity-employee-loans",
                {
                    method: "GET",
                    params: this.hdmfCalamityGroupSummaryLoan.params,
                    onRequest: () => {
                        this.hdmfCalamityGroupSummaryLoan.isLoading = true
                        this.hdmfCalamityGroupSummaryLoan.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.hdmfCalamityGroupSummaryLoan.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.hdmfCalamityGroupSummaryLoan.isLoading = false
                        if (response.ok) {
                            this.hdmfCalamityGroupSummaryLoan.isLoaded = true
                            this.hdmfCalamityGroupSummaryLoan.list = response._data.data
                            this.hdmfCalamityGroupSummaryLoan.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getSssGroupLoan () {
            await useHRMSApiO(
                "/api/reports/sss-group-summary-loans",
                {
                    method: "GET",
                    params: this.sssGroupSummaryLoan.params,
                    onRequest: () => {
                        this.sssGroupSummaryLoan.isLoading = true
                        this.sssGroupSummaryLoan.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.sssGroupSummaryLoan.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssGroupSummaryLoan.isLoading = false
                        if (response.ok) {
                            this.sssGroupSummaryLoan.isLoaded = true
                            this.sssGroupSummaryLoan.list = response._data.data
                            this.sssGroupSummaryLoan.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getHdmfGroupLoan () {
            await useHRMSApiO(
                "/api/reports/hdmf-group-summary-loans",
                {
                    method: "GET",
                    params: this.hdmfGroupSummaryLoan.params,
                    onRequest: () => {
                        this.hdmfGroupSummaryLoan.isLoading = true
                        this.hdmfGroupSummaryLoan.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.hdmfGroupSummaryLoan.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.hdmfGroupSummaryLoan.isLoading = false
                        if (response.ok) {
                            this.hdmfGroupSummaryLoan.isLoaded = true
                            this.hdmfGroupSummaryLoan.list = response._data.data
                            this.hdmfGroupSummaryLoan.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        /*
        * OTHER DEDUCTION REPORTS
        */
        async getOtherDeductionsCategoryList () {
            await useHRMSApiO(
                "/api/reports/other-deductions/category-list",
                {
                    method: "GET",
                    onRequest: () => {
                        this.otherDeductionReports.categoryList.isLoading = true
                        this.otherDeductionReports.categoryList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.otherDeductionReports.categoryList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.otherDeductionReports.categoryList.isLoading = false
                        if (response.ok) {
                            this.otherDeductionReports.categoryList.isLoaded = true
                            this.otherDeductionReports.categoryList.list = response._data.data
                            this.otherDeductionReports.categoryList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getOtherDeductionReport () {
            await useHRMSApiO(
                "/api/reports/other-deductions/get",
                {
                    method: "GET",
                    params: this.otherDeductionReports.reportResult.params,
                    onRequest: () => {
                        this.otherDeductionReports.reportResult.isLoading = true
                        this.otherDeductionReports.reportResult.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.otherDeductionReports.reportResult.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.otherDeductionReports.reportResult.isLoading = false
                        if (response.ok) {
                            this.otherDeductionReports.reportResult.isLoaded = true
                            this.otherDeductionReports.reportResult.list = response._data.data
                            this.otherDeductionReports.reportResult.successMessage = response._data.message
                        }
                    },
                }
            )
        },
    },
})
