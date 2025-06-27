<script setup lang="ts">
import { useBOMStore } from "@/stores/inventory/bom"

const BOMStore = useBOMStore()
const { bomRequest } = storeToRefs(BOMStore)

interface HeaderColumn {
  name: string
  id: string
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
    bomRequest.value.details.push({
        item_id: null,
        uom_id: null,
        unit_price: null,
        quantity: null,
        conversion: null,
    })
}

const removeItem = (id: number) => {
    bomRequest.value.details.splice(id, 1)
}
</script>

<template>
    <div class="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200">
        <h5
            v-if="title"
            class="text-lg md:text-xl font-semibold text-gray-800 dark:text-white border-b px-4 py-3 bg-slate-100 dark:bg-slate-700 flex justify-between items-center"
        >
            {{ title }}
            <button
                type="button"
                title="Add item"
                class="bg-green-500 hover:bg-green-600 active:bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition duration-150"
                @click="addItem"
            >
                <Icon name="mdi:plus" class="h-5 w-5" />
            </button>
        </h5>

        <div class="overflow-visible transition-all duration-300 ease-in-out">
            <table class="w-full border-collapse">
                <thead class="sticky top-0 z-10 bg-white dark:bg-gray-700 shadow-sm">
                    <tr>
                        <th
                            v-for="(dataHeader, index) in headerColumns"
                            :key="index"
                            scope="col"
                            class="text-center text-sm font-semibold text-gray-600 dark:text-gray-300 px-4 py-3 border-b border-gray-200"
                        >
                            {{ dataHeader.name }}
                        </th>
                    </tr>
                </thead>

                <tbody class="text-sm text-gray-800 dark:text-gray-100">
                    <tr v-if="!bomRequest.details.length" class="text-center">
                        <td :colspan="headerColumns.length" class="px-4 py-6 text-gray-500 italic">
                            No items added. Click the plus button to add items.
                        </td>
                    </tr>

                    <template v-for="(item, index) in bomRequest.details" :key="index">
                        <InventoryBomItemAppend
                            v-model:item="bomRequest.details[index]"
                            :index="index"
                            @remove-item="removeItem"
                        />
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
