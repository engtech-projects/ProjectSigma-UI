<script setup>
import { useRoute } from "vue-router"
import { useStockTransferStore } from "@/stores/inventory/stocktransfer"
const route = useRoute()
const mainStore = useStockTransferStore()
const { stockTransfer } = storeToRefs(mainStore)
const validKey = ref(false)

if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    validKey.value = false
}

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_GROUP,
        ])"
    >
        <LayoutBoards title="STOCK TRANSFER" class="w-full" :loading="stockTransfer.isLoading">
            <template v-if="validKey">
                <InventoryStockTransferDetails
                    id="listTable"
                    :datas="transfer.details"
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
