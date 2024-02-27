<template>
    <button
        type="button"
        :data-dropdown-toggle="id"
        class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900   dark:text-gray-400 dark:hover:text-white   focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    >
        <span class="sr-only">{{ title }}</span>
        <svg
            v-if="icon"
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
        <img
            v-else
            class="w-8 h-8 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
            alt="user photo"
        >
    </button>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: Boolean,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
})
</script>
