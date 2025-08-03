<script setup>
</script>
<template>
    <!-- Inventory / Warehouse -->
    <LayoutNavModuleGroup
        v-if="useCheckAccessibility([
            AccessibilityTypes.inventory_group,
        ])"
        title="Inventory / Warehouse"
    >
        <LayoutNavSingle
            v-if="useCheckAccessibility([
                AccessibilityTypes.inventory_dashboard,
            ])"
            linkarea="/inventory"
            icon="ic:baseline-space-dashboard"
            single-nav-title="Inventory Dashboard"
        />
        <LayoutNavGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.inventory_item_profile_group
            ])"
            icon="material-symbols:inventory-2-outline"
            title="Item Profile"
        >
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_new_item_profile,
                ])"
                linkarea="/inventory/item-profile/new-profile"
                icon="material-symbols:add-ad"
                single-nav-title="New Item Profile"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_item_profile,
                ])"
                linkarea="/inventory/item-profile/list-profile"
                icon="material-symbols:view-list"
                single-nav-title="Item Profile List"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_itemprofile_bulkupload,
                ])"
                linkarea="/inventory/item-profile/bulk-upload"
                icon="material-symbols:upload-file-outline"
                single-nav-title="Item Profile Bulk Upload"
            />
        </LayoutNavGroup>
        <LayoutNavGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.inventory_setup_group
            ])"
            icon="ion:ios-people"
            title="Setup"
        >
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_setup_approvals,
                ])"
                linkarea="/inventory/setup/approvals"
                icon="material-symbols:dynamic-form-outline-rounded"
                single-nav-title="Approvals"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_setup_item_group,
                ])"
                linkarea="/inventory/setup/item-group"
                icon="material-symbols:dynamic-form-outline-rounded"
                single-nav-title="Item Group"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_setup_unit_of_measurements,
                ])"
                linkarea="/inventory/setup/unit-of-measurement"
                icon="material-symbols:dynamic-form-outline-rounded"
                single-nav-title="Unit Of Measurement"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.INVENTORY_SETUP_APISYNCHRONIZATION,
                ])"
                linkarea="/inventory/setup/synchronization"
                icon="iconoir:refresh-double"
                single-nav-title="API Synchronization"
            />
            <LayoutNavGroup
                v-if="useCheckAccessibility([
                    AccessibilityTypes.INVENTORY_SETUP_LISTS_GROUP,
                ])"
                icon="ion:ios-people"
                title="Lists"
            >
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_SETUP_LISTS_DEPARTMENT_LIST,
                    ])"
                    linkarea="/inventory/setup/lists/department-list"
                    icon="material-symbols:view-list"
                    single-nav-title="Department List"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_SETUP_LISTS_EMPLOYEE_LIST,
                    ])"
                    linkarea="/inventory/setup/lists/employee-list"
                    icon="material-symbols:view-list"
                    single-nav-title="Employee List"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_SETUP_LISTS_USERS_LIST,
                    ])"
                    linkarea="/inventory/setup/lists/users-list"
                    icon="material-symbols:view-list"
                    single-nav-title="Users List"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_SETUP_LISTS_PROJECT_LIST,
                    ])"
                    linkarea="/inventory/setup/lists/projects-list"
                    icon="material-symbols:view-list"
                    single-nav-title="Projects List"
                />
                <LayoutNavSingle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_SETUP_LISTS_PROJECT_LIST,
                    ])"
                    linkarea="/inventory/setup/lists/warehouse-list"
                    icon="material-symbols:view-list"
                    single-nav-title="Warhouses List"
                />
            </LayoutNavGroup>
        </LayoutNavGroup>
        <LayoutNavGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.inventory_warehouse_group
            ])"
            icon="material-symbols:warehouse-outline-rounded"
            title="Warehouse"
        >
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_warehouse_group,
                ])"
                linkarea="/inventory/warehouse"
                icon="grommet-icons:overview"
                single-nav-title="Overview"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_GROUP])"
                linkarea="/inventory/stock-transfer"
                icon="mingcute:transfer-horizontal-line"
                single-nav-title="Stock Transfer"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_GROUP])"
                linkarea="/inventory/material-receiving"
                icon="mingcute:transfer-horizontal-line"
                single-nav-title="Materials Receiving"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_WITHDRAWAL_GROUP])"
                linkarea="/inventory/withdrawal"
                icon="material-symbols-light:shopping-cart-checkout-sharp"
                single-nav-title="Withdrawal"
            />
        </LayoutNavGroup>
        <LayoutNavSingle
            v-if="useCheckAccessibility([
                AccessibilityTypes.inventory_bom_group,
            ])"
            linkarea="/inventory/bom"
            icon="streamline:money-cash-coins-stack-accounting-billing-payment-stack-cash-coins-currency-money-finance"
            single-nav-title="Department BOM"
        />
        <LayoutNavSingle
            v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_REQUESTSTOCK_GROUP])"
            linkarea="/inventory/requisition-slip"
            icon="material-symbols-light:shopping-cart-checkout-sharp"
            single-nav-title="Requisition Slip"
        />
        <LayoutNavGroup
            v-if="useCheckAccessibility([
                AccessibilityTypes.inventory_procurement_group
            ])"
            icon="material-symbols:warehouse-outline-rounded"
            title="Procurement"
        >
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.inventory_procurement_suppliers_group,
                ])"
                linkarea="/inventory/suppliers"
                icon="grommet-icons:overview"
                single-nav-title="Suppliers"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP,
                ])"
                linkarea="/inventory/procurement/requests"
                icon="grommet-icons:overview"
                single-nav-title="Procurement Requests"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_GROUP,
                ])"
                linkarea="/inventory/procurement/canvass-summary"
                icon="grommet-icons:overview"
                single-nav-title="Canvass Summary"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_PURCHASEORDER_ALLLIST,
                ])"
                linkarea="/inventory/purchase-order"
                icon="grommet-icons:overview"
                single-nav-title="Purchase Order"
            />
            <LayoutNavSingle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_GROUP,
                ])"
                linkarea="/inventory/procurement/notice-of-change-po"
                icon="carbon:purchase"
                single-nav-title="NCPO"
            />
        </LayoutNavGroup>
    </LayoutNavModuleGroup>
</template>
