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
    employee_id: Number;
    adjustment_name: string;
    adjustment_amount: string;
}
export interface Deduction {
    id: number;
    deduction_name: string;
    deduction_amount: string;
    deduction_type: string;
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
        payrollDraft: [] as any,
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
            adjustment: [],
            approvals: []
        },
        list: [],
        myApprovalRequestList: [],
        myRequestList: [],
        pagination: {},
        getParams: {
            employee_id: null,
        },
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    getters: {
        formattedPayrollDraft (state) {
            return {
                ...state.payrollDraft,
                payroll: state.payrollDraft.payroll.map(function (data) {
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
                        other_deductions: data.payroll_records.salary_deduction.other_deductions,
                    }
                }),
                payroll_details: state.payrollDraft.payroll.map(function (data: any) {
                    return {
                        employee_id: data.id,
                        regular_hours: data.payroll_records.hours_worked.regular.reg_hrs,
                        rest_hours: data.payroll_records.hours_worked.rest.reg_hrs,
                        regular_holiday_hours: data.payroll_records.hours_worked.regular_holidays.reg_hrs,
                        special_holiday_hours: data.payroll_records.hours_worked.special_holidays.reg_hrs,
                        regular_overtime: data.payroll_records.hours_worked.regular.overtime,
                        rest_overtime: data.payroll_records.hours_worked.rest.overtime,
                        regular_holiday_overtime: data.payroll_records.hours_worked.regular_holidays.overtime,
                        special_holiday_overtime: data.payroll_records.hours_worked.special_holidays.overtime,

                        regular_pay: data.payroll_records.gross_pays.regular.regular,
                        rest_pay: data.payroll_records.gross_pays.rest.regular,
                        regular_holiday_pay: data.payroll_records.gross_pays.regular_holidays.regular,
                        special_holiday_pay: data.payroll_records.gross_pays.special_holidays.regular,
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
                        other_deductions: data.payroll_records.salary_deduction.other_deductions,
                        adjustments: data.payroll_records.gross_pays.adjustments.map((adj: Adjustment) => ({
                            employee_id: adj.employee_id,
                            adjustment_name: adj.adjustment_name,
                            adjustment_amount: adj.adjustment_amount
                        })),
                        // deductions: data.payroll_records.gross_pays.deductions.map((deduct: Deduction) => ({
                        //     charge_id: data.charge_id,
                        //     name: data.name,
                        //     amount: data.amount,
                        //     type: data.type,
                        // })),
                        // chargings: data.payroll_records.gross_pays.chargings.map((chg: Charging) => ({
                        //     charge_id: chg.charge_id,
                        //     name: chg.name,
                        //     amount: chg.amount,
                        //     type: chg.type,
                        // })),
                        deductions: {
                            sss_employee_contribution: data.payroll_records.salary_deduction.sss.employee_contribution,
                            sss_employer_contribution: data.payroll_records.salary_deduction.sss.employer_contribution,
                            sss_employee_compensation: data.payroll_records.salary_deduction.sss.employee_compensation,
                            sss_employer_compensation: data.payroll_records.salary_deduction.sss.employer_compensation,
                            philhealth_employee_compensation: data.payroll_records.salary_deduction.phic.employee_compensation,
                            philhealth_employer_compensation: data.payroll_records.salary_deduction.phic.employer_compensation,
                            pagibig_employee_compensation: data.payroll_records.salary_deduction.hmdf.employee_compensation,
                            pagibig_employer_compensation: data.payroll_records.salary_deduction.hmdf.employer_compensation,
                        },
                    }
                }),
            }
        },

        totalAdjustments (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: any) => {
                if (Array.isArray(element.payroll_records.gross_pays.adjustments)) {
                    element.payroll_records.gross_pays.adjustments.forEach((adjustment: any) => {
                        total += parseFloat(adjustment.adjustment_amount) || 0
                    })
                }
            })
            return total.toFixed(2)
        },
        totalAdjustment (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { gross_pays: { adjustments: { adjustment_amount: string } } } }) => {
                total += parseFloat(element.payroll_records.gross_pays.adjustments.adjustment_amount)
            })
            return total.toFixed(2)
        },
        totalLoansPayrollDraft (state: any): string {
            let total = 0
            state.payrollDraft.payroll.forEach((element: any) => {
                const salaryDeduction = element.payroll_records.salary_deduction
                total += parseFloat(salaryDeduction.cash_advance.total_paid) || 0
                total += parseFloat(salaryDeduction.loan.total_paid) || 0
                total += parseFloat(salaryDeduction.other_deductions.total_paid) || 0
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
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { other_deductions: { total_paid: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.other_deductions.total_paid)
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
                total += parseFloat(element.payroll_records.salary_deduction.hmdf.employer_compensation) ?? 0
            })
            return total.toFixed(2)
        },
        totalHDMFEmployeePayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { hmdf: { employee_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.hmdf.employee_compensation) ?? 0
            })
            return total.toFixed(2)
        },
        totalPHICEmployerPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { phic: { employer_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.phic.employer_compensation) ?? 0
            })
            return total.toFixed(2)
        },
        totalPHICEmployeePayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { phic: { employee_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.phic.employee_compensation) ?? 0
            })
            return total.toFixed(2)
        },
        totalSSSEmployerPayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { sss: { employer_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.sss.employer_compensation) ?? 0
            })
            return total.toFixed(2)
        },
        totalSSSEmployeePayrollDraft (state) {
            let total = 0
            state.payrollDraft.payroll.forEach((element: { payroll_records: { salary_deduction: { sss: { employee_compensation: string } } } }) => {
                total += parseFloat(element.payroll_records.salary_deduction.sss.employee_compensation) ?? 0
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
            this.successMessage = ""
            this.errorMessage = ""
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
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.payrollDraft = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
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
