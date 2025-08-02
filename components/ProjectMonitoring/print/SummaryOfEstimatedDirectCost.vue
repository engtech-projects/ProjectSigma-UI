<template>
    <div class="mx-auto">
        <div class="mb-4">
            <DocumentTemplatesIsoHeader :page="{currentPage: 1, totalPages: 1}" :document-code="useInventoryDocCode.mrr" />
        </div>
        <div class="flex justify-center mb-4">
            <div class="flex gap-2">
                <h1 class="text-center text-3xl text-black uppercase">
                    SUMMARY OF ESTIMATED DIRECT COST
                </h1>
            </div>
        </div>
        <div class="text-sm grid grid-cols-[auto_1fr] gap-4 mb-4">
            <div>
                <p>
                    Project Name
                </p>
                <p>
                    Location
                </p>
            </div>
            <div>
                <p>
                    {{ projectStore.information.name }}
                </p>
                <p>
                    {{ projectStore.information.location }}
                </p>
            </div>
        </div>
        <table class="table-auto w-full border border-collapse border-gray-800 text-sm mb-4">
            <thead class="uppercase text-center bg-[#b8cce4]">
                <tr>
                    <th rowspan="2" class="px-2 border border-gray-700 font-normal border-b-0">
                        <p>
                            Pay Item No.
                        </p>
                    </th>
                    <th rowspan="2" class="px-2 border border-gray-700 font-normal border-b-0">
                        <p>
                            Description
                        </p>
                    </th>
                    <th rowspan="2" class="px-2 border border-gray-700 font-normal border-b-0">
                        <p>
                            Unit Price
                        </p>
                    </th>
                    <th colspan="3" class="px-2 border border-gray-700 font-normal border-b-0">
                        <p>
                            CONTRACT COST
                        </p>
                    </th>
                    <th colspan="5" class="px-2 border border-gray-700 font-normal border-b-0">
                        <p>
                            DIRECT COST
                        </p>
                    </th>
                    <th rowspan="2" class="px-2 border border-gray-700 font-normal border-b-0">
                        <p>
                            TOTAL
                        </p>
                    </th>
                    <th rowspan="2" class="px-2 border border-gray-700 font-normal border-b-0">
                        <p>
                            UNIT COST PER ITEM
                        </p>
                    </th>
                </tr>
                <tr>
                    <th class="uppercase border border-gray-700 font-normal border-b-0">
                        Quantity
                    </th>
                    <th class="uppercase border border-gray-700 font-normal border-b-0">
                        Unit
                    </th>
                    <th class="uppercase border border-gray-700 font-normal border-b-0">
                        Amount
                    </th>
                    <th class="uppercase border border-gray-700 font-normal border-b-0">
                        Materials
                    </th>
                    <th class="uppercase border border-gray-700 font-normal border-b-0">
                        Equipment
                    </th>
                    <th class="uppercase border border-gray-700 font-normal border-b-0">
                        Labor
                    </th>
                    <th class="uppercase border border-gray-700 font-normal border-b-0">
                        Fuel / Oil Cost
                    </th>
                    <th class="uppercase border border-gray-700 font-normal border-b-0">
                        Overhead Cost
                    </th>
                </tr>
            </thead>
            <tbody v-if="projectStore.information.phases.length === 0">
                <tr>
                    <td colspan="13" class="text-center py-4 font-semibold text-md italic text-gray-500">
                        No Data Available!
                    </td>
                </tr>
            </tbody>
            <tbody>
                <template v-for="phase in projectStore.information.phases" :key="phase.id">
                    <tr v-for="task in phase.tasks" :key="task.id" class="border border-black">
                        <td class="whitespace-nowrap p-2 text-center border border-gray-700">
                            {{ task.name }}
                        </td>
                        <td class="whitespace-nowrap p-2 w-full text-left border border-gray-700">
                            {{ task.description }}
                        </td>
                        <td class="text-right border p-2 border-gray-700">
                            {{ accountingCurrency(task.unit_price) }}
                        </td>
                        <td class="text-right p-2 border border-gray-700">
                            {{ task.quantity }}
                        </td>
                        <td class="text-center p-2 border border-gray-700">
                            {{ task.unit }}
                        </td>
                        <td class="text-right p-2 border border-gray-700">
                            {{ accountingCurrency(task.amount) }}
                        </td>
                        <td class="text-center p-2 border border-gray-700">
                            {{ accountingCurrency(task.total_materials_amount) }}
                        </td>
                        <td class="text-center p-2 border border-gray-700">
                            {{ accountingCurrency(task.total_equipment_amount) }}
                        </td>
                        <td class="text-center p-2 border border-gray-700">
                            {{ accountingCurrency(task.total_labor_amount) }}
                        </td>
                        <td class="text-center p-2 border border-gray-700">
                            {{ accountingCurrency(task.total_fuel_oil_amount) }}
                        </td>
                        <td class="text-center p-2 border border-gray-700">
                            {{ accountingCurrency(task.total_overhead_amount) }}
                        </td>
                        <td class="text-center p-2 border border-gray-700">
                            {{ accountingCurrency(task.total) }}
                        </td>
                        <td class="text-center p-2 border border-gray-700">
                            {{ accountingCurrency(task.unit_cost_per_item) }}
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div>
            <ProjectMonitoringTssSummaryOfEstimatedDirectCostDistributionOfDirectCost />
        </div>
        <div class="flex justify-between items-center">
            <SignatureApproval
                :signatories="
                    [
                        { label: 'prepared by', name: 'Juan Dela Cruz', position: 'Project Engineer' },
                        { label: 'checked and reviewed by', name: 'Maria Reyes', position: 'QA Supervisor' },
                        { label: 'recommending approval', name: 'Carlos Tan', position: 'Ops Manager' },
                        { label: 'approved by', name: 'Anna Lim', position: 'CEO' }
                    ]
                "
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
</script>

<style>

</style>
