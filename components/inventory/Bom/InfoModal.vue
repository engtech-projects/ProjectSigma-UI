<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useBOMStore } from "@/stores/inventory/bom"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const showModal = defineModel("showModal", { required: false, type: Boolean })

const main = useBOMStore()
const { remarks } = storeToRefs(main)
const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id: number) => {
    try {
        boardLoading.value = true
        await main.approveApprovalForm(id)
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: main.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: main.successMessage
            })
        }
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const denyRequest = async (id: any) => {
    try {
        boardLoading.value = true
        await main.denyApprovalForm(id)
        if (main.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: main.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: main.successMessage
            })
        }
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const showAmount = (quantity:number, price:number) => {
    return quantity * price
}
</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Item Profile">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="pb-2 text-gray-500 overflow-x-auto mb-4">
                    <table class="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <InventoryCommonTableItemTh title="Item" />
                                <InventoryCommonTableItemTh title="Unit" />
                                <InventoryCommonTableItemTh title="Price" />
                                <InventoryCommonTableItemTh title="Quantity" />
                                <InventoryCommonTableItemTh title="Amount" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dataValue, index in data.item_summary" :key="index" class="bg-white border-b">
                                <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ dataValue.item_summary }}
                                </td>
                                <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ dataValue.uom_id ? dataValue.uom_id : "" }}
                                </td>
                                <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ dataValue.unit_price ? dataValue.unit_price : 0 }}
                                </td>
                                <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ dataValue.quantity ? dataValue.quantity : 0 }}
                                </td>
                                <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {{ showAmount(parseFloat(dataValue.quantity), parseFloat(dataValue.unit_price)) ? showAmount(parseFloat(dataValue.quantity), parseFloat(dataValue.unit_price)) : 0 }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval && useCheckIsCurrentUser(data.next_approval?.user_id)" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
        </template>
    </PsModal>
</template>
