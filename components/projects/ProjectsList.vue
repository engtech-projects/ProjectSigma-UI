<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()

const { list: projectList, isEdit, project, getParams, pagination, errorMessage, successMessage } = storeToRefs(projects)

const setEdit = (dept) => {
    isEdit.value = true
    project.value = dept
}
const deleteDept = async (dept) => {
    try {
        boardLoading.value = true
        await projects.deleteProject(dept.id)
        snackbar.add({
            type: "success",
            text: projects.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Contract ID", id: "contract_id" },
    { name: "Contract Name", id: "contract_name" },
    { name: "Contract Location", id: "contract_location" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="Project List" class="w-full" :loading="projects.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                :header-columns="headers"
                :datas="projectList"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deleteDept"
            />
            <i v-if="!projectList.length&&!projects.isLoading" class="p-4 text-center block">No data available.</i>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="projectList.length"
                :links="pagination"
                @change-params="changePaginate"
            />
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
