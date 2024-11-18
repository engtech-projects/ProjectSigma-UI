<script setup>
const compId = useId()
defineProps({
    title: {
        type: String,
        required: true,
    },
    targetId: {
        type: String,
        required: true,
    },
})
</script>
<template>
    <li class="mr-2" role="presentation">
        <button
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :data-tabs-target="'#'+targetId"
            type="button"
            role="tab"
            :aria-controls="compId"
            aria-selected="false"
        >
            {{ title }}
        </button>
    </li>
</template>
