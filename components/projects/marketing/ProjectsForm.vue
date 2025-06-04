<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useApprovalStore, APPROVAL_PROJECT_CREATION } from "@/stores/hrms/setup/approvals"
import { usePositionStore } from "@/stores/project-monitoring/positions"

const positionStore = usePositionStore()
const projectStore = useProjectStore()
const showUploadModal = ref(false)
const designation = ref("employee")
const snackbar = useSnackbar()
const approvals = useApprovalStore()

onMounted(async () => {
    try {
        projectStore.information.approvals = await approvals.getApprovalByName(APPROVAL_PROJECT_CREATION)
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error as string
        })
    }
})
const selectStakeholder = (stakeholder) => {
    projectStore.information.employee_id = stakeholder.stakeholdable_id
    designation.value = "employee"
}

const handleSubmit = async () => {
    try {
        projectStore.isLoading.create = true
        projectStore.information.employee_id = 1
        await projectStore.createProject()
        if (projectStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: projectStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: projectStore.successMessage
            })
        }
    } catch (error) {
        projectStore.errorMessage = error as string

        snackbar.add({
            type: "error",
            text: projectStore.errorMessage
        })
    } finally {
        projectStore.clearMessages()
        projectStore.isLoading.create = false
    }
}
</script>

<template>
    <AccountingLoadScreen :is-loading="projectStore.isLoading.create" />
    <div class="flex flex-col gap-6 p-2">
        <!-- <h1 class="text-2xl mb-4">
            Project Creation Form
        </h1> -->
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-4">
                <div class="grid grid-cols-4 gap-6">
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Location
                        </label>
                        <input v-model="projectStore.information.location" type="text" class="border rounded-lg border-gray-300 h-10" required placeholder="Location">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Project Name
                        </label>
                        <input v-model="projectStore.information.name" type="text" class="border rounded-lg border-gray-300 h-10" required placeholder="Project Name">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Contract Amount
                        </label>
                        <input v-model="projectStore.information.amount" type="number" class="border rounded-lg border-gray-300 h-10" required placeholder="0.00">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Duration
                        </label>
                        <input v-model="projectStore.information.duration" type="text" class="border rounded-lg border-gray-300 h-10" required placeholder="Duration">
                    </div>
                </div>

                <div class="grid grid-cols-4 gap-6">
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Nature of Work
                        </label>
                        <input v-model="projectStore.information.nature_of_work" type="text" class="border rounded-lg border-gray-300 h-10" required placeholder="Nature of Work">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Implementing Office
                        </label>
                        <input v-model="projectStore.information.implementing_office" type="text" class="border rounded-lg border-gray-300 h-10" required placeholder="Implementing Office">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Contract ID
                        </label>
                        <input v-model="projectStore.information.contract_id" type="text" class="border rounded-lg border-gray-300 h-10" required placeholder="Contract ID">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            License
                        </label>
                        <input v-model="projectStore.information.license" type="text" class="border rounded-lg border-gray-300 h-10" required placeholder="License">
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-6">
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Designation
                        </label>
                        <AccountingCommonSelectStakeholderSelect
                            :stakeholder-id="projectStore.information.designation"
                            :stakeholder="designation"
                            :select-options="['employee']"
                            default-dept="employee"
                            placeholder="Search Employee"
                            @select="selectStakeholder"
                        />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="" class="text-sm text-gray-700">
                            Position
                        </label>
                        <ProjectsCommonSelect
                            v-model:v-model="projectStore.information.position"
                            :data="positionStore.list"
                            select-title="Position"
                        />
                    </div>
                </div>
                <div class="w-full">
                    <HrmsCommonRequestedBy />
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals</label>
                    <div>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in projectStore.information.approvals"
                            :key="'hrmsetupapprovallist'+apr"
                            v-model="projectStore.information.approvals[apr]"
                        />
                    </div>
                </div>
                <div class="flex justify-end gap-4 items-center">
                    <div v-if="!1" class="flex items-center gap-1 border-b border-green-800 h-6 cursor-pointer hover:border-green-800 select-none" @click="showUploadModal = true">
                        <Icon name="mdi:paperclip" class="text-green-800" />
                        <span class="text-green-600 hover:text-green-400 active:text-green-600">File Attachments</span>
                    </div>
                    <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10">
                        Save Project
                    </button>
                </div>
            </div>
        </form>
        <ProjectsModalsUpload :show-modal="showUploadModal" @hide-modal="showUploadModal = false" />
    </div>
</template>

<style>
#tabContainer span.active {
    border-bottom-color: rgb(28 100 242);
    color: rgb(28 100 242);
}
</style>
