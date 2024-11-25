<script setup lang="ts">
const emit = defineEmits(["doEditItem", "doHideEditItem", "itemGroupItem"])
const doHideItem = () => {
    emit("doHideEditItem")
}
const itemProfile = defineModel("itemProfile", { required: true, type: Object, default: null })

function shuffleString (str:String) {
    const chars = str.split("")
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        chars[i] = chars[j]
        chars[j] = chars[i]
    }
    return chars.join("")
}

const showSuggest = (itemProfile:any) => {
    let code = ""
    const suggestItemCode = []
    const listObj = {
        item_code: itemProfile.item_code,
        item_description: itemProfile.item_description,
        thickness_val: itemProfile.thickness_val,
        length_val: itemProfile.length_val,
        width_val: itemProfile.width_val,
        height_val: itemProfile.height_val,
        outside_diameter_val: itemProfile.outside_diameter_val,
        inside_diameter_val: itemProfile.inside_diameter_val,
        specification: itemProfile.specification,
        volume_val: itemProfile.volume_val,
        grade: itemProfile.grade,
        color: itemProfile.color,
    }
    const mapVal = Object.values(listObj).map((val:any) => {
        if (val !== null && val !== "") {
            return val
        }
        return ""
    }).join("")
    code = mapVal.slice(0, 10)
    if (code !== "") {
        suggestItemCode.push(code.toUpperCase().replace(/\s+/g, ""))
        let newCode = shuffleString(code)
        suggestItemCode.push(newCode.toUpperCase().replace(/\s+/g, ""))
        newCode = shuffleString(code)
        suggestItemCode.push(newCode.toUpperCase().replace(/\s+/g, ""))
        return suggestItemCode
    }
}
const selectSuggest = (item:any, itemProfile:any) => {
    itemProfile.item_code = item
}
</script>
<template>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInputSelect
            v-model="itemProfile.item_code"
            :item-suggest="showSuggest(itemProfile)"
            :item-profile="itemProfile"
            title="Item Code"
            @show-suggest="showSuggest"
            @select-suggest="selectSuggest"
        />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextArea v-model="itemProfile.item_description" title="Item Description" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.thickness_val" title="Thickness" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.length_val" title="Length" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.width_val" title="Width" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.height_val" title="Height" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.outside_diameter_val" title="Outside Diameter" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.inside_diameter_val" title="Inside Diameter" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.angle" title="Angle" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.size" title="Size" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.volume" title="Volume" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <div class="flex flex-row">
            <InventoryCommonFormPsTextInput v-model="itemProfile.weight" title="Weight" />
        </div>
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model="itemProfile.grade" title="Grade" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model="itemProfile.volts" title="Volts" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model="itemProfile.plates" title="Plates" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model="itemProfile.part_number" title="Part Number" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model="itemProfile.color" title="Color" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsTextInput v-model="itemProfile.specification" title="Specification" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryItemProfileUOMSelect v-model="itemProfile.uom" title="UOM Type" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsSelectItemGroup v-model="itemProfile.item_group" title="Item Group" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <InventoryCommonFormPsSelectSubItemGroup v-model="itemProfile.sub_item_group" :item-group="itemProfile.item_group" title="Sub Item Group" />
    </td>
    <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
        <LayoutFormPsSelect
            v-model="itemProfile.inventory_type"
            :options-list="['Inventoriable', 'Non-Inventoriable']"
            class="bg-gray-80 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block"
            title="Inventory Type"
        />
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
