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

// Create a deep copy of props.data to avoid mutating props directly
const localData = ref({ ...props.data })

// Watch for changes in props.data and update localData
watch(() => props.data, (newData) => {
    localData.value = { ...newData }
}, { deep: true })

const reactiveData = computed(() => localData.value)

// COMPUTED PROPERTIES FOR EDITABLE FIELDS
// These create two-way binding with proper reactivity and emit updates

// 1. Editable Particulars
const editableParticulars = computed({
    get: () => localData.value.metadata?.particulars || "",
    set: (value) => {
        if (!localData.value.metadata) {
            localData.value.metadata = {}
        }
        localData.value.metadata.particulars = value
        emit("update:data", localData.value)
    }
})

// 2. Editable Terms of Payment
const editableTerms = computed({
    get: () => localData.value.metadata?.terms_of_payment || "",
    set: (value) => {
        if (!localData.value.metadata) {
            localData.value.metadata = {}
        }
        localData.value.metadata.terms_of_payment = value
        emit("update:data", localData.value)
    }
})

// 3. Editable Supplier ID
const editableSupplier = computed({
    get: () => localData.value.supplier_id || localData.value.metadata?.supplier_id || null,
    set: (value) => {
        localData.value.supplier_id = value
        if (!localData.value.metadata) {
            localData.value.metadata = {}
        }
        localData.value.metadata.supplier_id = value
        emit("update:data", localData.value)
    }
})

// ITEM FIELD UPDATERS
// These functions handle updating individual item fields and emit changes

const updateItemField = (itemId: number, field: string, value: any) => {
    const itemIndex = localData.value.items.findIndex(item => item.id === itemId)
    if (itemIndex !== -1) {
        // Initialize metadata if it doesn't exist
        if (!localData.value.items[itemIndex].metadata) {
            localData.value.items[itemIndex].metadata = {}
        }

        localData.value.items[itemIndex].metadata[field] = value

        // If updating unit_price, recalculate ext_price
        if (field === "unit_price") {
            const item = localData.value.items[itemIndex]
            item.ext_price = (value || 0) * (item.quantity || 0)
        }

        emit("update:data", localData.value)
    }
}

const updateActualBrand = (itemId: number, value: string) => {
    updateItemField(itemId, "actual_brand_purchase", value)
}

const updateUnitPrice = (itemId: number, value: number) => {
    updateItemField(itemId, "unit_price", value)
}

// COMPUTED PROPERTY FOR DYNAMIC EXT_PRICE CALCULATION
const getExtPrice = (item: any) => {
    const unitPrice = item.metadata?.unit_price || item.unit_price || 0
    // Use accepted quantity from user input if available, otherwise use accepted_quantity or quantity
    const acceptedQty = acceptedQtyMap.value.get(item.id) || item.quantity || 0
    return unitPrice * acceptedQty
}

// Helper functions to check if data exists in database and get values
const getActualBrandValue = (item: any) => {
    return item.metadata?.actual_brand_purchase || item.actual_brand_purchase || ""
}

const getUnitPriceValue = (item: any) => {
    return item.metadata?.unit_price || item.unit_price || 0
}

const isActualBrandDisabled = (item: any) => {
    // Check if the item has been processed/accepted/rejected (has remarks)
    // This indicates the data has been saved to database
    return !!(item.metadata?.remarks && (item.metadata?.actual_brand_purchase || item.actual_brand_purchase))
}

const isUnitPriceDisabled = (item: any) => {
    // Check if the item has been processed/accepted/rejected (has remarks)
    // This indicates the data has been saved to database
    return !!(item.metadata?.remarks && (item.metadata?.unit_price || item.unit_price))
}

const updateAcceptedQty = (itemId, qty) => {
    acceptedQtyMap.value.set(itemId, qty)

    // Also update the item's accepted_quantity field for persistence
    const itemIndex = localData.value.items.findIndex(item => item.id === itemId)
    if (itemIndex !== -1) {
        localData.value.items[itemIndex].accepted_quantity = qty
        // Recalculate ext_price when accepted quantity changes
        const item = localData.value.items[itemIndex]
        const unitPrice = item.metadata?.unit_price || item.unit_price || 0
        item.ext_price = unitPrice * qty
        emit("update:data", localData.value)
    }
}

// EXISTING FUNCTIONS (updated to use metadata structure)
const acceptAll = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    // Find the item to get its data
    const item = localData.value.items.find(item => item.id === requestId)
    if (!item) {
        snackbar.add({
            type: "error",
            text: "Item not found."
        })
        return
    }

    const payload = {
        remarks,
        actual_brand_purchase: item.metadata?.actual_brand_purchase || item.actual_brand_purchase || "",
        quantity: acceptedQtyMap.value.get(requestId) || item.quantity || 0,
        unit_price: item.metadata?.unit_price || item.unit_price || 0
    }

    try {
        await main.acceptAllItem(requestId, payload)
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: main.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: main.successMessage
            })
            main.$reset()
            main.fetchReceivingDetails(props.data.id)
            isDisabled.value = true
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}

