<script setup>
import { useCanvassSummaryStore, TERMS, AVAILABILITY, DELIVERY_TERMS } from "~/stores/inventory/procurement/canvassSummary"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"
import { useApprovalStore, APPROVAL_REQUEST_CANVASS_SUMMARY } from "@/stores/hrms/setup/approvals"

const mainStore = useCanvassSummaryStore()
const priceQuotationStore = usePriceQuotationStore()
const procurementRequestStore = useProcurementRequestStore()
const approvals = useApprovalStore()

const { createRequest } = storeToRefs(mainStore)
const { viewRequests } = storeToRefs(procurementRequestStore)
const { priceQuotation } = storeToRefs(priceQuotationStore)

const route = useRoute()
const snackbar = useSnackbar()
const emit = defineEmits(["submit-success"])

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
const initFormFromSlip = (slip) => {
    if (!slip) { return }
    createRequest.value.form.date = new Date().toISOString().split("T")[0]
    createRequest.value.form.project_code = slip.office_project
    createRequest.value.form.project_address = slip.office_project_address
    createRequest.value.form.conso_reference_no = slip.reference_no
}

const storeForm = async () => {
    try {
        const items = (viewRequests.value.details?.requisition_slip?.request_stock_items || [])
            .filter(item => selectedItems.value[item.item_id] === true)
            .map(item => ({ item_id: item.item_id }))

        if (!items.length) {
            throw new Error("Please select at least one item.")
        }
        if (activeSupplier.value === null) {
            throw new Error("Please select a supplier before submitting.")
        }
        const selectedSupplier = priceQuotation.value.list[activeSupplier.value]
        if (!selectedSupplier || !selectedSupplier.id) {
            throw new Error("Invalid supplier selection. Please try again.")
        }

        createRequest.value.form.items = items
        createRequest.value.form.price_quotation_id = selectedSupplier.id
        createRequest.value.form.approvals = await approvals.getApprovalByName(APPROVAL_REQUEST_CANVASS_SUMMARY)

        await mainStore.storeRequest()

        snackbar.add({
            type: "success",
            text: mainStore.createRequest.successMessage
        })
        emit("submit-success")
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error?.message || mainStore.createRequest.errorMessage || "An unexpected error occurred."
        })
    }
}
onMounted(async () => {
    createRequest.value.approvals = await approvals.getApprovalByName(APPROVAL_REQUEST_CANVASS_SUMMARY)
})
onMounted(() => {
    mainStore.resetForm()
    procurementRequestStore.getOne(route.query.pr_id)
    priceQuotationStore.getQuotationsForCanvass(route.query.pr_id)
    initFormFromSlip(viewRequests.value.details?.requisition_slip)
})

watch(
    () => viewRequests.value.details?.requisition_slip,
    slip => initFormFromSlip(slip),
    { deep: true }
)
</script>

<template>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <DocumentTemplatesIsoHeader :page="{ currentPage: 1, totalPages: 1 }" />
                <div v-if="title" class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4">
                    <h3 class="pl-4 text-2xl font-bold text-gray-900 p-4 uppercase">
                        {{ title }}
                    </h3>
                </div>

                <div class="flex flex-col">
                    <div class="flex flex-row justify-between gap-20">
                        <div class="w-full flex flex-col">
                            <InventoryCommonFormPsFormLabel
                                v-for="(value, label) in {
                                    'DATE': createRequest.form.date,
                                    'PROJECT CODE': createRequest.form.project_code,
                                    'CONSO/RS REFERENCE NUMBER': createRequest.form.conso_reference_no,
                                }"
                                :key="label"
                                :title="label"
                                :value="value"
                            />
                        </div>
                        <div class="w-full flex flex-col">
                            <InventoryCommonFormPsFormLabel
                                v-for="(value, label) in {
                                    'CS NUMBER': createRequest.form.cs_number || 'Generated after submission',
                                }"
                                :key="label"
                                :title="label"
                                :value="value"
                            />
                        </div>
                    </div>

                    <div class="mt-4">
                        <InventoryCanvassSummaryItemList
                            v-model:selected-items="selectedItems"
                            v-model:active-supplier="activeSupplier"
                            :items="viewRequests?.details?.requisition_slip?.request_stock_items"
                            :suppliers="priceQuotation.list"
                            :columns="supplierColumns"
                            :loading="priceQuotation.isLoading || viewRequests.isLoading"
                        />

                        <div class="border border-t-0 border-gray-700 shadow-sm uppercase text-black">
                            <div
                                v-for="(options, label, i) in {'Terms and Conditions': TERMS, 'Availability': AVAILABILITY, 'Delivery Terms': DELIVERY_TERMS}"
                                :key="i"
                                class="flex h-[60px] border-b border-gray-700 last:border-b-0"
                            >
                                <div class="w-1/2 px-4 py-4 font-medium  border-r border-gray-700 flex items-center justify-center">
                                    {{ label }}
                                </div>
                                <div class="w-1/4 px-4 py-4 flex items-center text-black">
                                    <select
                                        v-model="createRequest.form[label === 'Terms and Conditions' ? 'terms_of_payment' : label.replace(/ /g, '_').toLowerCase()]"
                                        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select {{ label }}...
                                        </option>
                                        <option v-for="(option, j) in options" :key="j" :value="option">
                                            {{ option }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="flex h-[100px] ">
                                <div class="w-1/2 px-4 py-4 font-medium  border-r border-gray-700 flex items-center justify-center">
                                    Remarks
                                </div>
                                <div class="w-1/2 px-4 py-4">
                                    <textarea
                                        v-model="createRequest.form.remarks"
                                        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 resize-none"
                                        rows="2"
                                        placeholder="Enter remarks..."
                                    />
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

                    <div class="flex w-full justify-end no-print">
                        <button
                            type="submit"
                            class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
@media print {
    .no-print {
    display: none !important;
    }
}
</style>
