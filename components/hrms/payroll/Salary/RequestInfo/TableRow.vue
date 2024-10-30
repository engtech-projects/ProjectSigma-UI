<script setup lang="ts">
const props = defineProps({
    index: {
        type: Number,
        required: true,
    },
    employeePayrollRecord: {
        type: Object,
        required: true,
    },
    loans: {
        type: Array,
        required: true,
    },
    otherdeductions: {
        type: Array,
        required: true,
    },
})

const paymentsLoans = () => {
    return props.employeePayrollRecord.deductions.filter((adj: { type: string; }) => adj.type === "Loan")
}
const paymentsCashAdvance = () => {
    return props.employeePayrollRecord.deductions.filter((adj: { type: string; }) => adj.type === "Cash Advance")
}
const totalPaymentsCashAdvance = () => {
    return paymentsCashAdvance().reduce((partialSum: any, a: any) => partialSum + a.amount, 0)
}
const paymentsOtherDeduction = () => {
    return props.employeePayrollRecord.deductions.filter((adj: { type: string; }) => adj.type === "Other Deduction")
}
</script>
<template>
    <tr class="bg-white border-b text-gray-950">
        <td class="p-4 border-solid border border-slate-400">
            {{ index }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.employee?.family_name }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.employee?.first_name }}
        </td>
        <td class="p-4 border-solid border border-slate-400 text-sm">
            {{ employeePayrollRecord.employee?.current_position ?? "-" }}
        </td>
        <td class="p-2 border-solid border border-slate-400">
            {{ employeePayrollRecord.employee?.current_salarygrade ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.regular_hours) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.rest_hours) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.regular_holiday_hours) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.special_holiday_hours) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.regular_overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.rest_overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.regular_holiday_overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.special_holiday_overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.regular_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.rest_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.regular_holiday_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.special_holiday_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.regular_ot_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.rest_ot_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.regular_holiday_ot_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.special_holiday_ot_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400 divide-y">
            <div v-for="(adjust, index1) in employeePayrollRecord.adjustments" :key="index1">
                <strong>{{ adjust.name }}:</strong> {{ useFormatCurrency(adjust.amount) }}
            </div>
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.gross_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.sss_employee_contribution ? useFormatCurrency(employeePayrollRecord.sss_employee_contribution) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.sss_employee_compensation ? useFormatCurrency(employeePayrollRecord.sss_employee_compensation) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.sss_employee_wisp ? useFormatCurrency(employeePayrollRecord.sss_employee_wisp) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.philhealth_employee_contribution ? useFormatCurrency(employeePayrollRecord.philhealth_employee_contribution) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.pagibig_employee_contribution ? useFormatCurrency(employeePayrollRecord.pagibig_employee_contribution) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.withholdingtax_contribution) ?? "-" }}
        </td>
        <td class="p-2 border-solid border border-slate-400">
            <strong>{{ totalPaymentsCashAdvance() ? useFormatCurrency(totalPaymentsCashAdvance()) : "-" }}</strong>
        </td>
        <td
            v-for="loan, key in loans"
            :key="key"
            class="p-4 border-solid border border-slate-400"
        >
            {{ paymentsLoans().find((eloan: any) => eloan.name === loan) ? useFormatCurrency(paymentsLoans().filter((eloan: any) => eloan.name === loan).reduce((acc, curr) => acc + curr.amount, 0)) : "-" }}
        </td>
        <td
            v-for="otherdeduction, key in otherdeductions"
            :key="key"
            class="p-4 border-solid border border-slate-400"
        >
            {{ paymentsOtherDeduction().find((eOded: any) => eOded.name === otherdeduction) ? useFormatCurrency(paymentsOtherDeduction().filter((eOded: any) => eOded.name === otherdeduction).reduce((acc, curr) => acc + curr.amount, 0)) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.total_deduct) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.net_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400" />
    </tr>
</template>
