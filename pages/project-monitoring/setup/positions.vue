<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore } from "@/stores/project-monitoring/positions"

const positionStore = usePositionStore()
const { isEdit } = storeToRefs(positionStore)
positionStore.getPositions()

useHead({
    title: "Positions",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECT_MONITORING_SETUP_POSITION,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <ProjectsPositionsCreate
                v-show="!isEdit"
                class="flex-1"
            />
            <ProjectsPositionsEdit v-show="isEdit" class="flex-1" />
            <ProjectsPositionsList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
