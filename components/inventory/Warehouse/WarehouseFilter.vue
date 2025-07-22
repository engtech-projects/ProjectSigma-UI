<script setup lang="ts">
import { useWarehouseStore } from "@/stores/inventory/warehouse"
const warehouseStore = useWarehouseStore()
warehouseStore.fetchWarehouse()
const { warehouse, warehousePss, warehouseDetails, warehousePssForm } = storeToRefs(warehouseStore)
const isSet = ref(true)
const wareHouseId = ref(null)
const mainPss = ref(null)

const doSet = () => {
    if (warehousePss.value.list.length > 0) {
        mainPss.value = warehousePss.value.list[0].user_id
    } else {
        mainPss.value = null
    }
    isSet.value = false
}

const saveNewPss = async () => {
    warehousePssForm.value = {
        user_id: mainPss.value,
        warehouse_id: wareHouseId.value,
    }
    await warehouseStore.updatePssWarehouse(wareHouseId.value)
    if (warehouseStore.errorMessage !== "") {
        snackbar.add({
            type: "error",
            text: warehouseStore.errorMessage
        })
    } else {
        snackbar.add({
            type: "success",
            text: warehouseStore.successMessage
        })
        isSet.value = true
    }
}

const snackbar = useSnackbar()
const filterWarehouse = async () => {
    isSet.value = true
    mainPss.value = null
    await warehouseStore.fetchWarehouseDetails(wareHouseId.value)
    await warehouseStore.fetchWarehouseLogs(wareHouseId.value)
    await warehouseStore.fetchWarehouseStocks(wareHouseId.value)
    if (warehouseStore.errorMessage !== "") {
        snackbar.add({
            type: "error",
            text: warehouseStore.errorMessage
        })
    }
    warehouseStore.errorMessage = ""
}
</script>

<template>
    <div class="h-full w-full">
        <LayoutBoards title="Overview" class="w-full">
            <div id="warehouse-overview" class="p-4">
                <LayoutLoadingContainer class="w-full" :loading="warehousePss.isLoading">
                    <div class="flex flex-col gap-4 mb-5">
                        <div class="flex flex-row gap-4 justify-start items-center">
                            <label class="text-">Choose a Warehouse :</label>
                            <select
                                v-model="wareHouseId"
                                class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                @change="filterWarehouse"
                            >
                                <option v-for="item in warehouse.list" :key="item.id" :value="item.id">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex flex-row">
                            <label> Warehouse Name : {{ warehouseDetails.name }} </label>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-start">
                            <label> Location Name : {{ warehouseDetails.location }} </label>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex flex-col gap-4">
                                <div class="flex flex-col gap-2 justify-start items-start">
                                    <div class="flex flex-row gap-2">
                                        <data v-show="AccessibilityTypes.inventory_warehouse_pssmanager && warehousePss.inWarehouse">
                                            <div v-if="isSet" class="flex flex-row">
                                                <button class="px-3 py-1 bg-purple-600 text-white text-xs font-bold" @click="doSet">
                                                    SET
                                                </button>
                                            </div>
                                            <div v-else class="flex flex-row gap-2 justify-start items-center">
                                                <button class="px-3 py-1 bg-green-600 text-white text-xs font-bold" @click="saveNewPss">
                                                    SAVE
                                                </button>
                                                <button class="px-3 py-1 bg-red-600 text-white text-xs font-bold" @click="filterWarehouse">
                                                    CANCEL
                                                </button>
                                            </div>
                                        </data>
                                        <label class="text-md">PSS: </label>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <template v-for="data in warehousePss.list" :key="data">
                                            <div v-if="isSet">
                                                <template v-for="user in data.user" :key="user">
                                                    <span class="text-sm font-semibold">
                                                        {{ "- " + user.employee.fullname_first }}
                                                    </span>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div v-show="!isSet" class="flex flex-col gap-4">
                                    <div class="flex flex-col gap-2">
                                        <div class="flex flex-row justify-between gap-4">
                                            <HrmsCommonUserEmployeeSelector v-model="mainPss" class="w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <label for="">Project Code / Department : {{ warehouseDetails.owner_type }} </label>
                        </div>
                    </div>
                </LayoutLoadingContainer>
            </div>
        </LayoutBoards>
    </div>
</template>
