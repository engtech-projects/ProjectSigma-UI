<script setup lang="ts">
import { useOvertimeStore } from "@/stores/hrms/overtime"
import { useEnumsStore } from "@/stores/hrms/enum"

const overtimes = useOvertimeStore()
const { isEdit } = storeToRefs(overtimes)
overtimes.getMyRequests()
overtimes.getMyApprovalRequests()
overtimes.getOvertime()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getDepartmentEnums()
enums.getProjectEnums()

useHead({
    title: "Overtime"

})
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div>
            <HrmsOvertimeFormReq v-show="!isEdit" />
            <HrmsEditOvertime v-show="isEdit" />
        </div>
        <div>
            <HrmsOvertimeTabs />
            <!-- <HrmsOvertimeMyRequest />
            <HrmsOvertimeMyApprovals />
            <HrmsOvertimeList /> -->
        </div>
    </div>
</template>
