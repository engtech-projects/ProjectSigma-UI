<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
projectStore.viewState = false

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_GROUP,
        ])"
    >
        <div class="flex flex-col gap-4">
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_ALL,
                        ])"
                        title="MY DRAFTS"
                        target-id="myDrafts"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                        ])"
                        title="AWARDEE"
                        target-id="awardee"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="myDrafts">
                        <ProjectsAllList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="awardee">
                        <ProjectsMydraftsDetails :awardee="true" />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
