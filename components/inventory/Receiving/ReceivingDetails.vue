<script setup lang="ts">
import { useReceivingStore, TERMS, type HeaderColumn } from "@/stores/inventory/receiving"
import { useInventoryDocCode } from "~/composables/enums"

defineProps<{
    title: string
    headerColumns: HeaderColumn[]
}>()

const model = defineModel<Record<string, any>>({ default: () => ({}) })

const main = useReceivingStore()
const { receiving, remarks } = storeToRefs(main)
const snackbar = useSnackbar()
const isSaving = ref(false)
const autoSaveTimeout = ref<NodeJS.Timeout | null>(null)

const performAutoSave = async (field: string, value: any) => {
    if (!model.value.id) { return }

    try {
        isSaving.value = true
        await main.autoSaveReceivingData(model.value.id, { [field]: value })
        snackbar.add({ type: "success", text: "Saved successfully" })
    } catch (error: any) {
        snackbar.add({ type: "error", text: error.message || "Auto-save failed" })
    } finally {
        isSaving.value = false
    }
}

const autoSave = (field: string, value: any) => {
    if (autoSaveTimeout.value) { clearTimeout(autoSaveTimeout.value) }
    autoSaveTimeout.value = setTimeout(() => performAutoSave(field, value), 800)
}

const hasAcceptedItems = computed(() =>
    model.value.items?.some(({ metadata }) => metadata?.status === "Accepted")
)

const updateMetadata = (field: string, value: any) => {
    if (hasAcceptedItems.value) { return }
    if (!model.value.metadata) {
        model.value.metadata = {}
    }
    model.value.metadata[field] = value
    autoSave(field, value)
}

onUnmounted(() => {
    if (autoSaveTimeout.value) { clearTimeout(autoSaveTimeout.value) }
})

watch(() => model.value, (newValue) => {
    if (newValue && !newValue.metadata) {
        newValue.metadata = {}
    }
}, { immediate: true })
</script>

<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <div class="mb-4">
                <InventoryCommonEvenparHeader :page="{ currentPage: 1, totalPages: 1 }" :document-code="useInventoryDocCode.mrr" />
                <div class="flex items-center justify-center rounded-t mb-4 mt-4">
                    <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                        {{ title }}
                    </h3>
                    <div v-if="isSaving" class="ml-2 flex items-center text-sm text-blue-600">
                        <svg
                            class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            />
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Saving...
                    </div>
                </div>

                <div class="bg-white rounded-xl overflow-hidden mb-6">
                    <div class="grid grid-cols-2 gap-10">
                        <div class="p-4">
                            <div class="grid grid-cols-2 items-center w-full gap-y-2">
                                <label class="text-sm font-medium text-gray-700">Supplier:</label>
                                <InventoryCommonSearchSupplierSelector
                                    v-model="model.metadata.supplier_id"
                                    :disabled="hasAcceptedItems"
                                />

                                <label class="text-sm font-medium text-gray-700">Reference:</label>
                                <input
                                    v-model="model.metadata.reference"
                                    :placeholder="model.metadata.reference"
                                    class="w-full underline px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md placeholder-gray-700"
                                    :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                    :disabled="hasAcceptedItems"
                                    @input="!hasAcceptedItems && updateMetadata('reference', ($event.target as HTMLInputElement).value)"
                                >

                                <label class="text-sm font-medium text-gray-700">Terms of Payment:</label>
                                <select
                                    v-model="model.metadata.terms_of_payment"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer"
                                    :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                    :disabled="hasAcceptedItems"
                                    @change="!hasAcceptedItems && updateMetadata('terms_of_payment', ($event.target as HTMLSelectElement).value)"
                                >
                                    <option value="">
                                        Choose Terms of Payment
                                    </option>
                                    <option v-for="term in TERMS" :key="term" :value="term">
                                        {{ term }}
                                    </option>
                                </select>

                                <label class="text-sm font-medium text-gray-700">Particulars:</label>
                                <input
                                    v-model="model.metadata.particulars"
                                    :placeholder="model.metadata?.particulars || 'Enter particulars...'"
                                    class="w-full underline px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
                                    :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                    :disabled="hasAcceptedItems"
                                    @input="!hasAcceptedItems && updateMetadata('particulars', ($event.target as HTMLSelectElement).value)"
                                >
                            </div>
                        </div>

                        <div class="p-4">
                            <div class="space-y-6">
                                <div class="flex items-center justify-between w-full">
                                    <label class="w-40 text-sm font-medium text-gray-700">Reference Number:</label>
                                    <div class="flex-1 text-sm underline font-bold">
                                        {{ model.reference_no }}
                                    </div>
                                </div>
                                <div class="flex items-center justify-between w-full">
                                    <label class="w-40 text-sm font-medium text-gray-700">Transaction Date:</label>
                                    <div class="flex-1 text-sm underline">
                                        {{ dateToString(new Date(model.transaction_date)) }}
                                    </div>
                                </div>
                                <div class="flex items-center justify-between w-full">
                                    <label class="w-40 text-sm font-medium text-gray-700">Project Code:</label>
                                    <div class="flex-1 text-sm underline">
                                        {{ model.project_code }}
                                    </div>
                                </div>
                                <div class="flex items-center justify-between w-full">
                                    <label class="w-40 text-sm font-medium text-gray-700">Equipment No.:</label>
                                    <div class="flex-1 text-sm underline">
                                        {{ model.metadata?.equipment_no }}
                                    </div>
                                </div>
                                <div class="flex items-center justify-between w-full">
                                    <label class="w-40 text-sm font-medium text-gray-700">Source PO:</label>
                                    <div class="flex-1 text-sm underline">
                                        {{ model.source_po ?? "N/A" }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LayoutLoadingContainer class="w-full" :loading="receiving.isLoading">
                    <InventoryReceivingItemTable
                        v-model="model"
                        v-model:remarks="remarks"
                        :header-columns="headerColumns"
                    />
                </LayoutLoadingContainer>
            </div>
        </div>
    </div>
</template>
