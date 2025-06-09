<script setup lang="ts">
import { useReceivingStore, TERMS } from "@/stores/inventory/receiving"

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(["update:data"])

const isDisabled = ref(false)
const main = useReceivingStore()
const snackbar = useSnackbar()
const { receiving, remarks } = storeToRefs(main)
const utils = useUtilities()
const acceptedQtyMap = ref(new Map())
const localData = ref({ ...props.data })
const isSaving = ref(false)
const autoSaveTimeout = ref(null)

const performAutoSave = async (field: string, value: any) => {
    try {
        isSaving.value = true
        const payload = {
            [field]: value
        }
        await main.autoSaveReceivingData(localData.value.id, payload)
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || "Auto-save failed"
        })
    } finally {
        isSaving.value = false
    }
}

const autoSave = (field: string, value: any) => {
    if (autoSaveTimeout.value) {
        clearTimeout(autoSaveTimeout.value)
    }
    autoSaveTimeout.value = setTimeout(() => {
        performAutoSave(field, value)
    }, 800)
}

watch(() => props.data, (newData) => {
    localData.value = JSON.parse(JSON.stringify(newData))
}, { deep: true })

const reactiveData = computed(() => localData.value)
const hasAcceptedItems = computed(() => !!localData.value.items?.some(({ metadata }) => metadata?.status === "Accepted"))
const editableFields = {
    particulars: {
        get: () => localData.value.metadata?.particulars || "",
        set: (value: any) => {
            if (hasAcceptedItems.value) { return }
            localData.value.metadata ||= {}
            localData.value.metadata.particulars = value
            emit("update:data", localData.value)
            autoSave("particulars", value)
        }
    },
    terms_of_payment: {
        get: () => localData.value.metadata?.terms_of_payment || "",
        set: (value: any) => {
            if (hasAcceptedItems.value) { return }
            localData.value.metadata ||= {}
            localData.value.metadata.terms_of_payment = value
            emit("update:data", localData.value)
            autoSave("terms_of_payment", value)
        }
    },
    supplier_id: {
        get: () => localData.value.supplier_id || localData.value.metadata?.supplier_id || null,
        set: (value: any) => {
            if (hasAcceptedItems.value) { return }
            localData.value.supplier_id = value
            localData.value.metadata ||= {}
            localData.value.metadata.supplier_id = value
            emit("update:data", localData.value)
            autoSave("supplier_id", value)
        }
    },
    reference: {
        get: () => localData.value.metadata?.reference || localData.value.reference?.reference_no || "",
        set: (value: any) => {
            if (hasAcceptedItems.value) { return }
            localData.value.metadata ||= {}
            localData.value.metadata.reference = value
            emit("update:data", localData.value)
            autoSave("reference", value)
        }
    },
}

const editableParticulars = computed(editableFields.particulars)
const editableTerms = computed(editableFields.terms_of_payment)
const editableSupplier = computed(editableFields.supplier_id)
const editableReference = computed(editableFields.reference)

const updateItemField = (itemId: number, field: string, value: any) => {
    const itemIndex = localData.value.items.findIndex((item: { id: number }) => item.id === itemId)
    if (itemIndex !== -1) {
        const item = localData.value.items[itemIndex]
        if (!item.metadata) { item.metadata = {} }
        item.metadata[field] = value
        if (field === "unit_price") {
            item.ext_price = (value || 0) * (item.quantity || 0)
        }
        emit("update:data", localData.value)
    }
}

const updateSpecification = (itemId: number, value: string) => {
    updateItemField(itemId, "specification", value)
}
const updateActualBrand = (itemId: number, value: string) => {
    updateItemField(itemId, "actual_brand_purchase", value)
}

const updateUnitPrice = (itemId: number, value: number) => {
    updateItemField(itemId, "unit_price", value)
}

const getExtPrice = (item: any) => {
    const unitPrice = item.metadata?.unit_price || item.unit_price || 0
    const acceptedQty = acceptedQtyMap.value.get(item.id) || item.quantity || 0
    return unitPrice * acceptedQty
}
const getSpecificationValue = (item: any) => {
    return item.metadata?.specification || item.specification || ""
}
const getActualBrandValue = (item: any) => {
    return item.metadata?.actual_brand_purchase || item.preferred_brand || ""
}

