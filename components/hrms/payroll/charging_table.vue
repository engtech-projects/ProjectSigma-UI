<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
const genpayrollstore = useGeneratePayrollStore()
const { payrollDraft } = storeToRefs(genpayrollstore)

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

function formatCurrency (number: Number, locale = "en-US") {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    return formatter.format(number)
}
</script>

<template>
    <div class="mt-4 details flex flex-cols justify-between p-2 sm:px-2 bg-sky-100 border-b-4 border-red-500">
        <div class="sticky top-0 text-xl leading-6 font-normal text-gray-900 uppercase">
            Charging
        </div>
    </div>
    <div class="border-t border-gray-200">
        <div class="flex justify-between p-2">
            <div class="text-md leading-6 font-medium text-gray-900">
                {{ payrollDraft.group_type }}: <strong>{{ payrollDraft.group_type === 'Department' ? payrollDraft.department.department_name : payrollDraft.project.project_code }}</strong>
            </div>
            <div class="text-md leading-6 font-medium text-gray-900">
                Period Covered: <strong>{{ formatDateRange(payrollDraft.cutoff_start, payrollDraft.cutoff_end) }}</strong>
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
                            colspan="3"
                            class="p-2 border-solid border border-slate-400 bg-sky-200"
                        >
                            Salary
                        </th>
                        <th
                            scope="col"
                            colspan="3"
                            class="p-2 border-solid border border-slate-400 bg-sky-200"
                        >
                            Travels
                        </th>
                        <th
                            scope="col"
                            colspan="3"
                            class="p-2 border-solid border border-slate-400 bg-sky-200"
                        >
                            Leaves
                        </th>
                        <th
                            scope="col"
                            colspan="3"
                            class="p-2 border-solid border border-slate-400 bg-sky-200"
                        >
                            SSS
                        </th>
                        <th
                            scope="col"
                            colspan="3"
                            class="p-2 border-solid border border-slate-400 bg-sky-200"
                        >
                            PHIC
                        </th>
                        <th
                            scope="col"
                            colspan="3"
                            class="p-2 border-solid border border-slate-400 bg-sky-200"
                        >
                            HMDF
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
                            class="px-8 border-solid border border-slate-400"
                        >
                            Name
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Hours
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Amount
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Name
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Hours
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Amount
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Name
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Hours
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Amount
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Name
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Employer Contribution
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Employer Compensation
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Name
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Employer Contribution
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Employer Compensation
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Name
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Employer Contribution
                        </th>
                        <th
                            rowspan="2"
                            class="px-8 border-solid border border-slate-400"
                        >
                            Employer Compensation
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in payrollDraft.payroll" :key="index" class="bg-white border-b text-gray-950">
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
                            <template v-for="(salaryData, salaryIndex) in data.payroll_records.gross_pays.chargings.salary" :key="salaryIndex">
                                {{ salaryData.designation }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <template v-for="(salaryData, salaryIndex) in data.payroll_records.gross_pays.chargings.salary" :key="salaryIndex">
                                {{ salaryData.reg_hrs }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <template v-for="(salaryData, salaryIndex) in data.payroll_records.gross_pays.chargings.salary" :key="salaryIndex">
                                {{ salaryData.amt }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <template v-for="(departmentData, departmentIndex) in data.payroll_records.gross_pays.chargings.departments" :key="departmentIndex">
                                {{ departmentData.designation }}
                            </template>
                            <template v-if="data.payroll_records.gross_pays.chargings.departments.length == 0">
                                {{ "-" }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <template v-for="(departmentData, departmentIndex) in data.payroll_records.gross_pays.chargings.departments" :key="departmentIndex">
                                {{ departmentData.reg_hrs ?? "-" }}
                            </template>
                            <template v-if="(data.payroll_records.gross_pays.chargings.departments.length == 0)">
                                {{ "0.00" }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <template v-for="(departmentData, departmentIndex) in data.payroll_records.gross_pays.chargings.departments" :key="departmentIndex">
                                {{ formatCurrency(departmentData.amt) ?? "-" }}
                            </template>
                            <template v-if="(data.payroll_records.gross_pays.chargings.departments.length == 0)">
                                {{ "0.00" }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <template v-for="(specholtData, specholIndex) in data.payroll_records.gross_pays.chargings.special_holiday" :key="specholIndex">
                                {{ specholtData.designation }}
                            </template>
                            <template v-if="!data.payroll_records.gross_pays.chargings.specholtData">
                                {{ "-" }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <template v-for="(specholtData, specholIndex) in data.payroll_records.gross_pays.chargings.special_holiday" :key="specholIndex">
                                {{ specholtData.reg_hrs }}
                            </template>
                            <template v-if="(!data.payroll_records.gross_pays.chargings.specholtData)">
                                {{ "0.00" }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            <template v-for="(specholtData, specholIndex) in data.payroll_records.gross_pays.chargings.special_holiday" :key="specholIndex">
                                {{ formatCurrency(specholtData.amt) }}
                            </template>
                            <template v-if="(!data.payroll_records.gross_pays.chargings.specholtData)">
                                {{ "0.00" }}
                            </template>
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ data.payroll_records.gross_pays.chargings.sss.designation ?? "-" }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ formatCurrency(data.payroll_records.gross_pays.chargings.sss.employer_maximum_contribution) ?? "-" }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ formatCurrency(data.payroll_records.gross_pays.chargings.sss.employer_compensation) ?? "-" }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ data.payroll_records.gross_pays.chargings.philhealth.designation ?? "-" }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ formatCurrency(data.payroll_records.gross_pays.chargings.philhealth.employer_maximum_contribution) ?? "-" }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ formatCurrency(data.payroll_records.gross_pays.chargings.philhealth.employer_compensation) ?? "-" }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ data.payroll_records.gross_pays.chargings.pagibig.designation ?? "-" }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ formatCurrency(data.payroll_records.gross_pays.chargings.pagibig.employer_maximum_contribution) ?? "-" }}
                        </td>
                        <td class="p-4 border-solid border border-slate-400">
                            {{ formatCurrency(data.payroll_records.gross_pays.chargings.pagibig.employer_compensation) ?? "-" }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
