<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
const genpayrollstore = useGeneratePayrollStore()

const { list: generatedList } = storeToRefs(genpayrollstore)

defineProps({
    generatePayrollData: {
        type: Object,
        required: true,
    },
    // payrollDraft: {
    //     type: Array,
    //     required: true,
    // }
})

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
                                rowspan="2"
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
                                rowspan="2"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Designation
                            </th>
                            <th
                                scope="col"
                                colspan="7"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                No. of Days
                            </th>
                            <th
                                scope="col"
                                colspan="7"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Gross Pay
                            </th>
                            <th
                                scope="col"
                                rowspan="2"
                                class="px-6 border-solid border border-slate-400 bg-sky-200"
                            >
                                Gross Pay
                            </th>
                            <th
                                scope="col"
                                colspan="9"
                                class="p-2 border-solid border border-slate-400 bg-sky-200"
                            >
                                Salary Deduction
                            </th>
                            <th
                                scope="col"
                                rowspan="2"
                                class="px-2 py-3 border-solid border border-slate-400 bg-sky-200"
                            >
                                Total Deduction
                            </th>
                            <th
                                scope="col"
                                rowspan="2"
                                class="px-6 py-3 border-solid border border-slate-400 bg-sky-200"
                            >
                                Total Net Pay
                            </th>
                        </tr>
                        <tr>
                            <th
                                scope="col"
                                class="px-8 border-solid border border-slate-400 text-xs"
                            >
                                Last Name
                            </th>
                            <th
                                scope="col"
                                class="px-8 border-solid border border-slate-400"
                            >
                                First Name
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg. Hrs/Day(s)
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Rest Day/Sun
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg.Hol
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg.Hol O.T
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Spc. Hol.
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg. O.T
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Rest Day O.T
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg.
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Rest Day/Sun
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg.Hol
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg.Hol. O.T
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Spc. Hol.
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Reg. O.T.
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Rest Day O.T
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                Cash Advance
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                SSS
                            </th>
                            <th
                                scope="col"
                                rowspan="2"
                                class="px-4 border-solid border border-slate-400"
                            >
                                SSS LOAN
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                PHIC
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                HMDF
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                HMDF LOAN
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                MP2
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                EWTC
                            </th>
                            <th
                                scope="col"
                                class="px-4 border-solid border border-slate-400"
                            >
                                COOP LOAN
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <pre>{{ payrollDraft }}</pre> -->
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
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.total_gross_pay ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.cash_advance ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.sss ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.phic ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.hdmf ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.ewtc ?? "-" }}
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                {{ data.payroll_records.salary_deduction.loan }}
                            </td>
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
