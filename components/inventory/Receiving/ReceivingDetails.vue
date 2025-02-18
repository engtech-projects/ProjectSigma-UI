<script setup lang="ts">
import { useReceivingStore } from "@/stores/inventory/receiving"

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

defineProps({
    title: {
        type: String,
        required: true,
    },
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    data: {
        type: Array<any>,
        required: true,
    },
})

const { data: userData } = useAuth()
const main = useReceivingStore()
const snackbar = useSnackbar()
const { remarks } = storeToRefs(main)
const utils = useUtilities()
const approvedRequest = async (id:number) => {
    try {
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
            main.$reset()
            navigateTo({
                path: "/inventory/material-receiving",
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
const denyRequest = async (id:any) => {
    try {
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
            main.$reset()
            navigateTo({
                path: "/inventory/material-receiving",
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}

</script>
<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <LayoutPrint>
                <div id="headline mb-4 ">
                    <InventoryCommonEvenparHeader />
                    <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-center rounded-t mb-4 mt-4">
                        <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                            {{ title }}
                        </h3>
                    </div>
                    <div class="flex justify-between mb-4">
                        <div class="w-1/2">
                            <div class="flex justify-start p-2">
                                <div class="grid grid-cols-2">
                                    <p class="text-md font-bold">
                                        Supplier:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.supplier.company_name }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Reference:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.reference_code }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Terms of Payment:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.terms_of_payment }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Particulars:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.particulars }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2 text-left">
                            <div class="flex justify-around p-2">
                                <div class="grid grid-cols-2">
                                    <p class="text-md font-bold">
                                        Reference Number:
                                    </p>
                                    <p class="text-md font-bold underline indent-2">
                                        {{ data.reference_no }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Transaction Date:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.transaction_date }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Project Code:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.project.project_code }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Equipment No.:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.equipment_no }}
                                    </p>
                                    <p class="text-md font-bold">
                                        Source PO:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.source_po }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="itemDetails">
                    <div id="content" class="overflow-auto">
                        <table class="table-auto w-full border-collapse">
                            <thead>
                                <tr class="bg-[#dbe5f1]">
                                    <th v-for="(dataHeader, index) in headerColumns" :key="index" scope="col" class="p-2 border-b text-sm">
                                        {{ dataHeader.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in data.items" :key="item.id" class="bg-white border-b">
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.item_code }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.item_profile }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.specification }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.actual_brand }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.qty }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.uom }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.unit_price }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.ext_price }}
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        <template v-if="item.status === 'Rejected'">
                                            <div class="flex justify-center relative group">
                                                <Icon name="mdi:close-circle" class="h-5 w-5 text-red-700" />
                                                <div role="tooltip" class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md">
                                                    Rejected
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else-if="item.status === 'Accepted'">
                                            <div class="flex justify-center relative group">
                                                <Icon name="mdi:check-circle" class="h-5 w-5 text-green-700" />
                                                <div role="tooltip" class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md">
                                                    Accepted
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            {{ item.status }}
                                        </template>
                                    </td>
                                    <td class="border px-2 py-1 text-center">
                                        {{ item.remarks }}
                                    </td>
                                </tr>
                                <tr class="border">
                                    <td colspan="10">
                                        <div class="flex justify-end p-2 py-2">
                                            <div class="grid grid-cols-2 gap-2">
                                                <p v-if="title" class="text-md text-gray-900">
                                                    <strong>Total net of VAT cost:</strong>
                                                </p>
                                                <p v-if="title" class="text-md text-gray-900">
                                                    {{ utils.formatCurrency(data.total_net_of_vat_cost) }}
                                                </p>
                                                <p v-if="title" class="text-md text-gray-900">
                                                    <strong>Total Input VAT:</strong>
                                                </p>
                                                <p v-if="title" class="text-md text-gray-900">
                                                    {{ utils.formatCurrency(data.total_input_vat) }}
                                                </p>
                                                <p v-if="title" class="text-md text-gray-900">
                                                    <strong> Grand Total:</strong>
                                                </p>
                                                <p v-if="title" class="text-md text-gray-900">
                                                    {{ `₱${utils.formatCurrency(data.grand_total)}` }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="approvals" class="w-full mt-4">
                        <LayoutApprovalsListView :approvals="data.approvals" />
                    </div>
                </div>
            </LayoutPrint>
            <div id="footer">
                <div v-if="data.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                    <HrmsCommonApprovalDenyButton
                        v-model:deny-remarks="remarks"
                        :request-id="data.id"
                        @approve="approvedRequest"
                        @deny="denyRequest"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
