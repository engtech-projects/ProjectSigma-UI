<script setup>
defineProps({
    overtimeData: {
        type: Object,
        required: true,
    },
})

const headers = [
    { name: "Employee Name", id: "fullname_first" },
]
</script>
<template>
    <div class="grid gap-2 md:justify-between">
        <div class="p-2 flex gap-2">
            <span class="text-gray-900 text-4xl">Overtime</span>
        </div>
    </div>
    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> Charged to: </span> <span class="text-gray-900">{{ data.charging_name }}</span>
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light">Date of Overtime: </span> {{ data.overtime_date }}
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> From: </span> {{ data.start_time_human }}
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> To: </span> {{ data.end_time_human }}
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> Meal Deduction: </span> {{ data.meal_deduction ? "Yes" : "No" }}
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> Purpose/Reason: </span> {{ data.reason }}
        </div>
    </div>
    <div class="w-full">
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> Employees: </span>
        </div>
        <LayoutPsTable
            class="max-h-[180px] overflow-auto"
            :header-columns="headers"
            :datas="data.employees"
            :actions="actions"
        />
    </div>
    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> Prepared by: </span> {{ data.created_by_user }}
        </div>
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> Prepared on: </span> {{ data.created_at_human }}
        </div>
    </div>
    <div class="w-full mt-2">
        <LayoutApprovalsListView :approvals="overtimeData.approvals" :signature-view="overtimeData.request_status.toLowerCase() === 'approved'" />
    </div>
</template>
