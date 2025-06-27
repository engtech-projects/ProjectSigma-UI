<script setup lang="ts">
import { useInventoryEnumsStore } from "@/stores/inventory/enum"

const enums = useInventoryEnumsStore()
const { itemEnum } = storeToRefs(enums)

defineProps({
    index: {
        type: Number,
        required: true,
    }
})

const emit = defineEmits(["removeItem", "itemSelected"])
const doRemoveItem = (item: any) => emit("removeItem", item)

const item = defineModel("item", { required: true, type: Object, default: null })

const compId = useId()
const selectedItem = ref({})
const selectedItemId = ref(null)
const searchQuery = ref("")
const selectedUom = ref({})
const selectedUomId = ref(null)
const uomSearchQuery = ref("")

onMounted(() => {
    if (!itemEnum.value.isLoaded) {
        enums.getItems()
    }
})

const amount = computed(() => {
    return item.value.unit_price * item.value.quantity
})

const watchUnitChange = (selectedUomOption) => {
    if (item.value.conversion) {
        const baseValue = parseFloat(item.value.quantity) / parseFloat(item.value.conversion)
        item.value.conversion = selectedUomOption.conversion
        item.value.quantity = baseValue * selectedUomOption.conversion
    } else {
        item.value.conversion = selectedUomOption.conversion
    }

    item.value.uom_id = selectedUomOption.id
    item.value.uom_name = selectedUomOption.name
}
const uomOptions = computed(() => {
    if (!item.value || !item.value.item_id) { return [] }
    if (!item.value.convertable_units || item.value.convertable_units.length === 0) {
        return [{
            id: item.value.uom_id,
            name: item.value.uom_name,
            conversion: item.value.conversion || 1,
        }]
    }
    return item.value.convertable_units
})
const handleItemSelected = (selectedOption) => {
    item.value.item_id = selectedOption.id
    item.value.item_code = selectedOption.item_code
    item.value.item_summary = selectedOption.item_summary
    item.value.default_uom_name = selectedOption.uom_name
    item.value.uom_id = selectedOption.uom
    item.value.uom_name = selectedOption.uom_name
    item.value.conversion = 1

    // Save convertable_units in item itself
    item.value.convertable_units = selectedOption.convertable_units || []

    emit("itemSelected", selectedOption)

    // Auto-set default UOM if only one option exists
    if (uomOptions.value.length === 1) {
        selectedUom.value = uomOptions.value[0]
        selectedUomId.value = uomOptions.value[0].id
        watchUnitChange(uomOptions.value[0])
    }
}

watch(searchQuery, (newVal) => {
    itemEnum.value.params.query = newVal
})
watch(() => itemEnum.value.itemGroupFilter, (newFilter) => {
    if (newFilter && newFilter.length === 1) {
        const singleOption = newFilter[0]
        selectedUom.value = singleOption
        selectedUomId.value = singleOption.id
        watchUnitChange(singleOption)
    }
}, { immediate: true })

const isDisabled = computed(() => {
    return uomOptions.value.length <= 1
})
</script>

<template>
    <tr class="border-b-2 border-gray-300">
        <td colspan="1" class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
            <LayoutFormPsSelectSearch
                v-model:result="selectedItem"
                v-model:result-id="selectedItemId"
                v-model:search-input="searchQuery"
                :search-list="itemEnum.list"
                :loading="itemEnum.isLoading"
                title="item_summary"
                placeholder="Search item..."
                @update:result="handleItemSelected"
            />
        </td>
        <td colspan="1" class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
            <LayoutFormPsSelectSearch
                v-if="!isDisabled"
                v-model:result="selectedUom"
                v-model:result-id="selectedUomId"
                v-model:search-input="uomSearchQuery"
                :search-list="uomOptions"
                :loading="false"
                title="name"
                placeholder="Search UOM..."
                class="min-w-[200px]"
                @update:result="watchUnitChange"
            />
            <span v-else class="text-sm text-gray-800 flex items-center justify-center">
                {{ item.default_uom_name }}
            </span>
        </td>

        <td class="p-2 text-center align-top">
            <input
                :id="compId"
                v-model="item.unit_price"
                type="number"
                class="w-full border border-slate-600 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md px-3 py-2 text-sm"
                required
            >
        </td>

        <td class="p-2 text-center align-top">
            <input
                :id="compId"
                v-model="item.quantity"
                type="number"
                step="any"
                class="w-full border border-slate-600 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md px-3 py-2 text-sm"
                required
            >
        </td>

        <td colspan="1" class="px-2 py-2 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            ₱{{ useFormatCurrency(amount || 0) }}
        </td>

        <td class="p-2 text-center align-middle">
            <button
                type="button"
                class="rounded-full p-1 bg-transparent hover:bg-red-600 hover:text-white transition duration-150 ease-in-out"
                title="Remove item"
                @click="doRemoveItem(index)"
            >
                <Icon name="mdi:remove" class="h-5 w-5" />
            </button>
        </td>
    </tr>
</template>
