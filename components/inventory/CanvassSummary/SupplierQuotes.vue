<script setup>
defineProps({
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

const tableContainer = ref(null)
const isDown = ref(false)
let startX = 0
let scrollLeft = 0

function startDrag (e) {
    isDown.value = true
    tableContainer.value.classList.add("cursor-grabbing")
    startX = e.pageX - tableContainer.value.offsetLeft
    scrollLeft = tableContainer.value.scrollLeft
}

function stopDrag () {
    isDown.value = false
    tableContainer.value.classList.remove("cursor-grabbing")
}

function onDrag (e) {
    if (!isDown.value) { return }
    e.preventDefault()
    const x = e.pageX - tableContainer.value.offsetLeft
    tableContainer.value.scrollLeft = scrollLeft - (x - startX)
}
</script>

<template>
    <div class="w-full lg:w-1/2 bg-white overflow-hidden">
        <div
            ref="tableContainer"
            class="overflow-auto max-h-96 lg:max-h-full scrollbar-thin cursor-grab select-none scroll-smooth"
            @mousedown="startDrag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
            @mousemove="onDrag"
        >
            <table class="min-w-full table-fixed text-xs sm:text-sm text-gray-800">
                <thead class="sticky top-0 bg-white">
                    <tr class="h-20">
                        <th
                            v-for="(supplier, index) in suppliers"
                            :key="'supplier-header-' + index"
                            colspan="3"
                            class="text-center font-bold border border-gray-700 border-r uppercase cursor-pointer hover:bg-green-200 transition-all duration-200 text-ellipsis w-1/2"
                            :class="activeSupplier === index ? 'bg-green-200 shadow-inner' : ''"
                            @click="toggleSupplierHeader(index)"
                        >
                            <div class="flex items-center justify-center">
                                <div class="text-center leading-tight">
                                    <div>{{ supplier.supplier_name }}</div>
                                    <div>{{ supplier.supplier_address }}</div>
                                    <div>{{ supplier.supplier_contact_person }}</div>
                                    <div>{{ supplier.supplier_contact_person_number }}</div>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr class="font-semibold uppercase border border-gray-700 h-10">
                        <template v-for="(supplier, index) in suppliers" :key="'price-header-' + index">
                            <th class="border-r border-gray-700 text-xs py-1">
                                unit price
                            </th>
                            <th class="border-r border-gray-700 text-xs">
                                total
                            </th>
                            <th class="border-r border-gray-700 text-xs">
                                remarks
                            </th>
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, rowIndex) in items"
                        :key="'row-' + rowIndex"
                        class="border-b border-gray-700 hover:bg-gray-25 transition-colors duration-150"
                    >
                        <template v-for="(supplier, colIndex) in suppliers" :key="'cell-' + rowIndex + '-' + colIndex">
                            <!-- unit price -->
                            <td
                                class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center font-medium transition-all duration-200"
                                :class="[
                                    highlightCell(rowIndex, colIndex) ? 'bg-yellow-100 font-bold shadow-sm' : '',
                                    activeSupplier === colIndex && supplier.items?.[rowIndex] ? 'bg-green-50' : '',
                                    'bg-white'
                                ]"
                            >
                                <div class="truncate" :title="formatToCurrency(supplier.items?.[rowIndex]?.price) || '-'">
                                    {{ formatToCurrency(supplier.items?.[rowIndex]?.price) || '-' }}
                                </div>
                            </td>
                            <!-- total -->
                            <td
                                class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center font-semibold transition-all duration-200"
                                :class="[
                                    highlightCell(rowIndex, colIndex) ? 'bg-yellow-100 font-bold shadow-sm' : '',
                                    activeSupplier === colIndex && supplier.items?.[rowIndex] ? 'bg-green-50' : '',
                                    'bg-white'
                                ]"
                            >
                                <div class="truncate text-gray-600" :title="formatToCurrency(supplier.items?.[rowIndex]?.total_amount) || '-'">
                                    {{ formatToCurrency(supplier.items?.[rowIndex]?.total_amount) || '0.00' }}
                                </div>
                            </td>
                            <!-- remarks -->
                            <td
                                class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center transition-all duration-200"
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
                    <tr class="text-center items-center">
                        <template v-for="(item, index) in suppliers" :key="'total-' + index">
                            <td colspan="3" class="border border-t border-gray-700 p-2 text-center font-bold">
                                <div class="truncate text-lg">
                                    ₱{{ formatToCurrency(item.grand_total) ?? '0.00' }}
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
.scrollbar-thin::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
}

.cursor-grabbing {
  cursor: grabbing !important;
}
</style>
