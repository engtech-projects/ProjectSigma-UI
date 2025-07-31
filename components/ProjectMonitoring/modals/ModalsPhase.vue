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
    },
    isEdit: {
        type: Boolean,
        required: false,
        default: false
    },
})
const emit = defineEmits(["hideModal", "save"])
const boardLoading = ref(false)
const snackbar = useSnackbar()
const handleSubmit = async (isEdit: boolean) => {
    try {
        boardLoading.value = true
        if (isEdit) {
            await phaseStore.editPhase()
        } else {
            await phaseStore.createPhase()
        }
        if (phaseStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: phaseStore.errorMessage
            })
        } else {
            if (!isEdit) {
                projectStore.information.phases.push(clone(phaseStore.phase))
                emit("save", phaseStore.phase)
            }
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
        emit("hideModal")
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
            <div class="flex items-center justify-between mb-8">
                <div class="flex flex-col items-start gap-2">
                    <h1 class="text-2xl font-bold uppercase text-center">
                        {{ isEdit ? "Edit Part" : "Create Part" }}
                    </h1>
                    <h3 class="text-gray-400 text-xs">
                        Fill out the details below to create a new part. Provide a clear name and a short description for identification.
                    </h3>
                </div>
                <Icon name="material-symbols:close-rounded" class="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" @click="emit('hideModal')" />
            </div>
            <form @submit.prevent="handleSubmit(isEdit)">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex flex-col">
                        <label class="text-md text-gray-700 mb-2">
                            Part No *
                        </label>
                        <input v-model="phaseStore.phase.name" type="text" class="border border-gray-300 rounded-md">
                    </div>
                </div>
                <div class="flex flex-col mb-6">
                    <label class="text-md text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea v-model="phaseStore.phase.description" class="border border-gray-300 rounded-md w-full h-56 resize-none" />
                </div>
                <div class="flex justify-end">
                    <button v-if="!isEdit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" type="submit">
                        Save Part
                    </button>
                    <button v-if="isEdit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" type="submit">
                        Update Part
                    </button>
                </div>
            </form>
        </div>
    </ModalContainer>
</template>
