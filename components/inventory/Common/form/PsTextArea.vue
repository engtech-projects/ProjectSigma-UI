<script lang="ts" setup>
const model = defineModel({ required: true, type: String })
const compId = useId()
defineProps({
    title: {
        type: String,
        default: "",
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
    <div class="PsTextInputTemplate1 relative z-0 w-full mb-5 group">
        <textarea
            :id="compId"
            v-model="model"
            :name="name"
            :placeholder="placeholder"
            :required="required"
            :class="addClass"
        />
    </div>
</template>
