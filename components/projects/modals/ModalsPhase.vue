<script setup lang="ts">
import { usePhaseStore } from "@/stores/project-monitoring/phase"
import { useProjectStore } from "~/stores/project-monitoring/projects"
const phaseStore = usePhaseStore()
const projectStore = useProjectStore()
defineProps({
    showModal: {
        type: Boolean,
        required: true,
        default: false
    }
})
const emit = defineEmits(["hideModal", "save"])
const boardLoading = ref(false)
const snackbar = useSnackbar()
const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await phaseStore.createPhase()
        if (phaseStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: phaseStore.errorMessage
            })
        } else {
            projectStore.information.phases.push(clone(phaseStore.phase))
            emit("save", phaseStore.phase)
            snackbar.add({
                type: "success",
                text: phaseStore.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: phaseStore.errorMessage
        })
    } finally {
        phaseStore.phase.project_id = projectStore.information.id
        boardLoading.value = false
    }
}
</script>
<template>
    <ModalContainer
        :show="showModal"
        :local="true"
        :header="false"
        bg="bg-gray-50"
        size="modal-lg"
        @hide="emit('hideModal')"
    >
        <div class="flex flex-col p-4">
            <AccountingLoadScreen :is-loading="boardLoading" />
            <div class="flex items-center justify-between mb-16">
                <div class="flex items-end gap-2">
                    <h1 class="text-3xl uppercase">
                        Create Item
                    </h1>
                    <h3 class="text-gray-400 text-lg">
                        Item Creation
                    </h3>
                </div>
                <Icon name="material-symbols:close-rounded" class="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" @click="emit('hideModal')" />
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700">
                            Item Name
                        </label>
                        <input v-model="phaseStore.phase.name" type="text" class="border border-gray-300 rounded-md" placeholder="Item Name">
                    </div>
                </div>
                <div class="flex flex-col mb-6">
                    <label class="text-md text-gray-700">
                        Description
                    </label>
                    <textarea v-model="phaseStore.phase.description" class="border border-gray-300 rounded-md w-full h-56 resize-none" />
                </div>
                <div class="flex justify-end">
                    <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" type="submit">
                        Create Item
                    </button>
                </div>
            </form>
        </div>
    </ModalContainer>
</template>
