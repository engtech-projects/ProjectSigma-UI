<script lang="ts" setup>
import { useProjectStore } from "~/stores/project-monitoring/projects"
const projectStore = useProjectStore()
onMounted(async () => {
    await projectStore.getAwardedProjects()
})
definePageMeta({
    layout: "default",
})
useHead({
    title: "Awarded Projects",
})
let debounceTimer: NodeJS.Timeout | null
const search = (value: string) => {
    if (debounceTimer) { clearTimeout(debounceTimer) }

    debounceTimer = setTimeout(async () => {
        projectStore.awardedList.params.project_key = value
        await projectStore.getAwardedProjects()
    }, 500)
}
</script>
<template>
    <div class="px-8">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-slate-600 my-8 text-left">
                Awarded List Table
            </h1>
            <DropdownSearch />
        </div>
        <ProjectsMarketingAwardedList @search="search" />
    </div>
</template>
