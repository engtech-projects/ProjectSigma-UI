<script setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
enums.getSalarygradeEnums()
enums.getDepartmentEnums()
enums.getPositionEnums()
enums.getEmployeeEnum()
enums.getUserEmployeeEnums()
useHead({
    title: "Project Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_schedule_employee_schedule,
        ])"
    >
        <div class="w-full">
            <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
                Project Schedule
            </div>
            <hr>
            <div>
                <HrmsScheduleProj />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
