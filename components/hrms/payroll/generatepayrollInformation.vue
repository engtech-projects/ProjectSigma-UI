<script setup>
defineProps({
    genpayrollData: {
        type: Object,
        required: true,
    },
})

const headerColumns = [
    { name: "Name", id: "name", style: "text-center" },
    { name: "Designation", id: "name", style: "text-center" },
    { name: "No. of Days", id: "name", style: "text-center" },
    { name: "Gross Pay", id: "name", style: "text-center" },
    { name: "Gross Pay", id: "name", style: "text-center" },
    { name: "Salary Deduction", id: "name", style: "text-center" },
    { name: "EWTC", id: "name", style: "text-center" },
    { name: "COOP LOAN", id: "name", style: "text-center" },
    { name: "Total Deduction", id: "name", style: "text-center" },
    { name: "Total Net Pay", id: "name", style: "text-center" },
]

const datas = [
    { name: "John Doe", time: "8:00 AM" },
    { name: "Jane Doe", time: "9:00 AM" }
]

// const actions = {}

const subHeaders = [
    { name: "Lastname", id: "lastname", style: "text-left" },
    { name: "Firstname", id: "firstname", style: "text-left" },
    { name: "Number of Days", id: "number_of_days", style: "text-left" }
]
</script>

<template>
    <div class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
        <div class="flex flex-cols justify-between p-2 sm:px-2 bg-sky-100 border-b-4 border-red-500">
            <div class="text-xl leading-6 font-normal text-gray-900">
                CASH
            </div>
            <div class="text-xl leading-6 font-normal text-gray-900">
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

        <div class="relative overflow-x-auto">
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTableWithSubHeader
                    :header-columns="headerColumns"
                    :datas="datas"
                    :sub-headers="subHeaders"
                />
                <!-- :header-columns="headers"
                :actions="actions"
                :datas="datas"
                @show-table="showInformation" -->
            </div>
            <!-- <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                            Silver
                        </td>
                        <td class="px-6 py-4">
                            Laptop
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Microsoft Surface Pro
                        </th>
                        <td class="px-6 py-4">
                            White
                        </td>
                        <td class="px-6 py-4">
                            Laptop PC
                        </td>
                        <td class="px-6 py-4">
                            $1999
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                    </tr>
                </tbody>
            </table> -->
        </div>
    </div>
    <div>
        <!-- <LayoutApprovalsListView :approvals="leaveData.approvals" /> -->
    </div>
</template>
