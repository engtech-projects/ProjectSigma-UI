<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const genallowstore = useGenerateAllowanceStore()
const { allowanceRecords } = storeToRefs(genallowstore)

</script>
<template>
    <div class="w-full">
        <HrmsPayrollAllowanceFilterSelector />
        <HrmsPayrollAllowanceRecordTable :data="allowanceRecords.data" />
    </div>
</template>
