<template>
    <div>
        <AccountingLoadScreen :is-loading="boardLoading" />
        <div class="flex flex-col gap-6 border-t-2 border-gray-800 pt-6 mb-4">
            <div class="flex justify-between">
                <div class="flex items-end gap-2">
                    <h1 class="text-3xl text-black uppercase">
                        Bill of Quantities
                    </h1>
                    <h4 class="text-gray-500 text-md">
                        Project Description
                    </h4>
                </div>
                <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-48 h-9" @click="phaseModalShow">
                    Create Item
                </button>
            </div>
            <table class="border border-collapse border-gray-800 w-full">
                <thead>
                    <tr>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-2/12">
                            Pay Item No.
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-3/12">
                            Description
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-1/12">
                            Unit
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-1/12">
                            Qty
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-2/12">
                            Unit Price (Pesos)
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-3/12">
                            Amount (Pesos)
                        </th>
                    </tr>
                </thead>
                <tbody v-if="projectStore.information.phases.length === 0">
                    <tr>
                        <td colspan="6" class="text-center py-4 font-semibold text-md italic text-gray-500">
                            No Data Available!
                        </td>
                    </tr>
                </tbody>
                <tbody v-for="phase in projectStore.information.phases" :key="phase.id">
                    <tr>
                        <td class="uppercase bg-yellow-200 text-center">
                            {{ phase.name }}
                        </td>
                        <td class="uppercase bg-yellow-200 text-center">
                            {{ phase.description }}
                        </td>
                        <td class="bg-yellow-200 py-1" colspan="4">
                            <div class="flex gap-1 justify-end">
                                <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="displayTaskModal(phase)">
                                    Create Task
                                </button>
                                <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="removePhase(phase)">
                                    Remove
                                </button>
                            </div>
                        </td>
                    </tr>
                    <!-- <tr class="bg-gray-100">
                        <td />
                        <td class="uppercase text-xs font-semibold pt-2 text-center">
                            Name and Specification
                        </td>
                        <td class="uppercase text-xs font-semibold pt-2 text-center">
                            Quantity
                        </td>
                        <td class="uppercase text-xs font-semibold pt-2 text-center">
                            Unit
                        </td>
                        <td class="uppercase text-xs font-semibold pt-2 text-center">
                            Unit Cost
                        </td>
                        <td class="uppercase text-xs font-semibold pt-2 text-center">
                            Amount
                        </td>
                    </tr> -->

                    <!-- //TASK LIST -->
                    <tr v-for="task in phase.tasks" :key="task.id">
                        <td class="text-center border border-gray-700">
                            {{ task.name }}
                        </td>
                        <td class="p-2 border border-gray-700">
                            {{ task.description }}
                        </td>
                        <td class="p-2 border border-gray-700 text-center">
                            {{ task.quantity }}
                        </td>
                        <td class="p-2 border border-gray-700 text-center">
                            {{ task.unit }}
                        </td>
                        <td class="border border-gray-700">
                            <div class="flex flex-col p-2 border-b border-gray-700">
                                <h4 class="font-bold uppercase text-sm">
                                    In Words
                                </h4>
                                <span class="pl-4">
                                    {{ amountToWords(task.unit_price?? 0) }}
                                </span>
                            </div>
                            <div class="flex flex-col p-2">
                                <h4 class="font-bold uppercase text-sm">
                                    In Figures
                                </h4>
                                <span class="pl-4">
                                    {{ accountingCurrency(task.unit_price) }}
                                </span>
                            </div>
                        </td>
                        <td class="border border-gray-700">
                            <div class="flex">
                                <div class="flex flex-col border-r border-gray-700 flex-1">
                                    <div class="flex flex-col p-2 border-b border-gray-700">
                                        <h4 class="font-bold uppercase text-sm flex-1">
                                            In Words
                                        </h4>
                                        <span class="pl-4 flex-1">
                                            {{ amountToWords(task.amount?? 0) }}
                                        </span>
                                    </div>
                                    <div class="flex flex-col p-2">
                                        <h4 class="font-bold uppercase text-sm">
                                            In Figures
                                        </h4>
                                        <span class="pl-4">
                                            {{ accountingCurrency(task.amount) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col p-2 justify-center gap-2">
                                    <NuxtLink v-if="edit" :to="`/project-monitoring/project-details?id=${task.id}`" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <NuxtLink v-if="!edit" to="/project-monitoring/project-details" class="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:visibility-rounded" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6" @click="removeTask(task)">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-end gap-4 items-center">
            <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-12 h-8">
                <Icon name="ic:outline-local-printshop" class="text-white h-6 w-6" />
            </button>
            <NuxtLink v-if="!edit" to="/project-monitoring/tss" class="flex items-center  justify-center bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-48 h-9 text-center">
                Generate TSS
            </NuxtLink>
        </div>
        <ProjectsModalsPhase :show-modal="showPhaseModal" @hide-modal="showPhaseModal = false" @save="savePhase" />
        <ProjectsModalsTask :show-modal="showTaskModal" @hide-modal="showTaskModal = false" @save="saveTask" />
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { usePhaseStore } from "@/stores/project-monitoring/phase"
import { useTaskStore } from "@/stores/project-monitoring/task"
const taskStore = useTaskStore()
const boardLoading = ref(false)
const props = defineProps({
    projectId: {
        type: Number,
        default: null
    },
})
const projectStore = useProjectStore()
const edit = projectStore.viewState
const phaseStore = usePhaseStore()
const currentPhase = ref(null)
phaseStore.phase.project_id = props.projectId
const showPhaseModal = ref(false)
const showTaskModal = ref(false)
const displayTaskModal = (phase) => {
    phaseStore.phase = phase
    currentPhase.value = phase
    currentPhase.value.tasks = !currentPhase.value.tasks ? [] : currentPhase.value.tasks
    showTaskModal.value = true
    taskStore.task.phase_id = phase.id
}
const phaseModalShow = () => {
    showPhaseModal.value = true
    phaseStore.reset()
    phaseStore.phase.project_id = props.projectId
}
const saveTask = (task) => {
    currentPhase.value.tasks.push(task)
    showTaskModal.value = false
}
const savePhase = () => {
    showPhaseModal.value = false
}
const snackbar = useSnackbar()
const removeTask = async (task) => {
    try {
        boardLoading.value = true
        await taskStore.deleteTask(task.id)
        if (taskStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: taskStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: taskStore.successMessage
            })
        }
    } catch (error) {
        taskStore.errorMessage = error as string

        snackbar.add({
            type: "error",
            text: taskStore.errorMessage
        })
    } finally {
        projectStore.getProject(projectStore.information.id)
        boardLoading.value = false
    }
    currentPhase.value.tasks = currentPhase.value.tasks.filter(t => t.id !== task.id)
}

const removePhase = async (phase) => {
    try {
        boardLoading.value = true
        await phaseStore.deletePhase(phase.id)
        if (phaseStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: phaseStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: phaseStore.successMessage
            })
        }
    } catch (error) {
        phaseStore.errorMessage = error as string

        snackbar.add({
            type: "error",
            text: phaseStore.errorMessage
        })
    } finally {
        projectStore.getProject(projectStore.information.id)
        boardLoading.value = false
    }
}
</script>

<style>

</style>
