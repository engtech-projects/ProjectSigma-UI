<script setup lang="ts">
import { useReceivingStore } from "@/stores/inventory/receiving"

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

defineProps({
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
const model = defineModel({ required: false, type: Object, default: null })
const main = useReceivingStore()
const { receiving } = storeToRefs(main)

const getExtPrice = (item: any) => {
    const unitPrice = item.metadata?.unit_price || item.unit_price || 0
    const quantity = item.accepted_quantity || item.quantity || 0
    return unitPrice * quantity
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
</script>
<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <div id="headline mb-4">
                <InventoryCommonEvenparHeader />
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4 mt-4">
                    <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                        {{ title }}
                    </h3>
                </div>
                <div class="bg-white rounded-xl overflow-hidden mb-6">
                    <div class="grid grid-cols-2 gap-10">
                        <div class="flex-1">
                            <div class="p-4">
                                <div class="grid grid-cols-2 items-center w-full gap-y-2">
                                    <label class="text-sm font-medium text-gray-700">Supplier:</label>
                                    <div class="text-sm">
                                        {{ model.supplier }}
                                    </div>

                                    <label class="text-sm font-medium text-gray-700">Reference:</label>
                                    <div class="text-sm underline">
                                        {{ model.metadata.reference || 'N/A' }}
                                    </div>

                                    <label class="text-sm font-medium text-gray-700">Terms of Payment:</label>
                                    <div class="text-sm">
                                        {{ model.metadata.terms_of_payment || 'N/A' }}
                                    </div>

                                    <label class="text-sm font-medium text-gray-700">Particulars:</label>
                                    <div class="text-sm underline">
                                        {{ model.metadata?.particulars || 'N/A' }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-1">
                            <div class="p-4">
                                <div class="space-y-2">
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
                                            {{ model.project_code ?? '--' }}
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
                </div>
                <LayoutLoadingContainer class="w-full" :loading="receiving.isLoading">
                    <div id="itemDetails">
                        <div id="content">
                            <table class="table-auto w-full border-collapse">
                                <thead>
                                    <tr class="bg-[#dbe5f1]">
                                        <th
                                            v-for="(dataHeader, index) in headerColumns"
                                            :key="index"
                                            scope="col"
                                            class="p-2 border-b text-xs"
                                        >
                                            {{ dataHeader.name }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-for="item in model.items" :key="item.id">
                                    <tr class="bg-white">
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.item_code }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.item_description }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ getSpecificationValue(item) }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ getActualBrandValue(item) }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.accepted_quantity || item.quantity || 0 }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.uom_name }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ getUnitPriceValue(item) }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ useFormatCurrency(getExtPrice(item)) }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.metadata?.remarks }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="6" class="px-2 py-1" />
                                        <td class="border px-2 py-1 text-right font-medium text-sm">
                                            Total Net of Vat Cost
                                        </td>
                                        <td class="border px-2 py-1 text-right text-sm">
                                            {{ useFormatCurrency(0) }}
                                        </td>
                                        <td class="px-2 py-1" />
                                    </tr>
                                    <tr>
                                        <td colspan="6" class="px-2 py-1" />
                                        <td class="border px-2 py-1 text-right font-medium text-sm">
                                            Total Input Vat
                                        </td>
                                        <td class="border px-2 py-1 text-right text-sm">
                                            {{ useFormatCurrency(0) }}
                                        </td>
                                        <td class="px-2 py-1" />
                                    </tr>
                                    <tr>
                                        <td colspan="6" class="px-2 py-1" />
                                        <td class="border px-2 py-1 text-right font-bold text-sm">
                                            Grand Total
                                        </td>
                                        <td class="border px-2 py-1 text-right font-bold text-sm">
                                            ₱{{ useFormatCurrency(item.grand_total) }}
                                        </td>
                                        <td class="px-2 py-1" />
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </LayoutLoadingContainer>
            </div>
        </div>
    </div>
</template>
