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
                    target-id="Form"
                    title="SUPPLIER ACCREDITATION FORM"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_all_request,
                    ])"
                    target-id="allRequest"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_my_approvals,
                    ])"
                    target-id="myApprovals"
                    title="My Approvals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_forms_and_my_requests,
                    ])"
                    target-id="myRequests"
                    title="My Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_suppliers_group,
                    ])"
                    target-id="approvedSuppliers"
                    title="Approved Suppliers"
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
