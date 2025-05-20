<script setup>
import { useNotificationsStore } from "@/stores/notifications"
const notifStore = useNotificationsStore()
const { unreadList, unreadListLength } = storeToRefs(notifStore)
</script>
<template>
    <button
        type="button"
        data-dropdown-toggle="notification-dropdown"
        data-dropdown-trigger="hover"
        data-dropdown-offset-skidding="0"
        data-dropdown-offset-distance="0"
        class="relative p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900   dark:text-gray-400 dark:hover:text-white   focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    >
        <span class="sr-only">View notifications</span>
        <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            />
        </svg>
        <div v-if="unreadList.length > 0" class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {{ unreadListLength }}
        </div>
    </button>
</template>
