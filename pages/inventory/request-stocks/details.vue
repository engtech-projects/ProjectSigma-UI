<script setup>
import { useRoute } from "vue-router"
import { useSupplierStore } from "@/stores/inventory/suppliers"
const route = useRoute()
const mainStore = useSupplierStore()
const { createRequest } = storeToRefs(mainStore)
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
            AccessibilityTypes.INVENTORY_REQUESTSTOCK_GROUP,
        ])"
    >
        <LayoutBoards title="SUPPLIER REQUEST DETAILS" class="w-full" :loading="createRequest.isLoading">
            <template v-if="validKey">
                <InventorySuppliersSupplierDetails
                    id="listTable"
                    :datas="createRequest.details"
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
