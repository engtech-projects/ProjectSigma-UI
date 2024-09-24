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
    <div class="PsMonthYearInput w-full p-2">
        <label
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}<span class="text-red-600">{{ required ? "*" : "" }}</span>
        </label>
        <VueDatePicker
            v-model="model"
            month-picker
            title="Month Filter"
            class="rounded-lg"
            placeholder="Month"
            :auto-apply="true"
            :required="required"
        />
    </div>
</template>
