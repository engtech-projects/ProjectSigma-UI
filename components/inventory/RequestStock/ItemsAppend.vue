<script setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"
const enums = useInventoryEnumsStore()

defineProps({
    headerColumns: {
        type: Array,
        required: true,
    },
    datas: {
        type: Array,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
})

const emit = defineEmits(["addItem"])

// Handle row selection
const selectItem = (dataValue) => {
    if (!dataValue || !dataValue.item_id) {
        return
    }
    enums.itemGroupFilter = dataValue.convertable_units

    emit("addItem", {
        item_id: dataValue.item_id,
        item_summary: dataValue.item_summary || "No summary available",
        uom_id: dataValue.uom_id || null,
        quantity: dataValue.quantity || 1,
        convertable_units: dataValue.convertable_units,
    })
}

// Keyboard navigation support (optional)
const handleKeydown = (event, item) => {
    if (event.key === "Enter") {
        selectItem(item)
    }
}
</script>

<template>
    <div class="overflow-x-auto border rounded-lg shadow-sm" :loading="loading">
        <table class="table-auto w-full border-collapse">
            <thead class="bg-gray-200">
                <tr>
                    <th v-for="header in headerColumns" :key="header.id" class="p-2 border">
                        {{ header.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="datas.length === 0">
                    <td :colspan="headerColumns.length" class="text-center p-4 text-gray-500">
                        No Data Available
                    </td>
                </tr>
                <tr
                    v-for="(dataValue, i) in datas"
                    :key="i"
                    class="border text-center cursor-pointer select-none hover:bg-sky-100 transition"
                    :class="{ 'bg-gray-100': i % 2 === 0 }"
                    title="Double click to add item"
                    tabindex="0"
                    @dblclick="selectItem(dataValue)"
                    @keydown="handleKeydown($event, dataValue)"
                >
                    <td v-for="header in headerColumns" :key="header.id" class="p-2 border">
                        {{ dataValue[header.id] || "—" }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
