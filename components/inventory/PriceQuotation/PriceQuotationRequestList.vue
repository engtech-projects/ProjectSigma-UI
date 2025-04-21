<script setup>

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
    { name: "No of Price Quotations", id: "noOfPriceQuotation" },
]

const rsInfoHeaders = [
    { name: "QTY", id: "qty" },
    { name: "Unit", id: "unit" },
    { name: "Item Description", id: "itemDescription" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferredBrand" },
    { name: "Reason for Request", id: "reasonForRequest" },
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
const rsDetails = [
    { rsNo: 1, date: "2022-02-26", noOfPriceQuotation: 1 },
    { rsNo: 2, date: "2022-02-26", noOfPriceQuotation: 1 },
    { rsNo: 3, date: "2022-02-26", noOfPriceQuotation: 1 },
]
const rsInfo = [
    {
        qty: 1,
        unit: "PCS",
        itemDescription: "Item 1",
        specification: "Specification 1",
        preferredBrand: "Brand 1",
        reasonForRequest: "Reason 1",
    },
    {
        qty: 2,
        unit: "BOX",
        itemDescription: "Item 2",
        specification: "Specification 2",
        preferredBrand: "Brand 2",
        reasonForRequest: "Reason 2",
    },
    {
        qty: 3,
        unit: "PCS",
        itemDescription: "Item 3",
        specification: "Specification 3",
        preferredBrand: "Brand 3",
        reasonForRequest: "Reason 3",
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

const showThirdPage = () => {
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
    requesting: "", // make sure this matches your `v-model:select-type`
    items: [], // required for your table
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

</script>
<template>
    <div class="flex flex-col md:flex-cols gap-4">
        <div v-if="isShowTable" class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
            <LayoutPsTable
                :header-columns="rsHeaders"
                :actions="actions"
                :datas="rsDetails ?? []"
                class="rounded-md shadow-sm"
                @show-table="showInformation"
            />
        </div>
        <div v-else-if="isShowSecondPage" class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
            <div class="flex justify-end">
                <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="goBack">
                    <Icon name="mdi:close" class="h-5 w-5" />
                </button>
            </div>
            <div v-if="selectedItem" class="mt-4 p-4 bg-white rounded-md border border-gray-300">
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1">
                        <span>Request for: Goods</span>
                        <span>Office/Project: 241235</span>
                        <span>Address: SUYUTAN TUBAY ADN</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span>Reference No. RS{{ selectedItem.rsNo }}</span>
                        <span>Date Prepared: {{ new Date().toLocaleDateString() }}</span>
                        <span>Date Needed: {{ new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() }}</span>
                        <span>Equipment No.: N/A</span>
                    </div>
                </div>

                <LayoutPsTable
                    :header-columns="rsInfoHeaders"
                    :datas="rsInfo ?? []"
                    class="rounded-md shadow-sm"
                />
            </div>
            <div class="mt-4 p-4 bg-white rounded-md border border-gray-300">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-bold text-gray-800">
                        Price Quotations
                    </h2>
                    <button
                        type="button"
                        class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-blue-300 font-semibold text-sm p-2 me-2 mb-2 flex items-center gap-1 rounded-lg"
                        @click="showThirdPage"
                    >
                        <Icon name="mdi:plus" class="h-5 w-5 text-white" />
                        Create Price Quotation
                    </button>
                </div>
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="{ edit: true }"
                    :datas="prDetails ?? []"
                    class="rounded-md shadow-sm"
                    @edit-row="showThirdPage"
                />
            </div>
        </div>
        <div v-else class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
            <div class="flex justify-end">
                <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="goBack">
                    <Icon name="mdi:close" class="h-5 w-5" />
                </button>
            </div>
            <PrintTableFormat>
                <InventoryPriceQuotationForm v-model="form" :request-details="requestDetails" />
            </PrintTableFormat>
        </div>
    </div>
</template>
