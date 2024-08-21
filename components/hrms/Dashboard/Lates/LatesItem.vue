<template>
    <HrmsCommonEmployeeAvatar :avatar="avatar" />
    <h3 class="text-sm sm:text-xs font-medium">
        {{ name }}
    </h3>
    <h3 class="text-sm">
        Lates Days: {{ late }}
    </h3>
    <button
        v-if="false"
        type="submit"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
        {{ title }}
    </button>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: "/avatarexample.png",
    },
    late: {
        type: Number,
        required: true,
    },
})
</script>
