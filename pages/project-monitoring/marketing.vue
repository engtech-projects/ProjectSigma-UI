<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECT_MONITORING_MARKETING,
        ])"
    >
        <div class="flex flex-col gap-4">
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING,
                        ])"
                        title="Project Contract Creation"
                        target-id="projectForm"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING,
                        ])"
                        title="My Drafts"
                        target-id="myDrafts"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING,
                        ])"
                        title="My Proposals"
                        target-id="myProposals"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="projectForm">
                        <ProjectsMarketingProjectsForm />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myDrafts">
                        <ProjectsMarketingDraftList status="draft" />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myProposals">
                        <ProjectsMarketingProposalList status="proposal" />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
projectStore.$reset()
</script>
