<script setup>
import { storeToRefs } from "pinia"
import { usePositionStore } from "@/stores/position"

const positions = usePositionStore()
const { isEdit } = storeToRefs(positions)
positions.getPosition()

useHead({
    title: "Position",
})

</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <HrmsSetupPositionNewPosition
            v-show="!isEdit"
        />
        <HrmsSetupPositionEditPosition v-show="isEdit" />
        <HrmsSetupPositionTable />
    </div>
</template>
