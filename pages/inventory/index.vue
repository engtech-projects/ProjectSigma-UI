<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_dashboard,
        ])"
    >
        <div
            class="w-full"
        >
            Inventory Dashboard
        </div>
    </LayoutAcessContainer>
</template>
