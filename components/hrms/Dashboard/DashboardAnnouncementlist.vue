<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <label for="" class="text-xl font-semibold text-gray-900">Announcement List</label>
        <div class="mt-5 mb-6">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" class="gap-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <Icon name="mdi:printer-pos-plus" />
                    Print
                </button>
                <button type="button" class="gap-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <Icon name="mdi:file-excel" />
                    Excel
                </button>
                <button type="button" class="gap-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <Icon name="mdi:file-pdf-box" />
                    PDF
                </button>
            </div>
        </div>
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
                            @click="approved(item)"
                        >
                            <Icon class="text-lg" name="mingcute:check-fill" />
                        </button>
                        <button
                            @click="reject(item)"
                        >
                            <Icon class="text-lg" name="fa-solid:times" />
                        </button>
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

<script setup>

const headers = [
    { text: "Employee Name", value: "employee_name" },
    { text: "Date Filed", value: "date_filed", width: 150 },
    { text: "Leave Availed", value: "leave_availed", width: 150 },
    { text: "Date From", value: "date_from" },
    { text: "Date To", value: "date_to" },
    { text: "No. of Days", value: "no_days" },
    { text: "No. of Hours", value: "no_hours" },
    { text: "Pay", value: "pay" },
    { text: "Reasons/Remarks", value: "reason_remarks" },
    { text: "Status", value: "status" },
    { text: "Action", value: "actions" },
]

const items = ref([
    {
        employee_name: "Lorem 1",
        date_filed: "2017-10-10",
        leave_availed: "Travel",
        date_from: "2017-09-22 08:00:00",
        date_to: "2017-09-22 17:00:00",
        no_days: "1.00",
        no_hours: "8.00",
        pay: "With Pay",
        reason_remarks: "went to davao",
        status: "Approved",
    },
    {
        employee_name: "Lorem 1",
        date_filed: "2017-10-10",
        leave_availed: "Travel",
        date_from: "2017-09-22 08:00:00",
        date_to: "2017-09-22 17:00:00",
        no_days: "1.00",
        no_hours: "8.00",
        pay: "With Pay",
        reason_remarks: "went to davao",
        status: "Approved",
    },
    {
        employee_name: "Lorem 1",
        date_filed: "2017-10-10",
        leave_availed: "Travel",
        date_from: "2017-09-22 08:00:00",
        date_to: "2017-09-22 17:00:00",
        no_days: "1.00",
        no_hours: "8.00",
        pay: "With Pay",
        reason_remarks: "went to davao",
        status: "Approved",
    },
    {
        employee_name: "Lorem 1",
        date_filed: "2017-10-10",
        leave_availed: "Travel",
        date_from: "2017-09-22 08:00:00",
        date_to: "2017-09-22 17:00:00",
        no_days: "1.00",
        no_hours: "8.00",
        pay: "With Pay",
        reason_remarks: "went to davao",
        status: "Approved",
    },
    {
        employee_name: "Lorem 1",
        date_filed: "2017-10-10",
        leave_availed: "Travel",
        date_from: "2017-09-22 08:00:00",
        date_to: "2017-09-22 17:00:00",
        no_days: "1.00",
        no_hours: "8.00",
        pay: "With Pay",
        reason_remarks: "went to davao",
        status: "Approved",
    },
    {
        employee_name: "Lorem 1",
        date_filed: "2017-10-10",
        leave_availed: "Travel",
        date_from: "2017-09-22 08:00:00",
        date_to: "2017-09-22 17:00:00",
        no_days: "1.00",
        no_hours: "8.00",
        pay: "With Pay",
        reason_remarks: "went to davao",
        status: "Approved",
    },
    {
        employee_name: "Lorem 1",
        date_filed: "2017-10-10",
        leave_availed: "Travel",
        date_from: "2017-09-22 08:00:00",
        date_to: "2017-09-22 17:00:00",
        no_days: "1.00",
        no_hours: "8.00",
        pay: "With Pay",
        reason_remarks: "went to davao",
        status: "Approved",
    },
])

const approved = () => {
}

const deleted = () => {
}

const reject = () => {
}
</script>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
