<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()
const { isEdit } = storeToRefs(projects)
projects.getProject()

useHead({
    title: "New Project [ General Information ]",
})

</script>
<template>
    <div class="flex flex-col mt-10 md:mt-0 gap-4">
        <div class="w-full p-4">
            <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
                <li class="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                        1
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Project Creation</h3>
                        <p class="text-sm">General Information</p>
                    </span>
                </li>
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        2
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Phases</h3>
                        <p class="text-sm">Step details here</p>
                    </span>
                </li>
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        3
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Tasks</h3>
                        <p class="text-sm">Step details here</p>
                    </span>
                </li>
                <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        4
                    </span>
                    <span>
                        <h3 class="font-medium leading-tight">Resources</h3>
                        <p class="text-sm">Step details here</p>
                    </span>
                </li>
            </ol>
        </div>
        <ProjectsFormsProjectCreateForm v-show="!isEdit"  class="flex-1" />
        <!-- <ProjectsNewProject v-show="!isEdit" class="flex-1" />
        <ProjectsEditProject v-show="isEdit" class="flex-1" /> -->
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
