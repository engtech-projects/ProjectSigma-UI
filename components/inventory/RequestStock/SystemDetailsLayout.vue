<script setup lang="ts">
import { useRequestStockStore } from "@/stores/inventory/requeststock"
defineProps({
    data: {
        type: Object,
        default: () => {}
    },
    canvasser: {
        type: Object,
        default: () => {}
    }
})
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
const itemTableHeaders = [
    { name: "QTY", id: "quantity", style: "" },
    { name: "Unit", id: "uom", style: "" },
    { name: "Item Description", id: "item_description", style: "" },
    { name: "Specification", id: "specification", style: "" },
    { name: "Preferred Brand", id: "preferred_brand", style: "" },
    { name: "Reason for Request", id: "reason", style: "" },
]
</script>

<template>
    <div>
        <InventoryCommonEvenparHeader :page="{ currentPage: 1, totalPages: 1 }" :document-code="useInventoryDocCode.mrr" />
        <h2 class="text-lg font-semibold text-center mb-4">
            Requisition Slip
        </h2>
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
        <LayoutPsTable
            :header-columns="itemTableHeaders"
            :datas="data?.items ?? []"
            class="rounded-md shadow-sm"
        />
        <div id="approvals" class="w-full mt-4">
            <LayoutApprovalsListView :approvals="data?.approvals" />
        </div>
        <div id="footer">
            <div v-if="data?.next_approval && useCheckIsCurrentUser(data?.next_approval?.user_id)" class="flex gap-2 p-2 justify-end relative">
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
