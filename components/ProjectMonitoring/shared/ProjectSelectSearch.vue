<script lang="ts" setup>
import { useProjectStore } from "~/stores/project-monitoring/projects"
const projectStore = useProjectStore()
projectStore.getActiveProjects()
const options = ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5", "Project 6", "Project 7", "Project 8", "Project 9", "Project 10", "Project 11", "Project 12", "Project 13", "Project 14", "Project 15"]
const query = ref("")
const filtered = ref([...options])
const open = ref(false)
const highlight = ref(-1)
const root = ref(null)
const filterOptions = () => {
    filtered.value = options.filter(o => o.toLowerCase().includes(query.value.toLowerCase()))
    highlight.value = filtered.value.length ? 0 : -1
}
const openDropdown = () => {
    open.value = true
}
const closeDropdown = () => {
    open.value = false
    highlight.value = -1
}
const toggleDropdown = () => {
    open.value ? closeDropdown() : openDropdown()
}
const moveHighlight = (dir) => {
    if (!open.value) { openDropdown() }
    if (filtered.value.length) {
        highlight.value = (highlight.value + dir + filtered.value.length) % filtered.value.length
    }
}
const selectOption = (i) => {
    query.value = filtered.value[i]
    closeDropdown()
}
const selectHighlighted = () => {
    if (highlight.value >= 0) { selectOption(highlight.value) }
}
const clickOutside = (e: any) => {
    if (root.value && !root.value.contains(e.target)) { closeDropdown() }
}
onMounted(() => document.addEventListener("click", clickOutside))
onBeforeUnmount(() => document.removeEventListener("click", clickOutside))
</script>
<template>
    <div id="app" class="w-full max-w-md">
        <div ref="root" class="relative">
            <div class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-400" tabindex="0" aria-haspopup="listbox" :aria-expanded="open" @click="toggleDropdown">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
                <input
                    v-model="query"
                    type="text"
                    placeholder="Search or select..."
                    class="flex-1 outline-none text-sm bg-transparent placeholder-gray-400 border-0 focus:ring-0 focus:ring-indigo-400 focus:border-indigo-400"
                    aria-autocomplete="list"
                    aria-controls="options-list"
                    :aria-activedescendant="highlight >= 0 ? 'option-' + highlight : ''"
                    @focus="openDropdown"
                    @input="filterOptions"
                    @keydown.down.prevent="moveHighlight(1)"
                    @keydown.up.prevent="moveHighlight(-1)"
                    @keydown.enter.prevent="selectHighlighted"
                    @keydown.esc="closeDropdown"
                >
                <svg :class="['w-5 h-5 text-gray-500 transition-transform duration-150', open ? 'rotate-180' : '']" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clip-rule="evenodd" /></svg>
            </div>

            <div v-show="open" class="absolute z-20 mt-2 w-full rounded-lg bg-white border border-gray-200 shadow-lg max-h-60 overflow-auto" role="listbox" tabindex="-1">
                <ul id="options-list" class="divide-y divide-gray-100">
                    <li
                        v-for="(opt, i) in filtered"
                        :id="'option-' + i"
                        :key="i"
                        :class="['flex items-center px-3 py-2 cursor-pointer text-sm', i === highlight ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700']"
                        @click="selectOption(i)"
                        @mousemove="highlight = i"
                    >
                        {{ opt }}
                    </li>
                </ul>
                <div v-if="filtered.length === 0" class="p-3 text-sm text-gray-500">
                    No results
                </div>
            </div>
        </div>
    </div>
</template>
