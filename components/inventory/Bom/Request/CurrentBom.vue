<script setup>
import { useBOMStore } from "@/stores/inventory/bom"
const BOMStore = useBOMStore()
const { currentBom: List } = storeToRefs(BOMStore)
onMounted(() => {
    if (!List.value.isLoaded) {
        BOMStore.getCurrentBOM()
    }
})
const today = new Date()
const currentYear = today.getFullYear()
const headers = [
    { name: "Item", id: "item_id" },
    { name: "Unit", id: "uom_id" },
    { name: "Price", id: "price" },
    { name: "Quantity", id: "quantity" },
    { name: "Amount", id: "amount" },
]
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
                        <select class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <option>
                                Test
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-row gap-2 justify-start items-center">
                        <div>
                            <label> Year : </label>
                        </div>
                        <div>
                            <select v-model="currentYear" class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option>
                                    2024
                                </option>
                            </select>
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
