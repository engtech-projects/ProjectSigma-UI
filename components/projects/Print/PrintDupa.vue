<template>
    <div class="max-w-6xl mx-auto border border-black p-6">
        <div class="text-center font-bold text-sm">
            <h1>{{ projectStore.information.license }}</h1>
        </div>

        <div class="my-4 text-sm">
            <p><strong>Project ID Number:</strong> {{ projectStore.information.id }}</p>
            <p><strong>Project Name:</strong> {{ projectStore.information.name }}</p>
            <p><strong>Project Location:</strong> {{ projectStore.information.location }}</p>
        </div>

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
                                {{ taskStore.task.quantity }}
                            </td>
                            <td class="p-2 border border-gray-700 text-center">
                                {{ taskStore.task.unit_price + " / " + taskStore.task.unit }}
                            </td>
                            <td class="p-2 border border-gray-700 text-center">
                                {{ accountingCurrency(taskStore.task.amount) }}
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
                            <td class="p-2 border border-gray-700 text-center">
                                {{ resource.unit_cost + " / " + resource.unit }}
                            </td>
                            <td class="p-2 border border-gray-700 text-center">
                                {{ accountingCurrency(resource.unit_cost) }}
                            </td>
                        </tr>
                        <tr v-if="filterResources(rnames.id).length > 0" class="border-b border-gray-700 text-sm font-bold">
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
                                {{ accountingCurrency(taskStore.task.resources.resources_item_total) }}
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
                                {{ accountingCurrency(taskStore.task.resources.ocm) }}
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
                                {{ accountingCurrency(taskStore.task.resources.contractors_profit) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-semibold uppercase px-2">
                                g.
                            </td>
                            <td class="px-2 uppercase">
                                vAT (Where Applicable)
                            </td>
                            <td class="px-2 text-center">
                                12%
                            </td>
                            <td class="px-2 text-center" />
                            <td class="text-right px-2">
                                of (D + E + F)
                            </td>
                            <td class="text-right px-2">
                                {{ accountingCurrency(taskStore.task.resources.vat) }}
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
                                {{ accountingCurrency(taskStore.task.resources.grand_total) }}
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
                                {{ accountingCurrency(taskStore.task.resources.unit_cost_per) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 text-sm">
            <p class="font-bold">
                Submitted By:
            </p>
            <div class="mt-8">
                <p><strong>ANGEL A. ABRAU</strong></p>
                <p>Authorized Managing Officer</p>
                <p>ENVEPAR CONSTRUCTION AND DEVELOPMENT CORPORATION</p>
            </div>
            <div class="mt-4 text-right">
                <p><strong>Date:</strong> {{ fullDate(new Date()) }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "~/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"
import { useTaskStore } from "~/stores/project-monitoring/task"

const projectStore = useProjectStore()
const resourceStore = useResourceStore()
const letterHeader = ref(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"])
const taskStore = useTaskStore()
const filterResources = (id: number) => {
    return taskStore.task.resources.data.filter(resource => resource.resources.id === id) || []
}
const totalDirectCost = (id: number) => {
    const resources = taskStore.task.resources?.data?.filter(resource => resource.resources?.id === id) || []
    return resources.reduce((total: number, resource: any) => total + (resource.unit_cost || 0) * (resource.quantity || 0), 0)
}
const addResource = (id) => {
    resourceStore.reset()
    resourceStore.resource.name_id = id
}
const boardLoading = ref(false)
</script>

<style>

</style>
