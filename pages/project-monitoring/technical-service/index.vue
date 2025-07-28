<script lang="ts" setup>

import { useProjectStore } from "~/stores/project-monitoring/projects"
const projectStore = useProjectStore()
await projectStore.getProjectTss()
definePageMeta({
    layout: "default",
})
useHead({
    title: "TSS Projects",
})
const debouncedSearch = useDebouncedFn(
    (value: string) => {
        projectStore.awardedTssList.params.project_key = value
        projectStore.getProjectTss()
    },
    500
)
const search = (value: string) => {
    debouncedSearch(value)
}
</script>

<template>
    <div class="px-4 pt-4">
        <ProjectsTssProjectList title="Project List Table" :show-search="true" @search="search" />
    </div>
</template>
