<script lang="ts" setup>
const model = defineModel({ required: false, type: String, default: "" })
const compId = useId()
defineProps({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    required: {
        type: Boolean,
        default: false,
    },
})
</script>
<template>
    <div class="PsTextInput">
        <input
            :id="compId"
            v-model="model"
            type="number"
            step=".01"
            min="0"
            :name="name"
            class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
            :placeholder="placeholder"
            :required="required"
        >
    </div>
</template>
