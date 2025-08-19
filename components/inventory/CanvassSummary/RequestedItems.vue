<script setup>
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
    },
    readOnly: { type: Boolean, default: false }
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
        return null
    })
}

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

</script>

<template>
    <div class="w-full lg:w-1/2 border-r bg-white overflow-hidden">
        <div class="overflow-hidden max-h-96 lg:max-h-full">
            <table class="min-w-full table-auto text-xs sm:text-sm text-gray-800">
                <thead class="sticky top-0 z-10 bg-white">
                    <tr :class="allUniqueItems.length === 1 ? 'h-[6.75rem]' : 'h-20'">
                        <th colspan="5" class="text-center text-lg font-bold border border-gray-700 border-r uppercase">
                            <div class="flex items-center justify-center">
                                <div class="text-center leading-tight">
                                    requested items(s) / services
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr class="font-semibold uppercase border border-gray-700 bg-slate-200">
                        <th class="border-r border-gray-700 text-wrap w-12 text-xs">
                            item no.
                        </th>
                        <th class="border-r border-gray-700 text-xs">
                            item description
                        </th>
                        <th class="border-r border-gray-700 text-xs">
                            specification
                        </th>
                        <th class="border-r border-gray-700 w-10 text-xs">
                            qty
                        </th>
                        <th class="border-r border-gray-700 text-wrap w-12 p-1 text-xs">
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
                        @click="!readOnly && toggleItemSelection(index)"
                    >
                        <td class="border border-gray-700 p-1 text-center font-medium text-gray-600 transition-all duration-200">
                            {{ index + 1 }}
                        </td>
                        <td class="border border-gray-700 p-1 font-medium transition-all duration-200 text-center">
                            <div class="truncate" :title="item.item_profile?.item_description || item.itemDescription">
                                {{ item.item_profile?.item_description || item.itemDescription }}
                            </div>
                        </td>
                        <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600 hidden md:table-cell transition-all duration-200">
                            <div class="truncate" :title="item.specification">
                                {{ item.specification || '-' }}
                            </div>
                        </td>
                        <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center font-semibold text-gray-600 transition-all duration-200">
                            {{ item.quantity || '-' }}
                        </td>
                        <td class="border border-gray-700 px-1 sm:px-3 py-2 sm:py-3 text-center text-gray-600 transition-all duration-200">
                            <div class="truncate" :title="item.uom_name">
                                {{ item.uom_name || '-' }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="5" class="border border-gray-700 text-center text-lg font-bold uppercase p-2">
                            total amount
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
