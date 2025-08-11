<script setup>

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    suppliers: {
        type: Array,
        required: true
    }
})

const selectedItems = defineModel("selectedItems", { default: () => ({}) })
const activeSupplier = defineModel("activeSupplier", { default: null })

function toggleSupplierHeader (supplierIndex) {
    activeSupplier.value = activeSupplier.value === supplierIndex ? null : supplierIndex
}

function highlightCell (rowIndex, supplierIndex) {
    return selectedItems.value[rowIndex] === true &&
        activeSupplier.value === supplierIndex
}

function formatCurrency (value) {
    if (!value || isNaN(value)) { return null }
    return new Intl.NumberFormat("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value)
}

function getTotal (supplierIndex, itemIndex) {
    const supplierItem = props.suppliers[supplierIndex]?.items?.[itemIndex]
    if (supplierItem && supplierItem.qty && supplierItem.unit_price) {
        return supplierItem.qty * supplierItem.unit_price
    }
    return 0
}

// New function to calculate supplier total
function getSupplierTotal (supplierIndex) {
    const supplier = props.suppliers[supplierIndex]
    if (!supplier?.items) { return 0 }

    return supplier.items.reduce((total, _item, itemIndex) => {
        return total + getTotal(supplierIndex, itemIndex)
    }, 0)
}

</script>
<template>
    <div class="w-full lg:w-1/2 border-r bg-white overflow-hidden">
        <div class="overflow-auto max-h-96 lg:max-h-full" style="scrollbar-width: thin;">
            <table class="min-w-full table-auto text-xs sm:text-sm text-gray-800">
                <thead class="sticky top-0 z-10 bg-white">
                    <tr class="bg-gradient-to-r from-green-50 to-green-100">
                        <th
                            v-for="(supplier, index) in suppliers"
                            :key="'supplier-header-' + index"
                            class="border-b border-r px-2 sm:px-4 py-2 sm:py-4 text-center font-bold cursor-pointer hover:bg-green-200 transition-all duration-200"
                            :class="activeSupplier === index ? 'bg-green-200 shadow-inner' : ''"
                            colspan="3"
                            @click="toggleSupplierHeader(index)"
                        >
                            <div class="flex flex-col items-center truncate uppercase">
                                <div class="text-lg font-bold text-green-800" :title="supplier.supplier_name">
                                    {{ supplier.supplier_name }}
                                </div>
                                <div class="text-md text-gray-600" :title="supplier.supplier_address">
                                    {{ supplier.supplier_address }}
                                </div>
                                <div class="text-md text-gray-600" :title="supplier.supplier_contact_person">
                                    {{ supplier.supplier_contact_person }}
                                </div>
                                <div class="text-md text-gray-600" :title="supplier.supplier_contact_person_number">
                                    {{ supplier.supplier_contact_person_number }}
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr class="bg-gray-50 text-xs font-semibold uppercase tracking-wide">
                        <template v-for="(supplier, index) in suppliers" :key="'price-header-' + index">
                            <th class="border-b border-r px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-700" :style="{ minWidth: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }">
                                <span class="hidden sm:inline">UNIT PRICE</span>
                                <span class="sm:hidden">PRICE</span>
                            </th>
                            <th class="border-b border-r px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-700" :style="{ minWidth: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }">
                                TOTAL
                            </th>
                            <th class="border-b border-r px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-700" style="min-width: 80px;">
                                REMARKS
                            </th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, rowIndex) in items" :key="'row-' + rowIndex" class="border-b border-gray-100 hover:bg-gray-25 transition-colors duration-150">
                        <template v-for="(supplier, colIndex) in suppliers" :key="'cell-' + rowIndex + '-' + colIndex">
                            <td
                                class="border-r px-1 sm:px-3 py-2 sm:py-3 text-center font-medium transition-all duration-200"
                                :class="[
                                    highlightCell(rowIndex, colIndex) ? 'bg-yellow-100 font-bold shadow-sm' : '',
                                    activeSupplier === colIndex && supplier.items?.[rowIndex] ? 'bg-green-50' : '',
                                    'bg-white'
                                ]"
                                :style="{ minWidth: '80px' }"
                            >
                                <div class="truncate" :title="formatCurrency(supplier.items?.[rowIndex]?.price) || '-'">
                                    {{ formatCurrency(supplier.items?.[rowIndex]?.price) || '-' }}
                                </div>
                            </td>
                            <td
                                class="border-r px-1 sm:px-3 py-2 sm:py-3 text-center font-semibold transition-all duration-200"
                                :class="[
                                    highlightCell(rowIndex, colIndex) ? 'bg-yellow-100 font-bold shadow-sm' : '',
                                    activeSupplier === colIndex && supplier.items?.[rowIndex] ? 'bg-green-50' : '',
                                    'bg-white'
                                ]"
                                :style="{ minWidth: '80px' }"
                            >
                                <div class="truncate text-gray-600" :title="formatCurrency(getTotal(colIndex, rowIndex)) || '-'">
                                    {{ formatCurrency(getTotal(colIndex, rowIndex)) || '-' }}
                                </div>
                            </td>
                            <td
                                class="border-r px-1 sm:px-3 py-2 sm:py-3 text-center transition-all duration-200"
                                :class="[
                                    highlightCell(rowIndex, colIndex) ? 'bg-yellow-100 font-bold shadow-sm' : '',
                                    activeSupplier === colIndex && supplier.items?.[rowIndex] ? 'bg-green-50' : '',
                                    'bg-white'
                                ]"
                                style="min-width: 80px;"
                            >
                                <div class="truncate text-gray-600" :title="supplier.items?.[rowIndex]?.remarks || '-'">
                                    {{ supplier.items?.[rowIndex]?.remarks || '-' }}
                                </div>
                            </td>
                        </template>
                    </tr>
                    <!-- Supplier Totals Row -->
                    <tr class="border-t-2 text-center items-center">
                        <template v-for="(supplier, colIndex) in suppliers" :key="'total-' + colIndex">
                            <td colspan="3" class="border-r px-1 sm:px-3 py-2 sm:py-3 text-center font-bold" :style="{ minWidth: '80px' }">
                                <div class="truncate text-lg" :title="formatCurrency(getSupplierTotal(colIndex))">
                                    {{ formatCurrency(getSupplierTotal(colIndex)) }}
                                </div>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
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
</style>
