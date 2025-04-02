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

const setCurrentTime = () => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    model.value = `${hours}:${minutes}`
}
</script>

<template>
    <div class="PsTimeInput w-full">
        <label
            :for="compId"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}<span class="text-red-600">{{ required ? "*" : "" }}</span>
        </label>
        <div class="relative w-full">
            <input
                :id="compId"
                v-model="model"
                type="time"
                step="1"
                :name="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="placeholder"
                :required="required"
                disabled
            >
            <button
                type="button"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-blue-500 rounded-lg hover:ring-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                @click="setCurrentTime"
            >
                Time Now
            </button>
        </div>
    </div>
</template>
