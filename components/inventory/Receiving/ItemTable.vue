<script setup lang="ts">
import { type HeaderColumn } from "@/stores/inventory/receiving"
defineProps<{
    headerColumns: HeaderColumn[]
}>()
const model = defineModel<Record<string, any>>({ default: () => ({}) })

const canAcceptReject = computed(() => {
    const metadata = model.value.metadata || {}
    return !!(
        metadata.supplier_id &&
        metadata.reference &&
        metadata.terms_of_payment &&
        metadata.particulars
    )
})
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
                <InventoryReceivingItemTableRow
                    v-for="item, index in model.items"
                    :key="item.id + 'itemTableRow'"
                    v-model="model.items[index]"
                    :can-accept-reject="canAcceptReject"
                />
                <tr class="border">
                    <td :colspan="headerColumns.length">
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
                                    {{ useFormatCurrency(model.grand_total || 0) }}
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
