<script setup>
const model = defineModel({ required: true })
defineProps({
    title: {
        type: String,
        required: true,
    },
    accessibilities: {
        type: Array,
        required: true,
    }
})
</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <label for="default-checkbox" class="ms-2 text-md font-medium text-green-400 dark:text-green-300">{{ title.toUpperCase() }}</label>
        <div class="grid grid-cols-1 space-y-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label v-for="(access, accId) in accessibilities" :key="accId" class="relative inline-flex items-center w-full cursor-pointer">
                <input v-model="model" type="checkbox" :value="access.id" class="sr-only peer">
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">{{ access.accessibilities_name }}</span>
            </label>
        </div>
    </section>
</template>
