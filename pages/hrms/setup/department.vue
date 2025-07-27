<script setup>
// import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"

const departments = useDepartmentStore()
// const { isEdit } = storeToRefs(departments)
departments.getDepartment()

useHead({
    title: "Department",
})

const showFormHandler = () => {
    currentView.value = "add"
    departments.isEdit = false
    departments.reset()
}

const setEditHandler = () => {
    currentView.value = "edit"
    departments.isEdit = true
}

const handleEditSuccess = () => {
    currentView.value = "list"
}
const currentView = ref("list")

const handleClose = () => {
    currentView.value = "list"
}
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_department,
        ])"
    >
        <button v-if="currentView !== 'list'" @click="currentView = 'list'">
            <Icon name="mdi:arrow-left" />
            Back
        </button>
        <div class="flex flex-col gap-4 [&>*]:hidden [&>:last-child]:block">
            <HrmsDepartmentList v-if="currentView === 'list'" @show-form-handler="showFormHandler" @set-edit-handler="setEditHandler" />
            <HrmsDepartmentNewDepartment v-if="currentView === 'add'" @close="handleClose" />
            <HrmsDepartmentEditDepartment v-if="currentView === 'edit'" @close="handleClose" @edit-success="handleEditSuccess" />
        </div>
    </LayoutAcessContainer>
</template>
