<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    searchList: {
        type: Array<Object>,
        default: []
    }
})
const resultValue = defineModel("result", { type: Object, required: true })
const searchInput = defineModel("searchInput", { type: String, required: true })
const showDD = ref(false)
function toggleDD () {
    showDD.value = !showDD.value
}
function selectOption (option: any) {
    resultValue.value = option
    toggleDD()
    searchInput.value = ""
}
</script>

<template>
    <div class="border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer">
        <div class="flex flex-1 items-center overflow-hidden py-[9px]" @click="toggleDD">
            <span class="flex-1">{{ resultValue ? resultValue[title] : '' }}</span>
            <Icon name="iconoir:nav-arrow-down" class="font-bold text-xl" />
        </div>
        <div
            v-if="showDD"
            class="absolute max-h-72 left-0 top-11 min-w-full py-2 px-2 border border-slate-800 bg-white rounded flex flex-col gap-2"
        >
            <div class="px-3 w-full">
                <input
                    v-model="searchInput"
                    type="text"
                    class="border border-slate-300 rounded w-full h-10"
                    placeholder="Search"
                >
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
</template>

<style scoped></style>
