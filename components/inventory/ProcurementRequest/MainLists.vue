<script setup lang="ts">
const router = useRouter()
const showProcurementRequestInfo = (eventItem) => {
    router.push({ query: { pr_id: eventItem.id } })
}
const actions = {
    showTable: true,
}
</script>
<template>
    <HrmsCommonTabsMainContainer>
        <template #tab-titles>
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_REQUESTLISTONGOING,
                ])"
                target-id="ongoing"
                title="Ongoing"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_REQUESTLISTALL,
                ])"
                target-id="all"
                title="All"
            />
        </template>
        <template #tab-containers>
            <!-- Ongoing Tab -->
            <HrmsCommonTabsTabContainer id="ongoing">
                <InventoryProcurementRequestOngoingTable
                    :actions="actions"
                    @show-table="showProcurementRequestInfo"
                />
            </HrmsCommonTabsTabContainer>
            <!-- All Tab -->
            <HrmsCommonTabsTabContainer id="all">
                <InventoryProcurementRequestAllRequestTable
                    :actions="actions"
                    @show-table="showProcurementRequestInfo"
                />
            </HrmsCommonTabsTabContainer>
        </template>
    </HrmsCommonTabsMainContainer>
</template>
