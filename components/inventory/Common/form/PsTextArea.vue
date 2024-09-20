<script lang="ts" setup>
const compId = useId()
const model = defineModel({ required: true, type: String, default: null })
defineProps({
    title: {
        type: String,
        required: true,
    },
    required: {
        type: Boolean,
        required: false,
        default: false,
    },
})
</script>
<template>
    <div class="PsTextAreaInputTemplate">
        <textarea
            :id="compId"
            v-model="model"
            :placeholder="title"
            :required="required"
            class="bg-gray-80 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
        />
    </div>
</template>