const acceptWithDetails = async ({ requestId, acceptedQty, remarks }: { requestId: number, acceptedQty: number, remarks: string }) => {
    if (remarks === "") {
        snackbar.add({
            type: "error",
            text: "Quantity & Remarks are required."
        })
        return
    }

    // Find the item to get its data
    const item = localData.value.items.find(item => item.id === requestId)
    if (!item) {
        snackbar.add({
            type: "error",
            text: "Item not found."
        })
        return
    }

    // Update the accepted quantity in our map
    updateAcceptedQty(requestId, acceptedQty)

    const payload = {
        quantity: acceptedQty,
        remarks,
        actual_brand_purchase: item.metadata?.actual_brand_purchase || item.actual_brand_purchase || "",
        unit_price: item.metadata?.unit_price || item.unit_price || 0
    }

    try {
        await main.acceptQtyRemarks(requestId, payload)
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: main.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: main.successMessage
            })
            main.$reset()
            await main.fetchReceivingDetails(props.data.id)
            isDisabled.value = true
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}

const rejectRequest = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    if (remarks.trim() === "") {
        snackbar.add({
            type: "error",
            text: "Remarks are required."
        })
        return
    }
    try {
        await main.rejectItem(requestId, { remarks: remarks.trim() })
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: main.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: main.successMessage
            })
            main.$reset()
            await main.fetchReceivingDetails(props.data.id)
            isDisabled.value = true
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
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
                    </div>
                    <div class="flex justify-between mb-4">
                        <div class="w-1/2">
                            <div class="flex justify-start p-2">
                                <div class="grid grid-cols-2 gap-y-2">
                                    <p class="text-md font-bold">
                                        Supplier:
                                    </p>
                                    <!-- EDITABLE SUPPLIER FIELD -->
                                    <InventoryCommonSupplierSelector
                                        v-model="editableSupplier"
                                        :show-all="true"
                                        :default-value="localData.supplier?.company_name"
                                    />
                                    <p class="text-md font-bold">
                                        Reference:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ localData.reference.reference_no }}
                                    </p>
                                    <p class="text-md font-bold inline align-middle">
                                        Terms of Payment:
                                    </p>
                                    <!-- EDITABLE TERMS OF PAYMENT FIELD -->
                                    <select
                                        v-model="editableTerms"
                                        class="inline align-middle w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        :placeholder="localData.metadata?.terms_of_payment || 'Choose Terms of Payment'"
                                    >
                                        <option value="">
                                            Choose Terms of Payment
                                        </option>
                                        <option v-for="(term, index) in TERMS" :key="index" :value="term">
                                            {{ term }}
                                        </option>
                                    </select>
                                    <p class="text-md font-bold">
                                        Particulars:
                                    </p>
                                    <!-- EDITABLE PARTICULARS FIELD -->
                                    <textarea
                                        v-model="editableParticulars"
                                        class="text-md underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full border border-gray-300 rounded p-2"
                                        placeholder="Enter particulars..."
                                        rows="1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2 text-left">
                            <div class="flex justify-around p-2">
                                <div class="grid grid-cols-2 gap-y-2">
                                    <p class="text-md font-bold">
                                        Reference Number:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ localData.reference_no }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Transaction Date:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ dateToString(new Date(localData.transaction_date)) }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Project Code:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ localData?.project?.project_code }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Equipment No.:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ localData.metadata.equipment_no }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Source PO:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ localData.source_po }}
                                    </p>
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
                                            {{ item.specification }}
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
                                                @input="updateActualBrand(item.id, $event.target.value)"
                                            >
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.quantity }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ acceptedQtyMap.get(item.id) ||  item.quantity || 0 }}
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
                                    <!-- <pre>{{ reactiveData.items }}</pre> -->
                                    <tr class="border">
                                        <td colspan="10">
                                            <div class="flex justify-end p-2 py-2">
                                                <div class="grid grid-cols-2 gap-2">
                                                    <p v-if="title" class="text-md text-gray-900">
                                                        <strong>Total net of VAT cost:</strong>
                                                    </p>
                                                    <p v-if="title" class="text-md text-gray-900">
                                                        {{ utils.formatCurrency(reactiveData.total_net_of_vat_cost) }}
                                                    </p>
                                                    <p v-if="title" class="text-md text-gray-900">
                                                        <strong>Total Input VAT:</strong>
                                                    </p>
                                                    <p v-if="title" class="text-md text-gray-900">
                                                        {{ utils.formatCurrency(reactiveData.total_input_vat) }}
                                                    </p>
                                                    <p v-if="title" class="text-md text-gray-900">
                                                        <strong> Grand Total:</strong>
                                                    </p>
                                                    <p v-if="title" class="text-md text-gray-900">
                                                        {{ `₱${utils.formatCurrency(reactiveData.grand_total)}` }}
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
            </LayoutPrint>
        </div>
    </div>
</template>
