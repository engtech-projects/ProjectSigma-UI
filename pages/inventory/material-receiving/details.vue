<script setup>
import { useRoute } from "vue-router"
import { useReceivingStore } from "@/stores/inventory/receiving"
const route = useRoute()
const mainStore = useReceivingStore()
const { receiving } = storeToRefs(mainStore)
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
            AccessibilityTypes.INVENTORY_WAREHOUSE_MATERIALS_RECEIVING_GROUP,
        ])"
    >
        <LayoutBoards title="MATERIALS RECEIVING REPORT" class="w-full" :loading="receiving.isLoading">
            <template v-if="validKey">
                <InventoryReceivingDetails
                    id="listTable"
                    :datas="receiving.details"
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
