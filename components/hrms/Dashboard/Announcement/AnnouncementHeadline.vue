<template>
    <div class="block max-w-screen p-4 bg-blue-200 border border-gray-200 rounded-lg shadow hover:bg-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div
            class="flex items-center justify-between
     text-lg font-semibold text-gray-900 dark:text-white"
        >
            <h3 class="text-7xl mb-4 ">
                {{ title }}
            </h3>

            <span class="bg-teal-100 text-teal-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-blue-300 ms-3">Latest</span>
        </div>

        <time class="block mb-2 text-xl font-normal leading-none text-gray-700 dark:text-gray-500">{{ date }}</time>

        <div class="mb-4 text-2xl font-normal text-gray-500 dark:text-gray-400 italic">
            {{ content?.slice(0, maxContentLength) }}
            <span v-if="content?.length > maxContentLength && !isFirstCard" class="text-blue-700 cursor-pointer hover:underline dark:text-blue-300" @click="toggleExpand">... View All</span>
            <!-- {{ content }} -->
        </div>

        <div v-if="expandContent && !isFirstCard" class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {{ content }}
            <span class="text-blue-700 cursor-pointer hover:underline dark:text-blue-300" @click="toggleExpand"> Show Less</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: true,
    },
})
const maxContentLength = 100 // Adjust the maximum length you want to show initially
const expandContent = ref(false)

const isFirstCard = props.index === 0

const toggleExpand = () => {
    expandContent.value = !expandContent.value
}
</script>
