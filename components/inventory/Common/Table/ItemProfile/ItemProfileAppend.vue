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
const doSubItemChange = (index:number) => {
    emit("itemGroupItem", index)
}
const itemProfile = defineModel("itemProfile", { required: true, type: String, default: null })
let suggestItemCode:any = []

function shuffleString (str:String) {
    const chars = str.split("")
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        chars[i] = chars[j]
        chars[j] = chars[i]
    }
    return chars.join("")
}

const inputKey = (itemProfile:any) => {
    let code = ""
    suggestItemCode = []
    const mapVal = Object.values(itemProfile).map((value) => {
        if (value !== null && value !== "") {
            code += String(value).slice(0, 2)
            return code
        }
        return ""
    }).join("")
    code = mapVal.slice(0, 10)
    suggestItemCode.push(code.toUpperCase())
    let newCode = shuffleString(code)
    suggestItemCode.push(newCode.toUpperCase())
    newCode = shuffleString(code)
    suggestItemCode.push(newCode.toUpperCase())
}
const selectKey = (itemCode:any, itemProfile:any) => {
    itemProfile.sku = itemCode
    return itemCode
}
</script>
<template>
    <tr class="border-b-2 border-gray-300">
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsTextInputSelect
                v-model:item="itemProfile.sku"
                :item-suggest="suggestItemCode"
                :item-code="itemProfile"
                title="Item Code"
                @input-key="inputKey"
                @select-key="selectKey"
            />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <InventoryCommonFormPsTextArea v-model:item="itemProfile.item_description" title="Item Description" />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model:item="itemProfile.thickness_val" title="Thickness" />
                <InventoryCommonFormPsSelect v-model:item="itemProfile.thickness_uom" title="Type" :select-list="uomTypes.lengthType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model:item="itemProfile.length_val" title="Length" />
                <InventoryCommonFormPsSelect v-model:item="itemProfile.length_uom" title="Type" :select-list="uomTypes.lengthType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model:item="itemProfile.width_val" title="Width" />
                <InventoryCommonFormPsSelect v-model:item="itemProfile.width_uom" title="Type" :select-list="uomTypes.lengthType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model:item="itemProfile.height_val" title="Height" />
                <InventoryCommonFormPsSelect v-model:item="itemProfile.height_uom" title="Type" :select-list="uomTypes.lengthType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model:item="itemProfile.outside_diameter_val" title="Outside Diameter" />
                <InventoryCommonFormPsSelect v-model:item="itemProfile.outside_diameter_uom" title="Type" :select-list="uomTypes.dimensionType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model:item="itemProfile.inside_diameter_val" title="Inside Diameter" />
                <InventoryCommonFormPsSelect v-model:item="itemProfile.inside_diameter_uom" title="Type" :select-list="uomTypes.dimensionType" />
            </div>
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-row">
                <InventoryCommonFormPsNumberInput v-model:item="itemProfile.volume" title="Volume" />
                <InventoryCommonFormPsSelect v-model:item="itemProfile.volume_uom" title="Type" :select-list="uomTypes.volumeType" />
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
            <div class="save-control">
                <button class="text-emerald-700 font-medium text-lg hover:text-white hover:bg-emerald-700 px-2 py-2" @click="doAddItem(itemProfile, index)">
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
