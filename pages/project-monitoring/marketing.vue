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
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING_MY_PROJECTS,
                        ])"
                        title="My Projects"
                        target-id="myProjects"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING_DRAFT_LIST,
                        ])"
                        title="Drafts"
                        target-id="drafts"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING_PROPOSAL_LIST,
                        ])"
                        title="Proposals"
                        target-id="proposals"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING_BIDDING_LIST,
                        ])"
                        title="Bidding"
                        target-id="bidding"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING_AWARDED_LIST,
                        ])"
                        title="Awarded"
                        target-id="awarded"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING_ARCHIVED_LIST,
                        ])"
                        title="Archived"
                        target-id="archived"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="projectForm">
                        <ProjectsMarketingProjectsForm />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myProjects">
                        <ProjectsMarketingProjectList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="drafts">
                        <ProjectsMarketingDraftList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="proposals">
                        <ProjectsMarketingProposalList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="bidding">
                        <ProjectsMarketingBiddingList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="awarded">
                        <ProjectsMarketingAwardedList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="archived">
                        <ProjectsMarketingArchivedList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { usePositionStore } from "@/stores/project-monitoring/positions"
const positionStore = usePositionStore()
const projectStore = useProjectStore()
projectStore.$reset()
positionStore.getAllPosition()
</script>
