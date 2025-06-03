<template>
    <div class="flex flex-col p-2 bg-white">
        <div class="flex items-center mb-4">
            <div class="flex-1 flex items-center gap-2 text-gray-500 cursor-pointer">
                <div class="flex items-center border hover:bg-gray-500 hover:text-white gap-1 bg-gray-100 rounded-lg px-4 py-1 cursor-pointer" @click="goBack">
                    <Icon name="material-symbols:arrow-back-rounded" />
                    <span>
                        BACK
                    </span>
                </div>
            </div>
            <h1 class="text-lg mb-4 text-left uppercase font-bold flex-2">
                {{ information.license || "No License Information" }}
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

const snackbar = useSnackbar()
const projectStore = useProjectStore()
const { information } = storeToRefs(projectStore)
projectStore.viewState = true
const resourceStore = useResourceStore()
try {
    await resourceStore.getResourceUnits()
} catch (error) {
    snackbar.add({
        type: "error",
        text: error || "something went wrong."
    })
}
const showCategoryModal = ref(false)

const router = useRouter()
const goBack = () => {
    if (router.options.history.state.back) {
        router.back()
    } else {
        navigateTo("/")
    }
}
</script>
