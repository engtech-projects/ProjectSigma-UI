<script setup>
import { useNcpoStore } from "~/stores/inventory/procurement/ncpo"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"

const mainStore = useNcpoStore()
const procurementRequestStore = useProcurementRequestStore()
const { ncpoRequest } = storeToRefs(mainStore)
const { selectedItem, viewRequests } = storeToRefs(procurementRequestStore)

const isShowTable = ref(true)
const isShowSecondPage = ref(false)
const isShowThirdPage = ref(false)

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
    { name: "Reason", id: "reason" },
    { name: "No. of Price Quotations", id: "price_quotation_count" },
]
const route = useRoute()
const router = useRouter()

const priceQuotationData = ref({})

const populateFormWithRequestDetails = () => {
    if (viewRequests.value?.details?.requisition_slip) {
        const requestDetails = viewRequests.value.details.requisition_slip
        const commonData = {
            id: route.query.id,
            date: new Date().toISOString().split("T")[0],
            items: requestDetails.request_stock_items || [],
        }
        priceQuotationData.value = { ...priceQuotationData.value, ...commonData }
    }
}

const showInformation = async (eventItem) => {
    router.push({ query: { id: eventItem.id } })
    await procurementRequestStore.getOne(eventItem.id)

    isShowTable.value = false
    isShowSecondPage.value = true
    isShowThirdPage.value = false
}
const resetPageState = () => {
    isShowTable.value = true
    isShowSecondPage.value = false
    isShowThirdPage.value = false
    selectedItem.value = null
}

const goBack = () => {
    router.replace({ query: { id: route.query.id } })

    if (isShowThirdPage.value) {
        isShowThirdPage.value = false
        isShowSecondPage.value = true
    } else {
        resetPageState()
    }
}

const showThirdPage = (formType, editId = null) => {
    currentForm.value = formType

    if (editId) {
        priceQuotationData.value.id = route.query.id
    } else if (route.query.id) {
        populateFormWithRequestDetails()
    }

    [isShowTable, isShowSecondPage, isShowThirdPage].forEach(state => (state.value = false))
    isShowThirdPage.value = true
}

const handleFormSuccess = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    goBack()
    if (route.query.id) {
        await priceQuotationStore.getAllList(route.query.id)
    }
}

watch(
    () => viewRequests.value?.details,
    (newDetails) => {
        if (newDetails?.requisition_slip) {
            populateFormWithRequestDetails()
        }
    },
    { deep: true }
)

const hasIdParam = async () => {
    if (route.query.id) {
        await procurementRequestStore.getOne(route.query.id)
        if (viewRequests.value.details.requisition_slip) {
            showInformation({ id: route.query.id })
        } else {
            goBack()
        }
    }
}

onMounted(() => {
    hasIdParam()
})

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
                    <!-- <LayoutPrintAdvanced class="min-h-40">
                        <template #print-layout>
                            <InventoryRequestStockPrintDetailsLayout title="Requisition Slip" :data="viewRequests.details.requisition_slip" :header-columns="rsInfoHeaders" />
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
                                :rs-info="viewRequests.details"
                                title="Requisition Slip"
                            />
                        </template>
</LayoutPrintAdvanced> -->
                    <InventoryCommonLayoutRequisitionSlip
                        v-if="viewRequests.details.requisition_slip"
                        :request-for="viewRequests.details.requisition_slip.request_for"
                        :office-project="viewRequests.details.requisition_slip.office_project"
                        :address="viewRequests.details.requisition_slip?.address ?? 'N/A'"
                        :reference-no="viewRequests.details.requisition_slip.reference_no"
                        :date-needed="viewRequests.details.requisition_slip.date_needed"
                        :date-prepared="viewRequests.details.requisition_slip.date_prepared"
                        :rs-info-headers="rsInfoHeaders"
                        :items="viewRequests.details.requisition_slip.request_stock_items || []"
                        :price-quotation-count="viewRequests.details.price_quotation_count"
                        title="REQUISITION SLIP"
                    />
                </div>
                <LayoutAcessContainer
                    :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_GROUP,
                    ])"
                    class="w-full mt-4"
                >
                    <HrmsCommonTabsMainContainer
                        v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_PRICEQUOTATION, AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_CANVASSSUMMARY, AccessibilityTypes.INVENTORY_PROCUREMENT_PROCUREMENTREQUESTS_PURCHASEORDER_CREATENCPO])"
                    >
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
                                    :datas="viewRequests.details?.price_quotations || []"
                                    :on-create="() => showThirdPage('priceQuotation')"
                                    :on-edit="() => showThirdPage('priceQuotationEdit')"
                                    title="Price Quotations"
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
                                    <InventoryNoticeOfChangePOItemForm
                                        v-model="ncpoRequest.form"
                                        title="NOTICE OF CHANGES IN PURCHASE ORDER (NCPO)"
                                    />
                                </PrintTableFormat>
                            </HrmsCommonTabsTabContainer>
                        </template>
                    </HrmsCommonTabsMainContainer>
                </LayoutAcessContainer>
            </div>
            <InventoryCommonLayoutShowForm
                v-model:priceQuotationForm="priceQuotationData"
                :is-visible="isShowThirdPage"
                :current-form="currentForm"
                :request-details="viewRequests.details?.requisition_slip"
                :on-close="goBack"
                @submit-success="handleFormSuccess"
            />
        </div>
    </LayoutAcessContainer>
</template>
