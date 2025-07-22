<script lang="ts" setup>
import { useProjectStore } from "~/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"
import { useTaskStore } from "~/stores/project-monitoring/task"

const projectStore = useProjectStore()
const resourceStore = useResourceStore()
const taskStore = useTaskStore()
const showPhaseModal = ref(false)
const showTaskModal = ref(false)
const showResourceModal = ref(false)
const { task } = storeToRefs(taskStore)

const letterHeader = (index: number) => {
    const base = Math.floor(index / 26)
    const remainder = index % 26
    return String.fromCharCode(65 + remainder) + (base > 0 ? String.fromCharCode(65 + base - 1) : "")
}
const filterResources = (id: number) => {
    return task.value.resources?.data.filter(resource => resource.resources?.id === id)
}
const totalDirectCost = (id: number) => {
    return task.value.resources?.data.filter(resource => resource.resources?.id === id).reduce((total: number, resource: any) => total + ((resource.unit_cost * resource.quantity) * (resource.unit_count ?? 1)), 0)
}
const addResource = (id) => {
    showResourceModal.value = true
    resourceStore.reset()
    resourceStore.resource.name_id = id
    resourceStore.resource.task_id = task.value.id
}
const editResource = (resource: any) => {
    showResourceModal.value = true
    resourceStore.reset()
    resourceStore.resource = resource
    resourceStore.resource.name_id = resource.resources?.id
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
        taskStore.getTask(task.value.id)
        boardLoading.value = false
    }
}
</script>
<template>
    <div class="bg-white">
        <LayoutPrintAdvanced>
            <template #system-layout>
                <div class="flex flex-col gap-2 border border-black p-2">
                    <div class="grid grid-cols-5">
                        <span class="col-span-1 font-semibold">Contract ID</span>
                        <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore.information.contract_id }}</span>
                    </div>
                    <div class="grid grid-cols-5">
                        <span class="col-span-1 font-semibold">Contract Name</span>
                        <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore.information.name }}</span>
                    </div>
                    <div class="grid grid-cols-5">
                        <span class="col-span-1 font-semibold">Contract Location</span>
                        <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore.information.location }}</span>
                    </div>
                </div>
                <div class="flex flex-col border-gray-800 pb-6">
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
                                    {{ task.name }}
                                </td>
                                <td class="p-2 border border-gray-700">
                                    {{ task.description }}
                                </td>
                                <td class="p-2 border border-gray-700 text-center">
                                    {{ task.unit }}
                                </td>
                                <td class="p-2 border border-gray-700 text-center">
                                    {{ task.quantity }}
                                </td>
                                <td class="p-2 border border-gray-700 text-center">
                                    {{ task.unit_price + " / " + task.unit }}
                                </td>
                                <td class="border border-gray-700">
                                    <div class="flex">
                                        <div class="flex flex-col border-r border-gray-700 flex-1">
                                            <div class="flex flex-col p-2 border-b border-gray-700">
                                                <h4 class="font-bold uppercase text-sm flex-1">
                                                    In Words
                                                </h4>
                                                <span class="pl-4 flex-1">
                                                    {{ amountToWords(task.amount) }}
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
                                            {{ letterHeader(index) }}. {{ rnames.name }}
                                        </span>
                                        <div class="flex gap-1 justify-end">
                                            <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="addResource(rnames.id)">
                                                Add Resource
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filterResources(rnames.id)?.length > 0">
                                <td />
                                <td class="uppercase text-xs font-semibold pt-2 text-center">
                                    Name and Specification
                                </td>
                                <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor" class="uppercase text-xs font-semibold pt-2 text-center">
                                    No of Person
                                </td>
                                <td v-else-if="rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="uppercase text-xs font-semibold pt-2 text-center">
                                    No of Equipment
                                </td>
                                <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                                    Quantity
                                </td>
                                <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor || rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="uppercase text-xs font-semibold pt-2 text-center">
                                    No. of Hrs.
                                </td>
                                <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                                    Unit
                                </td>
                                <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor || rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="uppercase text-xs font-semibold pt-2 text-center">
                                    Amount
                                </td>
                                <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                                    Unit Cost
                                </td>
                                <td class="uppercase text-xs font-semibold pt-2 text-center">
                                    Amount
                                </td>
                            </tr>
                            <tr v-for="resource in filterResources(rnames.id) ?? []" :key="resource.id">
                                <td class="text-center border border-gray-700" />
                                <td class="p-2 border border-gray-700">
                                    {{ resource.description }}
                                </td>
                                <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor || rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="p-2 border border-gray-700 text-center">
                                    {{ resource.unit_count }}
                                </td>
                                <td v-else class="p-2 border border-gray-700 text-center">
                                    {{ resource.quantity }}
                                </td>
                                <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor || rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="p-2 border border-gray-700 text-center">
                                    {{ resource.quantity }}
                                </td>
                                <td v-else class="p-2 border border-gray-700 text-center">
                                    {{ resource.unit }}
                                </td>
                                <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor || rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="p-2 border border-gray-700 text-center">
                                    {{ resource.unit_cost + " / hour" }}
                                </td>
                                <td v-else class="p-2 border border-gray-700 text-center">
                                    {{ resource.unit_cost + " / " + resource.unit }}
                                </td>
                                <td class="border border-gray-700">
                                    <div class="flex">
                                        <div class="flex flex-col border-r border-gray-700 flex-1">
                                            <div class="flex flex-col p-2 border-b border-gray-700">
                                                <h4 class="font-bold uppercase text-sm flex-1">
                                                    In Words
                                                </h4>
                                                <span class="pl-4 flex-1">
                                                    {{ amountToWords(resource.total_cost) }}
                                                </span>
                                            </div>
                                            <div class="flex flex-col p-2">
                                                <h4 class="font-bold uppercase text-sm">
                                                    In Figures
                                                </h4>
                                                <span class="pl-4">
                                                    {{ accountingCurrency(resource.total_cost) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex flex-col p-2 justify-center gap-2">
                                            <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6" @click="editResource(resource)">
                                                <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                            </button>
                                            <button class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6" @click="removeResource(resource.id)">
                                                <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filterResources(rnames.id)?.length > 0" class="border-b border-gray-700 text-sm font-bold">
                                <td class="text-right px-2" colspan="5">
                                    Direct {{ rnames.name }} Cost
                                </td>
                                <td class="text-right px-2">
                                    {{ accountingCurrency(totalDirectCost(rnames.id)) }}
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td class="font-semibold uppercase px-2">
                                    D.
                                </td>
                                <td class="pX-2 uppercase">
                                    Direct Cost
                                </td>
                                <td class="pX-2 text-center" />
                                <td class="pX-2 text-center" />
                                <td class="text-right px-2" />
                                <td class="text-right px-2">
                                    {{ accountingCurrency(task.resources?.resources_item_total) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-semibold uppercase px-2">
                                    E.
                                </td>
                                <td class="pX-2 uppercase">
                                    O.C.M
                                </td>
                                <td class="pX-2 text-center">
                                    10%
                                </td>
                                <td class="pX-2 text-center" />
                                <td class="text-right px-2">
                                    of D
                                </td>
                                <td class="text-right px-2">
                                    {{ accountingCurrency(task.resources?.ocm) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-semibold uppercase px-2">
                                    F.
                                </td>
                                <td class="pX-2 uppercase">
                                    Contractors Profit
                                </td>
                                <td class="pX-2 text-center">
                                    10%
                                </td>
                                <td class="pX-2 text-center" />
                                <td class="text-right px-2">
                                    of D
                                </td>
                                <td class="text-right px-2">
                                    {{ accountingCurrency(task.resources?.contractors_profit) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-semibold uppercase px-2">
                                    g.
                                </td>
                                <td class="pX-2 uppercase">
                                    vAT (Where Applicable)
                                </td>
                                <td class="pX-2 text-center">
                                    12%
                                </td>
                                <td class="pX-2 text-center" />
                                <td class="text-right px-2">
                                    of (D + E + F)
                                </td>
                                <td class="text-right px-2">
                                    {{ accountingCurrency(task.resources?.vat) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-semibold uppercase px-2">
                                    H.
                                </td>
                                <td class="pX-2 uppercase">
                                    Total Cost
                                </td>
                                <td class="pX-2 text-center" />
                                <td class="pX-2 text-center" />
                                <td class="text-right px-2">
                                    (D + E + F + G)
                                </td>
                                <td class="text-right px-2">
                                    {{ accountingCurrency(task.resources?.grand_total) }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-semibold uppercase px-2">
                                    I.
                                </td>
                                <td class="pX-2 uppercase">
                                    Unit Cost Per
                                </td>
                                <td class="pX-2 text-center" />
                                <td class="pX-2 text-center" />
                                <td class="text-right px-2">
                                    sq.m
                                </td>
                                <td class="text-right px-2">
                                    {{ accountingCurrency(task.resources?.unit_cost_per) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template #print-layout>
                <ProjectsPrintDetailedEstimates />
            </template>
        </LayoutPrintAdvanced>
        <ProjectsModalsPhase :show-modal="showPhaseModal" @hide-modal="showPhaseModal = false" />
        <ProjectsModalsTask :show-modal="showTaskModal" @hide-modal="showTaskModal = false" />
        <ProjectsModalsResource :show-modal="showResourceModal" :task-id="task.id" @hide-modal="showResourceModal = false" />
    </div>
</template>
