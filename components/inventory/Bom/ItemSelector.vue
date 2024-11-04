<script lang="ts" setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"
const enums = useInventoryEnumsStore()
const { itemEnum } = storeToRefs(enums)
onMounted(() => {
    if (!itemEnum.value.isLoaded) {
        enums.getItems()
    }
})
const model = defineModel({ required: false, type: Number, default: null })
const compId = useId()
const showDD = ref(false)
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
    <div>
        <select
            :id="compId"
            v-model="model"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option :value="null" selected>
                --Select Item--
            </option>
            <option
                v-for="itemSelect, index in itemEnum.list"
                :key="index"
                :value="itemSelect.id"
            >
                {{ itemSelect.item_name }}
            </option>
        </select>
    </div>
</template>
