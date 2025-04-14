<script setup lang="ts">
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"

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

const main = usePriceQuotationStore()
// const snackbar = useSnackbar()
const { priceQuotation } = storeToRefs(main)
const utils = useUtilities()

const reactiveData = computed(() => props.data)

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
                                <div class="grid grid-cols-2">
                                    <p class="text-md font-bold">
                                        Date:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.date || '' }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Supplier Name:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.supplier_name }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Address:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.address }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Contact Person:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.contact_person }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2 text-left">
                            <div class="flex justify-around p-2">
                                <div class="grid grid-cols-2">
                                    <p class="text-md font-bold">
                                        Quotation Number:
                                    </p>
                                    <p class="text-md font-bold underline indent-2">
                                        {{ data.quotation_no }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Conso Reference No.:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.conso_reference_no }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Contact Number:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data?.contact_no }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LayoutLoadingContainer class="w-full" :loading="priceQuotation.isLoading">
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
                                            {{ item.item_id }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.specification }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.qty }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.unit }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.preferred_brand }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.actual_brand }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.unit_price }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.remarks }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ utils.formatCurrency(item.unit_price) }}
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
