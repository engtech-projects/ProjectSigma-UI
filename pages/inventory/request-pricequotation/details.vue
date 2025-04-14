<script setup>
import { useRoute } from "vue-router"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
const route = useRoute()
const mainStore = usePriceQuotationStore()
const { pricequotation } = storeToRefs(mainStore)
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
            AccessibilityTypes.INVENTORY_PROCUREMENT_REQUEST_PRICE_QUOTATION_GROUP,
        ])"
    >
        <LayoutBoards title="REQUEST FOR PRICE QUOTATION" class="w-full" :loading="pricequotation.isLoading">
            <template v-if="validKey">
                <InventoryPriceQuotationDetails
                    id="listTable"
                    :datas="pricequotation.details"
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
