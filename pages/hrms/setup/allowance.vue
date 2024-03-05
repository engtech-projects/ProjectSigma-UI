<script setup>
// import { storeToRefs } from "pinia"
import { useAllowanceStore } from "@/stores/hrms/allowance"

const allowances = useAllowanceStore()
// const { isEdit } = storeToRefs(allowances)
allowances.getPositionAllowances()

useHead({
    title: "Allowance",
})

</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <HrmsSetupAllowanceTable />
    </div>
</template>
