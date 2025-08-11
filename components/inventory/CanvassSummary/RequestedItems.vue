<script setup>
import { computed } from "vue"
const props = defineProps({
    items: {
        type: Array,
        required: true,
        default: () => []
    },
    suppliers: {
        type: Array,
        required: true,
        default: () => []
    }
})

const selectedItems = defineModel("selectedItems", { default: () => ({}) })
const activeSupplier = defineModel("activeSupplier", { default: null })

const allUniqueItems = computed(() => {
    const itemsMap = new Map()

    props.suppliers.forEach((supplier) => {
        if (supplier.items && Array.isArray(supplier.items)) {
            supplier.items.forEach((item) => {
                if (item.item_id && item.item_description) {
                    itemsMap.set(item.item_id, {
                        item_id: item.item_id,
                        item_profile: {
                            item_description: item.item_description
                        },
                        itemDescription: item.item_description,
                        specification: item.specification,
                        quantity: item.qty,
                        uom_name: item.unit
                    })
                }
            })
        }
    })

    return Array.from(itemsMap.values())
})

const transformedSuppliers = computed(() => {
    return props.suppliers.map(supplier => ({
        supplier_name: supplier.supplier_name,
        supplier_address: supplier.supplier_address,
        supplier_contact_person: supplier.supplier_contact_person,
        supplier_contact_number: supplier.supplier_contact_person_number,
        quotation_no: supplier.quotation_no,
        quotation_date: supplier.quotation_date,
        reference_no: supplier.reference_no,
        items: createAlignedItemsArray(supplier.items || [], allUniqueItems.value)
    }))
})

function createAlignedItemsArray (supplierItems, allItems) {
    return allItems.map((requestedItem) => {
        const matchingItem = supplierItems.find(item =>
            item.item_id === requestedItem.item_id
        )

        if (matchingItem) {
            return {
                unit_price: parseFloat(matchingItem.price) || 0,
                qty: matchingItem.qty || 0,
                brand: matchingItem.brand,
                remarks: matchingItem.remarks
            }
        }

        // Return null if supplier doesn't have this item
        return null
    })
}

// function toggleItemSelection (index) {
//     selectedItems.value[index] = selectedItems.value[index] !== true
// }
function toggleItemSelection (index) {
    const itemId = allUniqueItems.value[index]?.item_id
    if (!itemId) { return }
    selectedItems.value[itemId] = !selectedItems.value[itemId]
    selectedItems.value[index] = selectedItems.value[itemId]
}

function itemBelongsToActiveSupplier (itemIndex) {
    if (activeSupplier.value === null) { return false }

    const supplier = transformedSuppliers.value[activeSupplier.value]
    return supplier?.items?.[itemIndex] !== null && supplier?.items?.[itemIndex] !== undefined
}

// function toggleSupplierHeader (supplierIndex) {
//     activeSupplier.value = activeSupplier.value === supplierIndex ? null : supplierIndex
// }

// function highlightCell (rowIndex, supplierIndex) {
//     return selectedItems.value[rowIndex] === true && activeSupplier.value === supplierIndex
// }

// function formatCurrency (value) {
//     if (!value || isNaN(value)) { return null }
//     return new Intl.NumberFormat("en-PH", {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//     }).format(value)
// }

// function getTotal (supplierIndex, itemIndex) {
//     const supplierItem = transformedSuppliers.value[supplierIndex]?.items?.[itemIndex]
//     if (supplierItem && supplierItem.qty && supplierItem.unit_price) {
//         return supplierItem.qty * supplierItem.unit_price
//     }
//     return 0
// }
</script>

<template>
    <div class="w-full lg:w-1/2 border-r bg-white overflow-hidden">
        <div class="overflow-hidden max-h-96 lg:max-h-full">
            <table class="min-w-full table-auto text-xs sm:text-sm text-gray-800">
                <thead class="sticky top-0 z-10 bg-white">
                    <tr>
                        <th colspan="5" class="text-center text-lg items-center font-bold border border-gray-700 uppercase py-12">
                            requested items(s) / services
                        </th>
                    </tr>
                    <tr class="font-semibold uppercase border border-gray-700 p-1">
                        <th class="border-r border-gray-700 text-wrap w-12">
                            item no.
                        </th>
                        <th class="border-r border-gray-700">
                            item description
                        </th>
                        <th class="border-r border-gray-700">
                            specification
                        </th>
                        <th class="border-r border-gray-700 w-10">
                            qty
                        </th>
                        <th class="border-r border-gray-700 text-wrap w-12 p-2">
                            unit of measurement
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in allUniqueItems"
                        :key="'item-' + index"
                        class="border border-gray-700 hover:bg-gray-25 cursor-pointer transition-all duration-200"
                        :class="[
                            selectedItems[index] === true ? 'bg-yellow-100 font-semibold shadow-sm' : '',
                            itemBelongsToActiveSupplier(index) ? 'bg-green-50 border-green-200' : '',
                            'bg-white'
                        ]"
                        @click="toggleItemSelection(index)"
                    >
                        <td class="border-r border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center font-medium text-gray-600 transition-all duration-200">
                            {{ index + 1 }}
                        </td>
                        <td class="border-r border-gray-700 px-1 sm:px-3 py-2 sm:py-3 font-medium transition-all duration-200 text-center">
                            <div class="truncate" :title="item.item_profile?.item_description || item.itemDescription">
                                {{ item.item_profile?.item_description || item.itemDescription }}
                            </div>
                        </td>
                        <td class="border-r border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600 hidden md:table-cell transition-all duration-200">
                            <div class="truncate" :title="item.specification">
                                {{ item.specification || '-' }}
                            </div>
                        </td>
                        <td class="border-r border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center font-semibold text-gray-600 transition-all duration-200">
                            {{ item.quantity || '-' }}
                        </td>
                        <td class="border-r border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600 transition-all duration-200">
                            <div class="truncate" :title="item.uom_name">
                                {{ item.uom_name || '-' }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="5" class="border border-gray-700 px-2 sm:px-4 py-2 sm:py-4 text-center text-lg  font-bold uppercase">
                            total amount
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<!-- <style scoped>
/* Custom scrollbar styling */
.overflow-auto::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 3px;
    transition: background 0.2s;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}

/* Firefox scrollbar */
.overflow-auto {
    scrollbar-width: thin;
    scrollbar-color: #94a3b8 #f1f5f9;
}

/* Smooth scrolling */
.overflow-auto {
    scroll-behavior: smooth;
}

/* Row height consistency */
tbody tr {
    height: 40px;
}

@media (min-width: 640px) {
    tbody tr {
        height: 48px;
    }
}

td, th {
    box-sizing: border-box;
}

.bg-yellow-100 {
    animation: highlight 0.3s ease-in-out;
}

@keyframes highlight {
    0% {
        background-color: #fef3c7;
    }
    100% {
        background-color: #fef9c3;
    }
}

.bg-green-200 {
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
}

.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (max-width: 640px) {
    .min-w-full {
        min-width: 100%;
    }
}
</style> -->
