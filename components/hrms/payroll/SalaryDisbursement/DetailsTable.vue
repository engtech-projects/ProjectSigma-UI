<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>
<template>
    <div class="flex flex-col">
        <div class="header flex flex-col gap-1">
            <span class="text-md font-bold text-blue-500 text-center">
                EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
            </span>
        </div>
        <div class="title flex flex-col justify-center gap-1 mb-12">
            <span class="text-md text-black text-center">
                FOR THE MONTH OF <span class="text-red-600 font-bold underline">APRIL 2024</span>
            </span>
        </div>
        <table class="printTable border border-gray-500">
            <thead class="text-md">
                <tr class="py-4">
                    <th rowspan="3" class="py-4 border-gray-500">
                        OFFICE/PROJECT CODE PAYROLL
                    </th>
                    <th colspan="3" class="border border-gray-500">
                        GROSS AMOUNT
                    </th>
                    <th colspan="15" class="border border-gray-500">
                        DEDUCTIONS
                    </th>
                    <th rowspan="3" colspan="1" class="border border-gray-500">
                        DEDUCTIONS
                    </th>
                    <th rowspan="3" colspan="1" class="border border-gray-500">
                        NET PAY
                    </th>
                    <th rowspan="3" colspan="1" class="border border-gray-500">
                        BANK
                    </th>
                </tr>
                <tr>
                    <th colspan="2" class="border border-gray-500">
                        TOTAL
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        GROSS PAY
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        LATE / UNDERTIME
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        CASH ADVANCE
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        SSS EE
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        SSS LOAN
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        PHIC EE
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        HDMF EE
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        HDMF LOAN
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        HDMF MP2
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        EWTC
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        COOP LOAN
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        HMO
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        WISP
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        OTHERS
                    </th>
                </tr>
                <tr>
                    <th rowspan="2" class="border border-gray-500">
                        BASIC PAY
                    </th>
                    <th rowspan="2" class="border border-gray-500">
                        OVERTIME
                    </th>
                </tr>
            </thead>
            <tbody class="text-sm">
                <tr class="h-2">
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-center">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        aa
                    </td>
                </tr>
            </tbody>
        </table>
        <HrmsReportsPreparedByCheckBy />
    </div>
</template>

<style scoped>

</style>
