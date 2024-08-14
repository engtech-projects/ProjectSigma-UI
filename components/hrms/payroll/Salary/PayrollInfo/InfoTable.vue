<script setup lang="ts">
const props = defineProps({
    payrollRequest: {
        type: Object,
        required: true,
    }
})
const totalAdjustments = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        if (Array.isArray(element.payroll_records.gross_pays.adjustments)) {
            element.payroll_records.gross_pays.adjustments.forEach((adjustment: any) => {
                total += parseFloat(adjustment.adjustment_amount) || 0
            })
        }
    })
    return total.toFixed(2)
}
// const totalLoansPayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: any) => {
//         const salaryDeduction = element.payroll_records.salary_deduction
//         total += parseFloat(salaryDeduction.cash_advance.total_paid) || 0
//         total += parseFloat(salaryDeduction.loan.total_paid) || 0
//         total += parseFloat(salaryDeduction.other_deductions.total_paid) || 0
//     })
//     return total.toFixed(2)
// }
// const totalCashAdvancePayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { cash_advance: string } } }) => {
//         total += parseFloat(element.payroll_records.salary_deduction.cash_advance)
//     })
//     return total.toFixed(2)
// }
// const totalOtherDeductionsPayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: any) => {
//         if (Array.isArray(element.payroll_records.salary_deduction.other_deductions.other_deduction)) {
//             element.payroll_records.salary_deduction.other_deductions.other_deduction.forEach((otherDed: any) => {
//                 total += parseFloat(otherDed.installment_deduction) || 0
//             })
//         }
//     })
//     return total.toFixed(2)
// }
const totalNetPayPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { total_net_pay: string } }) => {
        total += parseFloat(element.payroll_records.total_net_pay)
    })
    return total.toFixed(2)
}
const totalDeductionPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { total_salary_deduction: string } }) => {
        total += parseFloat(element.payroll_records.total_salary_deduction)
    })
    return total.toFixed(2)
}
const totalEWTCPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { ewtc: string } } }) => {
        total += parseFloat(element.payroll_records.salary_deduction.ewtc)
    })
    return total.toFixed(2)
}
// const totalHDMFEmployerPayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { hmdf: { employer_compensation: string } } } }) => {
//         total += parseFloat(element.payroll_records.salary_deduction.hmdf.employer_compensation) ?? 0
//     })
//     return total.toFixed(2)
// }
const totalHDMFEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { hmdf: { employee_compensation: string } } } }) => {
        total += parseFloat(element.payroll_records.salary_deduction.hmdf.employee_compensation) ?? 0
    })
    return total.toFixed(2)
}
// const totalPHICEmployerPayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { phic: { employer_compensation: string } } } }) => {
//         total += parseFloat(element.payroll_records.salary_deduction.phic.employer_compensation) ?? 0
//     })
//     return total.toFixed(2)
// }
const totalPHICEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { phic: { employee_compensation: string } } } }) => {
        total += parseFloat(element.payroll_records.salary_deduction.phic.employee_compensation) ?? 0
    })
    return total.toFixed(2)
}
// const totalSSSEmployerPayroll = () => {
//     let total = 0
//     props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { sss: { employer_compensation: string } } } }) => {
//         total += parseFloat(element.payroll_records.salary_deduction.sss.employer_compensation) ?? 0
//     })
//     return total.toFixed(2)
// }
const totalSSSEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { sss: { employee_compensation: string } } } }) => {
        total += parseFloat(element.payroll_records.salary_deduction.sss.employee_compensation) ?? 0
    })
    return total.toFixed(2)
}
const totalGrossPayPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { total_gross_pay: string } }) => {
        total += parseFloat(element.payroll_records.total_gross_pay)
    })
    return total.toFixed(2)
}
const totalSpcHolOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { gross_pays: { special_holidays: { overtime: string } } } }) => {
        total += parseFloat(element.payroll_records.gross_pays.special_holidays.overtime)
    })
    return total.toFixed(2)
}
const totalRegHolOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { gross_pays: { regular_holidays: { overtime: string } } } }) => {
        total += parseFloat(element.payroll_records.gross_pays.regular_holidays.overtime)
    })
    return total.toFixed(2)
}
const totalRestDayOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { gross_pays: { rest: { overtime: string } } } }) => {
        total += parseFloat(element.payroll_records.gross_pays.rest.overtime)
    })
    return total.toFixed(2)
}
const totalRegOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { gross_pays: { regular: { overtime: string } } } }) => {
        total += parseFloat(element.payroll_records.gross_pays.regular.overtime)
    })
    return total.toFixed(2)
}
const totalSpcHolPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { gross_pays: { special_holidays: { regular: string } } } }) => {
        total += parseFloat(element.payroll_records.gross_pays.special_holidays.regular) ?? 0
    })
    return total.toFixed(2)
}
const totalRegHolPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { gross_pays: { regular_holidays: { regular: string } } } }) => {
        total += parseFloat(element.payroll_records.gross_pays.regular_holidays.regular) ?? 0
    })
    return total.toFixed(2)
}
const totalRestDayPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { gross_pays: { rest: { regular: string } } } }) => {
        total += parseFloat(element.payroll_records.gross_pays.rest.regular) ?? 0
    })
    return total.toFixed(2)
}
const totalRegHrsPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { gross_pays: { regular: { regular: string } } } }) => {
        total += parseFloat(element.payroll_records.gross_pays.regular.regular) ?? 0
    })
    return total.toFixed(2)
}
</script>

