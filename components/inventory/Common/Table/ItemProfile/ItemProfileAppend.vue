<script setup lang="ts">
const props = defineProps({
    appendItemProfile: {
        type: Array,
        required: true,
    },
    uomTypes: {
        type: Object,
        required: true,
    },
    inventoryTypes: {
        type: Array,
        required: true,
    },
})
const { uomTypes } = props
const emit = defineEmits(["addItem", "removeItem", "itemGroupItem"])
const doAddItem = (item:any, index:number) => {
    emit("addItem", item[index], index)
}
const doRemoveItem = (item:any) => {
    emit("removeItem", item)
}
const doSubItemChange = (index:number) => {
    emit("itemGroupItem", index)
}
</script>
<template>
    <template v-for="(itemProfile, index) in appendItemProfile" :key="index">
        <tr class="border-b-2 border-gray-300">
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsTextInput v-model="itemProfile.sku" add-class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" title="SKU" />
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsTextArea v-model="itemProfile.item_description" add-class="bg-gray-80 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" title="Item Description" />
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <div class="flex flex-row">
                    <InventoryCommonFormPsNumberInput v-model="itemProfile.thickness_val" add-class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" title="Thickness" />
                    <InventoryCommonFormPsSelect v-model="itemProfile.thickness_uom" title="Type" add-class="w-[80px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.lengthType" />
                </div>
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <div class="flex flex-row">
                    <InventoryCommonFormPsNumberInput v-model="itemProfile.length_val" title="Length" add-class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
                    <InventoryCommonFormPsSelect v-model="itemProfile.length_uom" title="Type" add-class="w-[80px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.lengthType" />
                </div>
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <div class="flex flex-row">
                    <InventoryCommonFormPsNumberInput v-model="itemProfile.width_val" title="Width" add-class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
                    <InventoryCommonFormPsSelect v-model="itemProfile.width_uom" title="Type" add-class="w-[80px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.lengthType" />
                </div>
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <div class="flex flex-row">
                    <InventoryCommonFormPsNumberInput v-model="itemProfile.height_val" title="Height" add-class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
                    <InventoryCommonFormPsSelect v-model="itemProfile.height_uom" title="Type" add-class="w-[80px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.lengthType" />
                </div>
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <div class="flex flex-row">
                    <InventoryCommonFormPsNumberInput v-model="itemProfile.outside_diameter_val" title="Outside Diameter" add-class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
                    <InventoryCommonFormPsSelect v-model="itemProfile.outside_diameter_uom" title="Type" add-class="w-[80px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.dimensionType" />
                </div>
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <div class="flex flex-row">
                    <InventoryCommonFormPsNumberInput v-model="itemProfile.inside_diameter_val" title="Inside Diameter" add-class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
                    <InventoryCommonFormPsSelect v-model="itemProfile.inside_diameter_uom" title="Type" add-class="w-[80px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.dimensionType" />
                </div>
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <div class="flex flex-row">
                    <InventoryCommonFormPsTextInput v-model="itemProfile.volume" title="Volume" add-class="w-[120px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
                    <InventoryCommonFormPsSelect v-model="itemProfile.volume_uom" title="Type" add-class="w-[80px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.volumeType" />
                </div>
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsTextInput v-model="itemProfile.specification" title="Specification" add-class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsTextInput v-model="itemProfile.grade" title="Grade" add-class="w-[100px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsTextInput v-model="itemProfile.color" title="Color" add-class="w-[100px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" />
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsSelect v-model="itemProfile.uom" title="UOM Type" add-class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.allType" />
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsSelect v-model="itemProfile.sub_item_group" title="Sub Item Group" add-class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.subItemGroup" />
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsSelectChange v-model="itemProfile.item_group" title="Item Group" add-class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" :select-list="uomTypes.itemGroup" @item-group-change="doSubItemChange" />
            </td>
            <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsSelect v-model="itemProfile.inventory_type" add-class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block" title="Inventory Type" :select-list="props.inventoryTypes" />
            </td>
            <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                <div class="save-control">
                    <button class="text-emerald-700 font-medium text-lg hover:text-white hover:bg-emerald-700 px-2 py-2" @click="doAddItem(appendItemProfile, index)">
                        <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" />
                    </button>
                </div>
                <div class="cancel-control">
                    <button
                        class="text-red-700 font-medium text-lg hover:text-white hover:bg-red-700 px-2 py-2"
                        @click="doRemoveItem(index)"
                    >
                        <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                    </button>
                </div>
            </td>
        </tr>
    </template>
</template>
