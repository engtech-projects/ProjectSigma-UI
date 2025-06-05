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
                        <input
                            type="file"
                            accept=".pdf,.doc, .jpg, .png, .jpeg"
                            :disable="isUploading"
                            @change="handleAttachmentChange"
                        >
                        <button
                            :disable="isUploading || isUploading"
                            class="bg-blue-500 hover:bg-blue-700 disabled:text-gray-500 text-whitefont-bold py-2 px-4 rounded"
                            @click="uploadAttachment"
                        >
                            {{ isUploading ? "Uploading..." : "Upload" }}
                        </button>
                        <a
                            v-if="projectStore.information.attachments.length > 0"
                            :href="projectStore.information.attachments[0].url"
                            target="_blank"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            View
                        </a>
                    </div>
                </div>
                <div v-if="displayableUploadError" class="text-red-500 text-sm">
                    {{ displayableUploadError }}
                </div>
            </div>

            <h1 class="text-2xl text-black uppercase font-semibold">
                Detailed Unit Price Analysis
            </h1>
        </div>

        <AccountingCommonTabsMainContainer class="w-full">
            <template #tab-titles>
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess"
                    title="BILL OF QUANTITIES"
                    target-id="billOfQuantities"
                />
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess"
                    title="SUMMARY OF RATES"
                    target-id="summaryRates"
                />
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess"
                    title="SUMMARY OF BID"
                    target-id="bidSummary"
                />
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess"
                    title="CASH FLOW"
                    target-id="cashFlow"
                />
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess&&!edit"
                    title="BILL OF MATERIALS"
                    target-id="billOfMaterials"
                />
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess&&awardee"
                    title="ESTIMATED NET INCOME"
                    target-id="estimatedNetIncome"
                />
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess&&awardee"
                    title="ESTIMATED DIRECT COST"
                    target-id="estimatedDirectCost"
                />
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess"
                    title="PCR"
                    target-id="pcr"
                />
                <AccountingCommonTabsTabTitle
                    v-if="hasVoucherDisbursementApprovalAccess"
                    title="STEWA"
                    target-id="stewa"
                />
            </template>
            <template #tab-containers>
                <AccountingCommonTabsTabContainer id="billOfQuantities">
                    <ProjectsBillofQuantities :project-id="Number(projectId)" />
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
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
projectStore.viewState = true
const edit = projectStore.viewState
const route = useRoute()
const projectId = route.query.id

const attachment = ref<File | null>(null)
const isUploading = ref(false)
const attachmentUploadErrorMsg = ref<string | null>(null)
const displayableUploadError = computed(() => attachmentUploadErrorMsg.value)

const { hasVoucherDisbursementApprovalAccess } = useCheckAccessibility()
const handleAttachmentChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    attachmentUploadErrorMsg.value = null

    if (target.files && target.files[0]) {
        const file = target.files[0]

        if (file.size > 10 * 1024 * 1024) {
            attachmentUploadErrorMsg.value = "File size exceeds the limit of 10MB."
            target.value = ""
            return
        }

        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/jpg", "image/png"]
        if (!allowedTypes.includes(file.type)) {
            attachmentUploadErrorMsg.value = "File type is not allowed."
            target.value = ""
            return
        }
        attachment.value = file
    }
}

const uploadAttachment = async () => {
    if (!attachment.value) {
        attachmentUploadErrorMsg.value = "Please select a file to upload."
        return
    }

    isUploading.value = true
    attachmentUploadErrorMsg.value = null

    try {
        const formData = new FormData()
        formData.append("file", attachment.value)
        const api = useApi()
        const response = await api.makeRequest({
            url: `/projects/${projectId}/attachments`,
            method: "POST",
            data: formData,
        })
        const data = response.data
        if (data?.url) {
            await projectStore.getProject(Number(projectId))

            if (data.url.startsWith("http://") || data.url.startsWith("https://")) {
                window.open(data.url, "_blank")
            }

            attachment.value = null
            const fileInput = document.querySelector("input[type=\"file\"]") as HTMLInputElement
            if (fileInput) {
                fileInput.value = ""
            }
        }
    } catch (error) {
        attachmentUploadErrorMsg.value = "Failed to upload file."
    } finally {
        isUploading.value = false
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
