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
const selectedItems = defineModel("selectedItems", { default: () => ({}) })
const activeSupplier = defineModel("activeSupplier", { default: null })

// Calculate total amount for the selected items from the active supplier
const supplierTotal = computed(() => {
    const supplierIndex = activeSupplier.value
    if (supplierIndex === null) { return 0 }

    const supplierItems = props.suppliers[supplierIndex]?.items || []
    let total = 0

    for (const [index, isSelected] of Object.entries(selectedItems.value)) {
        if (isSelected && supplierItems[index]) {
            const item = supplierItems[index]
            const qty = Number(item.qty) || 0
            const price = Number(item.unit_price || item.price) || 0
            total += qty * price
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
    <div class="flex overflow-hidden shadow-lg">
        <InventoryCanvassSummaryRequestedItems
            v-model:selected-items="selectedItems"
            v-model:active-supplier="activeSupplier"
            :items="items"
            :suppliers="suppliers"
        />
        <InventoryCanvassSummarySupplierQuotes
            v-model:selected-items="selectedItems"
            v-model:active-supplier="activeSupplier"
            :items="items"
            :suppliers="suppliers"
        />
    </div>
    <div class="flex overflow-hidden shadow-lg">
        <!-- Total Amount Section Slot -->
        <slot
            name="total-section"
            :active-supplier="activeSupplier"
            :suppliers="suppliers"
            :supplier-total="supplierTotal"
            :formatted-supplier-total="formattedSupplierTotal"
        >
            <!-- Default Total Amount Section -->
            <div class="border rounded-lg p-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm">
                <div v-if="activeSupplier !== null" class="flex flex-col">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <span class="text-lg font-semibold text-gray-700 uppercase">Total Amount</span>
                        </div>
                        <div class="text-right">
                            <span class="text-3xl font-bold text-green-700 bg-green-50 px-4 py-2 rounded-lg shadow-sm">
                                {{ formattedSupplierTotal }}
                            </span>
                        </div>
                    </div>
                </div>
                <!-- <div v-else class="text-center">
                    <div class="text-gray-500 text-lg">
                        <span class="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2" />
                        Click on a supplier header to view total amount for their items
                    </div>
                </div> -->
            </div>
        </slot>
    </div>
</template>
