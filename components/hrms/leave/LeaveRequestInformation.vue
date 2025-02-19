<script setup>
defineProps({
    leaveData: {
        type: Object,
        required: true,
    },
})

</script>
<template>
    <!-- <pre>{{ leaveData }}</pre> -->
    <div class="bg-white w-full shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-xl leading-6 font-medium text-gray-900">
                {{ leaveData.employee?.fullname_first }} <span class="text-green-700">({{ leaveData.employeePositionName }})</span>
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Leave Request of <span class="text-cyan-700">{{ leaveData.employee?.fullname_first }}</span> for <span class="text-cyan-700">{{ leaveData.type }}</span>
            </p>
        </div>
        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Remarks
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <p> {{ leaveData.reason_for_absence }}</p>
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Status
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <p> {{ leaveData.request_status }}</p>
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Number of days
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <p> {{ leaveData.number_of_days }}</p>
                        <!-- <template v-if="leaveData.date_of_absence_to && leaveData.date_of_absence_from">
                            {{ ((new Date(leaveData.date_of_absence_to) - new Date(leaveData.date_of_absence_from)) / (24 * 60 * 60 * 1000)) + 1 }} day/s
                        </template>
                        <template v-else>
                            0 day
                        </template> -->
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Date of Absence From
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ leaveData.date_of_absence_from }}
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Date of Absence To
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ leaveData.date_of_absence_to }}
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Prepared by:
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ leaveData.created_by_user }}
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Prepared on:
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ leaveData.created_at_human }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
    <div>
        <LayoutApprovalsListView :approvals="leaveData.approvals" :is-approved="leaveData.request_status.toLowerCase() === 'approved'" />
    </div>
</template>
