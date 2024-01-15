<template>
    <div class="mt-10 md:flex gap-4 justify-center">
        <div class="border-2 border-gray-400 rounded-lg p-2 md:w-1/3 space-y-4">
            <div class="flex justify-center text-3xl font-medium text-cyan-700 p-2">
                Attendance Portal
            </div>

            <div>
                <h1 class="text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white ">
                    Select Project
                </h1>
                <select v-model="selectedProject" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="projectmain">
                        Main
                    </option>
                    <option value="project1">
                        Project 1
                    </option>
                    <option value="project2">
                        Project 2
                    </option>
                    <option value="project3">
                        Project 3
                    </option>
                </select>
            </div>

            <div class="flex gap-4 justify-center p-2">
                <button class="w-18 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-3 py-1 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800" @click="redirectToProject">
                    Time-In
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router"

useHead({
    title: "Attendance Portal",
})

const router = useRouter()

const selectedProject = "projectmain"

const redirectToProject = () => {
    const url = `/Projects/${selectedProject}`
    router.push(url)
}
</script>
