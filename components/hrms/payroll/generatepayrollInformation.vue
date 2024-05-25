<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
const genpayrollstore = useGeneratePayrollStore()

const { list: generatedList } = storeToRefs(genpayrollstore)

defineProps({
    generatePayrollData: {
        type: null,
        required: true,
    },
    // payrollDraft: {
    //     type: Array,
    //     required: true,
    // }
})

const loanTypes = ref([])
const cashAdvances = ref([])
const otherDeductions = ref([])
const formatDateRange = (start: string, end: string) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    const startDate = new Date(start)
    const endDate = new Date(end)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return "-"
    }

    const startDay = startDate.getDate()
    const startMonth = months[startDate.getMonth()]

    const endDay = endDate.getDate()
    const endMonth = months[endDate.getMonth()]
    const endYear = endDate.getFullYear()

    if (startMonth === endMonth) {
        return `${startMonth} ${startDay}-${endDay}, ${endYear}`
    } else {
        return `${startMonth} ${startDay}-${endMonth} ${endDay}, ${endYear}`
    }
}
</script>

<template>
    <!-- <pre>{{ generatedList }}</pre> -->
    <div class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
        <div class="flex flex-cols justify-between p-2 sm:px-2 bg-sky-100 border-b-4 border-red-500">
            <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900">
                CASH
            </div>
            <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900">
                Payroll
            </div>
        </div>
        <div class="border-t border-gray-200">
            <div class="grid grid-cols-2 p-2">
                <div class="text-md leading-6 font-medium text-gray-900">
                    Project: <strong>{{ generatePayrollData.group_type === 'department' ? generatePayrollData.department_id : generatePayrollData.project_id }}</strong>
                </div>
                <div class="text-md leading-6 font-medium text-gray-900">
                    Period Covered: <strong>{{ formatDateRange(generatePayrollData.cutoff_start, generatePayrollData.cutoff_end) }}</strong>
                </div>
            </div>
        </div>

        <div>
            <div class="relative overflow-x-auto shadow-md">
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
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Rate
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
                                colspan="8"
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
                                :colspan="7 + loanTypes.length + cashAdvances.length + otherDeductions.length"
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
                                class="px-4 border-solid border border-slate-400"
                                colspan="2"
                            >
                                SSS
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                                colspan="2"
                            >
                                PHIC
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                                colspan="2"
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
                                v-for="loansType, key in loanTypes"
                                :key="key + 'loanTypesTitles'"
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                {{ loansType }}
                            </th>
                            <th
                                v-for="cashAdvance, key in cashAdvances"
                                :key="key + 'cashAdvanceTitles'"
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                {{ cashAdvance }}
                            </th>
                            <th
                                v-for="otherDeduction, key in otherDeductions"
                                :key="key + 'otherDeductionTitles'"
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                {{ otherDeduction }}
                            </th>
                        </tr>
                        <tr>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employee
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employer
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employee
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employer
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employee
                            </th>
                            <th
                                class="px-4 border-solid border border-slate-400"
                            >
                                Employer
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in generatedList" :key="index" class="bg-white border-b text-gray-950">
                            <td class="p-4 border-solid border border-slate-400">
                                {{ index + 1 }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.family_name }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.first_name }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.current_employment.position.name ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.current_employment.actual_salary ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.hours_worked.regular.reg_hrs ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.hours_worked.rest.reg_hrs ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.hours_worked.regular_holidays.reg_hrs ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.hours_worked.special_holidays.reg_hrs ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.hours_worked.regular.overtime ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.hours_worked.rest.overtime ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.hours_worked.regular_holidays.overtime ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.hours_worked.special_holidays.overtime ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.gross_pays.regular.regular ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.gross_pays.rest.regular ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.gross_pays.regular_holidays.regular ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.gross_pays.special_holidays.regular ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.gross_pays.regular.overtime ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.gross_pays.rest.overtime ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.gross_pays.regular_holidays.overtime ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.gross_pays.special_holidays.overtime ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.total_gross_pay ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.sss.employee_compensation ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.sss.employer_compensation ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.phic.employee_compensation ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.phic.employer_compensation ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hmdf.employee_compensation ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hmdf.employer_compensation ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.ewtc ?? "-" }}
                            </td>
                            <th
                                v-for="loansType, key in loanTypes"
                                :key="key + 'loanTypesValues'"
                                class="p-4 border-solid border border-slate-400"
                            >
                                {{ loansType }}
                            </th>
                            <th
                                v-for="cashAdvance, key in cashAdvances"
                                :key="key + 'cashAdvanceValues'"
                                class="p-4 border-solid border border-slate-400"
                            >
                                {{ cashAdvance }}
                            </th>
                            <th
                                v-for="otherDeduction, key in otherDeductions"
                                :key="key + 'otherDeductionValues'"
                                class="p-4 border-solid border border-slate-400"
                            >
                                {{ otherDeduction }}
                            </th>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.total_salary_deduction ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.total_net_pay ?? "-" }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-800 p-6 overflow-auto mt-6">
        <label for="" class="block text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Adjustment</label>

        <div v-for="(data, index1) in generatePayrollData.adjustment" :key="index1" class="mb-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                <div class="text-lg text-gray-800 dark:text-gray-300">
                    <span class="font-medium">Employee:</span> {{ data.id }}
                </div>
                <div class="text-lg text-gray-800 dark:text-gray-300">
                    <span class="font-medium">Adjustment Name:</span> {{ data.adjustment_name }}
                </div>
                <div class="text-lg text-gray-800 dark:text-gray-300">
                    <span class="font-medium">Adjustment Amount:</span> {{ data.adjustment_amount }}
                </div>
            </div>
        </div>
    </div>

    <div class="mt-2">
        <div class="flex flex-row justify-end gap-2">
            <div>
                <button type="submit" class="text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                    Print Draft
                </button>
            </div>
            <div>
                <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Submit
                </button>
            </div>
        </div>
    </div>
    <div>
        <!-- <LayoutApprovalsListView :approvals="leaveData.approvals" /> -->
    </div>
</template>
