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
onMounted(async () => {
    if (route.query.id) {
        await procurementRequestStore.getOne(route.query.id)
    }
})
</script>
<template>
    <div>
        <div class="mt-4 p-4 bg-white rounded-md border-4 border-sky-200">
            <LayoutLoadingContainer
                v-if="viewRequests.details"
                :loading="viewRequests.isLoading"
                class="w-full h-full flex items-center justify-center"
            >
                <LayoutPrintAdvanced>
                    <template #system-layout>
                        <InventoryRequestStockSystemDetailsLayout
                            v-if="viewRequests.details"
                            :data="viewRequests.details.requisition_slip"
                            :canvasser="viewRequests.details.canvasser"
                            :show-price-quotations="true"
                        />
                    </template>
                    <template #print-layout>
                        <InventoryRequestStockPrintDetailsLayout
                            v-if="viewRequests.details"
                            title="Requisition Slip"
                            :data="viewRequests.details.requisition_slip"
                        />
                    </template>
                </LayoutPrintAdvanced>
            </LayoutLoadingContainer>
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
                    <LayoutLoadingContainer
                        v-if="viewRequests.details"
                        :loading="viewRequests.isLoading"
                    >
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
                    </LayoutLoadingContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </LayoutAcessContainer>
    </div>
</template>
<style>

</style>
