<template>
    <div class="mt-5 border-t-4 border-t-teal-400 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto ">
        <label for="" class="text-xl font-semibold text-gray-900">Other Deduction List</label>
        <div class="mt-5 mb-6 ">
            <EasyDataTable
                class="mt-5"
                table-class-name="customize-table"
                :headers="headers"
                :items="items"
            >
                <template #item-actions="item">
                    <div class="flex flex-row gap-1">
                        <button
                            @click="payment(item)"
                        >
                            <Icon class="text-lg" name="mdi:cash" color="green" />
                        </button>
                        <button
                            @click="deleted(item)"
                        >
                            <Icon class="text-lg" name="mdi:trash" color="red" />
                        </button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>

<script setup>

const headers = [
    { text: "Employee Name", value: "employee_name" },
    { text: "Date Filed", value: "date_filed" },
    { text: "Deduction Start Date", value: "deduction_start_date" },
    { text: "Deduction Name", value: "deduction_name" },
    { text: "Amount to Deduct", value: "amt" },
    { text: "Term", value: "term" },
    { text: "Duration (Months)", value: "duration" },
    { text: "Deduction per Term", value: "deduction_per_term" },
    { text: "Balance", value: "balance" },
    { text: "Action", value: "actions" },
]

const items = ref([
    {
        employee_name: "Adam Lavin",
        date_filed: "2017-10-10",
        deduction_start_date: "2023-08-30",
        deduction_name: "T-Building 2023",
        amt: "2,080",
        term: "Semi-monthly",
        duration: "5",
        deduction_per_term: "208.00",
        balance: "1,872.00",
    },
    {
        employee_name: "Edem Lee",
        date_filed: "2017-10-10",
        deduction_start_date: "2023-08-30",
        deduction_name: "T-Building 2023",
        amt: "2,080",
        term: "Semi-monthly",
        duration: "5",
        deduction_per_term: "208.00",
        balance: "1,872.00",
    },
    {
        employee_name: "John Kurt",
        date_filed: "2017-10-10",
        deduction_start_date: "2023-08-30",
        deduction_name: "T-Building 2023",
        amt: "2,080",
        term: "Semi-monthly",
        duration: "5",
        deduction_per_term: "208.00",
        balance: "1,872.00",
    },
    {
        employee_name: "Kelvin Lee",
        date_filed: "2017-10-10",
        deduction_start_date: "2023-08-30",
        deduction_name: "T-Building 2023",
        amt: "2,080",
        term: "Semi-monthly",
        duration: "5",
        deduction_per_term: "208.00",
        balance: "1,872.00",
    },
])

</script>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
