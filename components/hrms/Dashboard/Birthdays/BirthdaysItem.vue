<template>
    <div class="flex flex-col items-center">
        <div class="rounded max-w-28 max-h-28">
            <img class="m-auto h-full" :src="avatar" alt="Avatar">
        </div>
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
        required: false,
        default: "/avatarexample.png",
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
