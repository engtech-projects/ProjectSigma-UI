<script setup>
import { useNcpoStore } from "~/stores/inventory/procurement/ncpo"
const mainStore = useNcpoStore()
const { ncpoRequest } = storeToRefs(mainStore)

const isShowTable = ref(true)
const isShowSecondPage = ref(false)
const isShowThirdPage = ref(false)
const selectedItem = ref(null)

const headers = [
    { name: "Supplier", id: "supplier_name" },
    { name: "Quotation Date", id: "quot_date" },
]
const rsHeaders = [
    { name: "RS No.", id: "rsNo" },
    { name: "Date", id: "date" },
    { name: "Status", id: "status" },
]

const rsInfoHeaders = [
    { name: "QTY", id: "qty" },
    { name: "Unit", id: "unit" },
    { name: "Item Description", id: "itemDescription" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferredBrand" },
    { name: "Reason for Request", id: "reasonForRequest" },
    { name: "No. of Price Quotations", id: "noOfPriceQuotation" },
]

const actions = {
    showTable: true,
    edit: false,
    delete: false,
}

const prDetails = [
    { supplier_name: "Supplier 1", quot_date: "2022-02-26" },
    { supplier_name: "Supplier 2", quot_date: "2022-02-26" },
    { supplier_name: "Supplier 3", quot_date: "2022-02-26" },
]
const onGoing = [
    { rsNo: 1, date: "2022-02-16", status: "Served" },
    { rsNo: 2, date: "2022-02-4", status: "Unserved" },
    { rsNo: 3, date: "2022-02-26", status: "Served" },
]
const all = [
    { rsNo: 1, date: "2022-02-2", status: "Served" },
    { rsNo: 2, date: "2022-02-18", status: "Served" },
    { rsNo: 3, date: "2022-02-22", status: "Unserved" },
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

const showInformation = (item) => {
    selectedItem.value = item
    isShowTable.value = false
    isShowSecondPage.value = true
    isShowThirdPage.value = false
}

const goBack = () => {
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
    <div class="flex flex-col md:flex-cols gap-4">
        <div v-if="isShowTable" class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
            <h2 class="text-lg font-semibold text-center mb-4">
                PROCUREMENT REQUESTS
            </h2>
            <InventoryCommonLayoutRequestTable
                :is-show="isShowTable"
                :headers="rsHeaders"
                :actions="actions"
                :datas="onGoing ?? []"
                :all-datas="all ?? []"
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
            <div v-if="selectedItem" class="mt-4 p-4 bg-white rounded-md border-4 border-sky-200">
                <InventoryCommonLayoutRequisitionSlip
                    :selected-item="!!selectedItem"
                    office-project="SUYUTAN-123"
                    address="SUYUTAN TUBAY ADN"
                    reference-no="RS-123-345"
                    :rs-info-headers="rsInfoHeaders"
                    :rs-info="rsInfo"
                    title="REQUISITION SLIP"
                />
            </div>

            <LayoutAcessContainer
                :if-access="useCheckAccessibility([AccessibilityTypes.ADMIN_ONLY,
                ])"
                class="w-full mt-4"
            >
                <HrmsCommonTabsMainContainer>
                    <template #tab-titles>
                        <HrmsCommonTabsTabTitle
                            v-if="useCheckAccessibility([AccessibilityTypes.ADMIN_ONLY])"
                            target-id="rpq"
                            title="REQUEST FOR PRICE QUOTATION"
                        />
                        <HrmsCommonTabsTabTitle
                            v-if="useCheckAccessibility([AccessibilityTypes.ADMIN_ONLY])"
                            target-id="cs"
                            title="CANVASS SUMMARY"
                        />
                        <HrmsCommonTabsTabTitle
                            v-if="useCheckAccessibility([AccessibilityTypes.ADMIN_ONLY])"
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
</template>
