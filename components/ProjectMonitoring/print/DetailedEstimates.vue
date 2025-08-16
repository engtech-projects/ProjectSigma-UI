<script lang="ts" setup>
import { useResourceStore, MARKETING_RESOURCES } from "~/stores/project-monitoring/resource"
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
const filterResources = (name: string) => {
    return task.value.resources.filter(resource => resource.resource_name === name)
}
const totalDirectCost = (name: string) => {
    return task.value.resources
        .filter(resource => resource.resource_name === name)
        .reduce((total: number, resource: any) => total + (resource.total_cost ?? 0), 0)
}
const orderedMarketingResources = computed(() => {
    const names = resourceStore.resourceNames

    if (!Array.isArray(names) || names.length === 0) {
        return []
    }
    return names.filter((r: any) => MARKETING_RESOURCES.includes(r.label))
        .sort((a: any, b: any) => {
            return MARKETING_RESOURCES.indexOf(a.label) - MARKETING_RESOURCES.indexOf(b.label)
        })
})
</script>
<template>
    <div class="bg-white">
        <div class="flex flex-col gap-2 border border-black p-2">
            <div class="grid grid-cols-5">
                <span class="col-span-1 font-semibold">Contract ID</span>
                <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore?.information?.contract_id ?? taskStore?.task?.project_contract_id }}</span>
            </div>
            <div class="grid grid-cols-5">
                <span class="col-span-1 font-semibold">Contract Name</span>
                <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore?.information?.name ?? taskStore?.task?.project_name }}</span>
            </div>
            <div class="grid grid-cols-5">
                <span class="col-span-1 font-semibold">Contract Location</span>
                <span class="col-span-4"><b class="mr-2">:</b> {{ projectStore?.information?.location ?? taskStore?.task?.project_location }}</span>
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
                        <th class="uppercase py-2 font-normal border-b-0 w-2/12">
                            ITEM NO.
                        </th>
                        <th class="uppercase py-2 font-normal border-b-0 w-3/12">
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
                        <td class="p-2 text-center">
                            {{ task.description }}
                        </td>
                        <td class="p-2  text-center">
                            {{ task.quantity }}
                        </td>
                        <td class="p-2  text-center">
                            {{ task.unit }}
                        </td>
                        <td class="p-2  text-center" />
                        <td class="" />
                    </tr>
                </tbody>
                <AccountingLoadScreen :is-loading="boardLoading" />
                <tbody v-for="(rnames, index) in orderedMarketingResources" :key="index">
                    <tr class="border-y border-gray-700">
                        <td colspan="6" class="px-2 py-1">
                            <div class="flex justify-between">
                                <span class="font-semibold uppercase">
                                    {{ letterHeader(index) }}. {{ rnames.label }}
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filterResources(rnames.label)?.length > 0" class="border border-gray-700">
                        <td />
                        <td class="uppercase text-xs font-semibold pt-2 text-left">
                            Name and Specification
                        </td>
                        <td v-if="rnames.label.toLowerCase() === DetailedEstimatesType.labor" class="uppercase text-xs font-semibold pt-2 text-center">
                            No of Person
                        </td>
                        <td v-else-if="rnames.label.toLowerCase() === DetailedEstimatesType.equipment" class="uppercase text-xs font-semibold pt-2 text-center">
                            No of Equipment
                        </td>
                        <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                            Quantity
                        </td>
                        <td v-if="rnames.label.toLowerCase() === DetailedEstimatesType.labor || rnames.label.toLowerCase() === DetailedEstimatesType.equipment" class="uppercase text-xs font-semibold pt-2 text-center">
                            No. of Hrs.
                        </td>
                        <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                            Unit
                        </td>
                        <td v-if="rnames.label.toLowerCase() === DetailedEstimatesType.labor || rnames.label.toLowerCase() === DetailedEstimatesType.equipment" class="uppercase text-xs font-semibold pt-2 text-center">
                            Hourly Rate
                        </td>
                        <td v-else class="uppercase text-xs font-semibold pt-2 text-center">
                            Unit Cost
                        </td>
                        <td class="uppercase text-xs font-semibold pt-2 text-right pr-4">
                            Amount
                        </td>
                    </tr>
                    <tr v-for="resource in filterResources(rnames.label)" :key="resource.id">
                        <td class="text-center " />
                        <td class="p-2 ">
                            {{ resource.description }}
                        </td>
                        <td v-if="rnames.label.toLowerCase() === DetailedEstimatesType.labor || rnames.label.toLowerCase() === DetailedEstimatesType.equipment" class="p-2  text-center">
                            {{ accountingCurrency(resource.unit_count) }}
                        </td>
                        <td v-else class="p-2  text-center">
                            {{ accountingCurrency(resource.quantity) }}
                        </td>
                        <td v-if="rnames.label.toLowerCase() === DetailedEstimatesType.labor || rnames.label.toLowerCase() === DetailedEstimatesType.equipment" class="p-2  text-center">
                            {{ accountingCurrency(resource.quantity) }}
                        </td>
                        <td v-else class="p-2  text-center">
                            {{ resource.unit }}
                        </td>
                        <td v-if="rnames.label.toLowerCase() === DetailedEstimatesType.labor || rnames.label.toLowerCase() === DetailedEstimatesType.equipment" class="p-2  text-center">
                            {{ accountingCurrency(resource.unit_cost) + " / hour" }}
                        </td>
                        <td v-else class="p-2  text-center">
                            {{ accountingCurrency(resource.unit_cost) + " / " + resource.unit }}
                        </td>
                        <td class="p-2  text-right">
                            {{ accountingCurrency(resource.total_cost) }}
                        </td>
                    </tr>
                    <tr v-if="filterResources(rnames.label)?.length > 0" class="border-b border-gray-700 text-sm font-bold">
                        <td class="text-right px-2" colspan="5">
                            Direct {{ rnames.label }} Cost
                        </td>
                        <td class="text-right px-2">
                            {{ accountingCurrency(totalDirectCost(rnames.label)) }}
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
                            {{ accountingCurrency(task?.direct_cost) }}
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
                            10.00%
                        </td>
                        <td class="pX-2 text-center" />
                        <td class="text-right px-2">
                            of D
                        </td>
                        <td class="text-right px-2">
                            {{ accountingCurrency(task?.ocm) }}
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
                            10.00%
                        </td>
                        <td class="pX-2 text-center" />
                        <td class="text-right px-2">
                            of D
                        </td>
                        <td class="text-right px-2">
                            {{ accountingCurrency(task?.contractors_profit) }}
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
                            12.00%
                        </td>
                        <td class="pX-2 text-center" />
                        <td class="text-right px-2">
                            of (D + E + F)
                        </td>
                        <td class="text-right px-2">
                            {{ accountingCurrency(task?.vat) }}
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
                            {{ accountingCurrency(task?.grand_total) }}
                        </td>
                    </tr>
                    <tr>
                        <td class="font-semibold uppercase px-2">
                            I.
                        </td>
                        <td class="pX-2 uppercase">
                            Unit Cost Per
                        </td>
                        <td class="pX-2 text-center">
                            {{ task.unit }}
                        </td>
                        <td class="pX-2 text-center" />
                        <td class="text-right px-2" />
                        <td class="text-right px-2">
                            {{ accountingCurrency(task?.unit_cost_per) }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex flex-row items-center justify-between mt-16">
                <CommonPreparedByWithDate
                    name="ANGEL A. ABRAU"
                    position="Authorized Managing Officer"
                    :license="projectStore.information?.license ?? taskStore?.task?.project_license"
                    :date="projectStore.information?.created_at ?? taskStore?.task?.project_created_at"
                />
            </div>
        </div>
    </div>
</template>
