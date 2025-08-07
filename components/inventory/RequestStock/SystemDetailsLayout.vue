<script setup lang="ts">
import { useRequestStockStore } from "@/stores/inventory/requeststock"
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    data: {
        type: Object,
        default: () => {}
    },
    canvasser: {
        type: Object,
        default: () => {}
    },
    showPriceQuotations: {
        type: Boolean,
        default: false
    },
    showCanvasser: {
        type: Boolean,
        default: false
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
        navigateTo({ path: "/inventory/requisition-slip" })
    } catch (error: any) {
        snackbar.add({
            type: "error",
            text: error?.message || "Something went wrong."
        })
    }
}

const itemTableHeaders = computed(() => {
    const baseHeaders = [
        { name: "QTY", id: "quantity", style: "" },
        { name: "Unit", id: "uom_name", style: "" },
        { name: "Item Description", id: "item_description", style: "" },
        { name: "Specification", id: "specification", style: "" },
        { name: "Preferred Brand", id: "preferred_brand", style: "" },
        { name: "Reason for Request", id: "reason", style: "" },
    ]

    if (props.showPriceQuotations) {
        baseHeaders.push({ name: "No. of Price Quotations", id: "price_quotation_count", style: "" })
    }

    return baseHeaders
})
</script>

<template>
    <div class="w-full max-w-full overflow-hidden">
        <div class="flex items-center justify-center border-b rounded-t mb-4 p-4">
            <h2 v-if="title" class="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 text-center">
                {{ title }}
            </h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            <div class="space-y-3">
                <InventoryCommonFormPsFormLabel title="Request For" :value="props.data?.request_for" />
                <InventoryCommonFormPsFormLabel title="Office/Project" :value="props.data?.office_project" />
                <InventoryCommonFormPsFormLabel title="Address" :value="props.data?.office_project_address" />
                <div v-if="props.showCanvasser">
                    <InventoryCommonFormPsFormLabel
                        title="Canvasser"
                        :value="props.canvasser?.name ?? 'No Canvasser Assigned'"
                    />
                </div>
            </div>
            <div class="space-y-3">
                <InventoryCommonFormPsFormLabel title="Reference No." :value="props.data?.reference_no" />
                <InventoryCommonFormPsFormLabel title="Date Prepared" :value="props.data?.date_prepared" />
                <InventoryCommonFormPsFormLabel title="Date Needed" :value="props.data?.date_needed" />
                <InventoryCommonFormPsFormLabel title="Equipment No." :value="props.data?.equipment_no" />
            </div>
        </div>
        <div v-if="props.showCanvasser">
            <InventoryCommonCanvasserSelector />
        </div>
        <div>
            <div class="overflow-x-auto">
                <LayoutPsTable
                    :header-columns="itemTableHeaders"
                    :datas="props.data?.items ?? []"
                    class="rounded-md min-w-full"
                    :clickable-rows="false"
                />
            </div>
        </div>

        <div class="px-2">
            <div class="flex flex-col xl:flex-row">
                <div class="flex-1 border border-slate-300 overflow-hidden max-w-[25%]">
                    <div class="divide-y divide-slate-300">
                        <div class="flex flex-col sm:flex-row">
                            <div class="p-2 sm:border-r sm:w-1/3 font-medium max-w-[25%]">
                                Type of Request:
                            </div>
                            <div class="p-2 sm:w-2/3 max-w-[25%]">
                                {{ props.data?.type_of_request }}
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row">
                            <div class="p-2 sm:border-r sm:w-1/3 font-medium max-w-[25%]">
                                Contact Number:
                            </div>
                            <div class="p-2 sm:w-2/3 max-w-[25%]">
                                {{ props.data?.contact_no }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 border border-slate-300 overflow-hidden max-w-[25%]">
                    <div class="divide-y divide-slate-300">
                        <div class="flex flex-col sm:flex-row">
                            <div class="p-2 sm:border-r sm:w-1/3 font-medium max-w-[25%]">
                                Remarks:
                            </div>
                            <div class="p-2 sm:w-2/3 max-w-[25%]">
                                {{ props.data?.remarks }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 border border-slate-300 overflow-hidden max-w-[25%]">
                    <div class="divide-y divide-slate-300">
                        <div class="flex flex-col sm:flex-row">
                            <div class="p-2 sm:border-r sm:w-1/3 font-medium max-w-[25%]">
                                Current SMR:
                            </div>
                            <div class="p-2 sm:w-2/3 max-w-[25%]">
                                {{ props.data?.current_smr }}
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row">
                            <div class="p-2 sm:border-r sm:w-1/3 font-medium max-w-[25%]">
                                Previous SMR:
                            </div>
                            <div class="p-2 sm:w-2/3 max-w-[25%]">
                                {{ props.data?.previous_smr }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 border border-slate-300 overflow-hidden max-w-[25%]">
                    <div class="divide-y divide-slate-300">
                        <div class="flex flex-col sm:flex-row">
                            <div class="p-2 sm:border-r sm:w-1/3 font-medium max-w-[25%]">
                                Unused SMR:
                            </div>
                            <div class="p-2 sm:w-2/3 max-w-[25%]">
                                {{ props.data?.unused_smr }}
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row">
                            <div class="p-2 sm:border-r sm:w-1/3 font-medium max-w-[25%]">
                                Next SMR:
                            </div>
                            <div class="p-2 sm:w-2/3 max-w-[25%]">
                                {{ props.data?.next_smr }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="approvals" class="w-full mb-6">
            <LayoutApprovalsListView :approvals="props.data?.approvals" />
        </div>
        <div id="footer" class="pb-4">
            <div
                v-if="props.data?.next_approval && useCheckIsCurrentUser(props.data?.next_approval?.user_id)"
                class="flex flex-col sm:flex-row gap-2 justify-end"
            >
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="props.data?.id"
                    @approve="id => handleRequest('approve', id)"
                    @deny="id => handleRequest('deny', id)"
                />
            </div>
        </div>
    </div>
</template>
