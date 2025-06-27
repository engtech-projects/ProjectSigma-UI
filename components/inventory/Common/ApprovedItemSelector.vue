<script lang="ts" setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"
const enums = useInventoryEnumsStore()
const { itemEnum } = storeToRefs(enums)

onMounted(() => {
    if (!itemEnum.value.isLoaded) {
        enums.getItemList()
    }
})

const model = defineModel({ required: false, type: Number, default: null })
defineProps({
    showAll: { type: Boolean, default: false }
})

const itemData = ref({})

const formattedItemList = computed(() => {
    return enums.filteredItemList.map(item => ({
        ...item,
        display_text: `[${item.item_code || ""}] ${item.item_summary || ""}`,
        item_code: `[${item.item_code || ""}] ${item.item_summary || ""}`
    }))
})
</script>

<template>
    <LayoutFormPsSelectSearch
        v-model:result="itemData"
        v-model:result-id="model"
        v-model:search-input="itemEnum.localFilter.item_summary"
        :search-list="formattedItemList"
        :loading="itemEnum.isLoading"
        title="item_summary"
        placeholder="Search Item"
    />
</template>
