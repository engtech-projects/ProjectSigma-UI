<script setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
enums.getUserEmployeeEnums()
enums.getDepartmentEnums()

useHead({
    title: "Job Applicants",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_job_applicant,
        ])"
    >
        <div class="grid grid-flow-col gap-4">
            <HrmsEmployeeJobOpeningList />
        </div>
    </LayoutAcessContainer>
</template>
