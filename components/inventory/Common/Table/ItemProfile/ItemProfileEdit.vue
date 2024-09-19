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
const emit = defineEmits(["doEditItem", "doHideEditItem", "itemGroupItem"])
const doHideItem = () => {
    emit("doHideEditItem")
}
const doSubItemChange = (index:number) => {
    emit("itemGroupItem", index)
}
const itemProfile = defineModel("itemProfile", { required: true, type: String, default: null })

</script>
<template>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model:item="itemProfile.sku" title="Item Code" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextArea v-model:item="itemProfile.item_description" title="Item Description" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsNumberInput v-model:item="itemProfile.thickness_val" title="Thickness" />
            <InventoryCommonFormPsSelect v-model:item="itemProfile.thickness_uom" title="Type" :select-list="uomTypes.allType" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsNumberInput v-model:item="itemProfile.length_val" title="Length" />
            <InventoryCommonFormPsSelect v-model:item="itemProfile.length_uom" title="Type" :select-list="uomTypes.allType" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsNumberInput v-model:item="itemProfile.width_val" title="Width" />
            <InventoryCommonFormPsSelect v-model:item="itemProfile.width_uom" title="Type" :select-list="uomTypes.allType" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsNumberInput v-model:item="itemProfile.height_val" title="Height" />
            <InventoryCommonFormPsSelect v-model:item="itemProfile.height_uom" title="Type" :select-list="uomTypes.allType" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsNumberInput v-model:item="itemProfile.outside_diameter_val" title="Outside Diameter" />
            <InventoryCommonFormPsSelect v-model:item="itemProfile.outside_diameter_uom" title="Type" :select-list="uomTypes.allType" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsNumberInput v-model:item="itemProfile.inside_diameter_val" title="Inside Diameter" />
            <InventoryCommonFormPsSelect v-model:item="itemProfile.inside_diameter_uom" title="Type" :select-list="uomTypes.allType" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model:item="itemProfile.volume" title="Volume" />
            <InventoryCommonFormPsSelect v-model:item="itemProfile.volume_uom" title="Type" :select-list="uomTypes.allType" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model:item="itemProfile.specification" title="Specification" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model:item="itemProfile.grade" title="Grade" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model:item="itemProfile.color" title="Color" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsSelect v-model:item="itemProfile.uom" title="UOM Type" :select-list="uomTypes.allType" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsSelect v-model:item="itemProfile.sub_item_group" title="Sub Item Group" :select-list="uomTypes.subItemGroup" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsSelectChange v-model:item="itemProfile.item_group" title="Item Group" :select-list="uomTypes.itemGroup" @item-group-change="doSubItemChange" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsSelect v-model:item="itemProfile.inventory_type" title="Inventory Type" :select-list="props.inventoryTypes" />
    </td>
    <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="cancel-control">
            <button
                class="text-red-700 font-medium rounded-lg text-lg hover:text-white hover:bg-red-700 px-2 py-2"
                @click="doHideItem()"
            >
                <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
            </button>
        </div>
    </td>
</template>
