<script setup>
// import { storeToRefs } from "pinia"
import { useAllowanceStore } from "@/stores/hrms/setup/allowance"

const allowances = useAllowanceStore()
// const { isEdit } = storeToRefs(allowances)
allowances.getPositionAllowances()

useHead({
    title: "Allowance",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_allowance,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <HrmsSetupAllowanceTable />
        </div>
    </LayoutAcessContainer>
</template>
