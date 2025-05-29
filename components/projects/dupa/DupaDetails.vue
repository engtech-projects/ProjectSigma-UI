<template>
    <div class="flex flex-col p-2 bg-white">
        <div class="flex items-center mb-4">
            <div class="flex-1 flex items-center gap-2 text-gray-500 cursor-pointer">
                <div class="flex items-center border hover:bg-gray-500 hover:text-white gap-1 bg-gray-100 rounded-lg px-4 py-1">
                    <Icon name="material-symbols:arrow-back-rounded" />
                    <span @click="goBack">
                        BACK
                    </span>
                </div>
            </div>
            <h1 class="text-lg mb-4 text-left uppercase font-bold flex-2">
                {{ information.license }}
            </h1>
        </div>
        <div class="flex flex-col gap-4">
            <ProjectsInformationProjects
                page-title="Task Details"
                header-title="Detailed Unit Price Analysis"
                :information="information"
            />
        </div>

        <ProjectsDetailsTask />
        <ProjectsModalsCategory :show-modal="showCategoryModal" @hide-modal="showCategoryModal = false" />
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"

const projectStore = useProjectStore()
const { information } = storeToRefs(projectStore)
projectStore.viewState = true
// const edit = projectStore.viewState
const resourceStore = useResourceStore()
resourceStore.getResourceUnits()
const showCategoryModal = ref(false)

const goBack = () => {
    window.history.back()
}
</script>

<style>
#tabContainer span.active {
    border-bottom-color: rgb(28 100 242);
    color: rgb(28 100 242);
}
</style>
