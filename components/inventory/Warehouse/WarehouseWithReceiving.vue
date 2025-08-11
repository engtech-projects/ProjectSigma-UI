<script setup lang="ts">
import { useWarehouseStore } from "@/stores/inventory/warehouse"
import { useReceivingStore } from "@/stores/inventory/receiving"
const warehouseStore = useWarehouseStore()
const receivingStore = useReceivingStore()
warehouseStore.fetchWarehouse()
receivingStore.fetchReceivings()
const { warehouse, warehouseDetails } = storeToRefs(warehouseStore)
const isSet = ref(true)
const wareHouseId = ref(null)

const snackbar = useSnackbar()
const filterWarehouse = async () => {
    isSet.value = true
    if (wareHouseId.value) {
        await warehouseStore.fetchWarehouseDetails(wareHouseId.value)
    }
    await receivingStore.fetchReceivingByWarehouseId(wareHouseId.value)
    if (receivingStore.errorMessage !== "") {
        snackbar.add({
            type: "error",
            text: receivingStore.errorMessage
        })
    }
    receivingStore.errorMessage = ""
}

</script>
<template>
    <div class="h-full w-full">
        <LayoutBoards title="" class="w-full">
            <div id="warehouse-overview" class="p-4">
                <LayoutLoadingContainer class="w-full" :loading="warehouse.isLoading">
                    <div>
                        <div class="flex flex-col md:flex-row md:space-x-6">
                            <div class="flex-1">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Choose a Warehouse:</label>
                                <select
                                    v-model="wareHouseId"
                                    class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    @change="filterWarehouse"
                                >
                                    <option v-for="item in warehouse.list" :key="item.id" :value="item.id">
                                        {{ item.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex-1">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse Name:</label>
                                <p class="p-3 bg-gray-100 rounded-lg text-sm text-gray-900">
                                    {{ warehouseDetails.name }}
                                </p>
                            </div>
                            <div class="flex-1">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Location:</label>
                                <p class="p-3 bg-gray-100 rounded-lg text-sm text-gray-900">
                                    {{ warehouseDetails.location }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <InventoryReceivingList :items="receivingStore.receiving.details" />
                    </div>
                </LayoutLoadingContainer>
            </div>
        </LayoutBoards>
    </div>
</template>
