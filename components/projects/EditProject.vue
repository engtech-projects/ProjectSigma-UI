<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/projects"

const projects = useProjectStore()
const { project, errorMessage, successMessage } = storeToRefs(projects)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    projects.reset()
}
const editProject = async () => {
    try {
        boardLoading.value = true
        await projects.editProject()
        snackbar.add({
            type: "success",
            text: projects.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: projects.errorMessage || "something went wrong."
        })
    } finally {
        projects.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutEditBoards title="Edit project" :loading="boardLoading">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="editProject">
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="contract_id"
                            class="text-xs italic"
                        >New Contract ID</label>
                        <input
                            id="contractId"
                            v-model="project.contract_id"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="contract_name"
                            class="text-xs italic"
                        >New Contract Name</label>
                        <input
                            id="contractName"
                            v-model="project.contract_name"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div>
                        <label
                            for="contract_location"
                            class="text-xs italic"
                        >New Contract Location</label>
                        <input
                            id="contractLocation"
                            v-model="project.contract_location"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>

                <div class="flex justify-end gap-2">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5 hover:bg-teal-500"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        class="flex-1 text-white p-2 rounded bg-gray-700 content-center mt-5 hover:bg-gray-500"
                        @click="cancelEdit"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic transition-opacity delay-1000"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutEditBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
