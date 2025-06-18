<script setup lang="ts">

const fileUrl = ref<string | null>(null)
const fileName = ref<string | null>(null)

function handleFileUpload (event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
        fileUrl.value = URL.createObjectURL(file)
        fileName.value = file.name
    } else {
        fileUrl.value = null
        fileName.value = null
    }
}
const goBackOrHome = () => {
    if ((useRouter()).options.history.state.back) {
        (useRouter()).back()
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
                <div class="flex flex-col gap-1 ml-[140px]">
                    <label class="text-gray-500 uppercase text-sm">Attach File</label>
                    <input type="file" class="text-sm" @change="handleFileUpload">

                    <div v-if="fileName" class="mt-1 text-sm text-gray-600">
                        Uploaded File: <strong>{{ fileName }}</strong>
                    </div>

                    <div v-if="fileUrl" class="mt-2">
                        <iframe
                            :src="fileUrl"
                            class="w-full h-64 border rounded"
                            frameborder="0"
                        />
                    </div>
                </div>
            </div>
        </div>
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
