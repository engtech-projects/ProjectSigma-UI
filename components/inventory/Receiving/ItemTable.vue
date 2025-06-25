<script setup lang="ts">
import { useReceivingStore, type HeaderColumn } from "@/stores/inventory/receiving"

const snackbar = useSnackbar()

defineProps<{
    headerColumns: HeaderColumn[]
}>()

const main = useReceivingStore()
const model = defineModel<Record<string, any>>({ default: () => ({}) })
const remarks = defineModel<string>("remarks", { default: "" })

const getExtPrice = (item:any) => {
    const unitPrice = item.metadata?.unit_price || 0
    const acceptedQty = item.metadata?.accepted_quantity || 0
    return unitPrice * acceptedQty
}

const calculatedGrandTotal = computed(() => {
    return model.value.items?.reduce((total, item) => {
        const extPrice = getExtPrice(item)
        return total + (extPrice || 0)
    }, 0) || 0
})
const handleAcceptedQtyUpdate = (requestId: number, newQty: number) => {
    const item = model.value.items?.find(item => item.id === requestId)
    if (item) {
        if (!item.metadata) {
            item.metadata = {}
        }
        if (item.metadata.accepted_quantity !== newQty) {
            item.metadata.accepted_quantity = newQty
            if (item.metadata.unit_price !== undefined) {
                const unitPrice = item.metadata.unit_price || 0
                item.ext_price = unitPrice * newQty
            }
        }
    }
}

const initializeAcceptedQuantities = () => {
    if (model.value.items) {
        model.value.items.forEach((item: any) => {
            if (!item.metadata) {
                item.metadata = {}
            }
            if (item.metadata.accepted_quantity === undefined && !item.metadata.status) {
                item.metadata.accepted_quantity = item.quantity
            }
        })
    }
}

onMounted(() => {
    nextTick(() => {
        initializeAcceptedQuantities()
    })
})

watch(() => model.value.items, (newItems) => {
    if (newItems) {
        newItems.forEach((item: any) => {
            if (!item.metadata) {
                item.metadata = {}
            }

            if (item.metadata.unit_price !== undefined && item.metadata.accepted_quantity !== undefined) {
                const unitPrice = item.metadata.unit_price || 0
                const acceptedQty = item.metadata.accepted_quantity || 0
                const expectedExtPrice = unitPrice * acceptedQty

                if (item.ext_price !== expectedExtPrice) {
                    item.ext_price = expectedExtPrice
                }
            }
        })
    }
}, { deep: true })

const acceptAll = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    const item = model.value.items?.find(item => item.id === requestId)
    if (!item) {
        snackbar.add({ type: "error", text: "Item not found." })
        return
    }

    const payload = {
        remarks,
        actual_brand_purchase: item.metadata?.actual_brand_purchase || item.preferred_brand,
        quantity: item.quantity,
        accepted_quantity: item.quantity,
        unit_price: item.metadata?.unit_price || 0,
        specification: item.metadata?.specification || null,
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

const acceptWithDetails = async ({
    requestId,
    acceptedQty,
    remarks
}: {
    requestId: number
    acceptedQty: number
    remarks: string
}) => {
    const item = model.value.items?.find(item => item.id === requestId)
    if (!item) {
        snackbar.add({ type: "error", text: "Item not found." })
        return
    }

    if (!item.metadata) { item.metadata = {} }
    item.metadata.accepted_quantity = acceptedQty
    item.ext_price = (item.metadata.unit_price || 0) * acceptedQty

    const payload = {
        accepted_quantity: acceptedQty,
        remarks,
        actual_brand_purchase: item.metadata?.actual_brand_purchase || item.preferred_brand,
        unit_price: item.metadata?.unit_price || 0,
        specification: item.metadata?.specification || null,
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
</script>

<template>
    <div class="overflow-auto">
        <table class="table-auto w-full border-collapse">
            <thead>
                <tr class="bg-[#dbe5f1]">
                    <th
                        v-for="header in headerColumns"
                        :key="header.id"
                        scope="col"
                        class="p-2 border-b text-sm"
                    >
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
                        <template v-if="item.metadata?.remarks && item.metadata?.specification">
                            {{ item.metadata.specification }}
                        </template>
                        <input
                            v-else
                            v-model="item.metadata.specification"
                            type="text"
                            class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter specification..."
                            :disabled="!!(item.metadata?.remarks && item.metadata?.specification)"
                        >
                    </td>

                    <td class="border px-2 py-1 text-center">
                        <template v-if="item.metadata?.remarks && item.metadata?.actual_brand_purchase">
                            {{ item.metadata.actual_brand_purchase || item.preferred_brand }}
                        </template>
                        <input
                            v-else
                            v-model="item.metadata.actual_brand_purchase"
                            type="text"
                            class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter brand..."
                            :disabled="!!(item.metadata?.remarks && item.metadata?.actual_brand_purchase)"
                        >
                    </td>

                    <td class="border px-2 py-1 text-center">
                        {{ item.quantity }}
                    </td>
                    <td class="border px-2 py-1 text-center">
                        {{ item.metadata?.accepted_quantity }}
                    </td>
                    <td class="border px-2 py-1 text-center">
                        {{ item.uom_name }}
                    </td>

                    <td class="border px-2 py-1 text-center">
                        <input
                            v-model.number="item.metadata.unit_price"
                            type="number"
                            min="0"
                            step="0.01"
                            class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0.00"
                            :disabled="!!item.metadata?.remarks"
                        >
                    </td>

                    <td class="border px-2 py-1 text-center">
                        {{ useFormatCurrency(getExtPrice(item)) }}
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

                    <td class="border px-2 py-1 text-center z-50">
                        <InventoryCommonAcceptRejectButton
                            v-model:accept-remarks="remarks"
                            v-model:reject-remarks="remarks"
                            :max-quantity="item.quantity"
                            :request-id="item.id"
                            :initial-accepted-qty="item.metadata?.accepted_quantity"
                            :disabled="!!item.metadata?.remarks"
                            :class="{ 'opacity-60 cursor-not-allowed pointer-events-none': !!item.metadata?.remarks }"
                            @accept-all="acceptAll"
                            @accept="acceptWithDetails"
                            @reject="rejectRequest"
                            @update-accepted-qty="handleAcceptedQtyUpdate"
                        />
                    </td>
                </tr>

                <tr class="border">
                    <td colspan="12">
                        <div class="flex justify-end p-2 py-2">
                            <div class="grid grid-cols-2 gap-2">
                                <p class="text-md text-gray-900">
                                    <strong>Total net of VAT cost:</strong>
                                </p>
                                <p class="text-md text-gray-900">
                                    {{ useFormatCurrency(model.total_net_of_vat_cost || 0) }}
                                </p>

                                <p class="text-md text-gray-900">
                                    <strong>Total Input VAT:</strong>
                                </p>
                                <p class="text-md text-gray-900">
                                    {{ useFormatCurrency(model.total_input_vat || 0) }}
                                </p>

                                <p class="text-md text-gray-900">
                                    <strong>Grand Total:</strong>
                                </p>
                                <p class="text-md text-gray-900">
                                    {{ useFormatCurrency(calculatedGrandTotal) }}
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
