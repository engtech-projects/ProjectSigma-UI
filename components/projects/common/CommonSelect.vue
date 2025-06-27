<script lang="ts" setup>

const vModel = defineModel("vModel", { type: Number, default: null })
defineProps({
    data: { type: Array, default: () => [] },
    selectTitle: {
        type: String,
        default: "-Select-"
    }
})
</script>
<template>
    <select v-model="vModel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option :value="null" disabled selected>
            {{ selectTitle }}
        </option>
        <option v-for="item, index in data" :key="index" :value="item.id">
            {{ item.name }}
        </option>
    </select>
</template>
