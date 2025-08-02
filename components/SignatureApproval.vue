<template>
    <div class="flex flex-row gap-8">
        <div
            v-for="(signatory, index) in signatories"
            :key="index"
            class="flex flex-col items-start"
        >
            <div class="font-semibold capitalize mb-2">
                {{ signatory.label }}
            </div>
            <div class="font-medium">
                {{ signatory.name }}
            </div>
            <div class="text-sm text-gray-600">
                {{ signatory.position }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    signatories: {
        type: Array,
        required: true,
        default: () => [],
    },
})
</script>
