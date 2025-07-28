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
</script>

<template>
    <div class="px-4 pt-4">
        <ProjectsTssProjectList title="Project List Table" :show-search="true" />
    </div>
</template>
