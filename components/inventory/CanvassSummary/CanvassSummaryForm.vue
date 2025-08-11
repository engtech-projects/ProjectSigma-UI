<script setup>
import { useCanvassSummaryStore, TERMS, AVAILABILITY, DELIVERY_TERMS, APPROVALS } from "~/stores/inventory/procurement/canvassSummary"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
import { useProcurementRequestStore } from "~/stores/inventory/procurement/request"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"

const mainStore = useCanvassSummaryStore()
const priceQuotationStore = usePriceQuotationStore()
const procurementRequestStore = useProcurementRequestStore()
const { createRequest, canvassSummary, approvalList } = storeToRefs(mainStore)
const { viewRequests } = storeToRefs(procurementRequestStore)
const { priceQuotation } = storeToRefs(priceQuotationStore)

const route = useRoute()
const snackbar = useSnackbar()
defineProps({
    title: {
        type: String,
        required: true,
    },
})
// const emit = defineEmits(["submit-success"])
const approvals = useApprovalStore()
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)
const selectedItems = ref({})
// const selectedSuppliers = ref({})
const activeSupplier = ref(null)
const storeForm = async () => {
    try {
        const selectedItemIds = priceQuotation.value.list[0].items
            ?.filter(item => selectedItems.value[item.item_id] === true)
            .map(item => ({
                item_id: item.item_id,
                unit_price: priceQuotation.value.list[0].items
                    ?.find(i => i.item_id === item.item_id)?.price || 0
            })) || []

        // const preparedSelectedSuppliers = Object.entries(selectedSuppliers.value)
        //     .filter(([_, value]) => value !== null)
        //     .reduce((acc, [key, value]) => {
        //         acc[key] = value
        //         return acc
        //     }, {})

        const payload = {
            ...createRequest.value.form,
            price_quotation_id: canvassSummary.value.details?.price_quotation?.id,
            items: selectedItemIds,
        }
        createRequest.value.form.items = selectedItemIds
        // createRequest.value.form.suppliers = preparedSelectedSuppliers
        createRequest.value.form.approvals = approvalList.value.list

        await mainStore.storeRequest(payload)

        if (mainStore.errorMessage) {
            snackbar.add({
                type: "error",
                text: mainStore.errorMessage,
            })
        } else {
            snackbar.add({
                type: "success",
                text: mainStore.successMessage,
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || error,
        })
    }
}
// const storeForm = async () => {
//     try {
//         const payload = {
//             ...createRequest.value.form,
//             selectedItems: Object.keys(selectedItems.value).filter(key => selectedItems.value[key] === true)
//                 .map(key => parseInt(key)),
//             selectedSuppliers: Object.entries(selectedSuppliers.value)
//                 .filter(([_, value]) => value !== null)
//                 .reduce((acc, [key, value]) => {
//                     acc[key] = value
//                     return acc
//                 }, {}),
//         }

//         await mainStore.storeRequest(payload)

//         if (mainStore.errorMessage) {
//             snackbar.add({
//                 type: "error",
//                 text: mainStore.errorMessage,
//             })
//         } else {
//             snackbar.add({
//                 type: "success",
//                 text: mainStore.successMessage,
//             })
//         }
//     } catch (error) {
//         snackbar.add({
//             type: "error",
//             text: error.message || error,
//         })
//     }
// }
// const supplierId = defineModel("supplierId", { required: false, type: Number })
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

onMounted(() => {
    procurementRequestStore.getOne(route.query.pr_id)
    priceQuotationStore.getQuotations(route.query.pr_id)
    if (viewRequests.value.details?.requisition_slip) {
        createRequest.value.form.date = new Date().toISOString().split("T")[0]
        createRequest.value.form.item_group_project_code = viewRequests.value.details.requisition_slip.office_project
        createRequest.value.form.conso_reference_no = viewRequests.value.details.requisition_slip.reference_no
        createRequest.value.form.price_quotation_id = route.query.pr_id
    }
})
watch(
    () => viewRequests.value.details,
    (newDetails) => {
        if (newDetails?.requisition_slip) {
            createRequest.value.form.date = new Date().toISOString().split("T")[0]
            createRequest.value.form.item_group_project_code = viewRequests.value.details.requisition_slip.office_project
            createRequest.value.form.conso_reference_no = viewRequests.value.details.requisition_slip.reference_no
            createRequest.value.form.price_quotation_id = route.query.pr_id
        }
    },
    { deep: true }
)
</script>
<template>
    <!-- <pre>{{ createRequest.form }}</pre>
    ------------------------------------ -->
    <!-- <pre>PQ: {{ priceQuotation }}</pre> -->
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div v-if="title" class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4">
                    <h3 class="pl-4 text-xl font-bold text-gray-900 p-4 tracking-wide">
                        {{ title }}
                    </h3>
                </div>

                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <InventoryCommonFormPsFormLabel
                                v-for="(value, label) in {
                                    'DATE': createRequest.form.date,
                                    'RS NUMBER': createRequest.form.rs_number,
                                    'PROJECT CODE': createRequest.form.item_group_project_code,
                                    'EQUIPMENT NUMBER': createRequest.form.equipment_number,
                                }"
                                :key="label"
                                :title="label"
                                :value="value"
                            />
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <InventoryCommonFormPsFormLabel
                                v-for="(value, label) in {
                                    'CS NUMBER': createRequest.form.cs_number,
                                    'CONSO/RS REFERENCE NUMBER': createRequest.form.conso_reference_no,
                                    'PROJECT ADDRESS': createRequest.form.project_address,
                                }"
                                :key="label"
                                :title="label"
                                :value="value"
                            />
                        </div>
                    </div>

                    <div class="w-full">
                        <InventoryCanvassSummaryItemList
                            v-model:selected-items="selectedItems"
                            v-model:active-supplier="activeSupplier"
                            :items="viewRequests?.details?.requisition_slip?.request_stock_items"
                            :suppliers="priceQuotation.list"
                            :columns="supplierColumns"
                        />

                        <!-- Dropdowns -->
                        <div class="flex flex-col gap-4 mt-4">
                            <div
                                v-for="(options, label, i) in {
                                    'Terms and Conditions': TERMS,
                                    'Availability': AVAILABILITY,
                                    'Delivery Terms': DELIVERY_TERMS
                                }"
                                :key="i"
                                class="w-1/4"
                            >
                                <label class="font-medium">{{ label }}:</label>
                                <select
                                    v-model="createRequest.form[label === 'Terms and Conditions' ? 'terms_of_payment' :label.replace(/ /g, '_').toLowerCase()]"
                                    class="w-full border rounded px-2 py-1"
                                >
                                    <option v-for="(option, j) in options" :key="j" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- Remarks -->
                        <div class="mt-4">
                            <label class="font-medium">Remarks:</label>
                            <textarea
                                v-model="createRequest.form.remarks"
                                class="w-full border rounded px-2 py-1"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div class="flex w-full">
                        <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                            <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">
                                Approval:</label>
                            <HrmsSetupApprovalsList
                                v-for="(approv, apr) in approvalList.list"
                                :key="'hrmsetupapprovallist' + approv"
                                v-model="approvalList.list[apr]"
                            />
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="flex w-full justify-end no-print">
                        <button
                            type="submit"
                            class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </div>
                    <!-- <div class="flex w-full justify-end no-print">
                        <button
                            type="submit"
                            class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            :disabled="Object.keys(selectedItems).filter(key => selectedItems[key] === true).length === 0"
                        >
                            Submit ({{ Object.keys(selectedItems).filter(key => selectedItems[key] === true).length }} items selected)
                        </button>
                    </div> -->
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
