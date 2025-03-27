<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
projectStore.viewState = true

const voucherStore = useVoucherStore()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_GROUP,
        ])"
    >
        <div class="flex flex-col gap-4">
            <!-- <div class="w-full">
                <p class="text-xl">
                    Disbursement Voucher
                </p>
            </div> -->
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                        ])"
                        title="Project Form"
                        target-id="projectForm"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_ALL,
                        ])"
                        title="My Drafts"
                        target-id="myDrafts"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="projectForm">
                        <ProjectsForm />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myDrafts">
                        <ProjectsAllList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
            <div class="w-full">
                <AccountingVoucherDisbursementRequestForm
                    v-if="voucherStore.voucherDisbursement.reference_no"
                    :fillable="true"
                />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
