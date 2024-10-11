<script setup>
defineProps({
    buttonTitle: {
        type: String,
        default: "Submit"
    },
    buttonIcon: {
        type: String,
        default: "ic:baseline-send"
    }
})
const emit = defineEmits(["click"])
const doClick = () => {
    emit("click")
}
</script>
<template>
    <button
        class="flex justify-end items-center ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="doClick"
    >
        <Icon
            v-if="buttonIcon"
            :name="buttonIcon"
            class="w-4 h-4 mr-1"
            fill="currentColor"
        />
        {{ buttonTitle }}
    </button>
</template>
