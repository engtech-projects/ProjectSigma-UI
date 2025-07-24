<script setup lang="ts">
import { useRequestStockStore } from "@/stores/inventory/requeststock"
const { data, canvasser } = defineProps<{
    data: any,
    canvasser: any
}>()
const main = useRequestStockStore()
const snackbar = useSnackbar()
const { remarks } = storeToRefs(main)

const handleRequest = async (type: "approve" | "deny", id: number) => {
    try {
        if (type === "approve") {
            await main.approveApprovalForm(id)
        } else {
            await main.denyApprovalForm(id)
        }

        snackbar.add({
            type: "success",
            text: main.successMessage
        })

        main.$reset()
        navigateTo({ path: "/inventory/request-stocks" })
    } catch (error: any) {
        snackbar.add({
            type: "error",
            text: error?.message || "Something went wrong."
        })
    }
}

const showPriceQuotations = ref(false)
const priceQuotationHeader = { name: "No. of Price Quotations", id: "price_quotation_count", style: "" }
const tableData = computed(() =>
    (data?.items || []).map(i => ({
        ...i,
        price_quotation_count: data?.price_quotation_count ?? 0,
    }))
)
const baseItemTableHeaders = [
    { name: "QTY", id: "quantity", style: "" },
    { name: "Unit", id: "uom_name", style: "" },
    { name: "Item Description", id: "item_description", style: "" },
    { name: "Specification", id: "specification", style: "" },
    { name: "Preferred Brand", id: "preferred_brand", style: "" },
    { name: "Reason for Request", id: "reason", style: "" },
]
const itemTableHeaders = computed(() => {
    return showPriceQuotations.value
        ? [...baseItemTableHeaders, priceQuotationHeader]
        : baseItemTableHeaders
})
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
            Requisition Slip
        </h2>
        <div class="flex justify-end mb-4">
            <div class="bg-white rounded-xl p-2 border border-gray-300">
                <label class="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                    <span class="text-gray-700">Show Price Quotations:</span>
                    <input
                        v-model="showPriceQuotations"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    >
                </label>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 justify-center items-center mt-4 p-4">
            <div class="flex flex-col gap-1">
                <InventoryCommonFormPsFormLabel title="Request For" :value="data?.request_for" />
                <InventoryCommonFormPsFormLabel title="Office/Project" :value="data?.office_project" />
                <InventoryCommonFormPsFormLabel title="Address" :value="data?.office_project_address" />
            </div>
            <div class="flex flex-col gap-1">
                <InventoryCommonFormPsFormLabel title="Reference No." :value="data?.reference_no" />
                <InventoryCommonFormPsFormLabel title="Date Prepared" :value="data?.date_prepared" />
                <InventoryCommonFormPsFormLabel title="Date Needed" :value="data?.date_needed" />
                <InventoryCommonFormPsFormLabel title="Equipment No." :value="data?.equipment_no" />
            </div>
            <div v-if="canvasser" class="flex flex-col gap-1">
                <InventoryCommonFormPsFormLabel title="Canvasser" :value="canvasser[0]?.name" />
            </div>
        </div>

        <InventoryCommonCanvasserSelector v-if="canvasser" />
        <LayoutPsTable :header-columns="itemTableHeaders" :datas="tableData" class="rounded-md shadow-sm" />
        <div id="approvals" class="w-full mt-4">
            <LayoutApprovalsListView :approvals="data?.approvals" />
        </div>
        <div id="footer">
            <div
                v-if="data?.next_approval && useCheckIsCurrentUser(data?.next_approval?.user_id)"
                class="flex gap-2 p-2 justify-end relative"
            >
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data?.id"
                    @approve="id => handleRequest('approve', id)"
                    @deny="id => handleRequest('deny', id)"
                />
            </div>
        </div>
    </div>
</template>
