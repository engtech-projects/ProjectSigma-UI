<script setup lang="ts">
import { useOvertimeStore } from "@/stores/hrms/overtime"

const overtimes = useOvertimeStore()
const { isEdit } = storeToRefs(overtimes)
overtimes.getMyRequests()
overtimes.getMyApprovalRequests()
overtimes.getOvertime()

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
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div>
                <HrmsOvertimeFormReq
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_overtime_form,
                    ])"
                    v-show="!isEdit"
                />
            </div>
            <div>
                <HrmsOvertimeTabs />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
