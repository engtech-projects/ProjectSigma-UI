<script lang="ts" setup>
const compId = useId()
defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
        default: "",
    },
})
</script>
<template>
    <div class="PsTextInput flex flex-col gap-4">
        <label
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}
        </label>
        <label
            :for="compId"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
        >
            {{ value }}
        </label>
    </div>
</template>
