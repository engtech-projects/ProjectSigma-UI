<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const boardLoading = ref(false)
projectStore.viewState = true
const edit = projectStore.viewState
</script>
<template>
    <div>
        <LayoutPrintAdvanced>
            <template #system-layout>
                <div>
                    <AccountingLoadScreen :is-loading="boardLoading" />
                    <div class="flex flex-col gap-6 pt-6 mb-4">
                        <div class="flex justify-between">
                            <div class="flex gap-2">
                                <h1 class="text-center text-3xl text-black uppercase">
                                    SUMMARY OF ESTIMATED DIRECT COST
                                </h1>
                            </div>
                        </div>
                        <table class="table-auto w-full border border-collapse border-gray-800 text-sm">
                            <thead>
                                <tr>
                                    <th rowspan="2">
                                        Pay Item No.
                                    </th>
                                    <th rowspan="2">
                                        Description
                                    </th>
                                    <th rowspan="2">
                                        Unit Price
                                    </th>
                                    <th colspan="3">
                                        CONTRACT COST
                                    </th>
                                    <th colspan="5">
                                        DIRECT COST
                                    </th>
                                    <th rowspan="2">
                                        TOTAL
                                    </th>
                                    <th rowspan="2">
                                        UNIT COST PER ITEM
                                    </th>
                                    <th>
                                        ACTION
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Quantity
                                    </th>
                                    <th>
                                        Unit
                                    </th>
                                    <th>
                                        Amount
                                    </th>
                                    <th>
                                        Materials
                                    </th>
                                    <th>
                                        Equipment
                                    </th>
                                    <th>
                                        Labor
                                    </th>
                                    <th>
                                        Fuel / Oil Cost
                                    </th>
                                    <th>
                                        Overhead Cost
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="projectStore.information.phases.length === 0">
                                <tr>
                                    <!-- <td colspan="14" class="text-center py-4 font-semibold text-md italic text-gray-500">
                                        No Data Available!
                                    </td> -->
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                    <td class="text-center border border-gray-700">
                                        Pay Item #1
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <template v-for="phase in projectStore.information.phases" :key="phase.id">
                                    <tr v-for="task in phase.tasks" :key="task.id" class="border border-black">
                                        <td class="text-center border border-gray-700">
                                            {{ task.name }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.description }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.unit_price }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.quantity }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.unit }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.amount }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.total_materials_amount }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.total_equipment_amount }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.total_labor_amount }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.total_fuel_oil_amount }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.total_overhead_amount }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.total }}
                                        </td>
                                        <td class="text-center p-2 border border-gray-700">
                                            {{ task.unit_cost_per_item }}
                                        </td>
                                        <td class="text-center border border-gray-700">
                                            <NuxtLink
                                                v-if="edit"
                                                :to="`/project-monitoring/technical-service/detailed-estimates?id=${task.id}`"
                                                class="flex items-center justify-center bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg text-xs w-44 h-8 px-2 gap-1"
                                            >
                                                <Icon name="material-symbols:calculate" color="white" class="h-5 w-5" />
                                                <span class="whitespace-nowrap">Detailed Estimates</span>
                                            </NuxtLink>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template #print-layout>
                <ProjectMonitoringPrintBillOfQuantities />
            </template>
        </LayoutPrintAdvanced>
    </div>
</template>
