<script setup>
import { useProjectStore } from "~/stores/project-monitoring/projects"
const router = useRouter()
const projectStore = useProjectStore()
const boardLoading = ref(false)

const goBackOrHome = () => {
    if (router.options.history.state.back) {
        router.back()
    } else {
        navigateTo("/project-monitoring/marketing")
    }
}

defineProps({
    projectDetails: {
        type: Object,
        required: true,
    }
})
</script>
<template>
    <div class="flex flex-col gap-6 p-2 relative">
        <AccountingLoadScreen class="z-50" :is-loading="boardLoading" />
        <div class="flex items-center">
            <div class="flex-1 flex items-center gap-2 text-gray-500">
                <div class="flex items-center border hover:bg-gray-500 hover:text-white gap-1 bg-gray-100 rounded-lg px-4 py-1 cursor-pointer" @click="goBackOrHome">
                    <Icon name="material-symbols:arrow-back-rounded" />
                    BACK
                </div>
            </div>
        </div>
        <AccountingCommonTabsMainContainer class="w-full">
            <template #info-details>
                <ProjectMonitoringInformationProject
                    :label="'PROJECT INFORMATION DETAILS'"
                    :name="projectDetails?.name"
                    :location="projectDetails?.location"
                    :license="projectDetails?.license"
                    :code="projectDetails?.contract_id"
                    :stage-status="projectDetails?.stage"
                />
            </template>
            <template #tab-titles>
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECTMONITORING_MARKETING_GROUP,
                    ])"
                    title="BILL OF QUANTITIES"
                    target-id="billOfQuantities"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECTMONITORING_MARKETING_GROUP,
                    ])"
                    title="SUMMARY OF RATES"
                    target-id="summaryRates"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECTMONITORING_MARKETING_GROUP,
                    ])"
                    title="SUMMARY OF BID"
                    target-id="bidSummary"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECTMONITORING_MARKETING_GROUP,
                    ])"
                    title="CASH FLOW"
                    target-id="cashFlow"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECTMONITORING_MARKETING_GROUP,
                    ])"
                    title="BILL OF MATERIALS"
                    target-id="billOfMaterials"
                    class="hidden"
                />
            </template>
            <template #tab-options>
                <ProjectAttachmentUploadButton />
                <ProjectAttachmentsViewButton />
                <ProjectMonitoringProjectStageButton
                    v-if="!projectStore.viewState
                        && projectStore.information
                        && projectStore.information.stage
                        && projectStore.information.stage.toLowerCase() !== useProjectMarketingStatusEnums.stages[useProjectMarketingStatusEnums.stages.length - 1].toLowerCase()"
                    :stage="projectDetails.stage"
                    @updating-stage="boardLoading = true"
                    @update-success="boardLoading = false"
                />
            </template>
            <template #tab-containers>
                <AccountingCommonTabsTabContainer id="billOfQuantities">
                    <ProjectMonitoringSharedBillOfQuantities />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="summaryRates">
                    <ProjectMonitoringMarketingProjectDetailsSummaryOfRates />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="bidSummary">
                    <ProjectMonitoringSharedSummaryOfBid />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="cashFlow">
                    <ProjectMonitoringMarketingProjectDetailsCashFlow />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="billOfMaterials" class="hidden">
                    <ProjectMonitoringSharedBillOfMaterials />
                </AccountingCommonTabsTabContainer>
            </template>
        </AccountingCommonTabsMainContainer>
        <!-- <ProjectsDetailsTask />
        <ProjectsModalsCategory :show-modal="showCategoryModal" @hide-modal="showCategoryModal = false" /> -->
    </div>
</template>
