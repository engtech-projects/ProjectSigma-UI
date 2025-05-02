<template>
    <div class="bg-white">
        <div class="flex flex-col border-gray-800">
            <div class="flex justify-center py-2 border-2 border-b border-black">
                <h1 class="text-lg font-semibold text-black uppercase text-center ">
                    Detailed Estimates
                </h1>
            </div>
            <table class="border border-collapse border-gray-800 w-full">
                <thead>
                    <tr>
                        <th class="uppercase py-2 border border-gray-700 font-normal border-b-0 w-2/12">
                            Pay Item No.
                        </th>
                        <th class="uppercase py-2 border border-gray-700 font-normal border-b-0 w-3/12">
                            Description
                        </th>
                        <th class="uppercase py-2 border border-gray-700 font-normal border-b-0 w-1/12">
                            Unit
                        </th>
                        <th class="uppercase py-2 border border-gray-700 font-normal border-b-0 w-1/12">
                            Qty
                        </th>
                        <th class="uppercase py-2 border border-gray-700 font-normal border-b-0 w-2/12">
                            Unit Price (Pesos)
                        </th>
                        <th class="uppercase py-2 border border-gray-700 font-normal border-b-0 w-3/12">
                            Amount (Pesos)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center border border-gray-700">
                            {{ taskStore.task.name }}
                        </td>
                        <td class="p-2 border border-gray-700">
                            {{ taskStore.task.description }}
                        </td>
                        <td class="p-2 border border-gray-700 text-center">
                            {{ taskStore.task.unit }}
                        </td>
                        <td class="p-2 border border-gray-700 text-center">
                            1
                        </td>
                        <td class="border border-gray-700">
                            <div class="flex flex-col p-2 border-b border-gray-700">
                                <h4 class="font-bold uppercase text-sm">
                                    In Words
                                </h4>
                                <span class="pl-4">
                                    {{ amountToWords(taskStore.task.unit_price) }}
                                </span>
                            </div>
                            <div class="flex flex-col p-2">
                                <h4 class="font-bold uppercase text-sm">
                                    In Figures
                                </h4>
                                <span class="pl-4">
                                    {{ accountingCurrency(taskStore.task.unit_price) }}
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
                                            {{ amountToWords(taskStore.task.amount) }}
                                        </span>
                                    </div>
                                    <div class="flex flex-col p-2">
                                        <h4 class="font-bold uppercase text-sm">
                                            In Figures
                                        </h4>
                                        <span class="pl-4">
                                            {{ accountingCurrency(taskStore.task.amount) }}
                                        </span>
                                    </div>
                                </div>
                                <!-- <div class="flex flex-col p-2 justify-center gap-2">
                                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </button>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div> -->
                            </div>
                        </td>
                    </tr>
                </tbody>
                <AccountingLoadScreen :is-loading="boardLoading" />
                <tbody v-for="(rnames, index) in resourceStore.resourceNames" :key="rnames.id">
                    <tr class="border-b border-gray-700">
                        <td colspan="6" class="px-2 py-1">
                            <div class="flex justify-between">
                                <span class="font-semibold uppercase">
                                    {{ letterHeader[index] }}. {{ rnames.name }}
                                </span>
                                <div class="flex gap-1 justify-end">
                                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="addResource(rnames.id)">
                                        Add Resource
                                    </button>
                                    <!-- <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-lg text-xs px-4 h-6">
                                        Remove
                                    </button> -->
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filterResources(rnames.id).length > 0">
                        <td />
                        <td class="uppercase text-xs font-semibold pt-2 text-center">
                            Name and Specification
                        </td>
                        <td class="uppercase text-xs font-semibold pt-2 text-center">
                            Quantity
                        </td>
                        <td v-if="rnames.name.toLowerCase() === 'labor' || rnames.name.toLowerCase() === 'equipment'" class="uppercase text-xs font-semibold pt-2 text-center">
                            No. of Persons
                        </td>
                        <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                            Unit
                        </td>
                        <td v-if="rnames.name.toLowerCase() === 'labor' || rnames.name.toLowerCase() === 'equipment'" class="uppercase text-xs font-semibold pt-2 text-center">
                            No. of Hours
                        </td>
                        <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                            Unit Cost
                        </td>
                        <td class="uppercase text-xs font-semibold pt-2 text-center">
                            Amount
                        </td>
                    </tr>
                    <tr v-for="resource in filterResources(rnames.id)" :key="resource.id">
                        <td class="text-center border border-gray-700" />
                        <td class="p-2 border border-gray-700">
                            {{ resource.description }}
                        </td>
                        <td class="p-2 border border-gray-700 text-center">
                            {{ resource.quantity }}
                        </td>
                        <td class="p-2 border border-gray-700 text-center">
                            {{ resource.unit }}
                        </td>
                        <td class="border border-gray-700">
                            <div class="flex flex-col p-2 border-b border-gray-700">
                                <h4 class="font-bold uppercase text-sm">
                                    In Words
                                </h4>
                                <span class="pl-4">
                                    {{ amountToWords(resource.unit_cost) }}
                                </span>
                            </div>
                            <div class="flex flex-col p-2">
                                <h4 class="font-bold uppercase text-sm">
                                    In Figures
                                </h4>
                                <span class="pl-4">
                                    {{ accountingCurrency(resource.unit_cost) }}
                                </span>
                            </div>
                        </td>
                        <td class="border border-gray-700">
                            <div class="flex">
                                <div class="flex flex-col border-r border-gray-700">
                                    <div class="flex flex-col p-2 border-b border-gray-700">
                                        <h4 class="font-bold uppercase text-sm flex-1">
                                            In Words
                                        </h4>
                                        <span class="pl-4 flex-1">
                                            {{ amountToWords(resource.unit_cost) }}
                                        </span>
                                    </div>
                                    <div class="flex flex-col p-2">
                                        <h4 class="font-bold uppercase text-sm">
                                            In Figures
                                        </h4>
                                        <span class="pl-4">
                                            {{ accountingCurrency(resource.unit_cost) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col p-2 justify-center gap-2">
                                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6" @click="editResource(resource)">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </button>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6" @click="removeResource(resource.id)">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-end py-4">
            <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-12 h-8">
                <Icon name="ic:outline-local-printshop" class="text-white h-6 w-6" />
            </button>
        </div>
        <ProjectsModalsPhase :show-modal="showPhaseModal" @hide-modal="showPhaseModal = false" />
        <ProjectsModalsTask :show-modal="showTaskModal" @hide-modal="showTaskModal = false" />
        <ProjectsModalsResource :show-modal="showResourceModal" :task-id="taskStore.task.id" @hide-modal="showResourceModal = false" />
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"
import { useTaskStore } from "~/stores/project-monitoring/task"

const projectStore = useProjectStore()
const edit = projectStore.viewState
const resourceStore = useResourceStore()
const showPhaseModal = ref(false)
const showTaskModal = ref(false)
const showResourceModal = ref(false)
const letterHeader = ref(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"])
const taskStore = useTaskStore()
const filterResources = (id: number) => {
    return taskStore.task.resources.filter(resource => resource.name_id === id)
}
const addResource = (id) => {
    showResourceModal.value = true
    resourceStore.reset()
    resourceStore.resource.name_id = id
}
const editResource = (resource: any) => {
    showResourceModal.value = true
    resourceStore.resource = resource
}
const boardLoading = ref(false)
const snackbar = useSnackbar()
const removeResource = async (id: number) => {
    try {
        boardLoading.value = true
        await resourceStore.deleteResource(id)
        if (resourceStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: resourceStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: resourceStore.successMessage
            })
        }
    } catch (error) {
        resourceStore.errorMessage = error as string

        snackbar.add({
            type: "error",
            text: resourceStore.errorMessage
        })
    } finally {
        taskStore.getTask(taskStore.task.id)
        boardLoading.value = false
    }
}
</script>

<style>

</style>
