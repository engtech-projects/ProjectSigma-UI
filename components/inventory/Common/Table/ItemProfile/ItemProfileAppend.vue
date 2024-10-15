<script setup lang="ts">
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const profileStore = useItemProfileStore()
const { uom } = storeToRefs(profileStore)

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

const getTypeUOM = (id:number) => {
    if (uom.value.length >= 1) {
        const symbol = uom.value.map((data: any) => {
            return data.id === id ? data.symbol : null
        }).filter((num:any): num is number => num !== null)

        return symbol ? symbol[0] : null
    }
    return null
}
const showSuggest = (itemProfile:any) => {
    const suggestItemCode:any = []
    const itemDescription = String(itemProfile.item_description).slice(0, 3)
    const listObj = {
        thickness: {
            uom: getTypeUOM(itemProfile.thickness_uom),
            value: itemProfile.thickness_val,
        },
        length: {
            uom: getTypeUOM(itemProfile.length_uom),
            value: itemProfile.length_val,
        },
        width: {
            uom: getTypeUOM(itemProfile.width_uom),
            value: itemProfile.width_val,
        },
        height: {
            uom: getTypeUOM(itemProfile.height_uom),
            value: itemProfile.height_val,
        },
        outside: {
            uom: getTypeUOM(itemProfile.outside_diameter_uom),
            value: itemProfile.outside_diameter_val,
        },
        inside: {
            uom: getTypeUOM(itemProfile.inside_diameter_uom),
            value: itemProfile.inside_diameter_val,
        },
        volume: {
            uom: getTypeUOM(itemProfile.volume_uom),
            value: itemProfile.volume_val,
        },
    }
    if (itemDescription.length >= 3) {
        Object.values(listObj).map((val:any) => {
            if (suggestItemCode.length < 3) {
                if (val.uom !== "" && val.uom !== null && val.uom !== undefined) {
                    if (val.value === "" || val.value === null || val.value === undefined) {
                        val.value = 0
                    }
                    const code = `${itemDescription}${val.value}${val.uom}`
                    suggestItemCode.push(code.toUpperCase().replace(/\s+/g, ""))
                }
            }
            return val
        })
        if (suggestItemCode.length >= 1) {
            return suggestItemCode
        }
    }
}
const selectSuggest = (item:any, itemProfile:any) => {
    itemProfile.item_code = item
}
</script>
<template>
    <tr class="border-b-2 border-gray-300">
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
