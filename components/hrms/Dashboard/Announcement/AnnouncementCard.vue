<template>
    <div class="block max-w-screen p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div
            class="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white"
        >
            <h3 class="md:text-md font-bold mb-4 ">
                {{ title }}
            </h3>
        </div>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">{{ date }}</time>
        <div v-if="content?.length > maxContentLength && !isFirstCard && !expandContent" class="mb-4 text-md font-normal text-gray-500 dark:text-gray-400 italic">
            {{ content?.slice(0, maxContentLength) }}
            <span class="text-blue-700 cursor-pointer hover:underline dark:text-blue-300" @click="toggleExpand">... View All</span>
        </div>
        <div v-else class="mb-4 font-norma text-md text-gray-500 dark:text-gray-400">
            {{ content }}
            <p v-if="content" class="text-blue-700 cursor-pointer hover:underline dark:text-blue-300" @click="toggleExpand">
                Show Less
            </p>
        </div>
    </div>
</template>

<script setup>

defineProps({
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
})
const maxContentLength = 100 // Adjust the maximum length you want to show initially
const expandContent = ref(false)
const toggleExpand = () => {
    expandContent.value = !expandContent.value
}
</script>
