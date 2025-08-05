<script setup>
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECTMONITORING_PROJECTS,
        ])"
    >
        <div class="grid grid-cols-3 gap-4">
            <ProjectMonitoringRevisionsList class="col-span-1" />
            <div class="col-span-2 flex flex-col gap-4">
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
                        />
                        <AccountingCommonTabsTabTitle
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.PROJECTMONITORING_MARKETING_PROPOSALLIST,
                            ])"
                            title="Proposals"
                            target-id="proposals"
                        />
                        <AccountingCommonTabsTabTitle
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.PROJECTMONITORING_MARKETING_BIDDINGLIST,
                            ])"
                            title="Bidding"
                            target-id="bidding"
                        />
                        <AccountingCommonTabsTabTitle
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.PROJECTMONITORING_MARKETING_AWARDEDLIST,
                            ])"
                            title="Awarded"
                            target-id="awarded"
                        />
                        <AccountingCommonTabsTabTitle
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.PROJECTMONITORING_MARKETING_ARCHIVEDLIST,
                            ])"
                            title="Archived"
                            target-id="archived"
                        />
                        <AccountingCommonTabsTabTitle
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.PROJECTMONITORING_MARKETING_ONHOLDLIST,
                            ])"
                            title="On Hold"
                            target-id="onHold"
                        />
                    </template>
                    <template #tab-containers>
                        <AccountingCommonTabsTabContainer id="projectForm" />
                        <AccountingCommonTabsTabContainer id="myProjects" />
                        <AccountingCommonTabsTabContainer id="proposals" />
                        <AccountingCommonTabsTabContainer id="bidding" />
                        <AccountingCommonTabsTabContainer id="awarded" />
                        <AccountingCommonTabsTabContainer id="archived" />
                        <AccountingCommonTabsTabContainer id="onHold" />
                    </template>
                </AccountingCommonTabsMainContainer>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
