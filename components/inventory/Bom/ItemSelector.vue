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
const emit = defineEmits(["itemSelected"])
let toggleTimeout: any = null
const showDD = ref(false)
const forFocusOut = ref()
const compContainer = ref()
const model = defineModel({ required: false, type: Number, default: null })
const result = ref("")
const searchData = ref("")
const searchInput = defineModel("searchInput", { type: String, required: true })

const dropdownPosition = ref({ top: 0, left: 0, width: 0 })

const updateDropdownPosition = () => {
    if (compContainer.value) {
        const { top, left, width, height } = compContainer.value.getBoundingClientRect()
        dropdownPosition.value = {
            top: top + height + window.scrollY,
            left,
            width
        }
    }
}

const openDD = () => {
    if (toggleTimeout) { clearTimeout(toggleTimeout) }
    updateDropdownPosition()
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
    if (!option.convertable_units || option.convertable_units.length === 0) {
        itemEnum.value.itemGroupFilter = [{
            id: option.uom,
            name: option.uom_name,
        }]
    } else {
        itemEnum.value.itemGroupFilter = option.convertable_units
    }
    emit("itemSelected", option)
    forFocusOut.value.focus()
}

function clearSearchQuery () {
    searchInput.value = ""
    result.value = ""
    model.value = null
}

function clearSelection () {
    result.value = ""
    model.value = null
}

const handleInput = () => {
    itemEnum.value.params.query = searchData.value
}

</script>

<template>
    <div ref="forFocusOut" tabindex="0" class="relative w-full">
        <div
            :id="compId"
            ref="compContainer"
            class="w-full"
            tabindex="0"
            @focusin="openDD"
            @focusout="closeDD"
        >
            <div
                class="border border-slate-600 rounded-md px-3 py-2 text-sm flex items-center relative bg-white hover:border-slate-600 focus-within:ring-2 focus-within:ring-blue-300 transition-all"
            >
                <div class="flex-1">
                    <input
                        v-if="showDD"
                        v-model="searchData"
                        type="text"
                        placeholder="Search item..."
                        class="w-full h-8 px-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                        @input="handleInput"
                        @click.stop
                    >
                    <span v-else class="block truncate text-gray-800">
                        {{ result ? result : "Search item..." }}
                    </span>
                </div>

                <button v-show="showDD" type="button" class="ml-2 text-gray-400 hover:text-red-500" @click="clearSearchQuery">
                    <Icon name="material-symbols:close-rounded" class="text-lg" />
                </button>

                <button v-if="result !== ''" type="button" class="ml-2 text-gray-400 hover:text-red-500" @click="clearSelection">
                    <Icon name="material-symbols:close-rounded" class="text-lg" />
                </button>

                <div v-if="!result" class="ml-2 text-gray-400">
                    <Icon name="iconoir:nav-arrow-down" class="text-lg" />
                </div>
            </div>
        </div>

        <Teleport to="body">
            <transition name="fade">
                <div
                    v-if="showDD"
                    class="fixed bg-white border border-slate-300 rounded-md shadow-lg max-h-72 overflow-y-auto scroll-smooth"
                    :style="{
                        top: dropdownPosition.top + 'px',
                        left: dropdownPosition.left + 'px',
                        width: dropdownPosition.width + 'px',
                        zIndex: 9999
                    }"
                    @focusin="openDD"
                    @focusout="closeDD"
                >
                    <div v-show="itemEnum.isLoading" class="p-3 flex justify-center items-center">
                        <Icon name="svg-spinners:6-dots-rotate" class="text-blue-500" />
                    </div>

                    <div v-if="itemEnum.list.length > 0" class="flex flex-col divide-y divide-slate-100">
                        <button
                            v-for="(option, i) in itemEnum.list"
                            :key="i"
                            class="text-left px-4 py-2 hover:bg-blue-50 transition-all"
                            @click="selectOption(option)"
                        >
                            <div class="text-sm font-medium text-gray-800">
                                [{{ option.item_code }}] {{ option.item_summary }}
                            </div>
                        </button>
                    </div>

                    <div v-else class="p-4 text-center text-sm text-slate-500">
                        No data available.
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
