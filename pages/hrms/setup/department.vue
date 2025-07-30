<script setup>
import { useDepartmentStore } from "@/stores/hrms/setup/departments"
const departments = useDepartmentStore()
departments.getDepartment()

useHead({ title: "Department" })

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.hrms_setup_department])"
    >
        <LayoutContainerLastchild>
            <HrmsDepartmentList />
            <HrmsDepartmentNewDepartment />
            <HrmsDepartmentEditDepartment />
        </LayoutContainerLastchild>
    </LayoutAcessContainer>
</template>
