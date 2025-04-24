<script lang="ts" setup>
const compId = useId()
defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
        default: "",
    },
})
</script>
<template>
    <div class="PsTextInput flex flex-row items-center gap-4">
        <label
            :for="compId"
            class="w-full flex flex-col text-sm uppercase font-medium text-gray-900"
        >
            {{ title }}
        </label>
        <label>
            :
        </label>
        <label
            :for="compId"
            class="w-full text-gray-900 sm:text-sm block border-b-2 border-black"
        >
            {{ value }}
        </label>
    </div>
</template>
