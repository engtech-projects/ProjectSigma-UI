<template>
    <div class="flex flex-col gap-6 p-2">
        <div class="flex items-center">
            <div class="flex-1 flex items-center gap-2 text-gray-500">
                <div class="flex items-center border hover:bg-gray-500 hover:text-white gap-1 bg-gray-100 rounded-lg px-4 py-1">
                    <Icon name="material-symbols:arrow-back-rounded" />
                    <NuxtLink to="/project-monitoring/marketing">
                        BACK
                    </NuxtLink>
                </div>
            </div>
            <h1 class="text-lg mb-4 text-left uppercase font-bold flex-2">
                {{ projectStore.information.license }}
            </h1>
        </div>

        <div class="flex flex-col gap-4">
            <div class="flex items-end gap-1 mb-8">
                <h1 class="text-2xl text-black uppercase font-semibold">
                    Project Details
                </h1>
            </div>
            <div class="flex flex-col gap-3 mb-8">
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Project Id:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ projectStore.information.code ?? "No project yet." }}
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Contract Name:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ projectStore.information.name }}
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Location:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ projectStore.information.location }}
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Attachment:
                    </span>
                    <div class="flex gap-2">
                        <input type="file" @change="handleAttachmentChange" />
                        <button @click="uploadAttachment" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Upload
                        </button>
                        <a v-if="projectStore.information.attachments.length > 0" :href="projectStore.information.attachments[0].url" target="_blank" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            View
                        </a>
                    </div>
                </div>
            </div>

            <h1 class="text-2xl text-black uppercase font-semibold">
                Detailed Unit Price Analysis
            </h1>
        </div>

        <AccountingCommonTabsMainContainer class="w-full">
            <template #tab-titles>
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="BILL OF QUANTITIES"
                    target-id="billOfQuantities"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="SUMMARY OF RATES"
                    target-id="summaryRates"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="SUMMARY OF BID"
                    target-id="bidSummary"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="CASH FLOW"
                    target-id="cashFlow"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])&&!edit"
                    title="BILL OF MATERIALS"
                    target-id="billOfMaterials"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])&&awardee"
                    title="ESTIMATED NET INCOME"
                    target-id="estimatedNetIncome"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])&&awardee"
                    title="ESTIMATED DIRECT COST"
                    target-id="estimatedDirectCost"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="PCR"
                    target-id="pcr"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
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
    </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { AccessibilityTypes } from "@/types/accessibility"
import { useCheckAccessibility } from "@/composables/useCheckAccessibility"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useApi } from "@/composables/useApi"

const projectStore = useProjectStore()
projectStore.viewState = true
const edit = projectStore.viewState
const route = useRoute()
const projectId = route.query.id

const attachment = ref(null)

const handleAttachmentChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files) {
        attachment.value = target.files[0]
    }
}

const uploadAttachment = async () => {
    const formData = new FormData()
    formData.append("file", attachment.value)
    const { data } = await useApi(`projects/${projectId}/attachments`, {
        method: "POST",
        data: formData,
    })
    if (data) {
        window.open(data.url, "_blank")
    }
}

defineProps({
    awardee: {
        type: Boolean,
        default: false
    },
})
projectStore.getProject(Number(projectId))
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
