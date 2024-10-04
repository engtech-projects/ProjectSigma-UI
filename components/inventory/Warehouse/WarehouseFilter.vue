<script setup lang="ts">
import { useWarehouseStore } from "@/stores/inventory/warehouse"
const warehouseStore = useWarehouseStore()
const { warehouse, addPSS, params, warehouseList } = storeToRefs(warehouseStore)
const isSet = ref(true)
const doSet = () => {
    isSet.value = false
}
const hideSet = () => {
    isSet.value = true
    addPSS.value = []
}
const doAddPss = () => {
    addPSS.value.push(
        {
            id: null,
        }
    )
}
const removePss = (index: number) => {
    addPSS.value.splice(index, 1)
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
                    <div class="flex flex-row">
                        <select
                            v-model="params.name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                        >
                            <option v-for="item in warehouseList" :key="item.value">
                                {{ item.value }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-row">
                        <label for="">Warehouse Name: {{ warehouse.name }} </label>
                    </div>
                    <div class="flex flex-row">
                        <label for="">Location: {{ warehouse.location }} </label>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-row gap-2 justify-start items-center">
                                <label for="">PSS: {{ warehouse.pss }} </label>
                                <div v-if="isSet" class="flex flex-row">
                                    <button class="px-3 py-1 bg-purple-600 text-white text-xs font-bold" @click="doSet">
                                        SET
                                    </button>
                                </div>
                                <div v-else class="flex flex-row gap-2 justify-start items-center">
                                    <button class="px-3 py-1 bg-green-600 text-white text-xs font-bold" @click="doAddPss">
                                        +
                                    </button>
                                    <button class="px-3 py-1 bg-green-600 text-white text-xs font-bold">
                                        SAVE
                                    </button>
                                    <button class="px-3 py-1 bg-red-600 text-white text-xs font-bold" @click="hideSet">
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                            <div v-show="!isSet" class="flex flex-col gap-4">
                                <div class="flex flex-col gap-2">
                                    <template v-for="item, itemIndex in addPSS" :key="item.value">
                                        <div class="flex flex-row justify-between gap-4">
                                            <HrmsCommonUserEmployeeSelector v-model="item.id" class="w-full" />
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
                        <label for="">Project Code / Department : {{ warehouse.project_code }} </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
