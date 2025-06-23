<script setup lang="ts">
import { useReceivingStore, TERMS } from "@/stores/inventory/receiving"

interface HeaderColumn {
    name: string
    id: string
    style: string
}

defineProps<{
    title: string
    headerColumns: HeaderColumn[]
    data: Record<string, any>
}>()

const model = defineModel<Record<string, any>>({ default: () => ({}) })
const emit = defineEmits<{
    "update:data": [value: Record<string, any>]
}>()

const main = useReceivingStore()
const { receiving, remarks } = storeToRefs(main)
const snackbar = useSnackbar()
const utils = useUtilities()

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

const calculatedGrandTotal = computed(() => {
    const items = model.value.items || []
    return items.reduce((total, item) => {
        const unitPrice = item.metadata?.unit_price || item.unit_price || 0
        const acceptedQty = item.accepted_quantity || 0
        return total + (unitPrice * acceptedQty)
    }, 0)
})

const editableParticulars = computed({
    get: () => model.value.metadata?.particulars || "",
    set: (value: string) => {
        if (hasAcceptedItems.value) { return }
        updateMetadata("particulars", value)
    }
})

const editableTerms = computed({
    get: () => model.value.metadata?.terms_of_payment || "",
    set: (value: string) => {
        if (hasAcceptedItems.value) { return }
        updateMetadata("terms_of_payment", value)
    }
})

const editableSupplier = computed({
    get: () => model.value.supplier.id || model.value.metadata?.supplier_id || null,
    set: (value: any) => {
        if (hasAcceptedItems.value) { return }
        updateMetadata("supplier_id", value)
    }
})

const editableReference = computed({
    get: () => model.value.metadata?.reference || model.value.reference?.reference_no || "",
    set: (value: string) => {
        if (hasAcceptedItems.value) { return }
        updateMetadata("reference", value)
    }
})

const updateMetadata = (field: string, value: any) => {
    if (!model.value.metadata) { model.value.metadata = {} }
    model.value.metadata[field] = value
    emit("update:data", model.value)
    autoSave(field, value)
}

const updateItemField = (itemId: number, field: string, value: any) => {
    const item = model.value.items?.find((item: any) => item.id === itemId)
    if (!item) { return }

    if (!item.metadata) { item.metadata = {} }
    item.metadata[field] = value

    if (field === "unit_price") {
        item.ext_price = (value || 0) * (item.quantity || 0)
    }

    emit("update:data", model.value)
}

const updateAcceptedQty = (itemId: number, qty: number) => {
    const item = model.value.items?.find((item: any) => item.id === itemId)
    if (!item) { return }

    item.accepted_quantity = qty
    const unitPrice = item.metadata?.unit_price || item.unit_price || 0
    item.ext_price = unitPrice * qty
    emit("update:data", model.value)
}

const getExtPrice = (item: any) => {
    const unitPrice = item.metadata?.unit_price || item.unit_price || 0
    const acceptedQty = item.accepted_quantity || 0
    return unitPrice * acceptedQty
}

const getFieldValue = (item: any, field: string, fallback: string = "") =>
    item.metadata?.[field] || item[field] || fallback

const isFieldDisabled = (item: any, field: string) =>
    !!(item.metadata?.remarks && getFieldValue(item, field))

