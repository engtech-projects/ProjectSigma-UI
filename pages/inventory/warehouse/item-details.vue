<script setup>
import { useRoute } from "vue-router"
import { useWarehouseStore } from "@/stores/inventory/warehouse"
const route = useRoute()
const mainStore = useWarehouseStore()
const { itemHistory } = storeToRefs(mainStore)
const validKey = ref(false)

if (route.query.key) {
    validKey.value = true
    await mainStore.getItemHistory(route.query.key)
} else {
    validKey.value = false
}
const headers = [
    { name: "Item", id: "item_code" },
]
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_procurement_suppliers_group,
        ])"
    >
        <LayoutBoards title="Item History" class="w-full" :loading="itemHistory.isLoading">
            <template v-if="validKey">
                <InventoryWarehouseDetails
                    id="listTable"
                    :header-columns="headers"
                    :data="itemHistory.list"
                />
            </template>
            <template v-else>
                <div class="grid grid-cols-1 gap-4">
                    <h2> 404 NOT FOUND</h2>
                </div>
            </template>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
