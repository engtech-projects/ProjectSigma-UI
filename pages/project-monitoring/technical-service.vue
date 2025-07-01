<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
projectStore.viewState = false

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECTMONITORING_TSS,
        ])"
    >
        <div class="flex flex-col gap-4">
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_TSS,
                        ])"
                        title="MY DRAFTS"
                        target-id="myDrafts"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_TSS,
                        ])"
                        title="AWARDEE"
                        target-id="awardee"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_TSS,
                        ])"
                        title="ONGOING"
                        target-id="ongoing"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECTMONITORING_TSS,
                        ])"
                        title="COMPLETE"
                        target-id="complete"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="myDrafts">
                        <ProjectsAllList status="Drafts" />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="awardee">
                        <ProjectsAllList status="Awardee" />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="ongoing">
                        <ProjectsAllList status="Ongoing" />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="complete">
                        <ProjectsAllList status="Complete" />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