<template>
    <table class="w-full text-sm text-center text-gray-50 pb-4">
        <thead
            class="text-xs text-black uppercase bg-sky-50 dark:bg-gray-950"
        >
            <tr>
                <th
                    scope="col"
                    rowspan="3"
                    class="p-2 border-solid border border-slate-400"
                >
                    No
                </th>
                <th
                    scope="col"
                    colspan="2"
                    class="p-2 border-solid border border-slate-400 bg-sky-200"
                >
                    Name
                </th>
                <th
                    scope="col"
                    rowspan="3"
                    class="p-2 border-solid border border-slate-400 bg-sky-200"
                >
                    Designation
                </th>
                <th
                    scope="col"
                    rowspan="3"
                    class="p-4 border-solid border border-slate-400 bg-sky-200"
                >
                    Salary Grade
                </th>
                <th
                    scope="col"
                    colspan="8"
                    class="p-2 border-solid border border-slate-400 bg-sky-200"
                >
                    Hrs. Worked
                </th>
                <th
                    scope="col"
                    :colspan="9"
                    class="p-2 border-solid border border-slate-400 bg-sky-200"
                >
                    Gross Pay
                </th>
                <th
                    scope="col"
                    rowspan="3"
                    class="px-6 border-solid border border-slate-400 bg-sky-200"
                >
                    Total Gross Pay
                </th>
                <th
                    scope="col"
                    colspan="6"
                    class="p-2 border-solid border border-slate-400 bg-sky-200"
                >
                    Salary Deduction
                </th>
                <th
                    scope="col"
                    rowspan="3"
                    class="px-2 py-3 border-solid border border-slate-400 bg-sky-200"
                >
                    Total Deduction
                </th>
                <th
                    scope="col"
                    rowspan="3"
                    class="px-6 py-3 border-solid border border-slate-400 bg-sky-200"
                >
                    Total Net Pay
                </th>
                <th
                    scope="col"
                    rowspan="1"
                    class="bg-white"
                />
            </tr>
            <tr>
                <th
                    rowspan="2"
                    class="px-8 border-solid border border-slate-400 text-xs"
                >
                    Last Name
                </th>
                <th
                    rowspan="2"
                    class="px-8 border-solid border border-slate-400"
                >
                    First Name
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Reg. Hrs
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Rest Day/Sunday
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Reg. Hol.
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Spc. Hol.
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Reg O.T
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Rest Day. O.T
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Reg. Hol. O.T
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Spc. Hol. O.T
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Reg.
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Rest Day/Sun
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Reg.Hol
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Spc. Hol.
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Reg. O.T.
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Rest Day O.T
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Reg.Hol. O.T
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Spc.Hol. O.T
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Adjustments
                </th>
                <th
                    class="px-4 border-solid border border-slate-400"
                    colspan="2"
                >
                    SSS
                </th>
                <th
                    class="px-4 border-solid border border-slate-400"
                    rowspan="2"
                >
                    PHIC
                </th>
                <th
                    class="px-4 border-solid border border-slate-400"
                    rowspan="2"
                >
                    HMDF
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    EWTC
                </th>
                <th
                    rowspan="2"
                    class="px-4 border-solid border border-slate-400"
                >
                    Other Deductions
                </th>
            </tr>
            <tr>
                <th
                    class="px-4 border-solid border border-slate-400"
                >
                    Employee Contribution
                </th>
                <th
                    class="px-4 border-solid border border-slate-400"
                >
                    Employee Compensation
                </th>
            </tr>
        </thead>
        <tbody>
            <HrmsPayrollSalaryPayrollInfoTableRow
                v-for="(data,index) in payrollRequest.payroll_details"
                :key="'PayrollRow'+index"
                :employee-payroll-record="data"
                :index="index+1"
            />
            <tr class="bg-white text-gray-950">
                <th
                    scope="col"
                    colspan="5"
                    class="p-4"
                />
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRegHrsPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRestDayPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRegHolPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalSpcHolPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRegOTPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRestDayOTPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalRegHolOTPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalSpcHolOTPayroll()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalAdjustments()) }}
                </td>
                <td>
                    {{ useFormatCurrency(totalGrossPayPayroll()) }}
                </td>
                <td>
                    {{ " " }}
                </td>
                <td>
                    {{ totalSSSEmployeePayroll() ? useFormatCurrency(totalSSSEmployeePayroll()) : "-" }}
                </td>
                <td>
                    {{ useFormatCurrency(totalPHICEmployeePayroll()) ?? "-" }}
                </td>
                <td>
                    {{ useFormatCurrency(totalHDMFEmployeePayroll()) ?? "-" }}
                </td>
                <td>
                    {{ useFormatCurrency(totalEWTCPayroll()) }}
                </td>
                <td />
                <td>
                    <strong>{{ useFormatCurrency(totalDeductionPayroll()) }}</strong>
                </td>
                <td>
                    <strong>{{ useFormatCurrency(totalNetPayPayroll()) }}</strong>
                </td>
            </tr>
        </tbody>
    </table>
</template>
