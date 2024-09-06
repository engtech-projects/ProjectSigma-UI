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
const totalHDMFEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { hmdf: { employee_contribution: string } } } }) => {
        total += parseFloat(element.payroll_records.salary_deduction.hmdf.employee_contribution) ?? 0
    })
    return total.toFixed(2)
}
const totalPHICEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { phic: { employee_contribution: string } } } }) => {
        total += parseFloat(element.payroll_records.salary_deduction.phic.employee_contribution) ?? 0
    })
    return total.toFixed(2)
}
const totalSSSCompensationEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { sss: { employee_compensation: string } } } }) => {
        total += parseFloat(element.payroll_records.salary_deduction.sss.employee_compensation) ?? 0
    })
    return total.toFixed(2)
}
const totalSSSContributionEmployeePayroll = () => {
    let total = 0
    props.payrollRequest.payroll_details.forEach((element: { payroll_records: { salary_deduction: { sss: { employee_contribution: string } } } }) => {
        total += parseFloat(element.payroll_records.salary_deduction.sss.employee_contribution) ?? 0
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
        <HrmsPayrollSalaryPayrollInfoTableHeader />
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
                    {{ totalSSSContributionEmployeePayroll() ? useFormatCurrency(totalSSSContributionEmployeePayroll()) : "-" }}
                </td>
                <td>
                    {{ totalSSSCompensationEmployeePayroll() ? useFormatCurrency(totalSSSCompensationEmployeePayroll()) : "-" }}
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
