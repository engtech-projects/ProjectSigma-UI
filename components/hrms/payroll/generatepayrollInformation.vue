<script setup lang="ts">
// import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

// const genpayrollstore = useGeneratePayrollStore()
// const { list: payrollDraft } = storeToRefs(genpayrollstore)
defineProps({
    generatePayrollData: {
        type: Object,
        required: true,
    },
    payrollDraft: {
        type: Object,
        required: true,
    }
})

// const headerColumns = [
//     { name: "Name", id: "name", style: "text-center" },
//     { name: "Designation", id: "name", style: "text-center" },
//     { name: "No. of Days", id: "name", style: "text-center" },
//     { name: "Gross Pay", id: "name", style: "text-center" },
//     { name: "Gross Pay", id: "name", style: "text-center" },
//     { name: "Salary Deduction", id: "name", style: "text-center" },
//     { name: "EWTC", id: "name", style: "text-center" },
//     { name: "COOP LOAN", id: "name", style: "text-center" },
//     { name: "Total Deduction", id: "name", style: "text-center" },
//     { name: "Total Net Pay", id: "name", style: "text-center" },
// ]

// const datas = [
//     { name: "John Doe", time: "8:00 AM" },
//     { name: "Jane Doe", time: "9:00 AM" }
// ]
// const subHeaders = [
//     { name: "Lastname", id: "lastname", style: "text-left" },
//     { name: "Firstname", id: "firstname", style: "text-left" },
//     { name: "Number of Days", id: "number_of_days", style: "text-left" }
// ]

// const tableData = ref([
//     ["n/a1", "n/a2", "n/a3", "n/a4", "n/a5"],
// ])

const formatDateRange = (start: string, end: string) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    const startDate = new Date(start)
    const endDate = new Date(end)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return "N/A"
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
    <!-- <pre>{{ generatePayrollData }}</pre> -->
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
                <table class="w-full text-sm text-center text-gray-50 ">
                    <thead
                        class="text-xs text-black uppercase bg-sky-50 dark:bg-gray-950"
                    >
                        <tr>
                            <th
                                scope="col"
                                rowspan="2"
                                class="p-2 border-solid border border-slate-400"
                            >
                                No.
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
                        <tr class="bg-white border-b text-gray-950">
                            <td class="p-4 border-solid border border-slate-400">
                                --
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                <pre>{{ payrollDraft }}</pre>
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                n/a2
                            </td>
                            <td class="p-4 border-solid border border-slate-400">
                                n/a3
                            </td>
                        </tr>
                        <!-- <tr v-for="(row, rowIndex) in payrollDraft" :key="rowIndex" class="bg-white border-b text-gray-950">
                            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="p-4 border-solid border border-slate-400">
                                {{ cell }}
                            </td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- <div class="relative overflow-x-auto">
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTableWithSubHeader
                    :header-columns="headerColumns"
                    :datas="datas"
                    :sub-headers="subHeaders"
                />
            </div>
        </div> -->
    </div>
    <div class="flex items-center justify-between align">
        <label for="" class="text-xl font-semibold text-gray-900 pb-2">Adjustment</label>
        <!-- {{ JSON.stringify(generatePayrollData.adjustment) }} -->
    </div>
    <div>
        <!-- <LayoutApprovalsListView :approvals="leaveData.approvals" /> -->
    </div>
</template>
