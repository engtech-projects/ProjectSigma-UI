<template>
    <div class="px-8">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-slate-600 my-8 text-left">
                Awarded List Table
            </h1>
            <DropdownSearch />
        </div>
        <ProjectsMarketingAwardedList />
    </div>
</template>

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
</script>

<style>

</style>
