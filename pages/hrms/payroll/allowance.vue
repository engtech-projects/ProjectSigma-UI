<script setup lang="ts">
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"
import { useEnumsStore } from "@/stores/hrms/enum"

const genallowances = useGenerateAllowanceStore()
// const { isEdit } = storeToRefs(stores)
// genallowstore.getMyRequests()
// genergenallowstoreateallowance.getMyApprovalRequests()
genallowances.getGA()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getDepartmentEnums()
enums.getProjectEnums()

useHead({
    title: "Generate Allowance"

})
</script>
<template>
    <div class="grid grid-cols-1 md:flex-row gap-4">
        <HrmsPayrollAllowanceForm />
        <HrmsPayrollAllowanceTable />
    </div>
</template>
