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
        generateParams: {
            adjustments: [] as Array<Adjustment>,
            charging: [] as Array<Charging>,
            deductions: [] as Array<Deduction>,
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
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myApprovals: {
            isLoaded: false,
            list: [],
            params: {},
        },
        myRequests: {
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
                        philhealth_employee_compensation: data.payroll_records.salary_deduction.phic.employee_compensation,
                        philhealth_employer_compensation: data.payroll_records.salary_deduction.phic.employer_compensation,
                        pagibig_employee_compensation: data.payroll_records.salary_deduction.hmdf.employee_compensation,
                        pagibig_employer_compensation: data.payroll_records.salary_deduction.hmdf.employer_compensation,
                        withholdingtax_contribution: data.payroll_records.salary_deduction.ewtc,
                        total_deduct: data.payroll_records.total_salary_deduction,
                        net_pay: data.payroll_records.total_net_pay,
                        loans: data.payroll_records.salary_deduction.loan,
                        cash_advance: data.payroll_records.salary_deduction.cash_advance,
                        deductions: [
                            ...data.payroll_records.salary_deduction.loan.loans.map((loan: { installment_deduction: any }) => ({
                                name: "Loan",
                                amount: loan.installment_deduction,
                                type: "Loan"
                            })),
                            ...data.payroll_records.salary_deduction.cash_advance.cash_advance.map((cashAdvance: { total_paid: any }) => ({
                                name: "Cash Advance",
                                amount: cashAdvance.total_paid,
                                type: "Cash Advance"
                            })),
                            ...data.payroll_records.salary_deduction.other_deductions.other_deduction.map((otherDeduction: { otherdeduction_name: any; installment_deduction: any }) => ({
                                name: otherDeduction.otherdeduction_name,
                                amount: otherDeduction.installment_deduction,
                                type: "Other Deduction"
                            }))
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
                    onResponse: ({ response }) => {
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
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequests.isLoaded = true
                            this.myRequests.list = response._data.data.data
                            this.myRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        } else {
                            this.errorMessage = response._data.message
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
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovals.isLoaded = true
                            this.myApprovals.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
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
            await useHRMSApiO(
                "/api/payroll/generate-payroll",
                {
                    method: "GET",
                    params: payload,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.payrollDraft = response._data.data
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
                "/api/approvals/approve/Payroll/" + id,
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
        async denyApprovalForm (id: string) {
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.approval.params.remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/Payroll/" + id,
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
