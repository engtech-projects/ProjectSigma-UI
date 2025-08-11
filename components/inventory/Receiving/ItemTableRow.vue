<script setup lang="ts">
import { useReceivingStore } from "@/stores/inventory/receiving"

const snackbar = useSnackbar()
const route = useRoute()
const main = useReceivingStore()
const model = defineModel<Record<string, any>>({ default: () => ({}) })
const extendedPrice = computed(() => {
    return model.value.metadata?.unit_price * model.value.quantity
})
watch(extendedPrice, (newValue) => {
    model.value.ext_price = newValue
}, { immediate: true })
const props = defineProps<{
    canAcceptReject: boolean
}>()
const acceptAll = async () => {
    if (!props.canAcceptReject) {
        snackbar.add({
            type: "info",
            text: "Please complete all required fields first."
        })
        return
    }
    const payload = {
        actual_brand_purchase: model.value.metadata?.actual_brand_purchase,
        unit_price: model.value.metadata?.unit_price || 0,
        specification: model.value.metadata?.specification || "",
    }

    try {
        await main.acceptAllItem(model.value.id, payload)
        const messageType = main.errorMessage ? "error" : "success"
        const messageText = main.errorMessage || main.successMessage

        snackbar.add({ type: messageType, text: messageText })

        if (messageType === "success") {
            main.$reset()
            await main.fetchReceivingDetails(route.query.key)
        }
    } catch (error: any) {
        snackbar.add({ type: "error", text: error.message || "Something went wrong." })
    }
}

const acceptWithDetails = async ({
    requestId,
    remarks
}: {
    requestId: number
    remarks: string
}) => {
    if (!props.canAcceptReject) {
        snackbar.add({
            type: "info",
            text: "Please complete all required fields first."
        })
        return
    }
    model.value.ext_price = extendedPrice.value

    const payload = {
        remarks,
        actual_brand_purchase: model.value.metadata?.actual_brand_purchase,
        unit_price: model.value.metadata?.unit_price || 0,
        specification: model.value.metadata?.specification || null,
        quantity: model.value.quantity
    }

    try {
        await main.acceptQtyRemarks(requestId, payload)
        const messageType = main.errorMessage ? "error" : "success"
        const messageText = main.errorMessage || main.successMessage

        snackbar.add({ type: messageType, text: messageText })

        if (messageType === "success") {
            main.$reset()
            await main.fetchReceivingDetails(route.query.key)
        }
    } catch (error: any) {
        snackbar.add({ type: "error", text: error.message || "Something went wrong." })
    }
}

const rejectRequest = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    if (!props.canAcceptReject) {
        snackbar.add({
            type: "info",
            text: "Please complete all required fields first."
        })
        return
    }
    try {
        await main.rejectItem(requestId, { remarks: remarks.trim() })
        const messageType = main.errorMessage ? "error" : "success"
        const messageText = main.errorMessage || main.successMessage
        snackbar.add({ type: messageType, text: messageText })
        if (messageType === "success") {
            main.$reset()
            await main.fetchReceivingDetails(route.query.key)
        }
    } catch (error: any) {
        snackbar.add({ type: "error", text: error.message || "Something went wrong." })
    }
}
</script>

<template>
    <tr class="bg-white border-b">
        <td class="border px-2 py-1 text-center">
            {{ model.item_code }}
        </td>
        <td class="border px-2 py-1 text-center">
            {{ model.item_description }}
        </td>

        <td class="border px-2 py-1 text-center">
            <template v-if="model.metadata?.status">
                {{ model.metadata.specification }}
            </template>
            <input
                v-else
                v-model="model.metadata.specification"
                type="text"
                class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter specification..."
                :disabled="['Accepted', 'Rejected'].includes(model.metadata?.status)"
            >
        </td>

        <td class="border px-2 py-1 text-center">
            <template v-if="model.metadata?.status">
                {{ model.metadata.actual_brand_purchase }}
            </template>
            <input
                v-else
                v-model="model.metadata.actual_brand_purchase"
                type="text"
                class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter brand..."
                :disabled="['Accepted', 'Rejected'].includes(model.metadata?.status)"
            >
        </td>

        <td class="border px-2 py-1 text-center">
            {{ model.quantity }}
        </td>
        <td class="border px-2 py-1 text-center">
            {{ model.uom_name }}
        </td>

        <td class="border px-2 py-1 text-center">
            <template v-if="model.metadata?.status">
                {{ useFormatCurrency(model.metadata.unit_price) }}
            </template>
            <input
                v-else
                v-model.number="model.metadata.unit_price"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                :disabled="['Accepted', 'Rejected'].includes(model.metadata?.status)"
            >
        </td>

        <td class="border px-2 py-1 text-center">
            {{ useFormatCurrency(extendedPrice) }}
        </td>

        <td class="border px-2 py-1 text-center">
            <div v-if="model.metadata?.status" class="flex justify-center relative group">
                <Icon
                    v-if="model.acceptance_status === 'Accepted'"
                    name="mdi:check-circle"
                    class="text-green-700 h-8 w-8"
                />
                <Icon
                    v-else-if="model.acceptance_status === 'Rejected'"
                    name="mdi:close-circle"
                    class="text-red-700 h-8 w-8"
                />
                <Icon
                    v-else
                    name="mdi:close-circle"
                    class="text-gray-600 h-8 w-8"
                />
                <div
                    class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md"
                >
                    {{ model.metadata?.status }}
                </div>
            </div>
        </td>

        <td class="border px-2 py-1 text-center">
            {{ model.metadata?.remarks }}
        </td>

        <td class="border px-2 py-1 text-center z-50">
            <InventoryCommonAcceptRejectButton
                v-model:quantity="model.quantity"
                :max-quantity="model.metadata.requested_quantity"
                :request-id="model.id"
                :disabled="['Accepted', 'Rejected'].includes(model.metadata?.status)"
                :class="{ 'opacity-60 cursor-not-allowed pointer-events-none': ['Accepted', 'Rejected'].includes(model.metadata?.status) }"
                @accept-all="acceptAll"
                @accept="acceptWithDetails"
                @reject="rejectRequest"
            />
        </td>
    </tr>
</template>
