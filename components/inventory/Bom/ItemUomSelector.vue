<script lang="ts" setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"

const enums = useInventoryEnumsStore()
const { itemEnum } = storeToRefs(enums)

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
const model = defineModel({ required: false, type: Number, default: null })
const selectedUom = ref({})
const selectedUomId = ref(null)
const searchQuery = ref("")

onMounted(() => {
    if (!itemEnum.value.isLoaded) {
        enums.getItems()
    }
})

const handleUomSelected = (selectedOption: { id: number }) => {
    model.value = selectedOption.id
    emit("watchItem", selectedOption)
}

watch(() => itemEnum.value.itemGroupFilter, (newFilter) => {
    if (newFilter && newFilter.length === 1) {
        const singleOption = newFilter[0]
        selectedUom.value = singleOption
        selectedUomId.value = singleOption.id
        model.value = singleOption.id
        emit("watchItem", singleOption)
    }
}, { immediate: true })

watch(() => model.value, (newValue) => {
    if (newValue && itemEnum.value.itemGroupFilter) {
        const selectedOption = itemEnum.value.itemGroupFilter.find(opt => opt.id === newValue)
        if (selectedOption) {
            selectedUom.value = selectedOption
            selectedUomId.value = selectedOption.id
        }
    }
}, { immediate: true })
</script>

<template>
    <LayoutFormPsSelectSearch
        v-model:result="selectedUom"
        v-model:result-id="selectedUomId"
        v-model:search-input="searchQuery"
        :search-list="itemEnum.itemGroupFilter || []"
        :loading="itemEnum.isLoading"
        title="name"
        placeholder="Search UOM..."
        @update:result="handleUomSelected"
    />
</template>
