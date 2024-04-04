<script setup>
import { useTravelorderStore } from "@/stores/hrms/travelorder"

const travels = useTravelorderStore()

</script>
<template>
    <div class="w-full">
        <HrmsSetupApprovalsList
            v-for="(approv, apr) in travels.approvals"
            :key="apr"
            v-model="travels.approvals[apr]"
        />
    </div>
</template>
