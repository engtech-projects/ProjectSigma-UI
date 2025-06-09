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
                    colspan="10"
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
                    NAME
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
                <th
                    class="border border-gray-500"
                >
                    OFFICE / PROJECT CODE
                </th>
                <th
                    class="border border-gray-500"
                >
                    SIGNATURE
                </th>
            </tr>
        </thead>
        <tbody class="text-sm">
            <tr v-for="_rowData, _key in data.details" :key="'13thMonthComputationDataRow' + _key" class="h-2">
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    {{ _key + 1 }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm"
                >
                    {{ _rowData.employee?.fullname_last || _rowData.metadata.employee_name || "N/A" }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    {{ data.payroll_duration }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    {{ _rowData.metadata?.payroll_record_count || 0 }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    {{ useFormatCurrency(_rowData.metadata?.total_payroll_regular || 0) }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    {{ useFormatCurrency(_rowData.metadata?.total_payroll_regular_holiday || 0) }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    {{ useFormatCurrency(_rowData.metadata?.total_payroll_special_holiday || 0) }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    {{ useFormatCurrency(_rowData.metadata?.total_amount || 0) }}
                </td>
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    {{ _rowData.charging_names || _rowData.metadata?.charging_names || "N/A" }}
                </td>
                <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right" />
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>
