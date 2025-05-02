<script lang="ts" setup>
import { useNcpoStore } from "~/stores/inventory/procurement/ncpo"
const mainStore = useNcpoStore()
const { ncpoRequest } = storeToRefs(mainStore)

const rsInfoHeaders = [
    { name: "QTY", id: "qty" },
    { name: "Unit", id: "unit" },
    { name: "Item Description", id: "itemDescription" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferredBrand" },
    { name: "Reason for Request", id: "reasonForRequest" },
    { name: "No. of Price Quotations", id: "noOfPriceQuotation" },
]

const rsInfo = [
    {
        qty: 1,
        unit: "PCS",
        itemDescription: "Item 1",
        specification: "Specification 1",
        preferredBrand: "Brand 1",
        reasonForRequest: "Reason 1",
        noOfPriceQuotation: 1,
    },
    {
        qty: 2,
        unit: "BOX",
        itemDescription: "Item 2",
        specification: "Specification 2",
        preferredBrand: "Brand 2",
        reasonForRequest: "Reason 2",
        noOfPriceQuotation: 1,
    },
    {
        qty: 3,
        unit: "PCS",
        itemDescription: "Item 3",
        specification: "Specification 3",
        preferredBrand: "Brand 3",
        reasonForRequest: "Reason 3",
        noOfPriceQuotation: 1,
    },
]

</script>
<template>
    <div class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
        <div class="mt-4 p-4 bg-white rounded-md border border-gray-300">
            <h2 class="text-lg font-semibold text-center mb-4">
                REQUESITION SLIP
            </h2>
            <div class="grid grid-cols-2 gap-4 justify-center items-center mt-4 p-4">
                <div class="flex flex-col gap-1">
                    <InventoryCommonFormPsFormLabel title="Request For" value="Goods" />
                    <InventoryCommonFormPsFormLabel title="Office/Project" value="SUYUTAN-123" />
                    <InventoryCommonFormPsFormLabel title="Address" value="SUYUTAN TUBAY ADN" />
                </div>
                <div class="flex flex-col gap-1">
                    <InventoryCommonFormPsFormLabel title="Reference No." value="RS-123-345" />
                    <InventoryCommonFormPsFormLabel title="Date Prepared" :value="new Date().toLocaleDateString()" />
                    <InventoryCommonFormPsFormLabel title="Date Needed" :value="new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()" />
                    <InventoryCommonFormPsFormLabel title="Equipment No." value="N/A" />
                </div>
            </div>

            <LayoutPsTable :header-columns="rsInfoHeaders" :datas="rsInfo ?? []" class="rounded-md shadow-sm" />
        </div>

        <LayoutAcessContainer
            :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_REQUESTPRICEQUOTATION_GROUP,
            ])"
            class="w-full"
        >
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_REQUESTPRICEQUOTATION_REQUESTS])"
                        target-id="RPQ"
                        title="Request For Price Quotation"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_REQUESTS])"
                        target-id="CS"
                        title="Canvass Summary"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_FORMSANDMYREQUESTS])"
                        target-id="NCPO"
                        title="NOTICE OF CHANGES IN PURCHASE ORDER (NCPO)"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="RPQ">
                        <InventoryPriceQuotationRequestList />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="CS">
                        <InventoryCanvassSummaryRequestList />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="NCPO">
                        <InventoryNoticeOfChangePOItemForm v-model="ncpoRequest.form" />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </LayoutAcessContainer>
    </div>
</template>
