<script setup lang="ts">
import { useNcpoStore } from "@/stores/inventory/procurement/ncpo"

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
        type: Array<any>,
        required: true,
    },
})

const main = useNcpoStore()
// const snackbar = useSnackbar()
const { ncpoRequest } = storeToRefs(main)

const reactiveData = computed(() => props.data)
const changesHeaders = [
    { name: "CHANGE OF SUPPLIER", id: "supplier_id" },
    { name: "CHANGE IN ITEM DESCRIPTION/SPECIFICATION", id: "specification" },
    { name: "CHANGE IN QTY", id: "quantity" },
    { name: "CHANGE IN UOM", id: "uom" },
    { name: "CHANGE IN UNIT PRICE", id: "unit_price" },
    { name: "NEW TOTAL", id: "gross_amount" },
    { name: "CHANGE IN BRAND", id: "brand" },
    { name: "CANCEL ITEM", id: "cancel_item" }
]

</script>
<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <LayoutPrint>
                <div id="headline mb-4 ">
                    <PrintTableFormat />
                    <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4 mt-4">
                        <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                            {{ title }}
                        </h3>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between gap-4 mb-6 p-4">
                        <div class="flex-1">
                            <div class="grid gap-3">
                                <InventoryCommonFormPsFormLabel title="NCPO NO" value="NCPO-001-123456" />
                                <InventoryCommonFormPsFormLabel title="PO NUMBER" value="PO-001-123456" />
                                <InventoryCommonFormPsFormLabel title="PO DATE" value="April 25, 2025" />
                                <InventoryCommonFormPsFormLabel title="PROJECT CODE" value="001-2323-232" />
                                <InventoryCommonFormPsFormLabel title="EQUIPMENT NUMBER" value="Equip-923-211" />
                            </div>
                        </div>
                        <div class="flex-1 md:text-right">
                            <div class="grid gap-3">
                                <InventoryCommonFormPsFormLabel title="DATE" value="April 25, 2025" />
                            </div>
                        </div>
                    </div>
                </div>

                <LayoutLoadingContainer class="w-full" :loading="ncpoRequest.isLoading">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col lg:flex-row gap-4 w-full">
                            <div class="w-full lg:w-1/2 lg:flex lg:flex-col lg:gap-4 lg:h-full border rounded-md shadow">
                                <h4 class="p-2 text-center font-semibold">
                                    DETAILS OF THE ENTIRE PO
                                </h4>
                                <div class="flex-1 overflow-auto">
                                    <table class="table-auto w-full border-collapse">
                                        <thead>
                                            <tr class="bg-[#dbe5f1]">
                                                <th v-for="(dataHeader, index) in headerColumns" :key="index" class="p-2 border text-xs">
                                                    {{ dataHeader.name }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in reactiveData" :key="item.id" class="bg-white border-b">
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.id }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.item_id }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.specification }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.quantity }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.uom }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.supplier_id }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ useFormatCurrency(item.unit_price) }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ useFormatCurrency(item.net_of_vat) }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ useFormatCurrency(item.input_vat) }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ useFormatCurrency(item.gross_amount) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="w-full lg:w-1/2 lg:flex lg:flex-col lg:gap-4 lg:h-full border rounded-md shadow">
                                <h4 class="p-2 text-center font-semibold">
                                    CHANGES TO INDIVIDUAL LINES ON PO
                                </h4>
                                <div class="flex-1 overflow-auto">
                                    <table class="table-auto w-full border-collapse">
                                        <thead>
                                            <tr class="bg-[#dbe5f1]">
                                                <th v-for="(changeHeader, index) in changesHeaders" :key="index" class="p-2 border text-xs">
                                                    {{ changeHeader.name }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in reactiveData" :key="item.id" class="bg-white border-b">
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.supplier_id }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.specification }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.quantity }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.uom }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ useFormatCurrency(item.unit_price) }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ useFormatCurrency(item.gross_amount) }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.brand || "-" }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ item.cancel_item ? "Yes" : "No" }}
                                                </td>
                                                <!-- <td class="border px-2 py-1 text-center">
                                                    {{ useFormatCurrency(item.net_of_vat) }}
                                                </td>
                                                <td class="border px-2 py-1 text-center">
                                                    {{ useFormatCurrency(item.gross_amount + item.input_vat) }}
                                                </td> -->
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-2 mt-4">
                        <div class="w-1/2 bg-white p-4 rounded-md border border-gray-300">
                            <h3 class="font-bold text-lg">
                                Total
                            </h3>
                            <p class="text-2xl font-bold">
                                {{ useFormatCurrency(total) }}
                            </p>
                        </div>
                        <div class="w-1/2 bg-white p-4 rounded-md border border-gray-300">
                            <h3 class="font-bold text-lg">
                                New PO Total
                            </h3>
                            <p class="text-2xl font-bold">
                                {{ useFormatCurrency(new_po_total) }}
                            </p>
                        </div>
                    </div>

                    <div class="w-full mt-6">
                        <InventoryCommonFormPsFormLabel value="lorem ipsum" title="Justification" />
                    </div>
                </LayoutLoadingContainer>
            </LayoutPrint>
        </div>
    </div>
</template>
