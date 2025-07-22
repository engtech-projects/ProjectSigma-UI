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
const debouncedSearch = useDebouncedFn((value: string) => {
    projectStore.awardedTssList.params.project_key = value
    projectStore.getAwardedTss()
}, 500)
const search = (value: string) => {
    debouncedSearch(value)
}
</script>

<template>
    <div class="px-4 pt-4">
        <ProjectsMarketingAwardedList title="Awarded List Table" :show-search="true" @search="search" />
    </div>
</template>
