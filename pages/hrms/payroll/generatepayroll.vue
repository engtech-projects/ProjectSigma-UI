<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
import { useEnumsStore } from "@/stores/hrms/enum"

const genpayrollstore = useGeneratePayrollStore()
genpayrollstore.getAllList()
genpayrollstore.getMyApprovalRequests()
genpayrollstore.getMyRequests()
// const { isEdit } = storeToRefs(stores)
// genpayrollstore.generatePayroll()
// genpayrollstore.createRequest()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getDepartmentEnums()
enums.getProjectEnums()

useHead({
    title: "Generate Payroll",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_generate_payroll,
        ])"
    >
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <HrmsPayrollGeneratepayrollForm />
            <!-- <HrmsPayrollGeneratepayrollTable /> -->
        </div>
    </LayoutAcessContainer>
</template>
