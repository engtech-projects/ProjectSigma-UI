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
    <div class="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <h5
            v-if="title"
            class="text-lg md:text-xl font-semibold text-gray-800 dark:text-white border-b px-4 py-3 bg-slate-100 dark:bg-slate-700 flex justify-between"
        >
            {{ title }}
            <button
                class="bg-green-400 text-white hover:bg-green-600 active:bg-green-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md transition duration-150 ease-in-out"
                title="Add item"
                @click="addItem"
            >
                <Icon name="mdi:plus" class="h-8 w-8 text-white" />
            </button>
        </h5>

        <div
            class="overflow-x-auto transition-all duration-300 ease-in-out"
            :class="bomRequest.details.length > 0 ? 'max-h-screen' : 'max-h-32'"
        >
            <table class="w-full border-collapse">
                <thead class="sticky top-0 z-10 bg-white dark:bg-gray-700 shadow-sm">
                    <tr>
                        <th
                            v-for="(dataHeader, index) in headerColumns"
                            :key="index"
                            scope="col"
                            class="text-left text-sm font-semibold text-gray-600 dark:text-gray-300 px-4 py-3 border-b border-gray-200"
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
