<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const genallowstore = useGenerateAllowanceStore()
const { allowanceRecords } = storeToRefs(genallowstore)

</script>
<template>
    <LayoutBoards class="w-full">
        <HrmsPayrollAllowanceFilterSelector />
        <HrmsPayrollAllowanceRecordTable :data="allowanceRecords.data" />
    </LayoutBoards>
</template>
