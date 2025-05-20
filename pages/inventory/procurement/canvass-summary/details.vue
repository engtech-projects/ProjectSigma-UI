<script setup>
import { useRoute } from "vue-router"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
const route = useRoute()
const mainStore = usePriceQuotationStore()
const { priceQuotation } = storeToRefs(mainStore)
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
            AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_GROUP,
        ])"
    >
        <LayoutBoards title="CANVASS SUMMARY" class="w-full" :loading="priceQuotation.isLoading">
            <template v-if="validKey">
                <InventoryCAnvassSummaryDetails
                    id="listTable"
                    :datas="priceQuotation.details"
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
