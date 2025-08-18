<script setup>
defineProps({
    name: {
        type: String,
        required: true,
        default: "Administrator",
    },
    position: {
        type: String,
        required: true,
        default: "Administrator",
    },
    license: {
        type: String,
        required: true,
        default: "EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION",
    },
    date: {
        type: String,
        required: true,
        default: "N/A",
    },
})
</script>
<template>
    <div class="w-full flex flex-col gap-8 text-sm">
        <div class="w-full flex justify-start">
            <span>SUBMITTED BY:</span>
        </div>
        <div class="w-full flex flex-row justify-between">
            <div class="flex flex-col gap-1">
                <span class="font-bold uppercase">
                    {{ name }}
                </span>
                <span>
                    {{ position }}
                </span>
                <span>
                    {{ license }}
                </span>
            </div>
            <div class="flex">
                <div class="flex flex-row items-start gap-4">
                    <span>DATE:</span>
                    <span class="border-b border-black px-6 text-center inline-block">
                        {{ fullDate(new Date(date)) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
