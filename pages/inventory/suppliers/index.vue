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
                    :target-id="compId + '1'"
                    title="SUPPLIER ACCREDITATION FORM"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_all_request,
                    ])"
                    :target-id="compId + '2'"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_my_approvals,
                    ])"
                    :target-id="compId + '3'"
                    title="My Approvals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_forms_and_my_requests,
                    ])"
                    :target-id="compId + '4'"
                    title="My Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_suppliers_group,
                    ])"
                    :target-id="compId + '5'"
                    title="Approved Suppliers"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer :id="compId + '1'">
                    <InventorySuppliersSupplierForm v-model="createRequest.form" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="compId + '2'">
                    <InventorySuppliersRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="compId + '3'">
                    <InventorySuppliersRequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="compId + '4'">
                    <InventorySuppliersRequestMyRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="compId + '5'">
                    <InventorySuppliersApproveSupplierList />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
