<template>
    <!-- Header -->
    <div>
        <div class="mb-6">
            <div class="flex flex-col">
                <div class="flex mb-4">
                    <p class="w-1/3" />
                    <p class="font-bold block w-2/3">
                        Department of Public Works and Highways
                    </p>
                </div>
                <div class="flex">
                    <p class="w-1/3">
                        Contract ID:
                    </p>
                    <span class="font-semibold w-2/3">{{ projectStore.information.contract_id }}</span>
                </div>
                <div class="flex">
                    <p class="w-1/3">
                        Contract Name:
                    </p>
                    <span class="font-semibold w-2/3">{{ projectStore.information.name }}</span>
                </div>
                <div class="flex">
                    <p class="w-1/3">
                        Contract Location:
                    </p>
                    <span class="font-semibold w-2/3">{{ projectStore.information.location }}</span>
                </div>
            </div>
            <h1 class="text-2xl font-bold mt-4 mb-2 text-center block">
                BILL OF QUANTITIES
            </h1>
        </div>

        <table class="border border-gray-400 w-full">
            <thead>
                <tr class="text-left border border-black">
                    <th colspan="3" class="text-left bg-yellow-400 text-black font-bold text-sm border border-black px-2 text-xs">
                        (Columns (1), (2), <br> (3) to be filled by the Procuring Entity)
                    </th>
                    <th colspan="3" class="text-left bg-yellow-400 text-black font-bold text-sm border border-black px-2 text-xs">
                        (Columns (5) and (6) are <br> to be filled up by the Bidder)
                    </th>
                </tr>
                <tr>
                    <th>Pay Item No.</th>
                    <th>Description</th>
                    <th>Unit</th>
                    <th>Quantity</th>
                    <th class="border border-black px-2 !font-normal">
                        Unit Price (Pesos)
                    </th>
                    <th class="border border-black px-2 !font-normal">
                        Amount (Pesos)
                    </th>
                </tr>
                <tr class="text-left !font-normal">
                    <th class="!font-normal">
                        (1)
                    </th>
                    <th class="!font-normal">
                        (2)
                    </th>
                    <th class="!font-normal">
                        (3)
                    </th>
                    <th class="!font-normal">
                        (4)
                    </th>
                    <th class="!font-normal border border-black px-2">
                        (5)
                    </th>
                    <th class="!font-normal border border-black px-2">
                        (6)
                    </th>
                </tr>
            </thead>
            <tbody v-for="phase in projectStore.information.phases" :key="phase.id">
                <tr class="border border-black">
                    <th colspan="1" class="text-left bg-orange-200 text-black font-bold px-2 text-sm">
                        REF#
                    </th>
                    <th colspan="5" class="text-left bg-orange-200 text-black font-bold px-2 text-sm uppercase">
                        {{ phase.description }}
                    </th>
                </tr>
                <tr v-for="task in phase.tasks" :key="task.id">
                    <td class="w-1 border border-black px-2">
                        A.1.1(8)
                    </td>
                    <td class="w-2 border border-black px-2">
                        Construction of Field Office for the Engineer (Bank House with Complete Electrical, Water & Sanitary Installation including Provision of 2 units Multifunction Inkjet Printer A3)
                    </td>
                    <td class="w-1 border border-black px-2">
                        ls.
                    </td>
                    <td class="w-1 border border-black px-2">
                        1.00
                    </td>
                    <td class="w-1 border border-black px-2">
                        846,720.00
                    </td>
                    <td class="w-1 border border-black px-2">
                        846,720.00
                    </td>
                </tr>
                <tr v-if="phase.tasks.length > 0">
                    <td colspan="4" class="w-1 border border-black px-2">
                        TOTAL COST (PART A) CARRIED TO THE SUMMARY
                    </td>
                    <td class="w-1 border border-black px-2">
                        Php
                    </td>
                    <td class="w-1 border border-black px-2">
                        486,569.93
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="6" class="w-1 border border-black px-2">
                        No tasks found.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
</script>
