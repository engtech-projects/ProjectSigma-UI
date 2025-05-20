<script setup>
const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    suppliers: {
        type: Array,
        required: true
    },
})

const selectedItems = ref({})
const activeSupplier = ref(null)

function toggleItemSelection (index) {
    selectedItems.value[index] = selectedItems.value[index] !== true
}

function highlightItem (index) {
    return selectedItems.value[index] === true
}

function toggleSupplierHeader (supplierIndex) {
    activeSupplier.value = activeSupplier.value === supplierIndex ? null : supplierIndex
}

function highlightCell (rowIndex, supplierIndex) {
    return selectedItems.value[rowIndex] === true &&
        activeSupplier.value === supplierIndex
}

function itemBelongsToActiveSupplier (itemIndex) {
    if (activeSupplier.value === null) { return false }

    return props.suppliers[activeSupplier.value]?.items?.[itemIndex] !== undefined &&
        (props.suppliers[activeSupplier.value]?.items?.[itemIndex]?.unit_price !== undefined ||
            props.suppliers[activeSupplier.value]?.items?.[itemIndex]?.total !== undefined ||
            props.suppliers[activeSupplier.value]?.items?.[itemIndex]?.remarks !== undefined)
}

// Calculate total amount for the selected items from the active supplier
const supplierTotal = computed(() => {
    if (activeSupplier.value === null) { return 0 }

    let total = 0
    // Sum up only the selected items that belong to this supplier
    for (let i = 0; i < props.items.length; i++) {
        // Only include item if it's selected AND active supplier is selected
        if (selectedItems.value[i] && activeSupplier.value !== null) {
            const supplierItems = props.suppliers[activeSupplier.value]?.items
            if (supplierItems && supplierItems[i] && supplierItems[i].total) {
                total += supplierItems[i].total
            }
        }
    }

    return total
})

// Format the total amount as currency
const formattedSupplierTotal = computed(() => {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP"
    }).format(supplierTotal.value)
})

</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex border rounded overflow-hidden">
            <div class="w-2/5 border-r">
                <table class="w-full table-fixed text-sm text-gray-800">
                    <thead>
                        <tr>
                            <th colspan="5" class="border-b bg-gray-100 text-center text-md font-semibold p-8">
                                REQUESTED ITEM(S)
                            </th>
                        </tr>
                        <tr class="bg-gray-50 text-center text-xs font-medium">
                            <th class="border-b border-r w-16 px-2 py-1">
                                ITEM NO.
                            </th>
                            <th class="border-b border-r px-2 py-1">
                                ITEM DESCRIPTION
                            </th>
                            <th class="border-b border-r px-2 py-1">
                                SPECIFICATION
                            </th>
                            <th class="border-b border-r w-16 px-2 py-1">
                                QTY
                            </th>
                            <th class="border-b w-16 px-2 py-1">
                                UNIT
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in items"
                            :key="'item-' + index"
                            class="text-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            :class="[
                                highlightItem(index) ? 'bg-yellow-200 font-semibold' : '',
                                itemBelongsToActiveSupplier(index) ? 'bg-green-100' : ''
                            ]"
                            @click="toggleItemSelection(index)"
                        >
                            <td class="border-r px-2 py-2">
                                {{ index + 1 }}
                            </td>
                            <td class="border-r px-2 py-2 text-left truncate" :title="item.itemDescription">
                                {{ item.itemDescription }}
                            </td>
                            <td class="border-r px-2 py-2 text-left truncate" :title="item.specification">
                                {{ item.specification }}
                            </td>
                            <td class="border-r px-2 py-2">
                                {{ item.qty }}
                            </td>
                            <td class="px-2 py-2">
                                {{ item.unit }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Supplier Quotes Table -->
            <div class="w-3/5 overflow-x-auto">
                <table class="w-full table-auto text-sm text-gray-800" style="width: auto;">
                    <thead>
                        <tr class="bg-gray-100">
                            <th
                                v-for="(supplier, index) in suppliers"
                                :key="'supplier-header-' + index"
                                colspan="3"
                                class="border-b border-r px-4 py-2 text-center font-semibold cursor-pointer hover:bg-gray-200 transition-colors"
                                :class="activeSupplier === index ? 'bg-green-100' : ''"
                                @click="toggleSupplierHeader(index)"
                            >
                                <div class="flex flex-col items-center">
                                    <div class="text-md">
                                        {{ supplier.name }}
                                    </div>
                                    <div class="text-xs text-gray-600">
                                        {{ supplier.address }}
                                    </div>
                                    <div class="text-xs text-gray-600">
                                        {{ supplier.contactPerson }}
                                    </div>
                                    <div class="text-xs text-gray-600">
                                        {{ supplier.contactNumber }}
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr class="bg-gray-50 text-xs">
                            <template v-for="(supplier, index) in suppliers" :key="'price-header-' + index">
                                <th class="border-b border-r px-2 py-1 text-center w-24">
                                    UNIT PRICE
                                </th>
                                <th class="border-b border-r px-2 py-1 text-center w-24">
                                    TOTAL
                                </th>
                                <th class="border-b border-r px-2 py-1 text-center w-24">
                                    REMARKS
                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, rowIndex) in items" :key="'row-' + rowIndex">
                            <template v-for="(supplier, colIndex) in suppliers" :key="'cell-' + rowIndex + '-' + colIndex">
                                <td
                                    class="border-r px-2 py-2 text-center"
                                    :class="[
                                        highlightCell(rowIndex, colIndex) ? 'bg-yellow-200 font-semibold' : '',
                                        activeSupplier === colIndex && supplier.items?.[rowIndex] ? 'bg-green-100' : ''
                                    ]"
                                >
                                    {{ supplier.items?.[rowIndex]?.unit_price?.toLocaleString() || '-' }}
                                </td>
                                <td
                                    class="border-r px-2 py-2 text-center"
                                    :class="[
                                        highlightCell(rowIndex, colIndex) ? 'bg-yellow-200 font-semibold' : '',
                                        activeSupplier === colIndex && supplier.items?.[rowIndex] ? 'bg-green-100' : ''
                                    ]"
                                >
                                    {{ supplier.items?.[rowIndex]?.total?.toLocaleString() || '-' }}
                                </td>
                                <td
                                    class="border-r px-2 py-2 text-center truncate"
                                    :title="supplier.items?.[rowIndex]?.remarks || '-'"
                                    :class="[
                                        highlightCell(rowIndex, colIndex) ? 'bg-yellow-200 font-semibold' : '',
                                        activeSupplier === colIndex && supplier.items?.[rowIndex] ? 'bg-green-100' : ''
                                    ]"
                                >
                                    <div class="whitespace-nowrap truncate">
                                        {{ supplier.items?.[rowIndex]?.remarks || '-' }}
                                    </div>
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Total Amount Section -->
        <div class="border rounded p-4 bg-gray-50">
            <div v-if="activeSupplier !== null" class="flex flex-col">
                <div class="flex items-center justify-around">
                    <span class="font-medium">Total Amount:</span>
                    <span class="text-3xl font-bold text-green-700">{{ formattedSupplierTotal }}</span>
                </div>
            </div>
            <div v-else class="text-center text-gray-500">
                Click on a supplier to view total amount for their items
            </div>
        </div>
    </div>
</template>

<style scoped>
tbody tr {
    height: 40px;
}

.overflow-x-auto::-webkit-scrollbar {
    height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
