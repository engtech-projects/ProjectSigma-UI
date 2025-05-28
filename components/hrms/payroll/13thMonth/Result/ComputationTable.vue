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
                    rowspan="11"
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
            <tr v-for="_rowData, _key, index in data.pays" :key="'13thMonthComputationDataRow' + index" class="h-2">
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    {{ index + 1 }}
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm"
                >
                    name
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    duration
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    no of payroll
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    regular days
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm"
                >
                    regular holiday
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm"
                >
                    special holiday
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-center"
                >
                    total amount of gross pay / 12
                </td>
                <td
                    class="border border-gray-500 h-8 px-2 font-bold text-sm text-right"
                >
                    office
                </td>
                <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right" />
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>
