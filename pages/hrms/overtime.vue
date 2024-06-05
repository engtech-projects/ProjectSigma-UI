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
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_lnotnto_overtime_group,
        ])"
    >
        <div
            class="grid grid-cols-2 md:grid-cols-2 gap-4"
        >
            <div>
                <HrmsOvertimeFormReq
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_overtime_form,
                    ])"
                    v-show="!isEdit"
                />
                <HrmsEditOvertime v-show="isEdit" />
            </div>
            <div>
                <HrmsOvertimeTabs />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
