<script setup>
defineProps({
    travelOrderData: {
        type: Object,
        required: true,
    },
})

</script>
<template>
    <!-- <pre>{{ travelOrderData }}</pre> -->
    <div class="grid gap-2 md:justify-between">
        <div class="p-2 flex gap-2">
            <span class="text-gray-900 text-4xl">TRAVEL REQUEST TO: {{ travelOrderData.destination }}</span>
        </div>
    </div>
    <div class="grid gap-2 md:justify-between">
        <div class="p-2 flex gap-2">
            <span class="text-gray-900 text-xl">Requesting Office: <span class="text-teal-600 font-medium">{{ travelOrderData.department.department_name }}</span></span>
        </div>
    </div>
    <div class="grid md:grid-cols-3 divide-x gap-2 md:justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
        <div class="p-2 flex gap-2">
            <span class="text-teal-600 font-medium ">Employee(s): </span> <span class="text-gray-900">{{ travelOrderData.employees.map(employee => employee.fullname_first ).join(', ') }}</span>
        </div>
        <div class="p-2 flex flex-col gap-2">
            <span class="text-teal-600 font-medium">Destination: </span> {{ travelOrderData.destination }}
            <span class="text-teal-600 font-medium">Purpose of Travel: </span> {{ travelOrderData.purpose_of_travel }}
            <span class="text-teal-600 font-medium">Date of Travel: </span> {{ travelOrderData.date_of_travel_human }}
            <span class="text-teal-600 font-medium">Time of Travel: </span> {{ travelOrderData.time_of_travel_human }}
            <span class="text-teal-600 font-medium">End of Travel: </span> {{ travelOrderData.date_time_end_human }}
            <span class="text-teal-600 font-medium">Duration of Travel (days): </span> {{ travelOrderData.duration_of_travel }}
            <span class="text-teal-600 font-medium">Means of Transportation
                : </span> {{ travelOrderData.means_of_transportation }}
        </div>
        <div class="p-2 flex flex-col gap-2">
            <span class="text-teal-600 font-medium">Charging Destination: </span> {{ travelOrderData.charging_designation }}
            <span class="text-teal-600 font-medium">Remarks
                : </span> {{ travelOrderData.remarks }}
            <span class="text-teal-600 font-medium">Request Status: </span> {{ travelOrderData.request_status }}
            <span class="text-teal-600 text-light font-medium"> Prepared by: </span> {{ travelOrderData.created_by_user }}
            <span class="text-teal-600 text-light font-medium"> Prepared on: </span> {{ travelOrderData.created_at_human }}
        </div>
    </div>
    <div class="w-full mt-2">
        <LayoutApprovalsListView :approvals="travelOrderData.approvals" :signature-view="travelOrderData.request_status.toLowerCase() === 'approved'" />
    </div>
</template>
