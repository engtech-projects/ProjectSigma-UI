<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <label for="" class="text-xl font-semibold text-gray-900">Overtime List</label>
        <div class="mt-5 mb-6">
            <EasyDataTable
                class="mt-5"
                table-class-name="customize-table"
                :headers="headers"
                :items="items"
            >
                <template #item-actions="item">
                    <div class="flex flex-row gap-1">
                        <button
                            @click="deleted(item)"
                        >
                            <Icon class="text-lg" name="mdi:trash" />
                        </button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table"

const headers: Header[] = [
    { text: "Employee Name", value: "employee_name" },
    { text: "Date Filed", value: "date_filed", width: 150 },
    { text: "Overtime Date", value: "overtime_date", width: 150 },
    { text: "Time From", value: "time_from" },
    { text: "Time To", value: "time_to" },
    { text: "Total # Of Hrs.", value: "total_hrs" },
    { text: "Purpose/Reason", value: "purpose_reason" },
    { text: "Action", value: "actions" },
]

const items: Item[any] = ref([
    {
        employee_name: "Oscar Lott",
        date_filed: "2017-10-10",
        overtime_date: "2017-10-10",
        time_from: "2017-09-22 08:00:00",
        time_to: "2017-09-22 17:00:00",
        total_hrs: "8.00",
        purpose_reason: "went to davao",
    },
    {
        employee_name: "Leigh King",
        date_filed: "2017-10-10",
        overtime_date: "2017-10-10",
        time_from: "2017-09-22 08:00:00",
        time_to: "2017-09-22 17:00:00",
        total_hrs: "8.00",
        purpose_reason: "went to davao",
    },
    {
        employee_name: "Ave Rill",
        date_filed: "2017-10-10",
        overtime_date: "2017-10-10",
        time_from: "2017-09-22 08:00:00",
        time_to: "2017-09-22 17:00:00",
        total_hrs: "8.00",
        purpose_reason: "went to davao",
    },
    {
        employee_name: "Dex Turz",
        date_filed: "2017-10-10",
        overtime_date: "2017-10-10",
        time_from: "2017-09-22 08:00:00",
        time_to: "2017-09-22 17:00:00",
        total_hrs: "8.00",
        purpose_reason: "went to davao",
    },
    {
        employee_name: "Sol Long",
        date_filed: "2017-10-10",
        overtime_date: "2017-10-10",
        time_from: "2017-09-22 08:00:00",
        time_to: "2017-09-22 17:00:00",
        total_hrs: "8.00",
        purpose_reason: "went to davao",
    },
    {
        employee_name: "Len Dingmachin",
        date_filed: "2017-10-10",
        overtime_date: "2017-10-10",
        time_from: "2017-09-22 08:00:00",
        time_to: "2017-09-22 17:00:00",
        total_hrs: "8.00",
        purpose_reason: "went to davao",
    },
    {
        employee_name: "Oliver Stuffismor",
        date_filed: "2017-10-10",
        overtime_date: "2017-10-10",
        time_from: "2017-09-22 08:00:00",
        time_to: "2017-09-22 17:00:00",
        total_hrs: "8.00",
        purpose_reason: "went to davao",
    },
])

const deleted = (val: Item) => {
    items.value.splice(val.key, 1)
}

</script>

<style>
.customize-table {
  --easy-table-header-item-padding: 10px 15px;
}
</style>
