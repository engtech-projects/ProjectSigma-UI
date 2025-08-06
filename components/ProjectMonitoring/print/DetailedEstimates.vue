<script lang="ts" setup>
import { useResourceStore } from "~/stores/project-monitoring/resource"
import { useTaskStore } from "~/stores/project-monitoring/task"
import { useProjectStore } from "~/stores/project-monitoring/projects"

const projectStore = useProjectStore()
const resourceStore = useResourceStore()
const taskStore = useTaskStore()
const { task } = storeToRefs(taskStore)

const letterHeader = (index: number) => {
    const base = Math.floor(index / 26)
    const remainder = index % 26
    return String.fromCharCode(65 + remainder) + (base > 0 ? String.fromCharCode(65 + base - 1) : "")
}
const filterResources = (id: number) => {
    return task.value.resources.filter(resource => resource.resource_name.id === id)
}
const totalDirectCost = (id: number) => {
    return task.value.resources.filter(resource => resource.resource_name.id === id).reduce((total: number, resource: any) => total + ((resource.unit_cost * resource.quantity) * (resource.unit_count ?? 1)), 0)
}
</script>
<template>
    <div class="bg-white">
        <div class="flex flex-col gap-2 border border-black p-2">
            <div class="grid grid-cols-5">
                <span class="col-span-1 font-semibold">Contract ID</span>
                <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore?.information.contract_id }}</span>
            </div>
            <div class="grid grid-cols-5">
                <span class="col-span-1 font-semibold">Contract Name</span>
                <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore?.information.name }}</span>
            </div>
            <div class="grid grid-cols-5">
                <span class="col-span-1 font-semibold">Contract Location</span>
                <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore?.information.location }}</span>
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
                        <th class="uppercase py-2  font-normal border-b-0 w-2/12">
                            ITEM NO.
                        </th>
                        <th class="uppercase py-2  font-normal border-b-0 w-3/12">
                            ITEM DESCRIPTION
                        </th>
                        <th class="uppercase py-2  font-normal border-b-0 w-1/12">
                            QTY
                        </th>
                        <th class="uppercase py-2  font-normal border-b-0 w-1/12">
                            UNIT
                        </th>
                        <th class="uppercase py-2  font-normal border-b-0 w-2/12" />
                        <th class="uppercase py-2  font-normal border-b-0 w-3/12" />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center ">
                            {{ task.name }}
                        </td>
                        <td class="p-2 ">
                            {{ task.description }}
                        </td>
                        <td class="p-2  text-center">
                            {{ task.unit }}
                        </td>
                        <td class="p-2  text-center">
                            {{ task.quantity }}
                        </td>
                        <td class="p-2  text-center" />
                        <td class="" />
                    </tr>
                </tbody>
                <AccountingLoadScreen :is-loading="boardLoading" />
                <tbody v-for="(rnames, index) in resourceStore.resourceNames" :key="rnames.id">
                    <tr class="">
                        <td colspan="6" class="px-2 py-1">
                            <div class="flex justify-between">
                                <span class="font-semibold uppercase">
                                    {{ letterHeader(index) }}. {{ rnames.name }}
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filterResources(rnames.id)?.length > 0" class="border border-gray-700">
                        <td />
                        <td class="uppercase text-xs font-semibold pt-2 text-left">
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
                            Hourly Rate
                        </td>
                        <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                            Unit Cost
                        </td>
                        <td class="uppercase text-xs font-semibold pt-2 text-right pr-4">
                            Amount
                        </td>
                    </tr>
                    <tr v-for="resource in filterResources(rnames.id)" :key="resource.id">
                        <td class="text-center " />
                        <td class="p-2 ">
                            {{ resource.description }}
                        </td>
                        <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor || rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="p-2  text-center">
                            {{ resource.unit_count }}
                        </td>
                        <td v-else class="p-2  text-center">
                            {{ resource.quantity }}
                        </td>
                        <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor || rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="p-2  text-center">
                            {{ resource.quantity }}
                        </td>
                        <td v-else class="p-2  text-center">
                            {{ resource.unit }}
                        </td>
                        <td v-if="rnames.name.toLowerCase() === DetailedEstimatesType.labor || rnames.name.toLowerCase() === DetailedEstimatesType.equipment" class="p-2  text-center">
                            {{ resource.unit_cost + " / hour" }}
                        </td>
                        <td v-else class="p-2  text-center">
                            {{ resource.unit_cost + " / " + resource.unit }}
                        </td>
                        <td class="p-2  text-right">
                            {{ accountingCurrency(resource.total_cost) }}
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
            <div class="flex gap-24">
                <div class="flex flex-col gap-8 !text-xs mt-6 justify-between items-start">
                    <span class="">Prepared By:</span>
                    <div class="flex gap-8 flex-1">
                        <div class="flex flex-col items-left gap-1">
                            <span class="font-bold uppercase flex-1 border-b-2 border-black text-left">
                                ANGEL A. ABRAU
                            </span>
                            <span class="flex-1">
                                Authorized Managing Officer <br> ME3 CONSTRUCTION AND DEVELOPMENT CORPORATION(JOINT VENTURE)
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-12">
                    <span>
                        DATE:
                    </span>
                    <span>
                        {{ fullDate(new Date()) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
