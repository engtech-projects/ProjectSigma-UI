<script setup>
defineProps({
    genpayrollData: {
        type: Object,
        required: true,
    },
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

// const actions = {}

// const subHeaders = [
//     { name: "Lastname", id: "lastname", style: "text-left" },
//     { name: "Firstname", id: "firstname", style: "text-left" },
//     { name: "Number of Days", id: "number_of_days", style: "text-left" }
// ]
</script>

<template>
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
            <div class="grid grid-cols-2 p-2 sm:px-6">
                <div class="text-md leading-6 font-medium text-gray-900">
                    Project:
                </div>
                <div class="text-md leading-6 font-medium text-gray-900">
                    Period Covered:
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
                                class="px-8 border-solid border border-slate-400"
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
                        <tr class="bg-white border-b text-gray-950">
                            <td class="p-4 border-solid border border-slate-400">
                                N/A
                            </td>
                        </tr>
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
    <div>
        <!-- <LayoutApprovalsListView :approvals="leaveData.approvals" /> -->
    </div>
</template>
