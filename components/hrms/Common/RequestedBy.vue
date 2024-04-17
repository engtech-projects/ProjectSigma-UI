<script lang="ts" setup>
const { data: userData } = useAuth()
defineProps({
    title: {
        type: String,
        required: false,
        default: "Requested by",
    },
})
</script>
<template>
    <div class="pb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
            <label for="requested_by" class="block text-sm font-medium text-gray-900 dark:text-white">{{ title }}</label>
            <input
                id="requested_by"
                :value="userData.employee.fullname_last"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                disabled
            >
        </div>
    </div>
</template>
