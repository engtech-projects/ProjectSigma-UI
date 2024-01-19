<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/departments"

const departments = useDepartmentStore()

const { list: departmentList, isEdit, department, getParams, pagination, errorMessage, successMessage } = storeToRefs(departments)

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
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
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
    <LayoutBoards title="Department List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="departmentList" :actions="actions" @edit-row="setEdit" @delete-row="deleteDept" />
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
