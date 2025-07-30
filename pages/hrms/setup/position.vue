<script setup>
import { usePositionStore } from "@/stores/hrms/setup/position"
const positions = usePositionStore()
positions.getPosition()

useHead({
    title: "Position",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_position,
        ])"
    >
        <LayoutContainerLastchild>
            <HrmsSetupPositionTable />
            <HrmsSetupPositionNewPosition />
            <HrmsSetupPositionEditPosition />
        </LayoutContainerLastchild>
    </LayoutAcessContainer>
</template>
