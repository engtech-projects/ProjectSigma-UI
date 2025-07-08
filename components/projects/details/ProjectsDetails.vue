<script setup lang="ts">
import { useProjectStore } from "@/stores/project-monitoring/projects"

const route = useRoute()
const snackbar = useSnackbar()
const attachments = ref()

const projectStore = useProjectStore()

const uploadAttachment = async (event: any) => {
    try {
        const projectId = Number(route.params?.id)
        if (!projectId) {
            throw new Error("Missing project ID from route")
        }

        const file = event.target.files[0]
        if (!file) {
            throw new Error("No file selected")
        }
        const formData = new FormData()
        formData.append("attachments", file)

        const files: File[] = [file]
        await projectStore.uploadAttachments(projectId, files)

        snackbar.add({
            type: "success",
            text: "File uploaded successfully",
        })
    } catch (error: any) {
        snackbar.add({
            type: "error",
            text: error.message || "Upload failed",
        })
    }
}

const viewDocumentAttachments = async () => {
    const projectId = Number(route.params?.id)

    if (!projectId) {
        snackbar.add({
            type: "error",
            text: "Missing project ID from route.",
        })
        return
    }

    try {
        const { data, error } = await useFetch(`/api/v1/projects/${projectId}/document-viewer`, {
            method: "GET",
        })

        if (error.value) {
            throw new Error(error.value?.data?.message || "Unable to get viewer link")
        }

        const viewerUrl = data.value
        if (!viewerUrl) {
            throw new Error("Empty viewer URL received")
        }

        window.open(viewerUrl, "_blank")
        // Optional success snackbar (remove if not needed)
        snackbar.add({
            type: "success",
            text: "Opening document viewer..."
        })
    } catch (err: any) {
        snackbar.add({
            type: "error",
            text: err.message || "Failed to open document viewer"
        })
    }
}
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
        <div class="w-full flex items-center justify-center">
            <div>
                <h1 class="text-lg text-center uppercase font-bold">
                    {{ projectDetails.license }}
                </h1>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex items-end gap-1 mb-8">
                <h1 class="text-2xl text-black uppercase font-semibold">
                    PROJECT INFORMATION DETAILS
                </h1>
            </div>
            <div class="flex flex-col gap-3 mb-8">
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Project Id:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ projectDetails.code ?? "No project yet." }}
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Contract Name:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ projectDetails.name }}
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Location:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        {{ projectDetails.location }}
                    </span>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-row gap-4 justify-start mt-4">
                        LayoutFormPsSelect
                        v-model="attachments.form.attachment_name"
                        :options-list="[
                        'PLANS',
                        'PROGRAM OF WORKS',
                        'CONTRACT AGREEMENT',
                        'PERMIT',
                        'OTHERS'
                        ]"
                        class="w-full"
                        title="Attachment Type"
                        >

                        <LayoutFormPsTextInput
                            v-if="attachments.form.attachment_name === 'OTHERS'"
                            v-model="attachments.form.other_type"
                            class="w-full"
                            title="File Name"
                        />

                        <div class="w-full">
                            <label class="block mb-1 text-sm font-medium text-gray-900">
                                File
                            </label>
                            <input
                                class="w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                type="file"
                                accept=".doc, .docx, .pdf, .png, .jpeg"
                                @change="uploadAttachment"
                            >
                        </div>

                        <!-- View Documents Button -->
                        <button
                            class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded h-10 mt-6"
                            @click="viewDocumentAttachments"
                        >
                            View Attachments
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AccountingCommonTabsMainContainer class="w-full">
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
</template>
