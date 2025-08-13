<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { usePositionStore } from "@/stores/project-monitoring/positions"
import { useRevisionStore } from "@/stores/project-monitoring/revisions"
const positionStore = usePositionStore()
const projectStore = useProjectStore()
const revisionStore = useRevisionStore()
projectStore.$reset()
onMounted(() => {
    positionStore.getAllPositions()
})
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
        <div class="grid gap-4">
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
                                AccessibilityTypes.PROJECTMONITORING_MARKETING_MYPROJECTS,
                            ])"
                            title="Project Catalog"
                            target-id="projectCatalog"
                            @click.once="revisionStore.getAllRevisions()"
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
                            <ProjectMonitoringMarketingTabsProjectsForm />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="projectCatalog">
                            <ProjectMonitoringRevisionsList />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="myProjects">
                            <ProjectMonitoringMarketingTabsProjectList />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="proposals">
                            <ProjectMonitoringMarketingTabsProposalList />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="bidding">
                            <ProjectMonitoringMarketingTabsBiddingList />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="awarded">
                            <ProjectMonitoringMarketingTabsAwardedList />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="archived">
                            <ProjectMonitoringMarketingTabsArchivedList />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="onHold">
                            <ProjectMonitoringMarketingTabsOnholdList />
                        </AccountingCommonTabsTabContainer>
                    </template>
                </AccountingCommonTabsMainContainer>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
