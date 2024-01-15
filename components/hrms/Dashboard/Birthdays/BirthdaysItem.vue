<template>
    <div class="flex flex-col items-center">
        <img class="rounded w-32 h-28 p-1" :src="avatar" alt="Avatar">
        <h3 class="text-sm sm:text-xs font-medium">
            {{ name }}
        </h3>
        <h3 class="text-xs font-thin">
            {{ formatDate(birthday) }}
        </h3>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
})

const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" }
    return new Date(date).toLocaleDateString(undefined, options)
}
</script>
