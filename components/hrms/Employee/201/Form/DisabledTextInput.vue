<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: false,
        default: "",
    }
})
</script>
<template>
    <td class="border border-slate-300 p-1">
        <div>
            <label for="company_date_hired" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">
                {{ title }}
            </label>
            <input
                id="company_date_hired"
                :value="model"
                type="text"
                class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled
            >
        </div>
    </td>
</template>
