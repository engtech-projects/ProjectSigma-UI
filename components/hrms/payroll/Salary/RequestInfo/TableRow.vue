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
})

const paymentsLoans = () => {
    return props.employeePayrollRecord.deductions.filter((adj: { name: string; }) => adj.name === "Loan")
}
const totalPaymentsLoans = () => {
    return paymentsLoans().reduce((partialSum: any, a: any) => partialSum + a, 0)
}
const paymentsCashAdvance = () => {
    return props.employeePayrollRecord.deductions.filter((adj: { name: string; }) => adj.name === "Cash Advance")
}
const totalPaymentsCashAdvance = () => {
    return paymentsCashAdvance().reduce((partialSum: any, a: any) => partialSum + a, 0)
}
const paymentsOtherDeduction = () => {
    return props.employeePayrollRecord.deductions.filter((adj: { name: string; }) => adj.name === "Other Deduction")
}
const totalPaymentsOtherDeduction = () => {
    return paymentsOtherDeduction().reduce((partialSum: any, a: any) => partialSum + a, 0)
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
            {{ employeePayrollRecord.philhealth_employee_contribution ? useFormatCurrency(employeePayrollRecord.philhealth_employee_contribution) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.pagibig_employee_contribution ? useFormatCurrency(employeePayrollRecord.pagibig_employee_contribution) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.withholdingtax_contribution) ?? "-" }}
        </td>
        <td class="p-2 border-solid border border-slate-400">
            <div class="divide-y">
                <div>
                    <strong>Loans: {{ totalPaymentsLoans() }}</strong>
                    <div v-for="(loan, index1) in paymentsLoans()" :key="'loanName'+index1">
                        {{ loan.id }}: {{ useFormatCurrency(loan.max_payroll_payment) ?? "-" }}
                    </div>
                </div>
                <div>
                    <strong>CA: {{ totalPaymentsCashAdvance() }}</strong>
                    <div v-for="(cAdv, index1) in paymentsCashAdvance()" :key="'cAdvName'+index1">
                        {{ cAdv.id }}: {{ useFormatCurrency(cAdv.max_payroll_payment) ?? "-" }}
                    </div>
                </div>
                <div>
                    <strong>Other Deductions: {{ totalPaymentsOtherDeduction() }}</strong>
                    <div v-for="(otherDeduct, index1) in paymentsOtherDeduction()" :key="'oDed'+index1">
                        {{ otherDeduct.otherdeduction_name }}:{{ useFormatCurrency(otherDeduct.max_payroll_payment) ?? "-" }}
                    </div>
                </div>
                <div>
                    <strong>HMO:</strong>
                </div>
            </div>
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.total_deduct) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.net_pay) ?? "-" }}
        </td>
    </tr>
</template>
