<script setup>
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/departments"

const departments = useDepartmentStore()
departments.getDepartment()

const { list: departmentList, isEdit, department, getParams, pagination } = storeToRefs(departments)

const setEdit = (dept) => {
    isEdit.value = true
    department.value = dept
}
const deleteDept = (dept) => {
    departments.deleteDepartment(dept.id)
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
</script>

<template>
    <LayoutBoards title="Department List" class="w-full p-4">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="departmentList" :actions="actions" @edit-row="setEdit" @delte-row="deleteDept" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
