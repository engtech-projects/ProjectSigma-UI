<script setup lang="ts">
import { useRequestStockStore } from "@/stores/inventory/requeststock"
const mainStore = useRequestStockStore()
const { requestStock } = storeToRefs(mainStore)
interface HeaderColumn {
    name: string,
    id: string,
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
})
const addItem = () => {
    requestStock.value.details.push(
        {
            quantity: "",
            unit: "",
            sku: "",
            item_description: "",
            specification: "",
            preferred_brand: "",
            reason_for_requests: "",
            turn_over: "",
        }
    )
}
const removeItem = (id: number) => {
    requestStock.value.details.splice(id, 1)
}
</script>
<template>
    <div class="h-full w-full">
        <div id="itemDetails">
            <h5 v-if="title" class="text-xl font-medium text-gray-900 dark:text-white border-b p-2">
                {{ title }}
            </h5>
            <div id="content" class="overflow-auto max-h-96">
                <table class="table-auto w-full border-collapse">
                    <thead class="sticky top-0 bg-white">
                        <tr>
                            <th v-for="(dataHeader, index) in headerColumns" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                                {{ dataHeader.name }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b-2 border-gray-300">
                            <td class="px-2 py-2 border-0 font-medium text-gray-900 whitespace-nowrap text-center">
                                <button
                                    type="button"
                                    class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-blue-300 font-semibold text-sm p-2 me-2 mb-2 flex justify-center"
                                    @click="addItem"
                                >
                                    <Icon name="mdi:plus" class="h-5 w-5 text-white" />
                                </button>
                            </td>
                        </tr>
                        <template v-for="(item, index) in requestStock.details" :key="index">
                            <InventoryBomItemAppend
                                v-model:item="requestStock.details[index]"
                                :index="index"
                                @remove-item="removeItem"
                            />
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
