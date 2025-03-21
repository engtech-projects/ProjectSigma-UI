<template>
    <div>
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
                            A.1.1(3)
                        </td>
                        <td class="p-2 border border-gray-700">
                            Construction of Field Office for the Engineer (Bunk House with Complete Electrical, Water & Sanitary Installation including Provision of 2 units Multifunction Inkjet Printer A3)
                        </td>
                        <td class="p-2 border border-gray-700 text-center">
                            l.s
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
                                    Eight hundred forty-six thousand seven hundred twenty.
                                </span>
                            </div>
                            <div class="flex flex-col p-2">
                                <h4 class="font-bold uppercase text-sm">
                                    In Figures
                                </h4>
                                <span class="pl-4">
                                    846,720
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
                                            Eight hundred forty-six thousand seven hundred twenty.
                                        </span>
                                    </div>
                                    <div class="flex flex-col p-2">
                                        <h4 class="font-bold uppercase text-sm">
                                            In Figures
                                        </h4>
                                        <span class="pl-4">
                                            846,720
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col p-2 justify-center gap-2">
                                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </button>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="px-2 py-1">
                            <div class="flex justify-between">
                                <span class="font-semibold uppercase">
                                    A. Materials
                                </span>
                                <div class="flex gap-1 justify-end">
                                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="showResourceModal = true">
                                        Add Resource
                                    </button>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-lg text-xs px-4 h-6">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center border border-gray-700" />
                        <td class="p-2 border border-gray-700">
                            Construction of Field Office for the Engineer (Bunk House with Complete Electrical, Water & Sanitary Installation including Provision of 2 units Multifunction Inkjet Printer A3)
                        </td>
                        <td class="p-2 border border-gray-700 text-center">
                            l.s
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
                                    Eight hundred forty-six thousand seven hundred twenty.
                                </span>
                            </div>
                            <div class="flex flex-col p-2">
                                <h4 class="font-bold uppercase text-sm">
                                    In Figures
                                </h4>
                                <span class="pl-4">
                                    846,720
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
                                            Eight hundred forty-six thousand seven hundred twenty.
                                        </span>
                                    </div>
                                    <div class="flex flex-col p-2">
                                        <h4 class="font-bold uppercase text-sm">
                                            In Figures
                                        </h4>
                                        <span class="pl-4">
                                            846,720
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col p-2 justify-center gap-2">
                                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </button>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="px-2 py-1">
                            <div class="flex justify-between">
                                <span class="font-semibold uppercase">
                                    B. Labor
                                </span>
                                <div class="flex gap-1 justify-end">
                                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="showTaskModal = true">
                                        Add Resource
                                    </button>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-lg text-xs px-4 h-6">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center border border-gray-700" />
                        <td class="p-2 border border-gray-700" />
                        <td class="p-2 border border-gray-700 text-center" />
                        <td class="p-2 border border-gray-700 text-center" />
                        <td class="border border-gray-700 h-24">
                            <div class="flex flex-between items-end h-full p-2">
                                <span class="font-semibold uppercase text-sm">
                                    Direct Material Cost
                                </span>
                                <span class="font-semibold uppercase text-sm">
                                    =
                                </span>
                            </div>
                        </td>
                        <td class="border border-gray-700 h-24 p-2">
                            <div class="flex items-end h-full">
                                <span class="font-semibold uppercase text-sm">
                                    0.00
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="px-2 py-1">
                            <div class="flex justify-between">
                                <span class="font-semibold uppercase">
                                    C. Equipment
                                </span>
                                <div class="flex gap-1 justify-end">
                                    <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="showTaskModal = true">
                                        Add Resource
                                    </button>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-lg text-xs px-4 h-6">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center border border-gray-700" />
                        <td class="p-2 border border-gray-700" />
                        <td class="p-2 border border-gray-700 text-center" />
                        <td class="p-2 border border-gray-700 text-center" />
                        <td class="border border-gray-700 h-24">
                            <div class="flex flex-between items-end h-full p-2">
                                <span class="font-semibold uppercase text-sm">
                                    Direct Material Cost
                                </span>
                                <span class="font-semibold uppercase text-sm">
                                    =
                                </span>
                            </div>
                        </td>
                        <td class="border border-gray-700 h-24 p-2">
                            <div class="flex items-end h-full">
                                <span class="font-semibold uppercase text-sm">
                                    0.00
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="font-semibold uppercase px-2">
                            D.
                        </td>
                        <td class="pX-2 uppercase">
                            Direct Cost
                        </td>
                        <td class="pX-2 text-center" />
                        <td class="pX-2 text-center" />
                        <td class="text-right px-2">
                            =
                        </td>
                        <td class="text-right px-2">
                            630,000.00
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
                            =
                        </td>
                        <td class="text-right px-2">
                            630,000.00
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
                            =
                        </td>
                        <td class="text-right px-2">
                            630,000.00
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
                            10%
                        </td>
                        <td class="pX-2 text-center" />
                        <td class="text-right px-2">
                            =
                        </td>
                        <td class="text-right px-2">
                            630,000.00
                        </td>
                    </tr>
                    <tr>
                        <td class="font-semibold uppercase px-2">
                            g.
                        </td>
                        <td class="pX-2 uppercase">
                            Total Cost
                        </td>
                        <td class="pX-2 text-center">
                            10%
                        </td>
                        <td class="pX-2 text-center" />
                        <td class="text-right px-2">
                            =
                        </td>
                        <td class="text-right px-2">
                            630,000.00
                        </td>
                    </tr>
                    <tr>
                        <td class="font-semibold uppercase px-2">
                            g.
                        </td>
                        <td class="pX-2 uppercase">
                            Total Cost
                        </td>
                        <td class="pX-2 text-center">
                            10%
                        </td>
                        <td class="pX-2 text-center" />
                        <td class="text-right px-2">
                            =
                        </td>
                        <td class="text-right px-2 font-bold">
                            630,000.00
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
        <ProjectsModalsResource :show-modal="showResourceModal" @hide-modal="showResourceModal = false" />
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
const edit = projectStore.viewState

const showPhaseModal = ref(false)
const showTaskModal = ref(false)
const showResourceModal = ref(false)
</script>

<style>

</style>
