<script lang="ts" setup>
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { createRequest } = storeToRefs(mainStore)
useHead({
    title: "Procurement Suppliers",
})
const compId = useId()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_procurement_suppliers_group,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_forms_and_my_requests,
                    ])"
                    :target-id="compId + 'a'"
                    title="SUPPLIER ACCREDITATION FORM"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_all_request,
                    ])"
                    :target-id="compId + 'b'"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_my_approvals,
                    ])"
                    :target-id="compId + 'c'"
                    title="My Approvals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_forms_and_my_requests,
                    ])"
                    :target-id="compId + 'd'"
                    title="My Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_suppliers_group,
                    ])"
                    :target-id="compId + 'e'"
                    title="Approved Suppliers"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer :id="compId + 'a'">
                    <InventorySuppliersSupplierForm v-model="createRequest.form" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="compId + 'b'">
                    <InventorySuppliersRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="compId + 'c'">
                    <InventorySuppliersRequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="compId + 'd'">
                    <InventorySuppliersRequestMyRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="compId + 'e'">
                    <InventorySuppliersApproveSupplierList />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
