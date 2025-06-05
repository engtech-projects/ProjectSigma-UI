<script setup>
const router = useRouter()
// const showCategoryModal = ref(false)

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
    },
})
</script>
<template>
    <div class="flex flex-col gap-6 p-2">
        <AccountingLoadScreen />
        <div class="flex items-center">
            <div class="flex-1 flex items-center gap-2 text-gray-500">
                <div class="flex items-center border hover:bg-gray-500 hover:text-white gap-1 bg-gray-100 rounded-lg px-4 py-1 cursor-pointer" @click="goBackOrHome">
                    <Icon name="material-symbols:arrow-back-rounded" />
                    BACK
                </div>
            </div>
        </div>
        <ProjectsInformationProject
            :label="'PROJECT INFORMATION DETAILS'"
            :name="projectDetails.name"
            :location="projectDetails.location"
            :license="projectDetails.license"
            :code="projectDetails.code"
        />
        <AccountingCommonTabsMainContainer class="w-full">
            <template #tab-titles>
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECT_MONITORING_MARKETING_GROUP,
                    ])"
                    title="BILL OF QUANTITIES"
                    target-id="billOfQuantities"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECT_MONITORING_MARKETING_GROUP,
                    ])"
                    title="SUMMARY OF RATES"
                    target-id="summaryRates"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECT_MONITORING_MARKETING_GROUP,
                    ])"
                    title="SUMMARY OF BID"
                    target-id="bidSummary"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECT_MONITORING_MARKETING_GROUP,
                    ])"
                    title="CASH FLOW"
                    target-id="cashFlow"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.PROJECT_MONITORING_MARKETING_GROUP,
                    ])"
                    title="BILL OF MATERIALS"
                    target-id="billOfMaterials"
                    class="hidden"
                />
            </template>
            <template #tab-containers>
                <AccountingCommonTabsTabContainer id="billOfQuantities">
                    <ProjectsBillofQuantities />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="summaryRates">
                    <ProjectsSummaryRates />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="bidSummary">
                    <ProjectsBidSummary />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="cashFlow">
                    <ProjectsCashFlow />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="billOfMaterials" class="hidden">
                    <ProjectsBillofMaterials />
                </AccountingCommonTabsTabContainer>
            </template>
        </AccountingCommonTabsMainContainer>
        <!-- <ProjectsDetailsTask />
        <ProjectsModalsCategory :show-modal="showCategoryModal" @hide-modal="showCategoryModal = false" /> -->
    </div>
</template>
