<script setup>
import { useRoute } from "vue-router"
import { useWithdrawalStore } from "@/stores/inventory/withdrawal"
const route = useRoute()
const mainStore = useWithdrawalStore()
const { withdrawal } = storeToRefs(mainStore)
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
            AccessibilityTypes.inventory_warehouse_withdrawal_group,
        ])"
    >
        <LayoutBoards title="MATERIALS RECEIVING REPORT" class="w-full" :loading="receiving.isLoading">
            <template v-if="validKey">
                <InventoryWithdrawalDetails
                    id="listTable"
                    :datas="withdrawal.details"
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
