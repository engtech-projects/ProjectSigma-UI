<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"

const departments = useDepartmentStore()

const { list: departmentList, getParams, pagination, errorMessage, successMessage } = storeToRefs(departments)

const setEdit = (dept) => {
    departments.department = dept
    departments.isEdit = true
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
    { name: "Department Code", id: "code" },
    { name: "Department Name", id: "department_name" },
]
const actions = {
    edit: true,
    delete: true
}

const showFormHandler = () => {
    departments.isCreate = true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Department List" class="w-full" :loading="boardLoading">
        <template #header-options>
            <LayoutFormPsButton
                class="content-center mt-5 !w-auto text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 font-semibold text-sm p-2 me-2 mb-2 rounded-lg"
                button-title="Add Department"
                button-icon=""
                @click="showFormHandler"
            />
        </template>
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="departmentList" :actions="actions" @edit-row="setEdit" @delete-row="deleteDept" />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="pagination" @change-params="changePaginate" />
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
