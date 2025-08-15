<script setup>
import { useCanvassSummaryStore } from "~/stores/inventory/procurement/canvassSummary"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"

const route = useRoute()
const mainStore = useCanvassSummaryStore()
const priceQuotationStore = usePriceQuotationStore()
const procurementRequestStore = useProcurementRequestStore()
const { canvassSummary } = storeToRefs(mainStore)
const { viewRequests } = storeToRefs(procurementRequestStore)
const { quotationsForCanvass } = storeToRefs(priceQuotationStore)

defineProps({
    title: { type: String, required: true },
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
    const selectedItemIds = new Set(
        canvassSummary.value.details.items.map(item => item.item_id)
    )
    const allSuppliers = quotationsForCanvass.value.list.map(supplier => ({
        ...supplier,
        items: supplier.items.filter(item => selectedItemIds.has(item.item_id))
    }))
    const selectedQuotationId = canvassSummary.value.details.price_quotation_id
    const selectedSupplierIndex = allSuppliers.findIndex(
        supplier => supplier.id === selectedQuotationId
    )
    if (selectedSupplierIndex === -1) {
        return allSuppliers.slice(0, 3)
    }
    const selectedSupplier = allSuppliers.splice(selectedSupplierIndex, 1)[0]
    return [selectedSupplier, ...allSuppliers].slice(0, 3)
})

onMounted(() => {
    priceQuotationStore.getQuotationsForCanvass(route.query.pr_id)
})

watch(
    () => canvassSummary.value.details,
    (details) => {
        if (!details?.items) { return }
        selectedItems.value = Object.fromEntries(
            details.items.map((item, _idx) => [item.item_id, true]).concat(
                details.items.map((_, idx) => [idx, true])
            )
        )
        activeSupplier.value = 0
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
                                'DATE': canvassSummary.details?.date,
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
                        :items="canvassSummary?.details?.items"
                        :suppliers="orderedSuppliers"
                        :columns="supplierColumns"
                        :loading="quotationsForCanvass.isLoading || viewRequests.isLoading || canvassSummary.isLoading"
                        :read-only="true"
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
