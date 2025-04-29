<script setup>
// import { useRoute } from "vue-router"
import { useSupplierStore } from "@/stores/inventory/suppliers"
// const route = useRoute()
const mainStore = useSupplierStore()
const { createRequest } = storeToRefs(mainStore)
const validKey = ref(true)
// if (route.query.key) {
//     validKey.value = true
// } else {
//     validKey.value = false
// }
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_procurement_suppliers_group,
        ])"
    >
        <LayoutBoards title="" class="w-full" :loading="createRequest.isLoading">
            <template v-if="validKey">
                <InventoryPurchaseOrderDetails
                    id="listTable"
                    title="PURCHASE ORDER"
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
