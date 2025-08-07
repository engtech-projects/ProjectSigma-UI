<script setup lang="ts">
import { useWarehouseStore } from "@/stores/inventory/warehouse"
const warehouseStore = useWarehouseStore()
warehouseStore.fetchWarehouse()
const { warehouse, warehousePss, warehouseDetails, warehousePssForm } = storeToRefs(warehouseStore)
const isSet = ref(true)
const wareHouseId = ref(null)
const mainPss = ref(null)

const doSet = () => {
    if (warehousePss.value.list && warehousePss.value.list.length > 0) {
        mainPss.value = warehousePss.value.list[0].user_id
    } else {
        mainPss.value = null
    }
    isSet.value = false
}

const saveNewPss = async () => {
    warehousePssForm.value = {
        user_id: mainPss.value,
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
    await warehouseStore.fetchWarehouseDetails(wareHouseId.value)
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
    <div class="bg-gray-50">
        <LayoutBoards title="Overview" class="w-full">
            <div id="warehouse-overview" class="max-w-7xl mx-auto p-2">
                <LayoutLoadingContainer class="w-full" :loading="warehousePss.isLoading">
                    <div>
                        <div class="bg-white overflow-hidden">
                            <div class="p-4">
                                <div class="flex items-center space-x-4">
                                    <label class="text-sm font-medium text-gray-700 shrink-0">Choose a Warehouse</label>
                                    <div class="relative flex-1 max-w-sm">
                                        <select
                                            v-model="wareHouseId"
                                            class="w-full appearance-none bg-transparent border-0 border-b-2 border-gray-200 focus:border-blue-600 text-gray-900 text-sm py-2 pr-8 focus:outline-none focus:ring-0 transition-colors"
                                            @change="filterWarehouse"
                                        >
                                            <option value="" disabled>
                                                Select warehouse...
                                            </option>
                                            <option v-for="item in warehouse.list" :key="item.id" :value="item.id">
                                                {{ item.name }}
                                            </option>
                                        </select>
                                        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="wareHouseId" class="flex flex-col md:flex-row gap-2 w-full">
                        <div class="w-full md:w-1/2 min-w-0">
                            <div class="bg-white rounded-lg border border-gray-200">
                                <div class="p-4 border-b border-gray-100">
                                    <h2 class="text-lg font-medium text-gray-900">
                                        Details
                                    </h2>
                                </div>
                                <div class="p-4">
                                    <div class="grid grid-cols-1 gap-8">
                                        <div class="group">
                                            <div class="flex items-start space-x-3">
                                                <div class="flex-1 min-w-0">
                                                    <dt class="text-xs font-medium text-gray-500 uppercase mb-1">
                                                        Warehouse Name
                                                    </dt>
                                                    <dd class="text-md font-bold text-gray-900 truncate">
                                                        {{ warehouseDetails.name || '—' }}
                                                    </dd>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="group md:col-span-2">
                                            <div class="flex items-start space-x-3">
                                                <div class="flex-1 min-w-0">
                                                    <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                        Project Code / Department
                                                    </dt>
                                                    <dd class="text-md font-bold text-gray-900 truncate">
                                                        {{ warehouseDetails.owner_type || '—' }}
                                                    </dd>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="group">
                                            <div class="flex items-start space-x-3">
                                                <div class="flex-1 min-w-0">
                                                    <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                        Location
                                                    </dt>
                                                    <dd class="text-md font-bold text-gray-900 truncate">
                                                        {{ warehouseDetails.location || '—' }}
                                                    </dd>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full md:w-1/2 min-w-0">
                            <div class="bg-white rounded-lg border border-gray-200 h-fit">
                                <div class="p-4 border-b border-gray-100">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-lg font-medium text-gray-900">
                                            PSS
                                        </h2>

                                        <!-- Intelligent Action Button -->
                                        <div v-show="AccessibilityTypes.inventory_warehouse_pssmanager && wareHouseId">
                                            <button
                                                v-if="isSet"
                                                class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                                @click="doSet"
                                            >
                                                Set
                                            </button>
                                            <div v-else class="flex items-center space-x-3">
                                                <button
                                                    class="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                                                    @click="saveNewPss"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    class="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
                                                    @click="filterWarehouse"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="p-2">
                                    <div v-if="isSet && warehouseDetails.warehouse_pss" class="space-y-2">
                                        <div class="flex items-start space-x-4 p-2 bg-gray-50 rounded-lg">
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-900 truncate">
                                                    {{ warehouseDetails.warehouse_pss?.employee?.fullname_last }}
                                                </p>
                                            </div>
                                            <div class="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-2" />
                                        </div>
                                    </div>

                                    <div v-else-if="isSet" class="space-y-4">
                                        <template v-for="pssItem in warehousePss.list" :key="pssItem.id">
                                            <template v-for="user in pssItem.user" :key="user.id">
                                                <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                                    <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                                        <span class="text-sm font-medium text-white">
                                                            {{ user.employee.fullname_first.charAt(0) }}
                                                        </span>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900 truncate">
                                                            {{ user.employee.fullname_first }}
                                                        </p>
                                                        <p class="text-xs text-gray-500 truncate">
                                                            {{ user.employee.current_position }}
                                                        </p>
                                                        <p class="text-xs text-gray-400 truncate">
                                                            {{ user.employee.current_department }}
                                                        </p>
                                                    </div>
                                                    <div class="w-2 h-2 bg-green-500 rounded-full shrink-0 mt-2" />
                                                </div>
                                            </template>
                                        </template>
                                    </div>

                                    <!-- Employee Selector (Edit Mode) -->
                                    <div v-if="!isSet" class="space-y-4">
                                        <div class="p-4 bg-gray-50 rounded-lg">
                                            <label class="block text-xs font-medium text-gray-700 mb-3 uppercase tracking-wide">
                                                Select Manager
                                            </label>
                                            <HrmsCommonUserEmployeeSelector v-model="mainPss" class="w-full" />
                                        </div>
                                    </div>

                                    <div v-if="isSet && !warehouseDetails.warehouse_pss?.user && (!warehousePss.list || warehousePss.list.length === 0)" class="text-center py-8">
                                        <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <p class="text-sm text-gray-500 font-light">
                                            No manager assigned
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutLoadingContainer>
            </div>
        </LayoutBoards>
    </div>
</template>
