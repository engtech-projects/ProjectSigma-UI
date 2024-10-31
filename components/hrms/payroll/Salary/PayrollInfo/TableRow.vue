<script setup lang="ts">
defineProps({
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
</script>
<template>
    <tr class="bg-white border-b text-gray-950">
        <td class="p-4 border-solid border border-slate-400">
            {{ index }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.family_name }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.first_name }}
        </td>
        <td class="p-4 border-solid border border-slate-400 text-sm">
            {{ employeePayrollRecord.current_employment?.position?.name ?? "-" }}
        </td>
        <td class="p-2 border-solid border border-slate-400">
            SG{{ employeePayrollRecord.current_employment.employee_salarygrade.salary_grade_level.salary_grade_level ?? "-" }}-{{ employeePayrollRecord.current_employment.employee_salarygrade.step_name }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.hours_worked.regular.reg_hrs) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.hours_worked.rest.reg_hrs) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.hours_worked.regular_holidays.reg_hrs) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.hours_worked.special_holidays.reg_hrs) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.hours_worked.regular.overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.hours_worked.rest.overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.hours_worked.regular_holidays.overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.hours_worked.special_holidays.overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.gross_pays?.regular?.regular) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.gross_pays.rest.regular) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.gross_pays.regular_holidays.regular) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.gross_pays.special_holidays.regular) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.gross_pays.regular.overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.gross_pays.rest.overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.gross_pays.regular_holidays.overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.gross_pays.special_holidays.overtime) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400 divide-y">
            <div v-for="(adjust, index1) in employeePayrollRecord.payroll_records.gross_pays.adjustments" :key="index1">
                <strong>{{ adjust.adjustment_name }}:</strong> {{ useFormatCurrency(adjust.adjustment_amount) }}
            </div>
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.total_gross_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.payroll_records.salary_deduction.sss.employee_contribution ? useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.sss.employee_contribution) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.payroll_records.salary_deduction.sss.employee_compensation ? useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.sss.employee_compensation) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.payroll_records.salary_deduction.sss.employee_wisp ? useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.sss.employee_wisp) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.payroll_records.salary_deduction.phic.employee_contribution ? useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.phic.employee_contribution) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ employeePayrollRecord.payroll_records.salary_deduction.hmdf.employee_contribution ? useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.hmdf.employee_contribution) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.ewtc) ?? "-" }}
        </td>
        <td class="p-1 border-solid border border-slate-400 min-w-min">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.cash_advance.total_paid) ?? "-" }}
        </td>
        <td
            v-if="loans.length === 0"
            class="p-1 border-solid border border-slate-400 min-w-min"
        >
            -
        </td>
        <td
            v-for="loan, key in loans"
            :key="key"
            class="p-1 border-solid border border-slate-400 min-w-min"
        >
            {{ employeePayrollRecord.payroll_records.salary_deduction.loan.loans.find((eloan: any) => eloan.name === loan) ? useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.loan.loans.filter((eloan: any) => eloan.name === loan).reduce((acc, curr) => acc + curr.max_payroll_payment, 0)) : "-" }}
        </td>
        <td
            v-if="otherdeductions.length === 0"
            class="p-1 border-solid border border-slate-400 min-w-min"
        >
            -
        </td>
        <td
            v-for="otherdeduction, key in otherdeductions"
            :key="key"
            class="p-1 border-solid border border-slate-400 min-w-min"
        >
            {{ employeePayrollRecord.payroll_records.salary_deduction.other_deductions.other_deduction.find((eOded: any) => eOded.otherdeduction_name === otherdeduction) ? useFormatCurrency(employeePayrollRecord.payroll_records.salary_deduction.other_deductions.other_deduction.filter((eOded: any) => eOded.otherdeduction_name === otherdeduction).reduce((acc, curr) => acc + curr.max_payroll_payment, 0)) : "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.total_salary_deduction) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400">
            {{ useFormatCurrency(employeePayrollRecord.payroll_records.total_net_pay) ?? "-" }}
        </td>
        <td class="p-4 border-solid border border-slate-400" />
    </tr>
</template>
