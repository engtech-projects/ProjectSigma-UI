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
                    'AdminOnly',
                ])"
                linkarea="/inventory/setup/synchronization"
                icon="iconoir:user-square"
                single-nav-title="Synchronization"
            />
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
            v-if="useCheckAccessibility([AccessibilityTypes.inventory_request_stock_group])"
            linkarea="/inventory/request-stocks"
            icon="material-symbols-light:shopping-cart-checkout-sharp"
            single-nav-title="Request Stocks"
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
                    AccessibilityTypes.INVENTORY_PROCUREMENT_REQUESTPRICEQUOTATION_GROUP,
                ])"
                linkarea="/inventory/request-price-quotation"
                icon="grommet-icons:overview"
                single-nav-title="Price Quotation"
            />
            <LayoutNavSingle
                linkarea="/inventory/purchase-order"
                icon="grommet-icons:overview"
                single-nav-title="Purchase Order"
            />
        </LayoutNavGroup>
    </LayoutNavModuleGroup>
</template>
