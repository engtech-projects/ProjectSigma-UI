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
            type="checkbox"
            :name="name"
            class="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            :placeholder="placeholder"
            :required="required"
            :true-value="1"
            :false-value="0"
        >
        <label
            :for="compId"
            class="ms-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}
        </label>
    </div>
</template>
