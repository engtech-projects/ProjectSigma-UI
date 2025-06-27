<template>
    <h2 class="text-lg font-semibold text-center mb-4">
        {{ title }}
    </h2>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP])"
    >
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
                        v-if="isShow"
                        :actions="actions"
                        @show-table="emit('show-table', $event)"
                    />
                </HrmsCommonTabsTabContainer>
                <!-- All Tab -->
                <HrmsCommonTabsTabContainer id="all">
                    <InventoryProcurementRequestAllRequestTable
                        v-if="isShow"
                        :actions="actions"
                        @show-table="emit('show-table', $event)"
                    />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    isShow: Boolean
})
const emit = defineEmits(["show-table"])
useHead({
    title: "PROCUREMENT REQUESTS",
})
</script>
