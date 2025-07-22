<script setup>
import { ref, computed } from "vue"
import { useInventoryEnumsStore } from "@/stores/inventory/enum"

const enums = useInventoryEnumsStore()

const props = defineProps({
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
    },
    selectType: {
        type: String,
        default: null
    }
})

const emit = defineEmits(["addItem"])
const searchQuery = ref("")

const filteredData = computed(() => {
    if (!searchQuery.value) { return props.datas }

    const query = searchQuery.value.toLowerCase()

    return props.datas.filter(dataValue =>
        props.headerColumns.some((header) => {
            const cellValue = String(dataValue[header.id] || "").toLowerCase()
            return cellValue.includes(query)
        })
    )
})

const selectItem = (dataValue) => {
    if (!dataValue || !dataValue.item_id) {
        return
    }
    enums.itemGroupFilter = dataValue.convertable_units

    emit("addItem", {
        item_id: dataValue.item_id,
        item_summary: dataValue.item_summary || "No summary available",
        uom_id: dataValue.uom_id || null,
        unit: dataValue.unit || null,
        quantity: dataValue.quantity || 1,
        convertable_units: dataValue.convertable_units,
    })
}

// Keyboard navigation support (enter)
const handleKeydown = (event, item) => {
    if (event.key === "Enter") {
        selectItem(item)
    }
}
</script>

<template>
    <div>
        <label
            v-if="selectType"
            class="text-lg font-bold text-center sticky top-0 bg-teal-200 z-10 p-2 block"
        >
            {{ selectType }} BOM List
        </label>
        <div class="z-10 bg-white/90 backdrop-blur-sm sticky top-[calc(2.5rem)]">
            <div class="px-2 py-2 border-b">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search Item..."
                    class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
            </div>
        </div>

        <div class="overflow-x-auto border rounded-lg shadow-sm">
            <table class="table-auto w-full border-collapse">
                <thead class="bg-gray-200">
                    <tr>
                        <th v-for="header in headerColumns" :key="header.id" class="p-2 border">
                            {{ header.name }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredData.length === 0">
                        <td :colspan="headerColumns.length" class="text-center p-4 text-gray-500">
                            Item does not exist
                        </td>
                    </tr>
                    <tr
                        v-for="(dataValue, i) in filteredData"
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
    </div>
</template>
