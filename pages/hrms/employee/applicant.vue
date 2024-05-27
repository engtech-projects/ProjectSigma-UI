<script setup>
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
enums.getUserEmployeeEnums()
enums.getDepartmentEnums()

const manpowers = useManpowerStore()

manpowers.getManpower()
manpowers.getManpowerHiringRequests()

useHead({
    title: "Job Applicants",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_applicants,
        ])"
    >
        <div class="grid grid-flow-col gap-4">
            <HrmsEmployeeJobOpeningList />
        </div>
    </LayoutAcessContainer>
</template>
