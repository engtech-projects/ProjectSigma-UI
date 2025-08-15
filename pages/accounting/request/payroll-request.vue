<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_REQUEST_PRE_PAYROLL_AUDIT,
        ])"
    >
        <div class="flex flex-col gap-4">
            <div>
                <p class="text-xl font-semibold">
                    Payment Request Form (Payroll)
                </p>
            </div>
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        title="All List"
                        target-id="allList"
                        @click.once="payrollRequestStore.getAllRequests()"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="allList">
                        <AccountingRequestPayrollRequestAllList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
<script setup>
import { usePayrollRequestStore } from "@/stores/accounting/requests/payrollrequest"
const payrollRequestStore = usePayrollRequestStore()
onMounted(() => {
    payrollRequestStore.getAllRequests()
})
</script>
