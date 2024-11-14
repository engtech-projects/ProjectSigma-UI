<script setup lang="ts">
import { useWarehouseStore } from "@/stores/inventory/warehouse"
defineProps({
    title: {
        type: String,
        required: true,
    },
})
const warehouseStore = useWarehouseStore()
const { logs, warehouse } = storeToRefs(warehouseStore)
onMounted(() => {
    if (!warehouse.value.isLoaded) {
        warehouseStore.fetchWarehouse()
    }
})
const headersLogs = [
    { name: "Transaction Date", id: "transaction_date" },
    { name: "Transaction Type", id: "transaction_type" },
    { name: "Item Code", id: "item_code" },
    { name: "Action", id: "" },
]
const filterHistory = async () => {
    if (logs.value.params.warehouse_id) {
        await warehouseStore.fetchWarehouseLogs(logs.value.params.warehouse_id)
    }
}
</script>
<template>
    <div class="h-full w-full">
        <div class="flex flex-col gap-4 pt-4 w-full">
            <div class="flex flex-col gap-4 mb-5 max-w-2xl">
                <div class="flex flex-row gap-4 justify-start items-center">
                    <div class="div">
                        <label for="date_requested" class="block text-sm font-medium text-gray-900 dark:text-white">Date From:</label>
                        <input id="date_requested" v-model="logs.params.filter_from" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="div">
                        <label for="date_required" class="block text-sm font-medium text-gray-900 dark:text-white">Date To:</label>
                        <input id="date_required" v-model="logs.params.filter_to" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div>
                        <InventoryCommonFormPsSelect
                            v-model="logs.params.warehouse_id"
                            :select-list="warehouse.list"
                            title="Warehouse"
                            @change="filterHistory"
                        />
                    </div>
                </div>
            </div>
        </div>
        <LayoutBoards class="w-full">
            <div id="itemDetails">
                <div v-if="logs.list" id="content" class="overflow-auto max-h-96">
                    <table class="table-auto w-full border-collapse">
                        <thead class="sticky top-0 bg-white">
                            <tr>
                                <template v-for="dataHeader, index in headersLogs" :key="index+'-header'">
                                    <InventoryWarehouseItemTh :title="dataHeader" />
                                </template>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in logs.list" :key="index">
                                <td>
                                    {{ item.created_at ? item.created_at : "" }}
                                </td>
                                <td>
                                    {{ item.transaction_type ? item.transaction_type : "" }}
                                </td>
                                <td>
                                    {{ item.item_code ? item.item_code : "" }}
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                    <p class="text-center text-lg p-2">
                        NO DATA
                    </p>
                </div>
            </div>
        </LayoutBoards>
    </div>
</template>
