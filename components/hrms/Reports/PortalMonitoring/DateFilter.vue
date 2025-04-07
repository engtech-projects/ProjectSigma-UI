<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        required: false,
        default: "",
    }
})
const dateFrom = defineModel("dateFrom", { required: true })
const dateTo = defineModel("dateTo", { required: true })
</script>
<template>
    <div
        class="flex gap-4 flex-col max-w-sm"
    >
        <label class="block text-sm font-medium text-gray-900">{{ title }}:</label>
        <div class="flex flex-row gap-4">
            <div class="flex justify-start items-center gap-2">
                <label class="block mb-2 text-[12px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                <input v-model="dateFrom" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="flex justify-start items-center gap-2">
                <label class="block mb-2 text-[12px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                <input v-model="dateTo" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
        </div>
    </div>
</template>
