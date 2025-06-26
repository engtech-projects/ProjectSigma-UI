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

defineProps({
    conversion: {
        type: Number,
        required: true
    },
    itemId: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(["watchItem"])

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
        const { bottom, left, width } = compContainer.value.getBoundingClientRect()
        dropdownPosition.value = {
            top: bottom + window.scrollY,
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
    result.value = option.name
    model.value = option.id
    emit("watchItem", option)
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
watch(() => itemEnum.value.itemGroupFilter, (newFilter) => {
    if (newFilter && newFilter.length === 1) {
        const singleOption = newFilter[0]
        result.value = singleOption.name
        model.value = singleOption.id
        emit("watchItem", singleOption)
    }
}, { immediate: true })

watch(() => model.value, (newValue) => {
    if (newValue && itemEnum.value.itemGroupFilter) {
        const selectedOption = itemEnum.value.itemGroupFilter.find(opt => opt.id === newValue)
        if (selectedOption) {
            result.value = selectedOption.name
        }
    }
}, { immediate: true })
</script>

<template>
    <div ref="forFocusOut" tabindex="0" class="relative w-full">
        <div
            :id="compId"
            ref="compContainer"
            tabindex="0"
            class="w-full"
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
                        placeholder="Search UOM..."
                        class="w-full h-8 px-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                        @click.stop
                    >
                    <span v-else class="block truncate text-gray-800">
                        {{ result ? result : "Search UOM..." }}
                    </span>
                </div>

                <button v-show="showDD" type="button" class="ml-2 text-gray-400 hover:text-red-500" @click="clearSearchQuery">
                    <Icon name="material-symbols:close-rounded" class="text-lg" />
                </button>

                <button v-if="result" type="button" class="ml-2 text-gray-400 hover:text-red-500" @click="clearSelection">
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

                    <div v-if="itemEnum.itemGroupFilter.length > 0" class="flex flex-col divide-y divide-slate-100">
                        <button
                            v-for="(option, i) in itemEnum.itemGroupFilter"
                            :key="i"
                            type="button"
                            class="text-left px-4 py-2 hover:bg-blue-50 transition-all text-sm text-gray-800"
                            @click="selectOption(option)"
                        >
                            {{ option.name }}
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