const getUnitPriceValue = (item: any) => {
    return item.metadata?.unit_price || item.unit_price || 0
}

const isSpecificationDisabled = (item: any) => {
    return !!(item.metadata?.remarks && (item.metadata?.specification || item.specification))
}
const isActualBrandDisabled = (item: any) => {
    return !!(item.metadata?.remarks && (item.metadata?.actual_brand_purchase || item.actual_brand_purchase))
}

const isUnitPriceDisabled = (item: any) => {
    return !!(item.metadata?.remarks && (item.metadata?.unit_price || item.unit_price))
}

const updateAcceptedQty = (itemId: number, qty: number) => {
    acceptedQtyMap.value.set(itemId, qty)
    const itemIndex = localData.value.items.findIndex((item: { id: any }) => item.id === itemId)
    if (itemIndex !== -1) {
        localData.value.items[itemIndex].accepted_quantity = qty
        const item = localData.value.items[itemIndex]
        const unitPrice = item.metadata?.unit_price || item.unit_price || 0
        item.ext_price = unitPrice * qty
        emit("update:data", localData.value)
    }
}
const calculatedGrandTotal = computed(() => {
    const items = localData.value.items || []
    const total = items.reduce((total, item) => total + getExtPrice(item), 0)
    localData.value.metadata = { ...localData.value.metadata, grand_total: total }
    emit("update:data", localData.value)
    return total
})

const acceptAll = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    const item = localData.value.items.find((item: { id: number }) => item.id === requestId)
    if (!item) {
        snackbar.add({ type: "error", text: "Item not found." })
        return
    }
    const grandTotal = calculatedGrandTotal.value
    const payload = {
        remarks,
        actual_brand_purchase: item.metadata?.actual_brand_purchase || item.actual_brand_purchase || "",
        quantity: acceptedQtyMap.value.get(requestId) || item.quantity || 0,
        unit_price: item.metadata?.unit_price || item.unit_price || 0,
        specification: item.metadata?.specification || item.specification || null,
        grand_total: grandTotal
    }

    try {
        await main.acceptAllItem(requestId, payload)
        const messageType = main.errorMessage !== "" ? "error" : "success"
        const messageText = main.errorMessage || main.successMessage
        snackbar.add({ type: messageType, text: messageText })
        if (messageType === "success") {
            main.$reset()
            main.fetchReceivingDetails(props.data.id)
            isDisabled.value = true
        }
    } catch (error) {
        snackbar.add({ type: "error", text: error || "something went wrong." })
    }
}

const acceptWithDetails = async ({ requestId, acceptedQty, remarks }: { requestId: number, acceptedQty: number, remarks: string }) => {
    if (remarks === "" || acceptedQty <= 0) {
        return snackbar.add({
            type: "error",
            text: "Quantity & Remarks are required."
        })
    }
    const item = localData.value.items.find(item => item.id === requestId)
    if (!item) {
        return snackbar.add({
            type: "error",
            text: "Item not found."
        })
    }

    updateAcceptedQty(requestId, acceptedQty)
    const grandTotal = calculatedGrandTotal.value
    const payload = {
        quantity: acceptedQty,
        remarks,
        actual_brand_purchase: item.metadata?.actual_brand_purchase || item.actual_brand_purchase || "",
        unit_price: item.metadata?.unit_price || item.unit_price || 0,
        specification: item.metadata?.specification || item.specification || null,
        grand_total: grandTotal
    }
    try {
        await main.acceptQtyRemarks(requestId, payload)
        if (main.errorMessage) {
            snackbar.add({ type: "error", text: main.errorMessage })
        } else {
            snackbar.add({ type: "success", text: main.successMessage })
            main.$reset()
            await main.fetchReceivingDetails(props.data.id)
            isDisabled.value = true
        }
    } catch (error) {
        snackbar.add({ type: "error", text: error || "something went wrong." })
    }
}

