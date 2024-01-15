<template>
    <div class="hrms-announcement-card border border-slate-200 p-2 m-2 rounded-lg">
        <h4 class="font-bold text-sm">
            {{ title }}
        </h4>
        <p class="text-sm">
            {{ formatDate(date) }}
        </p>
        <p class="text-sm italic">
            {{ content }}
        </p>
    </div>
</template>

<script setup>

defineProps({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
}
</script>
