<script setup>
import { useRoute } from "vue-router"
import { useRequestStockStore } from "@/stores/inventory/requeststock"
const mainStore = useRequestStockStore()
const { requestStock } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    validKey.value = false
}

const headers = [
    { name: "Quantity", id: "quantity" },
    { name: "Unit", id: "unit" },
    { name: "Item Description", id: "item_id" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Reason", id: "reason" },
    { name: "Location", id: "location" },
    { name: "Location Qty", id: "location_qty" },
    { name: "Status", id: "" },
]

useHead({
    title: "Requisition Slip",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_REQUESTSTOCK_GROUP,
        ])"
    >
        <LayoutBoards title="Requisition Slip" class="w-full" :loading="requestStock.isLoading">
            <template #header-options>
                <PsCloseBackOrPrevpage prev-page="/inventory/requisition-slip" />
            </template>
            <template #default>
                <template v-if="validKey">
                    <LayoutPrintAdvanced>
                        <template #system-layout>
                            <LayoutBoards>
                                <InventoryRequestStockSystemDetailsLayout
                                    v-if="requestStock.details"
                                    title="Requisition Slip"
                                    :data="requestStock.details"
                                />
                            </LayoutBoards>
                        </template>
                        <template #print-layout>
                            <InventoryRequestStockPrintDetailsLayout
                                v-if="requestStock.details"
                                title="Requisition Slip"
                                :data="requestStock.details"
                                :header-columns="headers"
                            />
                        </template>
                    </LayoutPrintAdvanced>
                </template>
                <template v-else>
                    <div class="grid grid-cols-1 gap-4">
                        <h2> 404 NOT FOUND</h2>
                    </div>
                </template>
            </template>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
