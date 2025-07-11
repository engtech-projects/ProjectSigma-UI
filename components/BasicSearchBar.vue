<script lang="ts" setup>

const emit = defineEmits([
    "search"
])
const searchInput = ref("")
const search = (value: string) => {
    emit("search", value)
}
watch(searchInput, () => {
    search(searchInput.value)
})

</script>

<template>
    <div id="app" class="max-w-2xl rounded-xl border border-gray-300 overflow-hidden">
        <div class="flex items-center gap-2 px-4 bg-white">
            <label for="searchInput" class="cursor-pointer">
                <icon name="material-symbols:search" class="text-gray-600 text-lg" />
            </label>
            <input
                id="searchInput"
                v-model="searchInput"
                type="text"
                placeholder="Search project name or code"
                class="flex-grow p-3 border-none ring-0 focus:outline-none focus:border-transparent text-gray-800 placeholder-gray-400 text-sm active:ring-0 focus:ring-0 focus:ring-transparent"
            >
            <icon v-if="searchInput" name="iconamoon:sign-times-light" class="text-gray-600 text-xl cursor-pointer hover:text-black" @click="searchInput = ''" />
        </div>
    </div>
</template>
