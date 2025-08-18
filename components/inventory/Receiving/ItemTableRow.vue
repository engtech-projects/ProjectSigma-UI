<script setup lang="ts">
import { useReceivingStore } from "@/stores/inventory/receiving"

const snackbar = useSnackbar()
const route = useRoute()
const main = useReceivingStore()
const model = defineModel<Record<string, any>>({ default: () => ({}) })
const extendedPrice = computed(() => {
    return model.value.unit_price * model.value.quantity
})
const acceptAll = async () => {
    try {
        await main.acceptAllItem(model.value.id)
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
const acceptSome = async ({
    requestId,
    remarks
}: {
    requestId: number
    remarks: string
}) => {
    const payload = {
        remarks,
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
const rejectAllItems = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
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
const updateDetails = useDebounceFn(async () => {
    try {
        await main.updateReceivingItem(model.value)
    } catch (error: any) {
        snackbar.add({ type: "error", text: error.message || "Something went wrong." })
    }
}, 500)
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
            <template v-if="model.acceptance_status !== 'Pending'">
                {{ model.specification }}
            </template>
            <input
                v-else
                v-model="model.specification"
                type="text"
                class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter specification..."
                @change="updateDetails"
            >
        </td>

        <td class="border px-2 py-1 text-center">
            <template v-if="model.acceptance_status !== 'Pending'">
                {{ model.actual_brand_purchase }}
            </template>
            <input
                v-else
                v-model="model.actual_brand_purchase"
                type="text"
                class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter brand..."
                :disabled="['Accepted', 'Rejected'].includes(model.acceptance_status)"
                @change="updateDetails"
            >
        </td>

        <td class="border px-2 py-1 text-center">
            {{ model.quantity }}
        </td>
        <td class="border px-2 py-1 text-center">
            {{ model.uom_name }}
        </td>

        <td class="border px-2 py-1 text-center">
            <template v-if="model.acceptance_status !== 'Pending'">
                {{ useFormatCurrency(model.unit_price) }}
            </template>
            <input
                v-else
                v-model.number="model.unit_price"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-2 py-1 text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                :disabled="['Accepted', 'Rejected'].includes(model.acceptance_status)"
                @change="updateDetails"
            >
        </td>

        <td class="border px-2 py-1 text-center">
            {{ useFormatCurrency(extendedPrice) }}
        </td>

        <td class="border px-2 py-1 text-center">
            <div v-if="model.acceptance_status" class="flex justify-center relative group">
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
                    name="mdi:circle-slice-3"
                    class="text-gray-600 h-8 w-8"
                />
                <div
                    class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md"
                >
                    {{ model.acceptance_status }}
                </div>
            </div>
        </td>

        <td class="border px-2 py-1 text-center">
            {{ model.remarks }}
        </td>

        <td class="border px-2 py-1 text-center z-50">
            <InventoryCommonAcceptRejectButton
                v-model:quantity="model.quantity"
                :max-quantity="model.requested_quantity"
                :request-id="model.id"
                :disabled="['Accepted', 'Rejected'].includes(model.acceptance_status)"
                :class="{ 'opacity-60 cursor-not-allowed pointer-events-none': ['Accepted', 'Rejected'].includes(model.acceptance_status) }"
                @accept-all="acceptAll"
                @accept="acceptSome"
                @reject="rejectAllItems"
            />
        </td>
    </tr>
</template>
