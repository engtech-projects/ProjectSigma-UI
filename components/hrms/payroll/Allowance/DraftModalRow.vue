<script setup>
const rowData = defineModel({ required: false, type: Object })
watch(rowData, () => {
    rowData.value.allowance_amount = rowData.value.allowance_rate * rowData.value.allowance_days
},
{
    deep: true
}
)
</script>
<template>
    <tr>
        <td class="p-2">
            {{ rowData.fullname_first }}
        </td>
        <td class="p-2">
            {{ rowData.employee_position }}
        </td>
        <td class="p-2">
            <LayoutFormPsNumberInput v-model="rowData.allowance_rate" title="" />
        </td>
        <td class="p-2">
            <LayoutFormPsNumberInput v-model="rowData.allowance_days" title="" />
        </td>
        <td class="p-2">
            {{ rowData.allowance_amount }}
        </td>
    </tr>
</template>
