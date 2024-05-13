<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
import { useEnumsStore } from "@/stores/hrms/enum"

const genpayrolls = useGeneratePayrollStore()
// const { isEdit } = storeToRefs(stores)
// genallowstore.getMyRequests()
// genergenallowstoreateallowance.getMyApprovalRequests()
genpayrolls.getGPayroll()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getDepartmentEnums()
enums.getProjectEnums()

useHead({
    title: "Generate Payroll",
})

</script>

<template>
    <div class="grid grid-cols-1 md:flex-row gap-4">
        <HrmsPayrollGeneratepayrollForm />
        <HrmsPayrollGeneratepayrollTable />
    </div>
</template>
