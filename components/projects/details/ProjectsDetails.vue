<template>
    <div class="flex flex-col gap-6 p-2">
        <AccountingLoadScreen :is-loading="isLoading" />
        <div class="flex items-center">
            <div class="flex-1 flex items-center gap-2 text-gray-500">
                <div class="flex items-center border hover:bg-gray-500 hover:text-white gap-1 bg-gray-100 rounded-lg px-4 py-1">
                    <Icon name="material-symbols:arrow-back-rounded" />
                    <NuxtLink to="/project-monitoring/marketing">
                        BACK
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div>
                <h1 class="text-lg mb-4 text-left uppercase font-bold flex-2">
                    {{ information.license }}
                </h1>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <ProjectsInformationProjects
                page-title="Project Details"
                header-title="Project Details"
                :information="information"
            />
        </div>

        <AccountingCommonTabsMainContainer class="w-full">
            <template #tab-titles>
                <AccountingCommonTabsTabTitle
                    title="BILL OF QUANTITIES"
                    target-id="billOfQuantities"
                />
                <AccountingCommonTabsTabTitle
                    title="SUMMARY OF RATES"
                    target-id="summaryRates"
                />
                <AccountingCommonTabsTabTitle
                    title="SUMMARY OF BID"
                    target-id="bidSummary"
                />
                <AccountingCommonTabsTabTitle
                    title="CASH FLOW"
                    target-id="cashFlow"
                />
                <AccountingCommonTabsTabTitle
                    v-if="!edit"
                    title="BILL OF MATERIALS"
                    target-id="billOfMaterials"
                />
                <AccountingCommonTabsTabTitle
                    v-if="awardee"
                    title="ESTIMATED NET INCOME"
                    target-id="estimatedNetIncome"
                />
                <AccountingCommonTabsTabTitle
                    v-if="awardee"
                    title="ESTIMATED DIRECT COST"
                    target-id="estimatedDirectCost"
                />
                <AccountingCommonTabsTabTitle
                    title="PCR"
                    target-id="pcr"
                />
                <AccountingCommonTabsTabTitle
                    title="STEWA"
                    target-id="stewa"
                />
            </template>
            <template #tab-containers>
                <AccountingCommonTabsTabContainer id="billOfQuantities">
                    <ProjectsBillofQuantities :project-id="projectId" />
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
                <AccountingCommonTabsTabContainer v-if="!edit" id="billOfMaterials">
                    <ProjectsBillofMaterials />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer v-if="awardee" id="estimatedNetIncome">
                    <ProjectsAwardeeEstimatedNetIncome />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer v-if="awardee" id="estimatedDirectCost">
                    <ProjectsAwardeeEstimatedDirectCost />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="pcr">
                    <ProjectsProjectCompletionReport />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="stewa">
                    <ProjectsStewa />
                </AccountingCommonTabsTabContainer>
            </template>
        </AccountingCommonTabsMainContainer>

        <div class="flex justify-end pt-4pb-12">
            <button v-if="information.stage === ProjectStatus.DRAFT" class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 select-none text-white rounded-lg text-sm w-48 h-9" @click="publishProposal">
                Publish draft to Proposal
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const { information } = storeToRefs(projectStore)
projectStore.viewState = true
const edit = projectStore.viewState
const route = useRoute()
const projectId = route.query.id
await projectStore.getProject(Number(projectId))
defineProps({
    awardee: {
        type: Boolean,
        default: false
    },
})
const isLoading = ref(false)
const snackbar = useSnackbar()
projectStore.getProject(Number(projectId))
const publishProposal = async () => {
    try {
        isLoading.value = true
        await projectStore.publishProposal(Number(projectId))
        snackbar.add({
            type: "success",
            text: projectStore.successMessage
        })
        navigateTo("/project-monitoring/marketing")
    } catch {
        snackbar.add({
            type: "error",
            text: projectStore.errorMessage || "something went wrong."
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<style>
#tabContainer span.active {
    border-bottom-color: rgb(28 100 242);
    color: rgb(28 100 242);
}
.flex-2 {
    flex: 2;
}
</style>
