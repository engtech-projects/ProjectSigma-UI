<script lang="ts" setup>

import { useProjectStore } from "~/stores/project-monitoring/projects"
const projectStore = useProjectStore()
await projectStore.getAwardedProjects()
definePageMeta({
    layout: "default",
})
useHead({
    title: "Awarded Projects",
})
let debounceTimer: string | number | NodeJS.Timeout | null | undefined = null
const search = (value: string) => {
    if (debounceTimer) { clearTimeout(debounceTimer) } // Clear previous timer

    debounceTimer = setTimeout(async () => {
        projectStore.awardedTssList.params.project_key = value
        await projectStore.getAwardedTss()
    }, 500)
}

</script>

<template>
    <div class="px-8">
        <div class="flex justify-between items-center gap-4">
            <h1 class="text-2xl font-bold text-slate-600 my-8 text-left">
                Awarded List Table
            </h1>
            <BasicSearchBar class="w-1/3" @search="search" />
        </div>
        <ProjectsMarketingAwardedList />
    </div>
</template>
