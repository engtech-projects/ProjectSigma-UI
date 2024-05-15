<script setup lang="ts">
useHead({
    title: "Failure to Log",
    meta: [
        { name: "description", content: "" }
    ],

})

const headers = [
    { text: "ID", value: "id" },
    { text: "EMPLOYEE", value: "employee_name" },
    { text: "LOG DATE", value: "logdate" },
    { text: "TIME IN", value: "timein" },
    { text: "TIME OUT", value: "timeout" },
    { text: "REASON", value: "reason" },
]

const items = [
    {
        id: "Employee-0011",
        employee_name: "Employee 11",
        logdate: "10/24/23",
        timein: "10/24/23",
        timeout: "10/24/23",
        reason: "reason101",
    },
    {
        id: "Employee-0011",
        employee_name: "Employee 11",
        logdate: "10/24/23",
        timein: "10/24/23",
        timeout: "10/24/23",
        reason: "reason101",
    },
    {
        id: "Employee-0011",
        employee_name: "Employee 11",
        logdate: "10/24/23",
        timein: "10/24/23",
        timeout: "10/24/23",
        reason: "reason101",
    },
    {
        id: "Employee-0011",
        employee_name: "Employee 11",
        logdate: "10/24/23",
        timein: "10/24/23",
        timeout: "10/24/23",
        reason: "reason101",
    },
    {
        id: "Employee-0011",
        employee_name: "Employee 11",
        logdate: "10/24/23",
        timein: "10/24/23",
        timeout: "10/24/23",
        reason: "reason101",
    },

]
</script>

<template>
    <div class="mt-10 md:mt-0 md:flex gap-2">
        <HrmsAttendanceFailToLogForm class="md:w-1/2"/>

        <div class="md:w-1/2 p-2 w-full">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle target-id="leaverequest-all-list" title="All List" />
                    <HrmsCommonTabsTabTitle target-id="leaverequest-my-approvals" title="My Approvals" />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="leaverequest-all-list">
                        <HrmsLeaveAllList />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="leaverequest-my-approvals">
                        <HrmsLeaveApprovalList />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>

        <div v-if="1==2" class="shadow-md border border-gray-200 p-4 rounded-lg w-full">
            <label for="" class="text-xl font-normal text-gray-900">Log Failures Table</label>
            <Table
                :tbl-headers="headers"
                :tbl-items="items"
            />
        </div>
    </div>
</template>
