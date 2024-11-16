<script lang="ts" setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"
const compId = useId()
const enums = useInventoryEnumsStore()
const { itemEnum } = storeToRefs(enums)
onMounted(() => {
    if (!itemEnum.value.isLoaded) {
        enums.getItems()
    }
})
let toggleTimeout: any = null
const showDD = ref(false)
const forFocusOut = ref()
const model = defineModel({ required: false, type: Number, default: null })
const result = ref("")
const searchData = ref("")
const searchInput = defineModel("searchInput", { type: String, required: true })
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
    result.value = option.item_summary
    model.value = option.id
    const names = option.convertable_units
    itemEnum.value.itemGroupFilter = names
    forFocusOut.value.focus()
    searchInput.value = ""
    itemEnum.value.params.query = ""
}
function clearSearchQuery () {
    searchInput.value = ""
}
function clearSelection () {
    result.value = ""
}
const handleInput = () => {
    itemEnum.value.params.query = searchData.value
}
</script>
<template>
    <div ref="forFocusOut" tabindex="51">
        <div
            :id="compId"
            ref="compContainer"
            tabindex="50"
            @focusin="openDD"
            @focusout="closeDD"
        >
            <div class="border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer">
                <div class="h-full flex flex-1 items-center overflow-hidden py-[9px]">
                    <input
                        v-if="showDD"
                        v-model="searchData"
                        type="text"
                        class="border border-slate-300 rounded w-full h-full"
                        placeholder="Search"
                        @input="handleInput"
                        @click.stop
                    >
                    <span v-else class="flex-1">{{ result ? result : "Search" }}</span>

                    <span v-show="showDD" @click="clearSearchQuery">
                        <Icon name="material-symbols:close-rounded" class="-ml-8 font-bold text-xl" title="Clear Search Input" />
                    </span>
                    <div v-if="result !== ''" @click="clearSelection">
                        <Icon name="material-symbols:close-rounded" class="font-bold text-xl" title="Clear Selection" />
                    </div>
                    <div v-if="result == ''">
                        <Icon name="iconoir:nav-arrow-down" class="font-bold text-xl" />
                    </div>
                </div>
            </div>
            <div class="absolute z-50">
                <div
                    v-if="showDD"
                    class="absolute max-h-72 left-0 min-w-full py-2 px-2 border border-slate-800 bg-white rounded flex flex-col gap-2 z-10"
                >
                    <div v-show="itemEnum.isLoading" class="mx-auto">
                        <Icon name="svg-spinners:6-dots-rotate" />
                    </div>
                    <div v-if="itemEnum.list.length" class="flex flex-col overflow-auto">
                        <span
                            v-for="option, i in itemEnum.list"
                            :key="i"
                            class="cursor-pointer hover:bg-slate-100 px-3 py-1 border-b"
                            @click="selectOption(option)"
                        >
                            {{ option.item_summary }}
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
