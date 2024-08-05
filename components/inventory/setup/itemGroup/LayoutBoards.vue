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
    },
    action: {
        type: Function,
        default: null
    }
})
</script>

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
            <div class="flex flex-col border-b gap-4 mb-2 p-2">
                <h5 v-if="title" class="text-xl font-medium text-gray-900 dark:text-white border-0 border-b pb-2">
                    {{ title }}
                </h5>
                <div class="flex flex-row justify-between flex-nowrap">
                    <div>
                        <button
                            type="button"
                            class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-blue-300 font-semibold text-sm px-3 py-2 me-2 mb-2 flex justify-center"
                            @click="action"
                        >
                            <Icon name="mdi:plus" class="h-5 w-5 text-white" />
                            Add Item
                        </button>
                    </div>
                    <div class="search-field">
                        <input
                            type="text"
                            placeholder="Search"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                        >
                    </div>
                </div>
            </div>
            <div class="h-full">
                <slot />
            </div>
        </div>
    </div>
</template>
