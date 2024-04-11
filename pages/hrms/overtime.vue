<script setup lang="ts">
import { useOvertimeStore } from "@/stores/hrms/overtime"
import { useEnumsStore } from "@/stores/hrms/enum"
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"

const overtimes = useOvertimeStore()
const { isEdit } = storeToRefs(overtimes)
overtimes.getMyRequests()
overtimes.getMyApprovalRequests()
overtimes.getOvertime()

const enums = useEnumsStore()
enums.getEmployeeEnum()

const projects = useProjectStore()
projects.getProject()

const departments = useDepartmentStore()
departments.getDepartmentList()

useHead({
    title: "Overtime"

})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <HrmsOvertimeFormReq v-show="!isEdit" />
            <HrmsEditOvertime v-show="isEdit" />
        </div>
        <!-- <HrmsOvertimeForm /> -->
        <HrmsOvertimeList />
        <!-- <HrmsOvertimeTable /> -->
    </div>
</template>
