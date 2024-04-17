<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()
const { information } = storeToRefs(projects)
const projId = ref()
const selectedEmployees = ref([])

watch(projId, async (newValue, oldValue) => {
    if (oldValue !== newValue) {
        await projects.getProjectInformation(newValue)
        await projects.projectMemberList(newValue)
        selectedEmployees.value = information.value.employees.project_members_ids
    }
})
const snackbar = useSnackbar()
const boardLoading = ref(false)

const attach = async () => {
    try {
        boardLoading.value = true
        await projects.attachEmployee(projects.information.id, selectedEmployees)

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
        selectedEmployees.value = []
        boardLoading.value = false
    }
}
</script>
<template>
    <LayoutBoards title="Assign Employee to Project" class="w-1/4" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="attach">
                <div class="pt-2">
                    <HrmsCommonProjectSelector v-model="projId" />
                </div>
                <HrmsCommonMultipleEmployeeSelector v-model="selectedEmployees" />
                <div class="max-w-full flex flex-row-reverse mt-5">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Assign Employee
                    </button>
                </div>
            </form>
        </div>
    </LayoutBoards>
    <LayoutBoards v-if="information" title="Project Information" class="w-3/4" :loading="boardLoading">
        <div class="w-full m-2 flex justify-between">
            <p class="text-3xl font-light">
                {{ information.project_identifier }} <span class="text-sm font-thin">Code : <span class="text-cyan-700">{{ information.project_code }}</span> </span>
            </p>
            <p class="m-2">
                <span class="text-cyan-700"> Date of Contract :</span> {{ information.date_of_contract }}
            </p>
        </div>
        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-cyan-700">
                        Contract Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ information.contract_name }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-cyan-700">
                        Contract Location
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ information.contract_location }}
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-cyan-700">
                        Implementing Officer
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ information.implementing_office }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-cyan-700">
                        Status
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ information.status }}
                    </dd>
                </div>
            </dl>
        </div>
        <div class="bg-white shadow-md rounded-md overflow-hidden">
            <div class="bg-gray-100 py-2 px-4">
                <h2 class="text-xl font-semibold text-gray-800">
                    Project Members
                </h2>
            </div>
            <div v-if="information.employees?.project_members" class="divide-gray-200 p-4">
                <div v-for="(member, index) in information.employees.project_members" :key="index" class="flex items-left">
                    <span class="text-gray-700 text-lg font-medium mr-4"> {{ index + 1 }}. </span>
                    <div class="flex-1">
                        <h3 class="text-lg font-medium text-gray-800">
                            {{ member.fullname_last }}
                        </h3>
                    </div>
                </div>
            </div>
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
