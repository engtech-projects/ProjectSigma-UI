<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { usePhaseStore } from "@/stores/project-monitoring/phase"
import { useTaskStore } from "@/stores/project-monitoring/task"
const taskStore = useTaskStore()
const projectStore = useProjectStore()
const phaseStore = usePhaseStore()
const boardLoading = ref(false)
const currentPhase = ref(null)
phaseStore.phase.project_id = projectStore.information?.id
const showPhaseModal = ref(false)
const editPhaseModal = ref(false)
const editTaskModal = ref(false)
const showTaskModal = ref(false)
const hidePhaseModal = () => {
    editPhaseModal.value = false
    showPhaseModal.value = false
}
const hideTaskModal = () => {
    editTaskModal.value = false
    showTaskModal.value = false
}
const displayTaskModal = (phase) => {
    phaseStore.phase = phase
    currentPhase.value = phase
    currentPhase.value.tasks = !currentPhase.value.tasks ? [] : currentPhase.value.tasks
    taskStore.reset()
    showTaskModal.value = true
    taskStore.task.phase_id = phase.id
}
const taskModalEdit = (task: any, phase: any) => {
    taskStore.task = task
    phaseStore.phase = phase
    taskStore.task.phase_id = phase.id
    editTaskModal.value = true
    showTaskModal.value = true
}
const phaseModalEdit = (phase: any) => {
    phaseStore.phase.project_id = projectStore.information?.id
    phaseStore.phase = phase
    editPhaseModal.value = true
    showPhaseModal.value = true
}
const phaseModalShow = () => {
    showPhaseModal.value = true
    phaseStore.reset()
    phaseStore.phase.project_id = projectStore.information?.id
}
const saveTask = (task) => {
    currentPhase.value.tasks.push(task)
    showTaskModal.value = false
    editTaskModal.value = false
}
const savePhase = () => {
    showPhaseModal.value = false
    editPhaseModal.value = false
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
<template>
    <div>
        <LayoutPrintAdvanced>
            <template #system-layout>
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
                            <button v-if="!projectStore.viewState" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-48 h-9" @click="phaseModalShow">
                                Create Part
                            </button>
                        </div>
                        <table class="table-auto w-full border border-collapse border-gray-800 text-sm">
                            <thead>
                                <tr class="text-left border border-black">
                                    <th colspan="4" class="text-left bg-[#ffc000] text-black font-bold border border-black px-2">
                                        <p>
                                            (Columns (1), (2), (3), and (4) are <br> to be filled up by the Procuring Entity)
                                        </p>
                                    </th>
                                    <th colspan="3" class="text-left bg-[#ffc000] text-black font-bold border border-black px-2">
                                        <p>
                                            (Columns (5) and (6) are <br> to be filled up by the bidder)
                                        </p>
                                    </th>
                                </tr>
                                <tr>
                                    <th class="border border-black px-2 border-b-0">
                                        Pay Item No.
                                    </th>
                                    <th class="border border-black px-2 border-b-0">
                                        Description
                                    </th>
                                    <th class="border border-black px-2 border-b-0">
                                        Unit
                                    </th>
                                    <th class="border border-black px-2 border-b-0">
                                        Quantity
                                    </th>
                                    <th class="border border-black px-2 !font-normal">
                                        Unit Price (Pesos)
                                    </th>
                                    <th colspan="2" class="border border-black px-2 !font-normal">
                                        Amount (Pesos)
                                    </th>
                                </tr>
                                <tr class="text-left !font-normal">
                                    <th class="!font-normal px-1 border border-black border-t-0">
                                        (1)
                                    </th>
                                    <th class="!font-normal px-1 border border-black border-t-0">
                                        (2)
                                    </th>
                                    <th class="!font-normal px-1 border border-black border-t-0">
                                        (3)
                                    </th>
                                    <th class="!font-normal px-1 border border-black border-t-0">
                                        (4)
                                    </th>
                                    <th class="!font-normal border border-black px-2">
                                        (5)
                                    </th>
                                    <th colspan="2" class="!font-normal border border-black px-2">
                                        (6)
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="(projectStore.information?.phases?.length ?? 0) === 0">
                                <tr>
                                    <td colspan="6" class="text-center py-4 font-semibold text-md italic text-gray-500">
                                        No Data Available!
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-for="phase in projectStore.information?.phases ?? []" :key="phase.id">
                                <tr>
                                    <td class="bg-[#ffe598] text-left">
                                        {{ phase.name }}
                                    </td>
                                    <td class="bg-[#ffe598] text-left">
                                        {{ phase.description }}
                                    </td>
                                    <td class="bg-[#ffe598] py-1" colspan="5">
                                        <div
                                            v-if="!projectStore.viewState"
                                            class="flex gap-1 justify-end"
                                        >
                                            <button
                                                class="group relative bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg text-xs overflow-hidden transition-all duration-300 w-8 hover:w-28 h-8 px-2"
                                                @click="displayTaskModal(phase)"
                                            >
                                                <!-- Icon A: visible by default -->
                                                <div class="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
                                                    <Icon name="material-symbols:add" color="white" class="h-5 w-5" />
                                                </div>
                                                <!-- Icon B + "Create Item": visible on hover -->
                                                <div class="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-1">
                                                    <Icon name="material-symbols:add-circle-outline" color="white" class="h-5 w-5" />
                                                    <span class="whitespace-nowrap">Create Item</span>
                                                </div>
                                            </button>
                                            <button
                                                class="group relative bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg text-xs overflow-hidden transition-all duration-300 w-8 hover:w-24 h-8 px-2"
                                                @click="phaseModalEdit(phase)"
                                            >
                                                <!-- Icon A: shown by default, hidden on hover -->
                                                <div class="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
                                                    <Icon name="material-symbols:edit" color="white" class="h-5 w-5" />
                                                </div>

                                                <!-- Icon B + Text: hidden by default, shown on hover -->
                                                <div class="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-1">
                                                    <Icon name="material-symbols:edit-outline" color="white" class="h-5 w-5" />
                                                    <span class="whitespace-nowrap">Edit Part</span>
                                                </div>
                                            </button>
                                            <button
                                                class="group relative bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg text-xs overflow-hidden transition-all duration-300 w-8 hover:w-28 h-8 px-2"
                                                @click="removePhase(phase)"
                                            >
                                                <!-- Icon A: Trash (default), visible when not hovered -->
                                                <div class="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
                                                    <Icon name="ion:trash" color="white" class="h-5 w-5" />
                                                </div>

                                                <!-- Icon B + "Delete Item": visible on hover -->
                                                <div class="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-1">
                                                    <Icon name="ion:trash-outline" color="white" class="h-5 w-5" />
                                                    <span class="whitespace-nowrap">Delete Part</span>
                                                </div>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- //TASK LIST -->
                                <tr v-for="task in phase.tasks" :key="task.id">
                                    <td class="text-center border border-gray-700">
                                        {{ task.name }}
                                    </td>
                                    <td class="text-center p-2 border border-gray-700">
                                        {{ task.description }}
                                    </td>
                                    <td class="p-2 border border-gray-700 text-center">
                                        {{ task.unit }}
                                    </td>
                                    <td class="p-2 border border-gray-700 text-center">
                                        {{ task.quantity }}
                                    </td>
                                    <td class="border border-gray-700">
                                        <div class="flex flex-col">
                                            <div class="p-1">
                                                <p class="text-left capitalize">
                                                    In Words;
                                                </p>
                                            </div>
                                            <div class="border-b border-gray-700 p-1">
                                                <p class="text-center">
                                                    <span class="max-w-[200px]">
                                                        {{ amountToWords(task.unit_price ?? 0) }}
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="p-1">
                                                <p class="text-left">
                                                    <span>
                                                        in Figures
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="p-1">
                                                <p class="text-right">
                                                    <span>
                                                        {{ accountingCurrency(task.unit_price) }}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="border border-gray-700">
                                        <div class="flex flex-col">
                                            <div class="p-1">
                                                <p class="text-left capitalize">
                                                    In Words;
                                                </p>
                                            </div>
                                            <div class="border-b border-gray-700 p-1">
                                                <p class="text-center">
                                                    <span class="max-w-[200px]">
                                                        {{ amountToWords(task.amount ?? 0) }}
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="p-1">
                                                <p class="text-left">
                                                    <span>
                                                        in Figures
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="p-1">
                                                <p class="text-right">
                                                    <span>
                                                        {{ accountingCurrency(task.amount) }}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        v-if="!projectStore.viewState"
                                        class="border border-gray-700"
                                    >
                                        <div
                                            class="flex flex-col p-1 items-center justify-center gap-1"
                                        >
                                            <button
                                                class="flex items-center justify-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg text-xs w-44 h-8 px-2 gap-1"
                                                @click="taskModalEdit(task, phase)"
                                            >
                                                <Icon name="material-symbols:edit" color="white" class="h-5 w-5" />
                                                <span class="whitespace-nowrap">Edit Item</span>
                                            </button>
                                            <NuxtLink
                                                :to="`/project-monitoring/marketing/detailed-estimates?id=${task.id}`"
                                                class="flex items-center justify-center bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg text-xs w-44 h-8 px-2 gap-1"
                                            >
                                                <Icon name="material-symbols:calculate" color="white" class="h-5 w-5" />
                                                <span class="whitespace-nowrap">Detailed Estimates</span>
                                            </NuxtLink>

                                            <button
                                                class="flex items-center justify-center bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-md text-xs w-44 h-8 px-2 gap-1"
                                                @click="removeTask(task)"
                                            >
                                                <Icon name="ion:trash-outline" color="white" class="h-5 w-5" />
                                                <span class="whitespace-nowrap">Delete Item</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="border border-black px-2 text-center">
                                        <div class="flex flex-row justify-center uppercase w-full">
                                            <div class="flex flex-row">
                                                <p>
                                                    TOTAL COST (
                                                </p>
                                                <p>
                                                    <b>
                                                        {{ phase.name }}
                                                    </b>
                                                </p>
                                                <p>
                                                    ) CARRIED TO THE SUMMARY
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="border border-black px-2 text-right">
                                        <b>
                                            Php
                                        </b>
                                    </td>
                                    <td colspan="2" class="border border-black px-2 text-right">
                                        <b>
                                            {{ accountingCurrency(phase.total_cost) }}
                                        </b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ProjectMonitoringModalsPhase :is-edit="editPhaseModal" :show-modal="showPhaseModal" @hide-modal="hidePhaseModal" @save="savePhase" />
                    <ProjectMonitoringModalsTask :is-edit="editTaskModal" :show-modal="showTaskModal" @hide-modal="hideTaskModal" @save="saveTask" />
                </div>
            </template>
            <template #print-layout>
                <ProjectMonitoringPrintBillOfQuantities />
            </template>
        </LayoutPrintAdvanced>
        <ProjectMonitoringExcelBillofQuantities class="mt-4" :data="projectStore.information" />
    </div>
</template>
