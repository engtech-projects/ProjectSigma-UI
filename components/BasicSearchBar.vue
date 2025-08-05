<script lang="ts" setup>
defineProps({
    placeholder: {
        type: String,
        default: "Search project name or code"
    }
})
const searchInput = defineModel({ required: true, type: String, default: "" })
</script>

<template>
    <div id="app" class="rounded-xl border border-gray-300 overflow-hidden">
        <div class="flex items-center gap-2 px-4 bg-white">
            <label for="searchInput" class="cursor-pointer">
                <icon name="material-symbols:search" class="text-gray-600 text-lg" />
            </label>
            <input
                id="searchInput"
                v-model="searchInput"
                type="text"
                :placeholder="placeholder"
                class="flex-grow p-3 border-none ring-0 focus:outline-none focus:border-transparent text-gray-800 placeholder-gray-400 text-sm active:ring-0 focus:ring-0 focus:ring-transparent"
            >
            <icon v-if="searchInput.length > 0" name="iconamoon:sign-times-light" class="text-gray-600 text-xl cursor-pointer hover:text-black" />
        </div>
    </div>
</template>
