<script setup lang="ts">
import { useSalaryDisbursementStore } from "@/stores/hrms/payroll/salaryDisbursement"
useHead({
    title: "Payslip Releasing",
})
const salaryDisbursementStore = useSalaryDisbursementStore()
const compId = useId()
const route = useRoute()
const salaryDisbursement = ref()
onMounted(async () => {
    if (route.query.id) {
        salaryDisbursement.value = await salaryDisbursementStore.getOnePayslipReady(route.query.id)
    }
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_salarydisbursement_viewpayslips,
        ])"
        :comp-id="compId"
    >
        <LayoutBackOrHome v-if="!route.query.id" message="Please select a Payroll Disbursement" />
        <LayoutBackOrHome v-else-if="salaryDisbursement?.status === 'pending'" message="Payslip is still being processed" />
        <HrmsPayrollSalaryDisbursementPayslipsGeneratePayslip v-else :data="salaryDisbursement?.data ?? {}" />
    </LayoutAcessContainer>
</template>
