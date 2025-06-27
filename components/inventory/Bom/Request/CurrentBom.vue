<script setup>
import { useBOMStore } from "@/stores/inventory/bom"
const BOMStore = useBOMStore()
const { currentBom: List } = storeToRefs(BOMStore)
const today = new Date()
const currentYear = today.getFullYear()
const headers = [
    { name: "Item", id: "item_id" },
    { name: "Unit", id: "uom_id" },
    { name: "Price", id: "price" },
    { name: "Quantity", id: "quantity" },
    { name: "Amount", id: "amount" },
]
const filterBOM = () => {
    List.value.params.effectivity = currentYear
    List.value.params.assignment_type = "Department"
    BOMStore.getCurrentBOM()
}
</script>
<template>
    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b p-2">
        Current BOM
    </h5>
    <div class="text-gray-500 p-2">
        <form>
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="flex flex-col gap-4 mb-5 max-w-xl">
                    <div class="flex flex-row gap-4 justify-start items-center">
                        <label class="text-">Assignment :</label>
                        <div>
                            <HrmsCommonDepartmentSelector v-model="List.params.assignment_id" @change="filterBOM" />
                            <HrmsCommonProjectSelector v-model="List.params.assignment_id" @change="filterBOM" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-2 justify-start items-center">
                        <div>
                            <label> Year : </label>
                        </div>
                        <div>
                            <input id="year" v-model="currentYear" type="text" class="bg-gray-50 border disabled:opacity-75 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled>
                        </div>
                    </div>
                </div>
                <div>
                    <InventoryBomTable title="Item List" :header-columns="headers" :data-columns="List.list" />
                </div>
            </div>
        </form>
    </div>
</template>
