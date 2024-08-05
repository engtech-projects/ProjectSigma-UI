<script setup lang="ts">
const searchInput = defineModel("searchInput", { type: String, required: true })
</script>
<template>
    <div class="search-field">
        <input
            v-model="searchInput"
            type="text"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
            placeholder="Search"
        >
    </div>
</template>
