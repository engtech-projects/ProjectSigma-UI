<script setup>
import { useNcpoStore } from "~/stores/inventory/procurement/ncpo"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"
const procurementRequestStore = useProcurementRequestStore()
const mainStore = useNcpoStore()
const { ncpoRequest } = storeToRefs(mainStore)
const { selectedItem, viewRequests } = storeToRefs(procurementRequestStore)

const isShowTable = ref(true)
const isShowSecondPage = ref(false)
const isShowThirdPage = ref(false)

const headers = [
    { name: "Supplier", id: "supplier_name" },
    { name: "Quotation Date", id: "quot_date" },
]
const rsInfoHeaders = [
    { name: "QTY", id: "quantity" },
    { name: "Unit", id: "unit_uom" },
    { name: "Item Description", id: "item_description" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Reason for Request", id: "reason_for_request" },
    { name: "No. of Price Quotations", id: "noOfPriceQuotation" },
]
const route = useRoute()
const router = useRouter()

const prDetails = [
    { supplier_name: "Supplier 1", quot_date: "2022-02-26" },
    { supplier_name: "Supplier 2", quot_date: "2022-02-26" },
    { supplier_name: "Supplier 3", quot_date: "2022-02-26" },
]

const showInformation = (eventItem) => {
    router.push({ query: { id: eventItem.id } })
    procurementRequestStore.getOne(eventItem.id)
    isShowTable.value = false
    isShowSecondPage.value = true
    isShowThirdPage.value = false
}

const goBack = () => {
    router.replace({ query: {} })
    if (isShowThirdPage.value) {
        isShowThirdPage.value = false
        isShowSecondPage.value = true
    } else {
        isShowTable.value = true
        isShowSecondPage.value = false
        isShowThirdPage.value = false
        selectedItem.value = null
    }
}

const showThirdPage = (formType) => {
    currentForm.value = formType
    isShowTable.value = false
    isShowSecondPage.value = false
    isShowThirdPage.value = true
}

const hasIdParam = () => {
    if (route.query.id) {
        procurementRequestStore.getOne(route.query.id)
        if (viewRequests.value.details.requisition_slip) {
            showInformation({ id: route.query.id })
        } else {
            goBack()
        }
    }
}

hasIdParam()

const form = ref({
    date: "",
    quotation_no: "",
    conso_reference_no: "",
    contact_no: "",
    address: "",
    contact_person: "",
    requesting: "",
    items: [],
})

const requestDetails = {
    requestFor: "Goods",
    officeOrProject: "241235",
    address: "SUYUTAN TUBAY ADN",
    referenceNo: `RS${selectedItem.rsNo}`,
    datePrepared: new Date().toLocaleDateString(),
    dateNeeded: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    equipmentNo: "N/A",
}
const currentForm = ref(null)
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP,
        ])"
        class="w-full"
    >
        <div class="flex flex-col md:flex-cols gap-4">
            <div v-if="isShowTable" class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
                <InventoryCommonLayoutRequestTable
                    :is-show="isShowTable"
                    title="PROCUREMENT REQUESTS"
                    class="rounded-md shadow-sm"
                    @show-table="showInformation"
                />
            </div>
            <div v-else-if="isShowSecondPage" class=" flex-1 rounded-md p-4 bg-white">
                <div class="flex justify-end">
                    <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="goBack">
                        <Icon name="mdi:close" class="h-5 w-5" />
                    </button>
                </div>
                <div class="mt-4 p-4 bg-white rounded-md border-4 border-sky-200">
                    <InventoryCommonLayoutRequisitionSlip
                        v-if="viewRequests.details.requisition_slip"
                        :office-project="viewRequests.details.requisition_slip.office_project ?? ''"
                        :address="viewRequests.details.requisition_slip.address"
                        :reference-no="viewRequests.details.requisition_slip.reference_no"
                        :date-needed="viewRequests.details.requisition_slip.date_needed"
                        :date-prepared="viewRequests.details.requisition_slip.date_prepared"
                        :rs-info-headers="rsInfoHeaders"
                        :rs-info="viewRequests.details"
                        title="REQUISITION SLIP"
                    />
                </div>
                <LayoutAcessContainer
                    :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP,
                    ])"
                    class="w-full mt-4"
                >
                    <HrmsCommonTabsMainContainer v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_PRICEQUOTATION, AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_CANVASSSUMMARY, AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_PURCHASEORDER_CREATENCPO])">
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
                                    :datas="prDetails"
                                    :on-create="() => showThirdPage('priceQuotation')"
                                    :on-edit="() => showThirdPage('priceQuotation')"
                                    title="Price Quotations List"
                                    icon-label="Create Price Quotations"
                                />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer id="cs">
                                <InventoryCommonLayoutFormCreate
                                    :headers="headers"
                                    :datas="prDetails"
                                    :on-create="() => showThirdPage('canvassSummary')"
                                    :on-edit="() => showThirdPage('canvassSummary')"
                                    title="Canvass Summary List"
                                    icon-label="Create Canvass Summary"
                                />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer id="ncpo">
                                <PrintTableFormat>
                                    <InventoryNoticeOfChangePOItemForm v-model="ncpoRequest.form" title="NOTICE OF CHANGES IN PURCHASE ORDER (NCPO)" />
                                </PrintTableFormat>
                            </HrmsCommonTabsTabContainer>
                        </template>
                    </HrmsCommonTabsMainContainer>
                </LayoutAcessContainer>
            </div>
            <InventoryCommonLayoutShowForm
                :is-visible="isShowThirdPage"
                :current-form="currentForm"
                :form="form"
                :request-details="requestDetails"
                :on-close="goBack"
                @update:form="(val) => form.value = val"
            />
        </div>
    </LayoutAcessContainer>
</template>
