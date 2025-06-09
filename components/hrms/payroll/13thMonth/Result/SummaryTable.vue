<script setup>
defineProps({
    data: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <table class="printTable border border-gray-500">
        <thead class="text-md">
            <tr class="py-4">
                <th
                    colspan="8"
                    class="py-4 border-gray-500"
                >
                    13TH MONTH FORMULA COMPUTATION
                </th>
            </tr>
            <tr>
                <th
                    class="border border-gray-500"
                >
                    NO
                </th>
                <th
                    class="border border-gray-500"
                >
                    OFFICE / PROJECT CODE
                </th>
                <th
                    class="border border-gray-500"
                >
                    PAYROLL DURATION
                </th>
                <th
                    class="border border-gray-500"
                >
                    TOTAL NO. OF PAYROLLS
                </th>
                <th
                    class="border border-gray-500"
                >
                    REGULAR DAYS
                </th>
                <th
                    class="border border-gray-500"
                >
                    REGULAR HOLIDAY
                </th>
                <th
                    class="border border-gray-500"
                >
                    SPECIAL HOLIDAY
                </th>
                <th
                    class="border border-gray-500"
                >
                    TOTAL AMOUNT OF GROSS PAY
                </th>
            </tr>
        </thead>
        <tbody class="text-sm">
            <tr v-for="_rowData, _key, index in data" :key="'13thMonthSummaryDataRow' + index" class="h-2">
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    {{ _key + 1 }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm"
                >
                    {{ _rowData.charging_name || "N/A" }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    {{ _rowData.payroll_duration || "N/A" }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    {{ _rowData.unique_payrolls || 0 }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    {{ useFormatCurrency(_rowData.total_regular_salary || 0)}}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm"
                >
                    {{ useFormatCurrency(_rowData.total_regular_holiday_salary || 0)}}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm"
                >
                    {{ useFormatCurrency(_rowData.total_special_holiday_salary || 0)}}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    {{ useFormatCurrency(_rowData.total_amount || 0) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>
