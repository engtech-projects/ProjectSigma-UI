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
    return props.employeePayrollRecord.deductions.filter((adj: { type: string; }) => adj.type === "Loan")
}
const totalPaymentsLoans = () => {
    return paymentsLoans().reduce((partialSum: any, a: any) => partialSum + a.amount, 0)
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
const totalPaymentsOtherDeduction = () => {
    return paymentsOtherDeduction().reduce((partialSum: any, a: any) => partialSum + a.amount, 0)
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
            {{ employeePayrollRecord.pagibig_employee_wisp ? useFormatCurrency(employeePayrollRecord.pagibig_employee_wisp) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.withholdingtax_contribution) ?? "-" }}
        </td>
        <td class="p-2 border-solid border border-slate-400">
            <div class="divide-y">
                <div>
                    <strong>Loans:</strong>
                    <div v-for="(loan, index1) in paymentsLoans()" :key="'loanName'+index1">
                        {{ loan.name }}: {{ useFormatCurrency(loan.amount) ?? "-" }}
                    </div>
                    <strong>Total:{{ useFormatCurrency(totalPaymentsLoans()) }}</strong>
                </div>
                <div>
                    <strong>C.A.:</strong>
                    <div v-for="(cAdv, index1) in paymentsCashAdvance()" :key="'cAdvName'+index1">
                        {{ cAdv.name }}: {{ useFormatCurrency(cAdv.amount) ?? "-" }}
                    </div>
                    <strong>Total:{{ useFormatCurrency(totalPaymentsCashAdvance()) }}</strong>
                </div>
                <div>
                    <strong>Other Ded.:</strong>
                    <div v-for="(otherDeduct, index1) in paymentsOtherDeduction()" :key="'oDed'+index1">
                        {{ otherDeduct.name }}:{{ useFormatCurrency(otherDeduct.amount) ?? "-" }}
                    </div>
                    <strong>Total:{{ useFormatCurrency(totalPaymentsOtherDeduction()) }}</strong>
                </div>
                <!-- <div>
                    <strong>HMO:</strong>
                </div> -->
            </div>
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
