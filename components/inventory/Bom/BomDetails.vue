<script setup lang="ts">
import { useBOMStore } from "@/stores/inventory/bom"

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
    request: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()
const main = useBOMStore()
const snackbar = useSnackbar()
const { remarks } = storeToRefs(main)

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
                path: "/inventory/bom",
                replace: true
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
                path: "/inventory/bom",
                replace: true
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}

const showAmount = (quantity:number, price:number) => {
    return quantity * price
}
</script>
<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <div id="headline mb-4">
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-between border-b rounded-t">
                    <h3 v-if="title" class="pl-4 text-xl font-semibold text-gray-900 p-4">
                        {{ title }}
                    </h3>
                </div>
            </div>
            <LayoutPrint>
                <div id="itemDetails">
                    <div id="content" class="overflow-auto">
                        <table class="table-auto w-full border-collapse">
                            <thead>
                                <tr>
                                    <th v-for="(dataHeader, index) in headerColumns" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                                        {{ dataHeader.name }}
                                    </th>
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
                    <div id="approvals" class="w-full">
                        <LayoutApprovalsListView :approvals="request.approvals" />
                    </div>
                </div>
            </LayoutPrint>
            <div id="footer">
                {{ request.next_approval }}
                <div v-if="request.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                    <HrmsCommonApprovalDenyButton
                        v-model:deny-remarks="remarks"
                        :request-id="request.id"
                        @approve="approvedRequest"
                        @deny="denyRequest"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
