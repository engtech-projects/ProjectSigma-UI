<script setup lang="ts">
import { useStockTransferStore } from "@/stores/inventory/stocktransfer"

interface HeaderColumn {
    name: string,
    id: string,
    style: string
}

const dummyData = {
    id: 1,
    date: "2025-04-10",
    from_section: "Warehouse A",
    to_section: "Warehouse B",
    reference_no: "ST-2025-0001",
    items: [
        {
            id: 1,
            item_id: "Laptop Computer",
            qty: 5,
            accepted_qty: 5,
            unit: "Units",
            condition: "Good",
            status: "Accepted",
            remarks: "All items in good condition"
        },
        {
            id: 2,
            item_profile: "Office Chair",
            qty: 10,
            accepted_qty: 8,
            unit: "Units",
            condition: "Good",
            status: "Damaged",
            remarks: "2 units with minor damage"
        },
    ]
}

const props = defineProps({
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

const isDisabled = ref(false)
const main = useStockTransferStore()
const snackbar = useSnackbar()
const { stockTransfer, remarks } = storeToRefs(main)

const reactiveData = computed(() => props.data || dummyData)

const acceptAll = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    try {
        await main.acceptAllItem(requestId, { remarks })
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
            main.fetchTransferDetails(props.data.id)
            isDisabled.value = true
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
const acceptWithDetails = async ({ requestId, acceptedQty, remarks }: { requestId: number, acceptedQty: number, remarks: string }) => {
    if (remarks === "") {
        snackbar.add({
            type: "error",
            text: "Quantity & Remarks are required."
        })
        return
    }
    try {
        await main.acceptQtyRemarks(requestId, { accepted_qty: acceptedQty, remarks })
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
            await main.fetchTransferDetails(props.data.id)
            isDisabled.value = true
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
const rejectRequest = async ({ requestId, remarks }: { requestId: number, remarks: string }) => {
    if (remarks.trim() === "") {
        snackbar.add({
            type: "error",
            text: "Remarks are required."
        })
        return
    }
    try {
        await main.rejectItem(requestId, { remarks: remarks.trim() })
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
            await main.fetchTransferDetails(props.data.id)
            isDisabled.value = true
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
                    <!-- <InventoryCommonEvenparHeader /> -->
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
                                        Date:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.date }}
                                    </p>
                                    <p class="text-md font-bold">
                                        From:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.from_section }}
                                    </p>
                                    <p class="text-md font-bold">
                                        To:
                                    </p>
                                    <p class="text-md underline indent-2">
                                        {{ data.to_section }}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LayoutLoadingContainer class="w-full" :loading="stockTransfer.isLoading">
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
                                    <tr v-for="item in reactiveData.items" :key="item.id" class="bg-white border-b">
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.item_id }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.qty }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.unit }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            {{ item.condition }}
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            <template v-if="item.remarks === 'Rejected'">
                                                <div class="flex justify-center relative group">
                                                    <Icon name="mdi:close-circle" class="h-8 w-8 text-red-700" />
                                                    <div role="tooltip" class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md">
                                                        Rejected
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else-if="item.remarks === 'Accepted'">
                                                <div class="flex justify-center relative group">
                                                    <Icon name="mdi:check-circle" class="h-8 w-8 text-green-700" />
                                                    <div role="tooltip" class="absolute bottom-full mb-2 hidden group-hover:block z-10 w-32 px-2 py-1 text-xs text-white bg-gray-700 rounded-lg shadow-md">
                                                        Accepted
                                                    </div>
                                                </div>
                                            </template>
                                        </td>
                                        <td class="border px-2 py-1 text-center">
                                            <InventoryCommonAcceptRejectButton
                                                v-model:accept-remarks="remarks"
                                                v-model:reject-remarks="remarks"
                                                v-model:accepted-qty="acceptedQty"
                                                :max-quantity="item.qty"
                                                :request-id="item.id"
                                                :disabled="!!item.remarks"
                                                :class="{
                                                    'opacity-60 cursor-not-allowed pointer-events-none': !!item.remarks
                                                }"
                                                @accept-all="acceptAll"
                                                @accept="acceptWithDetails"
                                                @reject="rejectRequest"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </LayoutLoadingContainer>
            </LayoutPrint>
        </div>
    </div>
</template>
