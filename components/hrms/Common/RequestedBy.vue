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
                v-if="userData.employee"
                id="requested_by"
                :value="userData.employee.fullname_last"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg"
                disabled
            >
            <input
                v-else
                id="requested_by"
                value="Admin"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg"
                disabled
            >
        </div>
    </div>
</template>
