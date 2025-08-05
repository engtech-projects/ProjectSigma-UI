<template>
    <!-- Header -->
    <div class="mb-4">
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

        <table class="table-auto w-full border border-collapse border-gray-800 text-sm">
            <thead>
                <tr class="text-left border border-black">
                    <th colspan="4" class="w-[60%] text-left bg-[#ffc000] text-black font-bold border border-black px-2">
                        <p>
                            (Columns (1), (2), (3), and (4) are <br> to be filled up by the Procuring Entity)
                        </p>
                    </th>
                    <th colspan="2" class="w-[40%] flextext-left bg-[#ffc000] text-black font-bold border border-black px-2">
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
                    <th class="!font-normal px-1 border border-black border-t-0 border-b-0">
                        (1)
                    </th>
                    <th class="!font-normal px-1 border border-black border-t-0 border-b-0">
                        (2)
                    </th>
                    <th class="!font-normal px-1 border border-black border-t-0 border-b-0">
                        (3)
                    </th>
                    <th class="!font-normal px-1 border border-black border-t-0 border-b-0">
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
                    <th colspan="1" class="bg-[#ffe598] text-left">
                        {{ phase.name }}
                    </th>
                    <th colspan="5" class="bg-[#ffe598] text-left">
                        {{ phase.description }}
                    </th>
                </tr>
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
                </tr>
                <tr v-if="phase.tasks.length > 0">
                    <td colspan="4" class="w-1 border border-black px-2 text-center">
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
                    <td class="w-1 border border-black px-2 text-right">
                        <b>
                            Php
                        </b>
                    </td>
                    <td class="w-1 border border-black px-2 text-right">
                        <b>
                            {{ accountingCurrency(phase.total_cost) }}
                        </b>
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="6" class="w-1 border border-black px-2">
                        No tasks found.
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="w-1 border border-black px-2 text-center">
                        <p>
                            <b>
                                TOTAL COST
                            </b>
                        </p>
                    </td>
                    <td class="w-1 border border-black px-2 text-right">
                        <b>
                            Php
                        </b>
                    </td>
                    <td class="w-1 border border-black px-2 text-right">
                        <b>
                            {{ accountingCurrency(projectStore.information.total_cost ?? 0) }}
                        </b>
                    </td>
                </tr>
                <tr>
                    <th colspan="6">
                        <p class="text-left">
                            TOTAL AMOUNT IN WORDS:
                        </p>
                    </th>
                </tr>
                <tr>
                    <th colspan="6">
                        <p class="text-left">
                            {{ amountToWords(projectStore.information.total_cost ?? 0) }}
                        </p>
                    </th>
                </tr>
            </tfoot>
        </table>

        <div class="flex justify-start items-center">
            <FormSignatory
                class="mt-16"
                label="Submitted By"
                :align="'left'"
                :signatory="{
                    name: 'Angel A. Abrau',
                    title: 'Authorized Managing Officer',
                    subtitle: projectStore.information.license
                }"
            />
            <div class="flex items-center text-sm gap-4 mt-16">
                <span>DATE:</span>
                <span class="underline">{{ fullDate(new Date(projectStore.information.contract_date)) }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
</script>
