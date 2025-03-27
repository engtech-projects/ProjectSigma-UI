<template>
    <div class="flex flex-col p-2">
        <h1 class="text-lg mb-4 text-center uppercase font-bold">
            Department of Public Works and Highways
        </h1>
        <div class="flex flex-col gap-4">
            <div class="flex items-end gap-1 mb-8">
                <h1 class="text-2xl text-black uppercase font-semibold">
                    Task Details
                </h1>
                <h4 class="text-gray-500 text-md">
                    Project Description
                </h4>
            </div>
            <div class="flex flex-col gap-3 mb-8">
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Project Id:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        PRJ-10001-8977657-B1139876
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Contract Name:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        Construction of Flood Control Structure along Tago River, Abutment A, San Miguel Surigao del Sur
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Location:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        San Miguel, Surigao del Sur
                    </span>
                </div>
            </div>
            <div class="flex justify-between bg-gray-200 px-2 py-2 items-center">
                <span>
                    A.1.1(3)
                </span>
                <button v-if="edit" class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-8" @click="showCategoryModal = true">
                    Add Category
                </button>
            </div>
        </div>

        <ProjectsDetailsTask />
        <ProjectsModalsCategory :show-modal="showCategoryModal" @hide-modal="showCategoryModal = false" />
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
const edit = projectStore.viewState
const showCategoryModal = ref(false)
</script>

<style>
#tabContainer span.active {
    border-bottom-color: rgb(28 100 242);
    color: rgb(28 100 242);
}
</style>
