<template>
    <div>
        <div class="flex flex-col gap-6 border-t-2 border-gray-800 pt-6 mb-4">
            <div class="flex justify-between">
                <div class="flex items-end gap-2">
                    <h1 class="text-3xl text-black uppercase">
                        Bill of Quantities
                    </h1>
                    <h4 class="text-gray-500 text-md">
                        Project Description
                    </h4>
                </div>
                <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-48 h-9" @click="showPhaseModal = true">
                    Create Phase
                </button>
            </div>
            <table class="border border-collapse border-gray-800 w-full">
                <thead>
                    <tr>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-2/12">
                            Pay Item No.
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-3/12">
                            Description
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-1/12">
                            Unit
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-1/12">
                            Qty
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-2/12">
                            Unit Price (Pesos)
                        </th>
                        <th class="uppercase py-2 border border-gray-700 border-b-0 w-3/12">
                            Amount (Pesos)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="uppercase bg-yellow-200 text-center">
                            Item A
                        </td>
                        <td class="uppercase bg-yellow-200 text-center">
                            Facilities for Engineers
                        </td>
                        <td class="bg-yellow-200 py-1" colspan="4">
                            <div class="flex gap-1 justify-end">
                                <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="showTaskModal = true">
                                    Create Task
                                </button>
                                <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-lg text-xs px-4 h-6">
                                    Remove
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center border border-gray-700">
                            A.1.1
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
                                    <NuxtLink v-if="edit" to="/project-monitoring/project-details" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <NuxtLink v-if="!edit" to="/project-monitoring/project-details" class="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:visibility-rounded" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center border border-gray-700">
                            A.1.2
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
                                    <NuxtLink v-if="edit" to="/project-monitoring/project-details" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <NuxtLink v-if="!edit" to="/project-monitoring/project-details" class="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:visibility-rounded" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center border border-gray-700">
                            A.1.3
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
                                    <NuxtLink v-if="edit" to="/project-monitoring/project-details" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <NuxtLink v-if="!edit" to="/project-monitoring/project-details" class="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:visibility-rounded" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="uppercase bg-yellow-200 text-center">
                            Item B
                        </td>
                        <td class="uppercase bg-yellow-200 text-center">
                            Facilities for Engineers
                        </td>
                        <td class="bg-yellow-200 py-1" colspan="4">
                            <div class="flex gap-1 justify-end">
                                <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-xs px-4 h-6" @click="showTaskModal = true">
                                    Create Task
                                </button>
                                <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-lg text-xs px-4 h-6">
                                    Remove
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center border border-gray-700">
                            B.1.1
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
                                    <NuxtLink v-if="edit" to="/project-monitoring/project-details" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <NuxtLink v-if="!edit" to="/project-monitoring/project-details" class="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:visibility-rounded" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center border border-gray-700">
                            B.1.2
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
                                    <NuxtLink v-if="edit" to="/project-monitoring/project-details" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:edit" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <NuxtLink v-if="!edit" to="/project-monitoring/project-details" class="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="material-symbols:visibility-rounded" color="white" class="rounded h-6 w-6 p-1" />
                                    </NuxtLink>
                                    <button v-if="edit" class="bg-red-500 hover:bg-red-600 active:bg-red-700 select-none text-white rounded-md text-xs w-6 h-6">
                                        <Icon name="ion:trash" color="white" class=" rounded h-6 w-6 p-1" />
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-end">
            <NuxtLink v-if="!edit" to="/project-monitoring/tss" class="flex items-center  justify-center bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-48 h-9 text-center">
                Generate TSS
            </NuxtLink>
        </div>
        <ProjectsModalsPhase :show-modal="showPhaseModal" @hide-modal="showPhaseModal = false" />
        <ProjectsModalsTask :show-modal="showTaskModal" @hide-modal="showTaskModal = false" />
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
const edit = projectStore.viewState

const showPhaseModal = ref(false)
const showTaskModal = ref(false)

</script>

<style>

</style>
