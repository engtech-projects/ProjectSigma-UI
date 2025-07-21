<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"

defineEmits(["add"])

const departments = useDepartmentStore()

const { list, isEdit, department, getParams, pagination, errorMessage, successMessage } = storeToRefs(departments)

const setEdit = (dept) => {
    isEdit.value = true
    department.value = dept
}
const deleteDept = async (dept) => {
    try {
        boardLoading.value = true
        await departments.deleteDepartment(dept.id)
        snackbar.add({
            type: "success",
            text: departments.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    departments.getDepartment()
}

const headers = [
    { name: "Department Name", id: "department_name" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards :loading="boardLoading">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-xl font-semibold text-gray-900">
                Department List
            </h1>
            <LayoutFormPsButton
                class=" bg-teal-600 content-center mt-5 hover:bg-teal-800"
                button-title="Add Department"
                button-icon=""
                @click="$emit('add')"
            />
        </div>
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="list" :actions="actions" @edit-row="setEdit" @delete-row="deleteDept" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutBoards>
</template>