const validateRequiredFields = () => {
    if (!editableSupplier.value || !editableTerms.value || !editableParticulars.value.trim()) {
        snackbar.add({
            type: "error",
            text: "Please fill in Supplier, Terms of Payment, and Particulars before accepting items."
        })
        return false
    }
    return true
}
const acceptAll = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    if (!validateRequiredFields()) { return }

    const item = model.value.items?.find((item: any) => item.id === requestId)
    if (!item) {
        snackbar.add({ type: "error", text: "Item not found." })
        return
    }

    const payload = {
        remarks,
        actual_brand_purchase: getFieldValue(item, "actual_brand_purchase"),
        quantity: item.accepted_quantity || item.quantity || 0,
        unit_price: getFieldValue(item, "unit_price", 0),
        specification: getFieldValue(item, "specification") || null,
        grand_total: getExtPrice(item)
    }

    try {
        await main.acceptAllItem(requestId, payload)
        const messageType = main.errorMessage ? "error" : "success"
        const messageText = main.errorMessage || main.successMessage

        snackbar.add({ type: messageType, text: messageText })

        if (messageType === "success") {
            main.$reset()
            main.fetchReceivingDetails(model.value.id)
        }
    } catch (error: any) {
        snackbar.add({ type: "error", text: error.message || "Something went wrong." })
    }
}
const acceptWithDetails = async ({ requestId, acceptedQty, remarks }: {
    requestId: number, acceptedQty: number, remarks: string
}) => {
    if (!validateRequiredFields()) { return }

    if (!remarks.trim() || acceptedQty <= 0) {
        snackbar.add({ type: "error", text: "Quantity & Remarks are required." })
        return
    }

    const item = model.value.items?.find((item: any) => item.id === requestId)
    if (!item) {
        snackbar.add({ type: "error", text: "Item not found." })
        return
    }

    updateAcceptedQty(requestId, acceptedQty)

    const payload = {
        quantity: acceptedQty,
        remarks,
        actual_brand_purchase: getFieldValue(item, "actual_brand_purchase"),
        unit_price: getFieldValue(item, "unit_price", 0),
        specification: getFieldValue(item, "specification") || null,
        grand_total: getExtPrice(item)
    }
    try {
        await main.acceptQtyRemarks(requestId, payload)
        const messageType = main.errorMessage ? "error" : "success"
        const messageText = main.errorMessage || main.successMessage
        snackbar.add({ type: messageType, text: messageText })
        if (messageType === "success") {
            main.$reset()
            await main.fetchReceivingDetails(model.value.id)
        }
    } catch (error: any) {
        snackbar.add({ type: "error", text: error.message || "Something went wrong." })
    }
}
const rejectRequest = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    if (!remarks.trim()) {
        snackbar.add({ type: "error", text: "Remarks are required." })
        return
    }
    try {
        await main.rejectItem(requestId, { remarks: remarks.trim() })
        const messageType = main.errorMessage ? "error" : "success"
        const messageText = main.errorMessage || main.successMessage
        snackbar.add({ type: messageType, text: messageText })
        if (messageType === "success") {
            main.$reset()
            await main.fetchReceivingDetails(model.value.id)
        }
    } catch (error: any) {
        snackbar.add({ type: "error", text: error.message || "Something went wrong." })
    }
}
onUnmounted(() => {
    if (autoSaveTimeout.value) { clearTimeout(autoSaveTimeout.value) }
})
</script>

