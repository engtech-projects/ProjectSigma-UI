<script setup lang="ts">

const projects = useProjectStore()
const { isEdit } = storeToRefs(projects)
projects.getProject()

definePageMeta({
    layout: "default",
})
useHead({
    title: "Projects",
})

</script>

<template>
    <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
        <ProjectsNewProject v-show="!isEdit" class="flex-1" />
        <ProjectsEditProject v-show="isEdit" class="flex-1" />
        <ProjectsList class="flex-2" />
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
