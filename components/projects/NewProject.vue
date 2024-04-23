<script setup>
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()
const { information: project, errorMessage, successMessage } = storeToRefs(projects)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const addProject = async () => {
    try {
        boardLoading.value = true
        await projects.createProject()
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
    } catch (error) {
        errorMessage.value = errorMessage
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
    <LayoutBoards title="Project Name" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="addProject">
                <div class="flex flex-col gap-2">
                    <div class="flex gap-4">
                        <div>
                            <label
                                for="project_code"
                                class="text-xs italic"
                            >Project Code</label>
                            <input
                                id="projectCode"
                                v-model="project.project_code"
                                type="text"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div>
                            <label
                                for="project_identifier"
                                class="text-xs italic"
                            >Project Identifier</label>
                            <input
                                id="projectIdentifier"
                                v-model="project.project_identifier"
                                type="text"
                                class="w-full rounded-lg"
                            >
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div>
                            <label
                                for="project_name"
                                class="text-xs italic"
                            >Contract ID</label>
                            <input
                                id="contractId"
                                v-model="project.contract_id"
                                type="text"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div>
                            <label
                                for="project_name"
                                class="text-xs italic"
                            >Contract Name</label>
                            <input
                                id="contractName"
                                v-model="project.contract_name"
                                type="text"
                                class="w-full rounded-lg"
                            >
                        </div>
                    </div>
                    <div>
                        <label
                            for="contract_location"
                            class="text-xs italic"
                        >Contract Location</label>
                        <input
                            id="contractLocation"
                            v-model="project.contract_location"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label
                                for="contract_amount"
                                class="text-xs italic"
                            >Contract Amount</label>
                            <input
                                id="contractAmount"
                                v-model="project.contract_amount"
                                type="number"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div class="flex-1">
                            <label
                                for="contract_duration"
                                class="text-xs italic"
                            >Contract Duration</label>
                            <input
                                id="contractDuration"
                                v-model="project.contract_duration"
                                type="date"
                                class="w-full rounded-lg"
                            >
                        </div>
                    </div>
                    <div class="flex-1">
                        <label
                            for="implementing_office"
                            class="text-xs italic"
                        >Implementing Office</label>
                        <input
                            id="implementingOffice"
                            v-model="project.implementing_office"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label
                                for="nature_of_work"
                                class="text-xs italic"
                            >Nature of Work</label>
                            <input
                                id="natureOfWOrk"
                                v-model="project.nature_of_work"
                                type="text"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div class="flex-1">
                            <label
                                for="date_of_noa"
                                class="text-xs italic"
                            >Date of NOA</label>
                            <input
                                id="dateOfNoa"
                                v-model="project.date_of_noa"
                                type="date"
                                class="w-full rounded-lg"
                            >
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label
                                for="date_of_contract"
                                class="text-xs italic"
                            >Date of Contract</label>
                            <input
                                id="dateOfContract"
                                v-model="project.date_of_contract"
                                type="date"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div class="flex-1">
                            <label
                                for="date_of_ntp"
                                class="text-xs italic"
                            >Date of NTP</label>
                            <input
                                id="dateOfNtp"
                                v-model="project.date_of_ntp"
                                type="date"
                                class="w-full rounded-lg"
                            >
                        </div>
                    </div>
                    <div class="flex-1">
                        <label
                            for="license"
                            class="text-xs italic"
                        >License</label>
                        <input
                            id="license"
                            v-model="project.license"
                            type="text"
                            class="w-full rounded-lg"
                        >
                    </div>
                </div>

                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                    >
                        Add Project
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
    </LayoutBoards>
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
