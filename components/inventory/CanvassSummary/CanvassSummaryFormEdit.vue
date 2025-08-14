<script setup>
import { useCanvassSummaryStore } from "~/stores/inventory/procurement/canvassSummary"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"

const mainStore = useCanvassSummaryStore()
const priceQuotationStore = usePriceQuotationStore()
const procurementRequestStore = useProcurementRequestStore()

const { canvassSummary } = storeToRefs(mainStore)
const { viewRequests } = storeToRefs(procurementRequestStore)
const { quotationsForCanvass } = storeToRefs(priceQuotationStore)

const route = useRoute()

defineProps({
    title: { type: String, required: true },
    csId: { type: [String, Number], required: true }
})

const selectedItems = ref({})
const activeSupplier = ref(0)

const supplierColumns = [
    { name: "ITEM NO.", key: "id" },
    { name: "ITEM DESCRIPTION", key: "itemDescription" },
    { name: "SPECIFICATION", key: "specification" },
    { name: "QTY", key: "qty" },
    { name: "UNIT OF MEASUREMENT", key: "unit" },
    ...[1, 2, 3].flatMap(i => [
        { name: "UNIT PRICE", key: `supplier${i}_unit_price` },
        { name: "TOTAL", key: `supplier${i}_total` },
        { name: "REMARKS", key: `supplier${i}_remarks` }
    ])
]

const orderedSuppliers = computed(() => {
    if (!quotationsForCanvass.value.list || !canvassSummary.value.details) {
        return []
    }

    const allSuppliers = [...quotationsForCanvass.value.list]
    const selectedQuotationId = canvassSummary.value.details.price_quotation_id

    const selectedSupplierIndex = allSuppliers.findIndex(
        supplier => supplier.id === selectedQuotationId
    )

    if (selectedSupplierIndex === -1) {
        return allSuppliers.slice(0, 3)
    }

    const selectedSupplier = allSuppliers.splice(selectedSupplierIndex, 1)[0]

    const reorderedSuppliers = [selectedSupplier, ...allSuppliers]
    return reorderedSuppliers.slice(0, 3)
})

const initializeSelectedItems = () => {
    if (canvassSummary.value.details?.items) {
        const itemIds = {}
        canvassSummary.value.details.items.forEach((item, index) => {
            itemIds[item.item_id] = true
            itemIds[index] = true
        })
        selectedItems.value = itemIds
    }
}

onMounted(() => {
    mainStore.getOne(route.query.cs_id || props.csId)

    if (canvassSummary.value.details?.price_quotation?.request_procurement_id) {
        procurementRequestStore.getOne(canvassSummary.value.details.price_quotation.request_procurement_id)
    }

    priceQuotationStore.getQuotationsForCanvass(route.query.cs_id)
})

watch(
    () => canvassSummary.value.details,
    (newDetails) => {
        if (newDetails) {
            nextTick(() => {
                initializeSelectedItems()
                activeSupplier.value = 0
            })
        }
    },
    { deep: true }
)
</script>

<template>
    <div class="text-gray-500 p-2">
        <div class="flex flex-col gap-4 pt-4 w-full">
            <DocumentTemplatesIsoHeader :page="{ currentPage: 1, totalPages: 1 }" />
            <div v-if="title" class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4">
                <h3 class="pl-4 text-2xl font-bold text-gray-900 p-4 uppercase">
                    {{ title }}
                </h3>
            </div>

            <div class="flex flex-col gap-4 mb-5">
                <div class="flex flex-row justify-between gap-4">
                    <div class="w-full flex flex-col">
                        <InventoryCommonFormPsFormLabel
                            v-for="(value, label) in {
                                'DATE': canvassSummary.details?.price_quotation?.created_at,
                                'PROJECT CODE': viewRequests.details?.requisition_slip?.office_project,
                                'CONSO/RS REFERENCE NUMBER': viewRequests.details?.requisition_slip?.reference_no,
                            }"
                            :key="label"
                            :title="label"
                            :value="value"
                        />
                    </div>
                    <div class="w-full flex flex-col">
                        <InventoryCommonFormPsFormLabel
                            v-for="(value, label) in {
                                'CS NUMBER': canvassSummary.details?.cs_number,
                            }"
                            :key="label"
                            :title="label"
                            :value="value"
                        />
                    </div>
                </div>

                <div>
                    <InventoryCanvassSummaryItemList
                        :selected-items="selectedItems"
                        :active-supplier="activeSupplier"
                        :items="viewRequests?.details?.requisition_slip?.request_stock_items"
                        :suppliers="orderedSuppliers"
                        :columns="supplierColumns"
                        :loading="quotationsForCanvass.isLoading || viewRequests.isLoading || canvassSummary.isLoading"
                    />

                    <div class="border border-t-0 border-gray-700 shadow-sm uppercase text-black bg-white">
                        <div
                            v-for="(value, label) in {
                                'Terms and Conditions': canvassSummary.details?.terms_of_payment,
                                'Availability': canvassSummary.details?.availability,
                                'Delivery Terms': canvassSummary.details?.delivery_terms,
                            }"
                            :key="label"
                            class="flex h-[60px] border-b border-gray-700 last:border-b-0"
                        >
                            <div class="w-1/2 px-4 py-4 font-medium border-r border-gray-700 flex items-center justify-center">
                                {{ label }}
                            </div>
                            <div class="w-1/4 px-4 py-4 flex items-center text-black font-semibold">
                                {{ value || '-' }}
                            </div>
                        </div>

                        <div class="flex h-[100px]">
                            <div class="w-1/2 px-4 py-4 font-medium border-r border-gray-700 flex items-center justify-center">
                                Remarks
                            </div>
                            <div class="w-1/2 px-4 py-4 font-semibold">
                                {{ canvassSummary.details?.remarks || 'No remarks' }}
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="canvassSummary.details?.request_status" class="bg-slate-50 rounded-lg p-4">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-gray-700">Status:</span>
                        <span
                            class="px-2 py-1 rounded-full text-xs font-medium"
                            :class="{
                                'bg-yellow-100 text-yellow-800': canvassSummary.details.request_status === 'PENDING',
                                'bg-green-100 text-green-800': canvassSummary.details.request_status === 'APPROVED',
                                'bg-red-100 text-red-800': canvassSummary.details.request_status === 'REJECTED',
                            }"
                        >
                            {{ canvassSummary.details.request_status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media print {
    .no-print {
        display: none !important;
    }
}
</style>
