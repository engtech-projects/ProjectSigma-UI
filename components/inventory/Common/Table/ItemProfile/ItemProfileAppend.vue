<script setup lang="ts">
const props = defineProps({
    index: {
        type: Number,
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
    emit("addItem", item, index)
}
const doRemoveItem = (item:any) => {
    emit("removeItem", item)
}
const itemProfile = defineModel("itemProfile", { required: true, type: Object, default: null })

</script>
<template>
    <tr class="border-b-2 border-gray-300">
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsTextInputSelect
                v-model="itemProfile.item_code"
                :item-profile="itemProfile"
                title="Item Code"
            />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsTextArea v-model="itemProfile.item_description" title="Item Description" />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model="itemProfile.thickness_val" title="Thickness" />
                <InventoryCommonFormPsSelect v-model="itemProfile.thickness_uom" title="Type" :select-list="uomTypes.lengthType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model="itemProfile.length_val" title="Length" />
                <InventoryCommonFormPsSelect v-model="itemProfile.length_uom" title="Type" :select-list="uomTypes.lengthType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model="itemProfile.width_val" title="Width" />
                <InventoryCommonFormPsSelect v-model="itemProfile.width_uom" title="Type" :select-list="uomTypes.lengthType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model="itemProfile.height_val" title="Height" />
                <InventoryCommonFormPsSelect v-model="itemProfile.height_uom" title="Type" :select-list="uomTypes.lengthType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model="itemProfile.outside_diameter_val" title="Outside Diameter" />
                <InventoryCommonFormPsSelect v-model="itemProfile.outside_diameter_uom" title="Type" :select-list="uomTypes.dimensionType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model="itemProfile.inside_diameter_val" title="Inside Diameter" />
                <InventoryCommonFormPsSelect v-model="itemProfile.inside_diameter_uom" title="Type" :select-list="uomTypes.dimensionType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model="itemProfile.volume" title="Volume" />
                <InventoryCommonFormPsSelect v-model="itemProfile.volume_uom" title="Type" :select-list="uomTypes.volumeType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsTextInput v-model="itemProfile.specification" title="Specification" />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsTextInput v-model="itemProfile.grade" title="Grade" />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsTextInput v-model="itemProfile.color" title="Color" />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsSelect v-model="itemProfile.uom" title="UOM Type" :select-list="uomTypes.allType" />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsSelectItemGroup v-model="itemProfile.item_group" title="Item Group" />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsSelectSubItemGroup v-model="itemProfile.sub_item_group" :item-group="itemProfile.item_group" title="Item Group" />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsSelect v-model="itemProfile.inventory_type" title="Inventory Type" :select-list="props.inventoryTypes" />
        </td>
        <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="save-control">
                <button type="button" class="text-emerald-700 font-medium text-lg hover:text-white hover:bg-emerald-700 px-2 py-2" @click="doAddItem(itemProfile, index)">
                    <Icon name="mdi:plus" class="h-5 w-5 lg:h-5 lg:w-5" />
                </button>
            </div>
            <div class="cancel-control">
                <button
                    type="button"
                    class="text-red-700 font-medium text-lg hover:text-white hover:bg-red-700 px-2 py-2"
                    @click="doRemoveItem(index)"
                >
                    <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                </button>
            </div>
        </td>
    </tr>
</template>
