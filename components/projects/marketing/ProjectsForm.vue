<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { usePositionStore } from "@/stores/project-monitoring/positions"
import { useNatureOfWorkStore } from "@/stores/project-monitoring/natureOfWork"

const positionStore = usePositionStore()
const natureOfWorkStore = useNatureOfWorkStore()
const projectStore = useProjectStore()
const { list: natureOfWorkList } = storeToRefs(natureOfWorkStore)
const showUploadModal = ref(false)
const snackbar = useSnackbar()

onMounted(() => {
    positionStore.getPositions()
    natureOfWorkStore.getNatureOfWorks()
})

const handleSubmit = async () => {
    try {
        projectStore.isLoading.create = true
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
        <h1 class="text-2xl mb-4 hidden">
            Project Creation Form
        </h1>
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-4">
                <div class="grid grid-cols-4 gap-6">
                    <LayoutFormPsTextInput
                        v-model="projectStore.information.location"
                        :title="'Location'"
                        placeholder="Location"
                    />
                    <LayoutFormPsTextInput
                        v-model="projectStore.information.name"
                        :title="'Project Name'"
                        placeholder="Project Name"
                    />
                    <LayoutFormPsSelectWithValue
                        v-model="projectStore.information.nature_of_work"
                        :options-list="natureOfWorkList.map(item => ({ value: item, label: item }))"
                        title="Nature of Work"
                    />
                    <LayoutFormPsTextInput
                        v-model="projectStore.information.implementing_office"
                        :title="'Implementing Office'"
                        placeholder="Implementing Office"
                    />
                </div>
                <div class="grid grid-cols-4 gap-6">
                    <LayoutFormPsTextInput
                        v-model="projectStore.information.contract_id"
                        :title="'Contract ID'"
                        placeholder="Contract ID"
                    />
                    <LayoutFormPsTextInput
                        v-model="projectStore.information.license"
                        :title="'License'"
                        placeholder="License"
                    />
                    <LayoutFormPsTextInput
                        v-model="projectStore.information.designator"
                        :title="'Designator'"
                        placeholder="Designator"
                        :required="true"
                    />
                    <LayoutFormPsTextInput
                        v-model="projectStore.information.position"
                        :title="'Position'"
                        placeholder="Position"
                        :required="true"
                    />
                </div>
                <div class="w-full">
                    <HrmsCommonRequestedBy />
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
