<script setup lang="ts">

definePageMeta({
    layout: "default",
})
useHead({
    title: "Projects",
})

</script>

<template>
    <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">
        <ProjectsNewProject />
        <ProjectsList />
    </div>
</template>
