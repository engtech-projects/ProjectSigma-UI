<script setup>
defineProps({
    allowanceData: {
        type: Object,
        required: true,
    },
})

const employeeAllowanceHeaders = [
    { name: "Employee", id: "employee" },
    { name: "Employee Position", id: "employee_position" },
    { name: "Allowance Rate", id: "allowance_rate_formatted" },
    { name: "Allowance Day(s)", id: "allowance_days" },
    { name: "Allowance Amount", id: "allowance_amount_formatted" },
]

</script>
<template>
    <!-- <pre>{{ allowanceData }}</pre> -->
    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
        <div class="p-2 flex flex-col gap-1">
            <span class="text-teal-600 text-light">
                Charging:
            </span>
            <span class="text-gray-900">
                {{ allowanceData.charge_name }}
            </span>
        </div>
        <div class="p-2 flex flex-col gap-1">
            <span class="text-teal-600 text-light">
                Cutoff Start:
            </span>
            <span class="text-gray-900 text-sm font-bold">
                {{ allowanceData.cutoff_start_human }}
            </span>
        </div>
        <div class="p-2 flex flex-col gap-1">
            <span class="text-teal-600 text-light">
                Cutoff End:
            </span>
            <span class="text-gray-900 text-sm font-bold">
                {{ allowanceData.cutoff_end_human }}
            </span>
        </div>
        <div class="p-2 flex flex-col gap-1">
            <span class="text-teal-600 text-light">
                Allowance Date:
            </span>
            <span class="text-gray-900 text-sm font-bold">
                {{ allowanceData.allowance_date_human }}
            </span>
        </div>
        <div class="p-2 flex flex-col gap-1">
            <span class="text-teal-600 text-light">
                Total # of Day(s):
            </span>
            <span class="text-gray-900 text-sm font-bold">
                {{ allowanceData.total_days }}
            </span>
        </div>
    </div>
    <LayoutPsTable
        :header-columns="employeeAllowanceHeaders"
        :datas="allowanceData.employee_allowances ?? []"
    />
    <div class="w-full mt-24">
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 text-light"> Prepared by: </span> {{ allowanceData.requested_by_user }}
        </div>
        <div>
            <LayoutApprovalsListView :approvals="allowanceData.approvals" :signature-view="allowanceData.request_status.toLowerCase() === 'approved'" />
        </div>
    </div>
</template>
