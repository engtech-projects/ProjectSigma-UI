<script setup lang="ts">
import { useEnumsStore } from "@/stores/hrms/enum"

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getUserEmployeeEnums()
enums.getDepartmentEnums()
enums.getProjectEnums()
enums.getPositionEnums()

useHead({
    title: "Cash Advance",

})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_loans_and_advances_cash_advance_group,
        ])"
    >
        <div class="flex flex-col gap-4">
            <div>
                <HrmsCashadvanceForm
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_loans_and_advances_cash_advance_formsmyrequest,
                    ])"
                />
            </div>
            <div>
                <HrmsCashadvanceTabs />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
