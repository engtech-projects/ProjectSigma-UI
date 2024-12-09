<script setup>
</script>
<template>
    <div
        v-if="useCheckAccessibility([
            AccessibilityTypes.ADMIN_ONLY,
        ])"
        class="w-full"
    >
        <div class="sticky top-0">
            PAGE UNDERGOING MAINTENANCE MODE. DEVELOPER VIEW ONLY
        </div>
        <slot />
    </div>
    <div v-else>
        <LayoutBackOrHome message="This page is under maintenance." />
    </div>
</template>
