<script setup lang="ts">
import { useWarehouseStore } from "@/stores/inventory/warehouse"
const warehouseStore = useWarehouseStore()
warehouseStore.fetchWarehouse()
const { warehouse, warehousePss, warehouseDetails } = storeToRefs(warehouseStore)
const isSet = ref(true)
const wareHouseId = ref(null)
const doSet = () => {
    isSet.value = false
}
const hideSet = () => {
    isSet.value = true
    warehousePss.value = []
}
const saveNewPss = () => {
}
const doPssList = () => {
    warehousePss.value.push(
        {
            id: null,
            user_id: null,
            warehouse_id: wareHouseId.value,
        }
    )
}
const removePss = (index: number) => {
    warehousePss.value.splice(index, 1)
}
const snackbar = useSnackbar()
const filterWarehouse = async () => {
    await warehouseStore.fetchWarehouseDetails(wareHouseId.value)
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
        <div class="flex flex-col gap-2 w-full border-2 border-solid border-gray-800 rounded-t">
            <div id="headline mb-4">
                <div class="w-full bg-gray-900 basis-[10%] grow-1 shrink-0 flex flex-row justify-between items-center border-b py-2 px-4">
                    <div class="flex flex-row gap-2 items-center justify-center">
                        <h3 class="text-lg font-bold text-white">
                            Warehouse Overview
                        </h3>
                    </div>
                </div>
            </div>
            <div id="warehouse-overview" class="p-4">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row gap-4 justify-start items-center">
                        <label>Choose a Warehouse :</label>
                        <select
                            v-model="wareHouseId"
                            class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            @change="filterWarehouse"
                        >
                            <option v-for="item in warehouse" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-row">
                        <label for="">Warehouse Name : {{ warehouseDetails.name }} </label>
                    </div>
                    <div class="flex flex-row">
                        <label for="">Location : {{ warehouseDetails.location }} </label>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-col gap-2 justify-start items-start">
                                <label for="">PSS: </label>
                                <div class="flex flex-row gap-2">
                                    <template v-for="data in warehousePss" :key="data">
                                        <span>
                                            {{ data.user_id }}
                                        </span>
                                    </template>
                                </div>
                                <data v-show="AccessibilityTypes.inventory_warehouse_pssmanager">
                                    <div v-if="isSet" class="flex flex-row">
                                        <button class="px-3 py-1 bg-purple-600 text-white text-xs font-bold" @click="doSet">
                                            SET
                                        </button>
                                    </div>
                                    <div v-else class="flex flex-row gap-2 justify-start items-center">
                                        <button class="px-3 py-1 bg-green-600 text-white text-xs font-bold" @click="doPssList">
                                            +
                                        </button>
                                        <button class="px-3 py-1 bg-green-600 text-white text-xs font-bold" @click="saveNewPss">
                                            SAVE
                                        </button>
                                        <button class="px-3 py-1 bg-red-600 text-white text-xs font-bold" @click="hideSet">
                                            CANCEL
                                        </button>
                                    </div>
                                </data>
                            </div>
                            <div v-show="!isSet" class="flex flex-col gap-4">
                                <div class="flex flex-col gap-2">
                                    <template v-for="item, itemIndex in warehousePss" :key="item.value">
                                        <div class="flex flex-row justify-between gap-4">
                                            <HrmsCommonUserEmployeeSelector v-model="item.user_id" class="w-full" />
                                            <div class="flex flex-row gap-2">
                                                <button class="px-3 py-1 bg-red-600 text-white text-xs font-bold" @click="removePss(itemIndex)">
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <label for="">Project Code / Department : {{ warehouseDetails.owner_type }} </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
