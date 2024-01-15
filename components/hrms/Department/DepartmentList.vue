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

const headers = [
    { text: "ID", value: "id" },
    { text: "DEPARTMENT NAME", value: "department_name" },
    { text: "Actions", value: "actions" },
]

</script>

<template>
    <LayoutBoards title="Department List" class="w-full p-4">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th hidden class="border p-2">
                            #
                        </th>
                        <th class="p-2">
                            Department Name
                        </th>
                        <th class="p-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(departments, index) in departmentList" :key="index" class="border">
                        <td hidden class="border p-2">
                            {{ index + 1 }}
                        </td>
                        <td class="p-2">
                            <span>{{ departments.department_name }}</span>
                        </td>
                        <td class=" p-2 flex gap-2 justify-center">
                            <button @click="setEdit(departments)">
                                <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                            </button>
                            <button

                                @click="deleteDept(departments)"
                            >
                                <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </LayoutBoards>
</template>
