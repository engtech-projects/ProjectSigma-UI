<template>
    <div class="relative LayoutBoards">
        <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div
            class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
        >
            <h5 v-if="title" class="text-xl font-medium text-gray-900 dark:text-white border-b p-2">
                <div class="flex flex-row gap-4">
                    {{ title }}
                    <div>
                        <button
                            class="border border-2-teal-600 rounded-md px-3 py-1 flex items-center gap-2 bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-500"
                            @click="sync"
                        >
                            <Icon name="iconoir:refresh-double" />
                        </button>
                    </div>
                </div>
            </h5>
            <div class="h-full">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: false,
        default: "",
    },
    loading: {
        type: Boolean,
        default: false,
    }
})
const emit = defineEmits(["reload"])
const sync = () => {
    emit("reload")
}
</script>
