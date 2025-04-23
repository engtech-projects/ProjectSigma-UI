<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
projectStore.getParams.status = "proposal"
projectStore.getProjects()

onMounted(() => {
    projectStore.$reset()
    projectStore.viewState = true
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECT_MONITORING_MARKETING,
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
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING,
                        ])"
                        title="Project Contract"
                        target-id="projectForm"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.PROJECT_MONITORING_MARKETING,
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
                        <ProjectsAllList status="draft" />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
