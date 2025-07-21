<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"

const departments = useDepartmentStore()
departments.getDepartment()

const currentView = ref("table")

const openAdd = () => {
    departments.reset()
    currentView.value = "add"
}

const closeForm = () => {
    currentView.value = "table"
    departments.isEdit = false
    departments.reset()
}

const { isEdit } = storeToRefs(departments)
watch(isEdit, (val) => {
    if (val) { currentView.value = "edit" }
})

useHead({
    title: "Department",
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_department,
        ])"
    >
        <div v-if="currentView === 'add'" class="relative w-full">
            <HrmsDepartmentNewDepartment @close="closeForm" />
        </div>

        <div v-else-if="currentView === 'edit'" class="relative w-full">
            <HrmsDepartmentEditDepartment @close="closeForm" />
        </div>

        <div v-else>
            <HrmsDepartmentList @add="openAdd" />
        </div>
    </LayoutAcessContainer>
</template>
