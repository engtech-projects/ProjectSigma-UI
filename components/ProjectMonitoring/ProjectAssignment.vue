<template>
    <div class="p-4 mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-center">
            PROJECT ASSIGNMENT
        </h1>

        <div v-if="edit" class="flex flex-wrap items-center mb-6">
            <div class="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
                <label for="searchEmployee" class="block text-sm font-medium text-gray-700">Search Employee</label>
                <div class="relative mt-1">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="solar:magnifer-outline" class="w-5 h-5 text-gray-600" />
                    </div>
                    <input id="searchEmployee" type="text" name="searchEmployee" class="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
            </div>
            <div class="w-full md:w-1/2 md:pl-2">
                <label for="position" class="block text-sm font-medium text-gray-700">Position</label>
                <div class="flex items-center mt-1">
                    <select id="position" name="position" class="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Engineer</option>
                    </select>
                    <button class="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" @click="showModal = true">
                        +
                    </button>
                </div>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th class="border border-gray-300 p-2 text-left">
                            EMPLOYEE NAME
                        </th>
                        <th class="border border-gray-300 p-2 text-left">
                            POSITION
                        </th>
                        <th class="border border-gray-300 p-2 text-left">
                            DATE REGISTERED
                        </th>
                        <th class="border border-gray-300 p-2 text-left">
                            START DATE
                        </th>
                        <th class="border border-gray-300 p-2 text-left">
                            END DATE
                        </th>
                        <th class="border border-gray-300 p-2 text-center" />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Project Manager
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Engineer 1
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Engineer 1
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Engineer 2
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Engineer 3
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Project Manager
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Engineer 1
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Engineer 1
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Engineer 2
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-gray-300 p-2">
                            Juan Dela Cruz
                        </td>
                        <td class="border border-gray-300 p-2">
                            Engineer 3
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2">
                            February 14, 2025
                        </td>
                        <td class="border border-gray-300 p-2 text-center">
                            <button class="text-red-600 hover:text-red-800">
                                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ProjectsModalsPosition :show-modal="showModal" @hide-modal="showModal = false" />
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
const edit = projectStore.viewState
const showModal = ref(false)
</script>

<style>
</style>
