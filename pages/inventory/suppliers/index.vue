<script lang="ts" setup>
import { useSupplierStore } from "@/stores/inventory/suppliers"
const mainStore = useSupplierStore()
const { createRequest } = storeToRefs(mainStore)
useHead({
    title: "Procurement Suppliers",
})
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
                    title="SUPPLIER ACCREDITATION FORM"
                    target-id="Form"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_all_request,
                    ])"
                    title="All Request"
                    target-id="allRequest"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_my_approvals,
                    ])"
                    title="My Approvals"
                    target-id="myApprovals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_forms_and_my_requests,
                    ])"
                    title="My Request"
                    target-id="myRequests"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_suppliers_group,
                    ])"
                    title="Approved Suppliers"
                    target-id="approvedSuppliers"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventorySuppliersSupplierForm v-model="createRequest.form" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventorySuppliersRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventorySuppliersRequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventorySuppliersRequestMyRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="approvedSuppliers">
                    <InventorySuppliersApproveSupplierList />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
