<template>
    <div class="PsTextInput">
        <label
            :for="compId"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}
        </label>
        <input
            :id="compId"
            v-model="model"
            type="password"
            :name="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="placeholder"
            required
        >
    </div>
</template>

<script setup lang="ts">
const model = defineModel({ type: String })
const compId = useId()
defineProps({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: "",
    },
})
</script>
