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
let debounceTimer: NodeJS.Timeout | null
const search = (value: string) => {
    if (debounceTimer) { clearTimeout(debounceTimer) } // Clear previous timer

    debounceTimer = setTimeout(async () => {
        projectStore.awardedTssList.params.project_key = value
        await projectStore.getAwardedTss()
    }, 500)
}
</script>

<template>
    <div class="px-4 pt-4">
        <ProjectsMarketingAwardedList title="Awarded List Table" :show-search="true" @search="search" />
    </div>
</template>
