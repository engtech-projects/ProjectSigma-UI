import { defineStore } from "pinia"

export const WEEKLY = "weekly"
export const BI_MONTHLY = "bi-monthly"
export const MONTHLY = "monthly"
export const PAYROLL_TYPE = [
    WEEKLY, BI_MONTHLY, MONTHLY
]
export const ATM = "atm"
export const CASH = "cash"
export const RELEASE_TYPE = [
    ATM, CASH
]

export interface Adjustment {
    employee_id: Number | null;
    adjustment_name: string;
    adjustment_amount: string;
}
export interface Deduction {
    name: string;
    amount: number;
    type: string;
}
export interface Charging {
    id: number;
    charging_name: string;
    charging_amount: string;
    charging_type: string;
}

export const useGeneratePayrollStore = defineStore("GeneratePayrolls", {
    state: () => ({
        isEdit: false,
        generatePayroll: {
            isLoading: false,
            body: {

            },
            draft: {

            },
            successMessage: "",
            errorMessage: "",
        },
        generateParams: {
            adjustments: [] as Adjustment[],
            charging: [] as Charging[],
            deductions: [] as Deduction[],
            group_type: null,
            project_id: null,
            department_id: null,
            payroll_type: null,
            release_type: null,
            payroll_date: "",
            cutoff_start: "",
            cutoff_end: "",
            deduct_sss: 0,
            deduct_philhealth: 0,
            deduct_pagibig: 0,
            employee_ids: [] as number[],
            approvals: [] as any[],
            payroll_details: [],
        },
        payrollDraft: {} as any,
        payrollRecord: {
            id: null,
            employee_ids: [] as number[],
            project_id: null,
            department_id: null,
            payroll_date: "",
            payroll_details: [] as any[],
            payroll_type: null,
            release_type: null,
            cutoff_start: "",
            cutoff_end: "",
            group_type: null,
            deduct_sss: 0,
            deduct_philhealth: 0,
            deduct_pagibig: 0,
            adjustments: [],
            approvals: []
        },
        editRequest: { // NOT USED
        },
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        approval: {
            params: {
                id: null,
                remarks: "",
            },
            errorMessage: "",
            successMessage: "",
        }
    }),
    getters: {
        formattedPayrollDraft (state) {
            return {
                ...state.payrollDraft,
                payroll_details: state.payrollDraft.payroll_details.map(function (data: any) {
                    return {
                        ...data.payroll_records,
                        employee_id: data.id,
                        // Hrs Worked
                        regular_hours: data.payroll_records.hours_worked.regular.reg_hrs,
                        rest_hours: data.payroll_records.hours_worked.rest.reg_hrs,
                        regular_holiday_hours: data.payroll_records.hours_worked.regular_holidays.reg_hrs,
                        special_holiday_hours: data.payroll_records.hours_worked.special_holidays.reg_hrs,
                        regular_overtime: data.payroll_records.hours_worked.regular.overtime,
                        rest_overtime: data.payroll_records.hours_worked.rest.overtime,
                        regular_holiday_overtime: data.payroll_records.hours_worked.regular_holidays.overtime,
                        special_holiday_overtime: data.payroll_records.hours_worked.special_holidays.overtime,
                        // Salary
                        regular_pay: data.payroll_records.gross_pays.regular.regular,
                        rest_pay: data.payroll_records.gross_pays.rest.regular,
                        regular_holiday_pay: data.payroll_records.gross_pays.regular_holidays.regular,
                        special_holiday_pay: data.payroll_records.gross_pays.special_holidays.regular,
                        regular_ot_pay: data.payroll_records.gross_pays.regular.overtime,
                        rest_ot_pay: data.payroll_records.gross_pays.rest.overtime,
                        regular_holiday_ot_pay: data.payroll_records.gross_pays.regular_holidays.overtime,
                        special_holiday_ot_pay: data.payroll_records.gross_pays.special_holidays.overtime,
                        gross_pay: data.payroll_records.total_gross_pay,
                        // Deductions
                        sss_employee_contribution: data.payroll_records.salary_deduction.sss.employee_contribution,
                        sss_employer_contribution: data.payroll_records.salary_deduction.sss.employer_contribution,
                        sss_employee_compensation: data.payroll_records.salary_deduction.sss.employee_compensation,
                        sss_employer_compensation: data.payroll_records.salary_deduction.sss.employer_compensation,
                        sss_employee_wisp: data.payroll_records.salary_deduction.sss.employee_wisp,
                        sss_employer_wisp: data.payroll_records.salary_deduction.sss.employer_wisp,
                        philhealth_employee_contribution: data.payroll_records.salary_deduction.phic.employee_contribution,
                        philhealth_employer_contribution: data.payroll_records.salary_deduction.phic.employer_contribution,
                        pagibig_employee_contribution: data.payroll_records.salary_deduction.hmdf.employee_contribution,
                        pagibig_employer_contribution: data.payroll_records.salary_deduction.hmdf.employer_contribution,
                        withholdingtax_contribution: data.payroll_records.salary_deduction.ewtc,
                        total_deduct: data.payroll_records.total_salary_deduction,
                        net_pay: data.payroll_records.total_net_pay,
                        loans: data.payroll_records.salary_deduction.loan,
                        cash_advance: data.payroll_records.salary_deduction.cash_advance,
                        adjustments: data.payroll_records.adjustments.map((adjust: any) => ({
                            name: adjust.adjustment_name,
                            amount: adjust.adjustment_amount,
                        })),
                        deductions: [
                            ...data.payroll_records.salary_deduction.loan.loans.map((loan: any) => ({
                                deduction_id: loan.id,
                                name: "Loan",
                                amount: loan.max_payroll_payment,
                                type: "Loan",
                            })),
                            ...data.payroll_records.salary_deduction.cash_advance.cash_advance.map((cashAdvance: any) => ({
                                deduction_id: cashAdvance.id,
                                name: "Cash Advance",
                                amount: cashAdvance.max_payroll_payment,
                                type: "Cash Advance",
                            })),
                            ...data.payroll_records.salary_deduction.other_deductions.other_deduction.map((otherDeduction: any) => ({
                                deduction_id: otherDeduction.id,
                                name: otherDeduction.otherdeduction_name,
                                amount: otherDeduction.max_payroll_payment,
                                type: "Other Deduction",
                            })),
                        ],
                    }
                }),
            }
        },
    },
    actions: {
        async getOne (id: any, getParams: any) {
            return await useHRMSApiO(
                "/api/payroll/resource/" + id,
                {
                    method: "GET",
                    params: getParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getAllRequests () {
            await useHRMSApi(
                "/api/payroll/resource",
                {
                    method: "GET",
                    params: this.allRequests.params,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allRequests.isLoading = false
                        if (response.ok) {
                            this.allRequests.isLoaded = true
                            this.allRequests.list = response._data.data.data
                            this.allRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useHRMSApi(
                "/api/payroll/my-requests",
                {
                    method: "GET",
                    params: this.myRequests.params,
                    onRequest: () => {
                        this.myRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myRequests.isLoading = false
                        if (response.ok) {
                            this.myRequests.isLoaded = true
                            this.myRequests.list = response._data.data.data
                            this.myRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovals () {
            await useHRMSApi(
                "/api/payroll/my-approvals",
                {
                    method: "GET",
                    params: this.myApprovals.params,
                    onRequest: () => {
                        this.myApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myApprovals.isLoading = false
                        if (response.ok) {
                            this.myApprovals.isLoaded = true
                            this.myApprovals.list = response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async draftPayrollRequest () {
            const payload = {
                ...this.generateParams,
                employee_ids: JSON.stringify(this.generateParams.employee_ids),
                approvals: JSON.stringify(this.generateParams.approvals),
                adjustments: JSON.stringify(this.generateParams.adjustments),
            }
            return await useHRMSApiO(
                "/api/payroll/generate-payroll",
                {
                    method: "POST",
                    body: payload,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.payrollDraft = response._data.data
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async createPayrollRequest () {
            return await useHRMSApiO(
                "/api/payroll/create-payroll",
                {
                    method: "POST",
                    body: this.formattedPayrollDraft,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            return response._data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async approveApprovalForm (id: number) {
            return await useHRMSApiO(
                "/api/approvals/approve/GeneratePayroll/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            return response._data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyApprovalForm (id: string, remarks: string) {
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/GeneratePayroll/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            return response._data
                        }
                    },
                }
            )
        },
        reloadResources () {
            const backup = this.generateParams.approvals
            const callFunctions = []
            if (this.allRequests.isLoaded) {
                callFunctions.push(this.getAllRequests)
            }
            if (this.myRequests.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            if (this.myApprovals.isLoaded) {
                callFunctions.push(this.getMyApprovals)
            }
            this.$reset()
            this.generateParams.approvals = backup
            callFunctions.forEach((element) => {
                element()
            })
        },
        addAdjustment () {
            this.generateParams.adjustments.push({ employee_id: null, adjustment_name: "", adjustment_amount: "" })
        },
        removeAdjustment (index: any) {
            this.generateParams.adjustments.splice(index, 1)
        },
    },
})
