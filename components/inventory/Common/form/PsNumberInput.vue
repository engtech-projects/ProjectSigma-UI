<script lang="ts" setup>
const model = defineModel({ required: false, type: Number, default: null })
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
    addClass: {
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
            :class="addClass"
            :placeholder="placeholder"
            :required="required"
        >
    </div>
</template>
