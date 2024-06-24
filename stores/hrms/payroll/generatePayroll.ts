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

export interface PayrollAdjustment {
    id: number;
    adjustment_name: string;
    adjustment_amount: string;
}

export const useGeneratePayrollStore = defineStore("GeneratePayrolls", {
    state: () => ({
        isEdit: false,
        generateParams: {
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
            adjustments: [] as PayrollAdjustment[],
            approvals: [] as any[],
        },
        payrollDraft: [] as any,
        payrollRecord: {
            id: null,
            employee_ids: [] as number[],
            project_id: null,
            department_id: null,
            payroll_date: "",
            payroll_type: null,
            release_type: null,
            cutoff_start: "",
            cutoff_end: "",
            group_type: null,
            deduct_sss: 0,
            deduct_philhealth: 0,
            deduct_pagibig: 0,
            adjustment: [],
            approvals: []
        },
        list: [],
        myApprovalRequestList: [],
        myRequestList: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    getters: {
        formattedPayrollDraft (state) {
            return {
                ...state.payrollDraft,
                payroll: state.payrollDraft.payroll.map(function (data: any) {
                    return {
                        employee_id: data.id,
                        regular_hours: data.payroll_records.hours_worked.regular,
                        rest_hours: data.payroll_records.hours_worked.rest.regular,
                        regular_holiday_hours: data.payroll_records.hours_worked.regular_holidays.regular,
                        special_holiday_hours: data.payroll_records.hours_worked.special_holidays.regular,
                        regular_overtime: data.payroll_records.hours_worked.regular.overtime,
                        rest_overtime: data.payroll_records.hours_worked.rest.overtime,
                        regular_holiday_overtime: data.payroll_records.hours_worked.regular_holidays.overtime,
                        special_holiday_overtime: data.payroll_records.hours_worked.special_holidays.overtime,

                        regular_pay: data.payroll_records.gross_pays.regular.regular,
                        rest_pay: data.payroll_records.gross_pays.rest.regular,
                        regular_holiday_pay: data.payroll_records.gross_pays.regular_holidays.regular,
                        special_holiday_pay: data.payroll_records.gross_pays.special_holidays.reg_hrs,
                        regular_ot_pay: data.payroll_records.gross_pays.regular.overtime,
                        rest_ot_pay: data.payroll_records.gross_pays.rest.overtime,
                        regular_holiday_ot_pay: data.payroll_records.gross_pays.regular_holidays.overtime,
                        special_holiday_ot_pay: data.payroll_records.gross_pays.special_holidays.overtime,
                        gross_pay: data.payroll_records.total_gross_pay,
                        late_hours: data.payroll_records.hours_worked.regular.late,

                        sss_employee_contribution: data.payroll_records.salary_deduction.sss.employee_contribution,
                        sss_employer_contribution: data.payroll_records.salary_deduction.sss.employer_contribution,
                        sss_employee_compensation: data.payroll_records.salary_deduction.sss.employee_compensation,
                        sss_employer_compensation: data.payroll_records.salary_deduction.sss.employer_compensation,
                        philhealth_employee_compensation: data.payroll_records.salary_deduction.phic.employee_compensation,
                        philhealth_employer_compensation: data.payroll_records.salary_deduction.phic.employer_compensation,
                        // pagibig_employee_contribution: data.payroll_records.salary_deduction.,
                        // pagibig_employer_contribution: data.payroll_records.salary_deduction.,
                        pagibig_employee_compensation: data.payroll_records.salary_deduction.hmdf.employee_compensation,
                        pagibig_employer_compensation: data.payroll_records.salary_deduction.hmdf.employer_compensation,
                        withholdingtax_contribution: data.payroll_records.salary_deduction.ewtc,
                        total_deduct: data.payroll_records.total_salary_deduction,
                        net_pay: data.payroll_records.total_net_pay,
                        loans: data.payroll_records.salary_deduction.loan,
                        cash_advance: data.payroll_records.salary_deduction.cash_advance,
                        other_deductions: data.payroll_records.salary_deduction.other_deduction,
                    }
                }),
            }
        },
        totalLoansPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { loan: string } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.loan)
            })
            return total.toFixed(2)
        },
        totalCashAdvancePayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { cash_advance: string } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.cash_advance)
            })
            return total.toFixed(2)
        },
        totalOtherDeductionsPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { other_deduction: string } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.other_deduction)
            })
            return total.toFixed(2)
        },
        totalNetPayPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { total_net_pay: string } }) => {
                total += parseFloat(element.payroll_records.total_net_pay)
            })
            return total.toFixed(2)
        },
        totalDeductionPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { total_salary_deduction: string } }) => {
                total += parseFloat(element.payroll_records.total_salary_deduction)
            })
            return total.toFixed(2)
        },
        totalEWTCPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { ewtc: string } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.ewtc)
            })
            return total.toFixed(2)
        },
        totalHDMFEmployerPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { hmdf: { employer_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.hmdf.employer_compensation)
            })
            return total.toFixed(2)
        },
        totalHDMFEmployeePayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { hmdf: { employee_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.hmdf.employee_compensation)
            })
            return total.toFixed(2)
        },
        totalPHICEmployerPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { phic: { employer_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.phic.employer_compensation)
            })
            return total.toFixed(2)
        },
        totalPHICEmployeePayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { phic: { employee_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.phic.employee_compensation)
            })
            return total.toFixed(2)
        },
        totalSSSEmployerPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { sss: { employer_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.sss.employer_compensation)
            })
            return total.toFixed(2)
        },
        totalSSSEmployeePayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { sss: { employee_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.sss.employee_compensation)
            })
            return total.toFixed(2)
        },
        totalGrossPayPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { total_gross_pay: string } }) => {
                total += parseFloat(element.payroll_records.total_gross_pay)
            })
            return total.toFixed(2)
        },
        totalSpcHolOTPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { special_holidays: { overtime: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.special_holidays.overtime)
            })
            return total.toFixed(2)
        },
        totalRegHolOTPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { regular_holidays: { overtime: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.regular_holidays.overtime)
            })
            return total.toFixed(2)
        },
        totalRestDayOTPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { rest: { overtime: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.rest.overtime)
            })
            return total.toFixed(2)
        },
        totalRegOTPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { regular: { overtime: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.regular.overtime)
            })
            return total.toFixed(2)
        },
        totalSpcHolPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { special_holidays: { regular: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.special_holidays.regular) ?? 0
            })
            return total.toFixed(2)
        },
        totalRegHolPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { regular_holidays: { regular: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.regular_holidays.regular) ?? 0
            })
            return total.toFixed(2)
        },
        totalRestDayPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { rest: { regular: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.rest.regular) ?? 0
            })
            return total.toFixed(2)
        },
        totalRegHrsPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { regular: { regular: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.regular.regular) ?? 0
            })
            return total.toFixed(2)
        },
    },
    actions: {
        async generatePayrollDraft () {
            const payload = {
                ...this.generateParams,
                employee_ids: JSON.stringify(this.generateParams.employee_ids),
                approvals: JSON.stringify(this.generateParams.approvals),
            }
            await useHRMSApiO(
                "/api/payroll/generate-payroll",
                {
                    method: "GET",
                    params: payload,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.payrollDraft = response._data.data
                        }
                    },
                }
            )
        },
        async getAllList () {
            await useHRMSApi(
                "/api/payroll/resource",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
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
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequestList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useHRMSApi(
                "/api/payroll/my-approvals",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovalRequestList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },

        async createRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/payroll/create-payroll",
                {
                    method: "POST",
                    body: this.formattedPayrollDraft,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.getAllList()
                            this.getMyApprovalRequests()
                            this.getMyRequests()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async editRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/payroll/resource/" + this.payrollRecord.id,
                {
                    method: "PATCH",
                    body: this.payrollRecord,
                    onResponse: ({ response }: any) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async deleteRequest (id: number) {
            await useHRMSApi(
                "/api/payroll/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals/approve/Payroll/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getMyApprovalRequests()
                            this.getAllList()
                            this.getMyRequests()
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyApprovalForm (id: string) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/Payroll/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getMyApprovalRequests()
                            this.getAllList()
                            this.getMyRequests()
                            return response._data
                        }
                    },
                }
            )
        },
    },
})