<template>
    <div class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col gap-2 w-full p-4">
            <div class="mb-4">
                <InventoryCommonEvenparHeader />
                <div class="flex items-center justify-center rounded-t mb-4 mt-4">
                    <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                        {{ title }}
                    </h3>
                    <div v-if="isSaving" class="ml-2 flex items-center text-sm text-blue-600">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                    </div>
                </div>

                <div class="bg-white rounded-xl overflow-hidden mb-6">
                    <div class="grid grid-cols-2 gap-10">
                        <div class="p-4">
                            <div class="grid grid-cols-2 items-center w-full gap-y-2">
                                <label class="text-sm font-medium text-gray-700">Supplier:</label>
                                <InventoryCommonSupplierSelector
                                    v-model="editableSupplier"
                                    class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                                    :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                    :disabled="hasAcceptedItems"
                                />

                                <label class="text-sm font-medium text-gray-700">Reference:</label>
                                <input
                                    v-model="editableReference"
                                    class="w-full underline px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md placeholder-gray-700"
                                    :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                    :disabled="hasAcceptedItems"
                                >

                                <label class="text-sm font-medium text-gray-700">Terms of Payment:</label>
                                <select
                                    v-model="editableTerms"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer"
                                    :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                    :disabled="hasAcceptedItems"
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
                                    v-model="editableParticulars"
                                    :placeholder="model.metadata?.particulars || 'Enter particulars...'"
                                    class="w-full underline px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
                                    :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                    :disabled="hasAcceptedItems"
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
                    <div class="overflow-auto">
                        <table class="table-auto w-full border-collapse">
                            <thead>
                                <tr class="bg-[#dbe5f1]">
                                    <th v-for="header in headerColumns" :key="header.id" scope="col" class="p-2 border-b text-sm">
                                        {{ header.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in model.items" :key="item.id" class="bg-white border-b">
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.item_code }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.item_description }}
                                    </td>

                                    <td class="border px-2 py-1 text-center">
                                        <template v-if="isFieldDisabled(item, 'specification')">
                                            {{ getFieldValue(item, 'specification') }}
                                        </template>
                                        <input
                                            v-else
                                            :value="getFieldValue(item, 'specification')"
                                            type="text"
                                            class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter specification..."
                                            @input="updateItemField(item.id, 'specification', ($event.target as HTMLInputElement).value)"
                                        >
                                    </td>

                                    <td class="border px-2 py-1 text-center">
                                        <template v-if="isFieldDisabled(item, 'actual_brand_purchase')">
                                            {{ getFieldValue(item, 'actual_brand_purchase', item.preferred_brand) }}
                                        </template>
                                        <input
                                            v-else
                                            :value="getFieldValue(item, 'actual_brand_purchase', item.preferred_brand)"
                                            type="text"
                                            class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter brand..."
                                            @input="updateItemField(item.id, 'actual_brand_purchase', ($event.target as HTMLInputElement).value)"
                                        >
                                    </td>

                                    <td class="border px-2 py-1 text-center">
                                        {{ item.quantity }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.accepted_quantity || 0 }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.uom_name }}
                                    </td>

                                    <td class="border px-2 py-1 text-center">
                                        <template v-if="isFieldDisabled(item, 'unit_price')">
                                            {{ getFieldValue(item, 'unit_price', 0) }}
                                        </template>
                                        <input
                                            v-else
                                            :value="getFieldValue(item, 'unit_price', 0)"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="0.00"
                                            @input="updateItemField(item.id, 'unit_price', parseFloat(($event.target as HTMLInputElement).value) || 0)"
                                        >
                                    </td>

                                    <td class="border px-2 py-1 text-center">
                                        {{ utils.formatCurrency(getExtPrice(item)) }}
                                    </td>

                                    <td class="border px-2 py-1 text-center">
                                        <div v-if="item.metadata?.status" class="flex justify-center relative group">
                                            <Icon
                                                :name="item.metadata.status === 'Rejected' ? 'mdi:close-circle' : 'mdi:check-circle'"
                                                :class="item.metadata.status === 'Rejected' ? 'text-red-700' : 'text-green-700'"
                                                class="h-8 w-8"
                                            />
                                            <div class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md">
                                                {{ item.metadata.status }}
                                            </div>
                                        </div>
                                    </td>

                                    <td class="border px-2 py-1 text-center">
                                        {{ item.metadata?.remarks }}
                                    </td>

                                    <!-- Actions -->
                                    <td class="border px-2 py-1 text-center">
                                        <InventoryCommonAcceptRejectButton
                                            v-model:accept-remarks="remarks"
                                            v-model:reject-remarks="remarks"
                                            :max-quantity="item.quantity"
                                            :request-id="item.id"
                                            :disabled="!!item.metadata?.remarks"
                                            :class="{ 'opacity-60 cursor-not-allowed pointer-events-none': !!item.metadata?.remarks }"
                                            @accept-all="acceptAll"
                                            @accept="acceptWithDetails"
                                            @reject="rejectRequest"
                                            @update-accepted-qty="updateAcceptedQty"
                                        />
                                    </td>
                                </tr>

                                <!-- Totals Row -->
                                <tr class="border">
                                    <td colspan="12">
                                        <div class="flex justify-end p-2 py-2">
                                            <div class="grid grid-cols-2 gap-2">
                                                <p class="text-md text-gray-900">
                                                    <strong>Total net of VAT cost:</strong>
                                                </p>
                                                <p class="text-md text-gray-900">
                                                    {{ utils.formatCurrency(model.total_net_of_vat_cost || 0) }}
                                                </p>

                                                <p class="text-md text-gray-900">
                                                    <strong>Total Input VAT:</strong>
                                                </p>
                                                <p class="text-md text-gray-900">
                                                    {{ utils.formatCurrency(model.total_input_vat || 0) }}
                                                </p>

                                                <p class="text-md text-gray-900">
                                                    <strong>Grand Total:</strong>
                                                </p>
                                                <p class="text-md text-gray-900">
                                                    ₱{{ utils.formatCurrency(calculatedGrandTotal) }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </LayoutLoadingContainer>
            </div>
        </div>
    </div>
</template>
