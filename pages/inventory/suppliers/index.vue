<script lang="ts" setup>
useHead({
    title: "Procurement Suppliers",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_procurement_suppliers_group,
        ])"
        class="max-w-4xl"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_forms_and_my_requests,
                    ])"
                    title="Form"
                    target-id="Form"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_all_request,
                    ])"
                    title="All Request"
                    target-id="allRequest"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_my_approvals,
                    ])"
                    title="My Approvals"
                    target-id="myApprovals"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_forms_and_my_requests,
                    ])"
                    title="My Request"
                    target-id="myRequests"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_suppliers_group,
                    ])"
                    title="Approved Suppliers"
                    target-id="approvedSuppliers"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_procurement_edit,
                    ])"
                    title="Approved Suppliers List Edit"
                    target-id="approvedSuppliersListEdit"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventoryBomForm />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryBomRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventoryBomRequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryBomRequestMyRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="approvedSuppliers">
                    <InventorySuppliersApproveSupplierList />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="approvedSuppliersListEdit">
                    <InventorySuppliersEditApproveSupplierList />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
