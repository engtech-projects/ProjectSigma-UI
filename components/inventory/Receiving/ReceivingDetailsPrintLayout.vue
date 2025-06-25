<script setup lang="ts">
interface HeaderColumn {
    name: string;
    id: string;
    style?: string;
}

defineProps<{
    title: string;
    headerColumns: HeaderColumn[];
    data: any;
}>()

</script>

<template>
    <div class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col gap-2 w-full p-4">
            <InventoryCommonEvenparHeader />

            <div class="flex items-center justify-center rounded-t mb-4 mt-4">
                <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                    {{ title }}
                </h3>
            </div>

            <div class="bg-white rounded-xl overflow-hidden mb-6">
                <div class="grid grid-cols-2 gap-10 p-4">
                    <div>
                        <div class="grid grid-cols-2 items-center w-full gap-y-2">
                            <label class="text-sm font-medium text-gray-700">Supplier:</label>
                            <div class="text-sm">
                                {{ data.supplier }}
                            </div>

                            <label class="text-sm font-medium text-gray-700">Reference:</label>
                            <div class="text-sm underline">
                                {{ data.metadata?.reference }}
                            </div>

                            <label class="text-sm font-medium text-gray-700">Terms of Payment:</label>
                            <div class="text-sm">
                                {{ data.metadata?.terms_of_payment }}
                            </div>

                            <label class="text-sm font-medium text-gray-700">Particulars:</label>
                            <div class="text-sm underline">
                                {{ data.metadata?.particulars }}
                            </div>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <div class="flex items-center justify-between w-full">
                            <label class="w-40 text-sm font-medium text-gray-700">Reference Number:</label>
                            <div class="flex-1 text-sm underline font-bold">
                                {{ data.reference_no }}
                            </div>
                        </div>

                        <div class="flex items-center justify-between w-full">
                            <label class="w-40 text-sm font-medium text-gray-700">Transaction Date:</label>
                            <div class="flex-1 text-sm underline">
                                {{ dateToString(new Date(data.transaction_date)) }}
                            </div>
                        </div>

                        <div class="flex items-center justify-between w-full">
                            <label class="w-40 text-sm font-medium text-gray-700">Project Code:</label>
                            <div class="flex-1 text-sm underline">
                                {{ data.project_code }}
                            </div>
                        </div>

                        <div class="flex items-center justify-between w-full">
                            <label class="w-40 text-sm font-medium text-gray-700">Equipment No.:</label>
                            <div class="flex-1 text-sm underline">
                                {{ data.metadata?.equipment_no }}
                            </div>
                        </div>

                        <div class="flex items-center justify-between w-full">
                            <label class="w-40 text-sm font-medium text-gray-700">Source PO:</label>
                            <div class="flex-1 text-sm underline">
                                {{ data.source_po ?? "N/A" }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LayoutLoadingContainer class="w-full" :loading="data.isLoading">
                <div>
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
                        <tbody>
                            <tr v-for="item in data.items" :key="item.id" class="bg-white">
                                <td class="border px-2 py-1 text-center">
                                    {{ item.item_code }}
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    {{ item.item_description }}
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    {{ item.metadata?.specification }}
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    {{ item.metadata?.actual_brand_purchase }}
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    {{ item.metadata?.accepted_quantity }}
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    {{ item.uom_name }}
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    {{ useFormatCurrency(item.metadata.unit_price) }}
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    {{ useFormatCurrency(item.ext_price) }}
                                </td>
                                <td class="border px-2 py-1 text-center">
                                    {{ item.metadata?.remarks }}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="7" class="px-2 py-1 text-right font-medium text-sm">
                                    Total Net of VAT Cost
                                </td>
                                <td class="border px-2 py-1 text-right text-sm">
                                    {{ useFormatCurrency(0) }}
                                </td>
                                <td />
                            </tr>
                            <tr>
                                <td colspan="7" class="px-2 py-1 text-right font-medium text-sm">
                                    Total Input VAT
                                </td>
                                <td class="border px-2 py-1 text-right text-sm">
                                    {{ useFormatCurrency(0) }}
                                </td>
                                <td />
                            </tr>
                            <tr>
                                <td colspan="7" class="px-2 py-1 text-right font-bold text-sm">
                                    Grand Total
                                </td>
                                <td class="border px-2 py-1 text-right font-bold text-sm">
                                    ₱{{ useFormatCurrency(data.grand_total) }}
                                </td>
                                <td />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </LayoutLoadingContainer>
        </div>
    </div>
</template>
