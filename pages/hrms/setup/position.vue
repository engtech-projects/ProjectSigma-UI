<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore } from "@/stores/hrms/setup/position"
const positions = usePositionStore()
const { isEdit } = storeToRefs(positions)
positions.getAllPositions()

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
        <div class="flex flex-col md:flex-row gap-4">
            <HrmsSetupPositionNewPosition
                v-show="!isEdit"
            />
            <HrmsSetupPositionEditPosition v-show="isEdit" />
            <HrmsSetupPositionTable />
        </div>
    </LayoutAcessContainer>
</template>
