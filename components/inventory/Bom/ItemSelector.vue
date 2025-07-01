<script lang="ts" setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"

const enums = useInventoryEnumsStore()
const { itemEnum } = storeToRefs(enums)
const emit = defineEmits(["itemSelected"])
const model = defineModel({ required: false, type: Number, default: null })
const selectedItem = ref({})
const selectedItemId = ref(null)
const searchQuery = ref("")

onMounted(() => {
    if (!itemEnum.value.isLoaded) {
        enums.getItems()
    }
})

const handleItemSelected = (selectedOption: { id: number; convertable_units: string | any[]; uom: any; uom_name: any }) => {
    model.value = selectedOption.id

    if (!selectedOption.convertable_units || selectedOption.convertable_units.length === 0) {
        itemEnum.value.itemGroupFilter = [{
            id: selectedOption.uom,
            name: selectedOption.uom_name,
        }]
    } else {
        itemEnum.value.itemGroupFilter = selectedOption.convertable_units
    }

    emit("itemSelected", selectedOption)
}

watch(searchQuery, (newVal) => {
    itemEnum.value.params.query = newVal
})
</script>

<template>
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
</template>
