<script setup lang="ts">
import type { Item, Header } from "vue3-easy-data-table"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()
const { project, list: projectList } = storeToRefs(projects)

const employee = useEmployeeInfo()
const { employeeList } = storeToRefs(employee)

const selectedEmployees = ref<Item[]>([])

const headers: Header[] = [
    {
        text: "Employee Name", value: "fullname_last",
    },
]

const snackbar = useSnackbar()
const boardLoading = ref(false)

const attach = async () => {
    try {
        boardLoading.value = true

        const employeeIds = selectedEmployees.value.map(emp => emp.id)

        await projects.attachEmployee(project.value.id, employeeIds)

        if (projects.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: projects.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: projects.successMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: projects.errorMessage
        })
    } finally {
        projects.clearMessages()
        boardLoading.value = false
    }
}
</script>

<template>
    <LayoutBoards title="Assign Employee to Project" class="w-1/4" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="attach">
                <div class="pt-2">
                    <select id="project_name" v-model="project.id" :value="project" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="" disabled selected>
                            Choose Project
                        </option>
                        <option v-for="proj in projectList" :key="proj.id" :value="proj.id">
                            {{ proj.contract_name }}
                        </option>
                    </select>
                </div>
                <EasyDataTable
                    v-model:items-selected="selectedEmployees"
                    class="mt-5"
                    :headers="headers"
                    :items="employeeList"
                />

                <div class="max-w-full flex flex-row-reverse mt-5">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Assign Employee
                    </button>
                </div>
            </form>
        </div>
    </LayoutBoards>
</template>

<style scoped>

#overtime_form .vue3-easy-data-table__footer{
  display: none !important;
}

.add-btn-not-active, .remove-btn-not-active{
  display: none;
}
</style>
