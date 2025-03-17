<script setup>
import { usePayrollParticularTerms } from "~/stores/hrms/setup/payroll-particular-terms"
const resourceStore = usePayrollParticularTerms()
const { isEdit } = storeToRefs(resourceStore)

useHead({
    title: "Payroll Particular Terms",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_payrollparticularterms,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <HrmsSetupPayrollParticularTermsCreateForm v-show="!isEdit" />
            <HrmsSetupPayrollParticularTermsEditForm v-show="isEdit" />
            <HrmsSetupPayrollParticularTermsAllResouces />
        </div>
    </LayoutAcessContainer>
</template>
