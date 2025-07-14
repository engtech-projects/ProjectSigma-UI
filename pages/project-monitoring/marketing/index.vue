<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { usePositionStore } from "@/stores/project-monitoring/positions"
const positionStore = usePositionStore()
const projectStore = useProjectStore()
projectStore.$reset()
positionStore.getAllPositions()
definePageMeta({
    layout: "default",
})
useHead({
    title: "Marketing",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECTMONITORING_MARKETING_GROUP,
        ])"
    >
        <div class="flex flex-col gap-4">
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        title="Project Contract Creation"
                        target-id="projectForm"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_MARKETING_MYPROJECTS,
                        ])"
                        title="My Projects"
                        target-id="myProjects"
                        @click.once="projectStore.getMyProjects()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_MARKETING_PROPOSALLIST,
                        ])"
                        title="Proposals"
                        target-id="proposals"
                        @click.once="projectStore.getProposalProjects()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_MARKETING_BIDDINGLIST,
                        ])"
                        title="Bidding"
                        target-id="bidding"
                        @click.once="projectStore.getBiddingProjects()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_MARKETING_AWARDEDLIST,
                        ])"
                        title="Awarded"
                        target-id="awarded"
                        @click.once="projectStore.getAwardedProjects()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_MARKETING_ARCHIVEDLIST,
                        ])"
                        title="Archived"
                        target-id="archived"
                        @click.once="projectStore.getArchivedProjects()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_MARKETING_ONHOLDLIST,
                        ])"
                        title="On Hold"
                        target-id="onHold"
                        @click.once="projectStore.getOnHoldProjects()"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="projectForm">
                        <ProjectsMarketingProjectsForm />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myProjects">
                        <ProjectsMarketingProjectList />
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
                    <AccountingCommonTabsTabContainer id="onHold">
                        <ProjectsMarketingOnholdList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