const rejectRequest = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    if (!remarks.trim()) {
        return snackbar.add({ type: "error", text: "Remarks are required." })
    }
    try {
        await main.rejectItem(requestId, { remarks: remarks.trim() })
        const messageType = main.errorMessage ? "error" : "success"
        const messageText = main.errorMessage || main.successMessage

        snackbar.add({ type: messageType, text: messageText })

        if (messageType === "success") {
            main.$reset()
            await main.fetchReceivingDetails(props.data.id)
            isDisabled.value = true
        }
    } catch (error) {
        snackbar.add({ type: "error", text: error || "something went wrong." })
    }
}

onUnmounted(() => {
    if (autoSaveTimeout.value) {
        clearTimeout(autoSaveTimeout.value)
    }
})
</script>

<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <LayoutPrint>
                <div id="headline mb-4 ">
                    <InventoryCommonEvenparHeader />
                    <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4 mt-4">
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
                            <div class="flex-1">
                                <div class="p-4">
                                    <div class="grid grid-cols-2 items-center w-full gap-y-2">
                                        <!-- Supplier -->
                                        <label class="text-sm font-medium text-gray-700">Supplier:</label>
                                        <InventoryCommonSupplierSelector
                                            v-model="editableSupplier"
                                            :show-all="true"
                                            :default-value="localData.supplier?.company_name"
                                            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                                            :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                            :disabled="hasAcceptedItems"
                                        />

                                        <!-- Reference -->
                                        <label class="text-sm font-medium text-gray-700">Reference:</label>
                                        <input
                                            v-model="editableReference"
                                            class="w-full underline px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md placeholder-gray-700"
                                            :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                            :disabled="hasAcceptedItems"
                                        >

                                        <!-- Terms of Payment -->
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
                                            <option v-for="(term, index) in TERMS" :key="index" :value="term">
                                                {{ term }}
                                            </option>
                                        </select>

                                        <!-- Particulars -->
                                        <label class="text-sm font-medium text-gray-700">Particulars:</label>
                                        <input
                                            v-model="editableParticulars"
                                            :placeholder="localData?.particulars || 'Enter particulars...'"
                                            class="w-full underline px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md placeholder-gray-400"
                                            :class="{ 'opacity-60 cursor-not-allowed bg-gray-100': hasAcceptedItems }"
                                            :disabled="hasAcceptedItems"
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="flex-1">
                                <div class="p-4">
                                    <div class="space-y-6">
                                        <div class="flex items-center justify-between w-full">
                                            <label class="w-40 text-sm font-medium text-gray-700">Reference Number:</label>
                                            <div class="flex-1 text-sm underline">
                                                {{ localData.reference_no }}
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between w-full">
                                            <label class="w-40 text-sm font-medium text-gray-700">Transaction Date:</label>
                                            <div class="flex-1 text-sm underline">
                                                {{ dateToString(new Date(localData.transaction_date)) }}
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between w-full">
                                            <label class="w-40 text-sm font-medium text-gray-700">Project Code:</label>
                                            <div class="flex-1 text-sm underline">
                                                {{ localData?.project?.project_code }}
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between w-full">
                                            <label class="w-40 text-sm font-medium text-gray-700">Equipment No.:</label>
                                            <div class="flex-1 text-sm underline">
                                                {{ localData.metadata.equipment_no }}
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between w-full">
                                            <label class="w-40 text-sm font-medium text-gray-700">Source PO:</label>
                                            <div class="flex-1 text-sm underline">
                                                {{ localData.source_po }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LayoutLoadingContainer class="w-full" :loading="receiving.isLoading">
                        <div id="itemDetails">
                            <div id="content" class="overflow-auto">
                                <table class="table-auto w-full border-collapse">
                                    <thead>
                                        <tr class="bg-[#dbe5f1]">
                                            <th v-for="(dataHeader, index) in headerColumns" :key="index" scope="col" class="p-2 border-b text-sm">
                                                {{ dataHeader.name }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in reactiveData.items" :key="item.id" class="bg-white border-b">
                                            <td class="border px-2 py-1 text-center">
                                                {{ item.item_code }}
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                {{ item.item_description }}
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                <template
                                                    v-if="isSpecificationDisabled(item)"
                                                >
                                                    {{ getSpecificationValue(item) }}
                                                </template>
                                                <input
                                                    v-else
                                                    :value="getSpecificationValue(item)"
                                                    type="text"
                                                    class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Enter brand..."
                                                    required
                                                    @input="updateSpecification(item.id, $event.target.value)"
                                                >
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                <template
                                                    v-if="isActualBrandDisabled(item)"
                                                >
                                                    {{ getActualBrandValue(item) }}
                                                </template>
                                                <input
                                                    v-else
                                                    :value="getActualBrandValue(item)"
                                                    type="text"
                                                    class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Enter brand..."
                                                    required
                                                    @input="updateActualBrand(item.id, $event.target.value)"
                                                >
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                {{ item.quantity }}
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                {{ acceptedQtyMap.get(item.id) || item.quantity || 0 }}
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                {{ item.uom }}
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                <template v-if="isUnitPriceDisabled(item)">
                                                    {{ getUnitPriceValue(item) }}
                                                </template>
                                                <template v-else>
                                                    <input
                                                        :value="getUnitPriceValue(item)"
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="0.00"
                                                        @input="updateUnitPrice(item.id, parseFloat($event.target.value) || 0)"
                                                    >
                                                </template>
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                {{ utils.formatCurrency(getExtPrice(item)) }}
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                <template v-if="item.metadata.status === 'Rejected'">
                                                    <div class="flex justify-center relative group">
                                                        <Icon name="mdi:close-circle" class="h-8 w-8 text-red-700" />
                                                        <div role="tooltip" class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md">
                                                            Rejected
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else-if="item.metadata.status === 'Accepted'">
                                                    <div class="flex justify-center relative group">
                                                        <Icon name="mdi:check-circle" class="h-8 w-8 text-green-700" />
                                                        <div role="tooltip" class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md">
                                                            Accepted
                                                        </div>
                                                    </div>
                                                </template>
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                {{ item.metadata.remarks }}
                                            </td>
                                            <td class="border px-2 py-1 text-center">
                                                <InventoryCommonAcceptRejectButton
                                                    v-model:accept-remarks="remarks"
                                                    v-model:reject-remarks="remarks"
                                                    :max-quantity="item.quantity"
                                                    :request-id="item.id"
                                                    :disabled="!!item.metadata.remarks"
                                                    :class="{
                                                        'opacity-60 cursor-not-allowed pointer-events-none': !!item.metadata.remarks
                                                    }"
                                                    @accept-all="acceptAll"
                                                    @accept="acceptWithDetails"
                                                    @reject="rejectRequest"
                                                    @update-accepted-qty="updateAcceptedQty"
                                                />
                                            </td>
                                        </tr>
                                        <tr class="border">
                                            <td colspan="10">
                                                <div class="flex justify-end p-2 py-2">
                                                    <div class="grid grid-cols-2 gap-2">
                                                        <p v-if="title" class="text-md text-gray-900">
                                                            <strong>Total net of VAT cost:</strong>
                                                        </p>
                                                        <p v-if="title" class="text-md text-gray-900">
                                                            {{ utils.formatCurrency(reactiveData.total_net_of_vat_cost || 0) }}
                                                        </p>
                                                        <p v-if="title" class="text-md text-gray-900">
                                                            <strong>Total Input VAT:</strong>
                                                        </p>
                                                        <p v-if="title" class="text-md text-gray-900">
                                                            {{ utils.formatCurrency(reactiveData.total_input_vat || 0) }}
                                                        </p>
                                                        <p v-if="title" class="text-md text-gray-900">
                                                            <strong> Grand Total:</strong>
                                                        </p>
                                                        <p v-if="title" class="text-md text-gray-900">
                                                            {{ `₱${utils.formatCurrency(calculatedGrandTotal)}` }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </LayoutLoadingContainer>
                </div>
            </LayoutPrint>
        </div>
    </div>
</template>
