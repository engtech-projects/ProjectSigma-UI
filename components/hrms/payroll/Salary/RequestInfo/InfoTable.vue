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
        if (Array.isArray(element.adjustments)) {
            element.adjustments.forEach((adjustment: any) => {
                total += parseFloat(adjustment.amount) || 0
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
//     props.payrollRequest.payroll_details.forEach((element: any) => {
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
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.net_pay)
    })
    return total.toFixed(2)
}
const totalDeductionPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.total_deduct)
    })
    return total.toFixed(2)
}
const totalEWTCPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.withholdingtax_contribution)
    })
    return total.toFixed(2)
}
const totalHDMFEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.pagibig_employee_contribution) ?? 0
    })
    return total.toFixed(2)
}
const totalPHICEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.philhealth_employee_contribution) ?? 0
    })
    return total.toFixed(2)
}
const totalSSSEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.sss_employee_contribution) ?? 0
    })
    return total.toFixed(2)
}
const totalGrossPayPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.gross_pay)
    })
    return total.toFixed(2)
}
const totalSpcHolOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.special_holiday_ot_pay)
    })
    return total.toFixed(2)
}
const totalRegHolOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.regular_holiday_ot_pay)
    })
    return total.toFixed(2)
}
const totalRestDayOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.rest_ot_pay)
    })
    return total.toFixed(2)
}
const totalRegOTPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.regular_ot_pay)
    })
    return total.toFixed(2)
}
const totalSpcHolPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.special_holiday_pay) ?? 0
    })
    return total.toFixed(2)
}
const totalRegHolPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.regular_holiday_pay) ?? 0
    })
    return total.toFixed(2)
}
const totalRestDayPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.rest_pay) ?? 0
    })
    return total.toFixed(2)
}
const totalRegHrsPayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: any) => {
        total += parseFloat(element.regular_pay) ?? 0
    })
    return total.toFixed(2)
}
</script>

<template>
    <table class="w-full text-sm text-center text-gray-50 pb-4">
        <HrmsPayrollSalaryPayrollInfoTableHeader />
        <tbody>
            <HrmsPayrollSalaryRequestInfoTableRow
                v-for="(data,index) in payrollRequest.payroll_details"
                :key="'PayrollRow'+index"
                :employee-payroll-record="data"
                :index="index+1"
            />
            <!-- Final Row -->
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
