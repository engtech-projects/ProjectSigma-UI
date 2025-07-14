<script lang="ts" setup>
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"

const route = useRoute()
const router = useRouter()
const procurementRequestStore = useProcurementRequestStore()

const { viewRequests } = storeToRefs(procurementRequestStore)

const headers = [
    { name: "Supplier", id: "supplier_name" },
    { name: "Quotation Date", id: "created_at_human" },
]
const rsInfoHeaders = [
    { name: "QTY", id: "quantity" },
    { name: "Unit", id: "uom" },
    { name: "Item Description", id: "item_description" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Reason for Request", id: "reason_for_request" },
    { name: "No. of Price Quotations", id: "price_quotation_count" },
]
const createPq = () => {
    router.push({
        query: { ...route.query, create_pq: 1 },
    })
}
const editPq = (pq: any) => {
    router.push({
        query: { ...route.query, pq_id: pq.id },
    })
}
</script>
<template>
    <div>
        <div class="mt-4 p-4 bg-white rounded-md border-4 border-sky-200">
            <LayoutPrintAdvanced>
                <template #print-layout>
                    <LayoutLoadingContainer
                        v-if="viewRequests.loading"
                        class="w-full h-full flex items-center justify-center"
                    >
                        <InventoryRequestStockPrintDetailsLayout
                            v-if="viewRequests.details.requisition_slip"
                            title="Requisition Slip"
                            :data="viewRequests.details.requisition_slip"
                            :header-columns="rsInfoHeaders"
                        />
                    </LayoutLoadingContainer>
                </template>
                <template #system-layout>
                    <InventoryRequestStockSystemDetailsLayout
                        v-if="viewRequests.details.requisition_slip"
                        :request-for="viewRequests.details.requisition_slip.request_for"
                        :office-project="viewRequests.details.requisition_slip.office_project"
                        :address="viewRequests.details.requisition_slip.address"
                        :reference-no="viewRequests.details.requisition_slip.reference_no"
                        :date-needed="viewRequests.details.requisition_slip.date_needed"
                        :date-prepared="viewRequests.details.requisition_slip.date_prepared"
                        :rs-info-headers="rsInfoHeaders"
                        :rs-info="viewRequests.details.requisition_slip"
                        title="Requisition Slip"
                    />
                </template>
            </LayoutPrintAdvanced>
        </div>
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP,
            ])"
            class="w-full mt-4"
        >
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_PRICEQUOTATION])"
                        target-id="rpq"
                        title="REQUEST FOR PRICE QUOTATION"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_CANVASSSUMMARY])"
                        target-id="cs"
                        title="CANVASS SUMMARY"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_PURCHASEORDER_CREATENCPO])"
                        target-id="ncpo"
                        title="NOTICE OF CHANGES IN PURCHASE ORDER (NCPO)"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="rpq">
                        <InventoryCommonLayoutFormCreate
                            :headers="headers"
                            :datas="viewRequests.details.price_quotations"
                            :on-create="createPq"
                            :on-edit="editPq"
                            title="Price Quotations List"
                            icon-label="Create Price Quotations"
                        />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="cs">
                        <InventoryCommonLayoutFormCreate
                            :headers="headers"
                            :datas="viewRequests.details.canvass_summaries"
                            :on-create="() => showThirdPage('canvassSummary')"
                            :on-edit="() => showThirdPage('canvassSummary')"
                            title="Canvass Summary List"
                            icon-label="Create Canvass Summary"
                        />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="ncpo">
                        <PrintTableFormat>
                            <InventoryNoticeOfChangePOItemForm title="NOTICE OF CHANGES IN PURCHASE ORDER (NCPO)" />
                        </PrintTableFormat>
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </LayoutAcessContainer>
    </div>
</template>
<style>

</style>
