<script setup>
import { useCanvassSummaryStore } from "~/stores/inventory/procurement/canvassSummary"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"
// import { useApprovalStore } from "@/stores/hrms/setup/approvals"

const mainStore = useCanvassSummaryStore()
const priceQuotationStore = usePriceQuotationStore()
const procurementRequestStore = useProcurementRequestStore()
// const approvalsStore = useApprovalStore()

const { canvassSummary } = storeToRefs(mainStore)
const { viewRequests } = storeToRefs(procurementRequestStore)
const { priceQuotation } = storeToRefs(priceQuotationStore)

const route = useRoute()

defineProps({
    title: { type: String, required: true }
})

const selectedItems = ref({})
const activeSupplier = ref(null)

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

createRequest.value.approvals = await approvals.getApprovalByName(APPROVAL_REQUEST_CANVASS_SUMMARY)

onMounted(() => {
    procurementRequestStore.getOne(route.query.pr_id)
    priceQuotationStore.getQuotations(route.query.pr_id)
})
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
                                'DATE':canvassSummary.details?.date,
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
                        v-model:selected-items="selectedItems"
                        v-model:active-supplier="activeSupplier"
                        :items="viewRequests?.details?.requisition_slip?.request_stock_items"
                        :suppliers="priceQuotation.list"
                        :columns="supplierColumns"
                        :loading="priceQuotation.isLoading || viewRequests.isLoading"
                    />

                    <div class="border border-t-0 border-gray-700 shadow-sm uppercase text-black bg-white">
                        <div
                            v-for="(value, label) in {
                                'Terms and Conditions': canvassSummary.details?.terms_of_payment,
                                'Availability': canvassSummary.details?.availability,
                                'Delivery Terms': canvassSummary.details?.delivery_terms,
                            }"
                            :key="label"
                            :value="value"
                            class="flex h-[60px] border-b border-gray-700 last:border-b-0"
                        >
                            <div class="w-1/2 px-4 py-4 font-medium  border-r border-gray-700 flex items-center justify-center">
                                {{ label }}
                            </div>
                            <div class="w-1/4 px-4 py-4 flex items-center text-black">
                                {{ canvassSummary.details?.[label === 'Terms and Conditions' ? 'terms_of_payment' : label.replace(/ /g, '_').toLowerCase()] }}
                            </div>
                        </div>

                        <div class="flex h-[100px] ">
                            <div class="w-1/2 px-4 py-4 font-medium  border-r border-gray-700 flex items-center justify-center">
                                Remarks
                            </div>
                            <div class="w-1/2 px-4 py-4">
                                {{ canvassSummary.details?.remarks }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex w-full">
                    <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">
                            Approval:</label>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in createRequest.approvals"
                            :key="'hrmsetupapprovallist' + approv"
                            v-model="createRequest.approvals[apr]"
                        />
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
