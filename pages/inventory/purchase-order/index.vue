<!-- index.vue -->
<script lang="ts" setup>
import { ref } from "vue"

useHead({
    title: "Purchase Order",
})

// Define the view state to manage which component is shown
const currentView = ref("main") // 'main', 'details', 'ncpo'
const selectedItem = ref(null)
const poNumber = ref("")

// Function to handle navigation between views
const navigateToView = (view, data = null) => {
    currentView.value = view
    if (data) {
        selectedItem.value = data
        if (data.po_number) {
            poNumber.value = data.po_number
        }
    }
}

// Function to go back to previous view
const goBack = () => {
    if (currentView.value === "ncpo") {
        currentView.value = "details"
    } else if (currentView.value === "details") {
        currentView.value = "main"
    }
}
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_GROUP])"
        class="w-full"
    >
        <!-- Back button that appears only when not on main view -->
        <div v-if="currentView !== 'main'" class="flex justify-end p-2">
            <button
                class="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                @click="goBack"
            >
                <Icon name="mdi:close" class="h-5 w-5 text-gray-700" />
            </button>
        </div>

        <!-- Main view with tabs -->
        <div v-if="currentView === 'main'">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_ALLREQUEST])"
                        target-id="allRequest"
                        title="All Requests"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="allRequest">
                        <InventoryPurchaseOrderRequestAllRequests
                            @show-details="navigateToView('details', $event)"
                        />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>

        <!-- Details view -->
        <div v-else-if="currentView === 'details'">
            <InventoryPurchaseOrderDetails
                title="Purchase Order Details"
                :item-id="selectedItem?.id"
                @create-ncpo="navigateToView('ncpo', { po_number: poNumber })"
            />
        </div>

        <!-- NCPO form view -->
        <div v-else-if="currentView === 'ncpo'">
            <InventoryNoticeOfChangePOForm :po-number="poNumber" />
        </div>
    </LayoutAcessContainer>
</template>
