<script lang="ts" setup>
const props = defineProps({
    placeholder: {
        type: String,
        default: "Search",
    },
    title: {
        type: String,
        default: "",
    },
    searchList: {
        type: Array<any>,
        default: [],
    },
    loading: {
        type: Boolean,
        default: false,
    }
})
const forFocusOut = ref()
const result = defineModel("result", { type: Object, required: true })
const searchInput = defineModel("searchInput", { type: String, required: true })
const showDD = ref(false)
let toggleTimeout: any = null
const openDD = () => {
    if (toggleTimeout) {
        clearTimeout(toggleTimeout)
    }
    showDD.value = true
}
const closeDD = () => {
    toggleTimeout = setTimeout(() => {
        showDD.value = false
    }, 100)
}
function selectOption (option: any) {
    result.value = option
    forFocusOut.value.focus()
}
function clearSelection () {
    result.value = ""
    console.log(result.value)
}
function clearSearchQuery () {
    searchInput.value = ""
}
</script>
<template>
    <div ref="forFocusOut" tabindex="51">
        <div
            id="PSSELECTSEARCH"
            ref="compContainer"
            tabindex="50"
            @focusin="openDD"
            @focusout="closeDD"
        >
            <div class="border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer">
                <div class="h-full flex flex-1 items-center overflow-hidden py-[9px]">
                    <input
                        v-if="showDD"
                        v-model="searchInput"
                        type="text"
                        class="border border-slate-300 rounded w-full h-full"
                        placeholder="Search"
                        @click.stop
                    >
                    <span v-else class="flex-1">{{ Object.keys(result).length > 0 ? result[title] : placeholder }}</span>
                    <span v-show="showDD" @click="clearSearchQuery">
                        <Icon name="material-symbols:close-rounded" class="-ml-8 font-bold text-xl" title="Clear Search Input" />
                    </span>
                    <div v-show="Object.keys(result).length > 0" @click="clearSelection">
                        <Icon name="material-symbols:close-rounded" class="font-bold text-xl" title="Clear Selection" />
                    </div>
                    <Icon name="iconoir:nav-arrow-down" class="font-bold text-xl" />
                </div>
            </div>
            <div class="relative">
                <div
                    v-if="showDD"
                    class="absolute max-h-72 left-0 min-w-full py-2 px-2 border border-slate-800 bg-white rounded flex flex-col gap-2 z-10"
                >
                    <div v-show="loading" class="mx-auto">
                        <Icon name="svg-spinners:6-dots-rotate" />
                    </div>
                    <div v-if="props.searchList.length" class="flex flex-col overflow-auto">
                        <span
                            v-for="option, i in props.searchList"
                            :key="i"
                            class="cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
                            @click="selectOption(option)"
                        >
                            {{ option[props.title] }}
                        </span>
                    </div>
                    <div v-else class="px-4">
                        <span>No data available.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
