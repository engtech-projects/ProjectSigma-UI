<script setup lang="ts">
defineProps({
    isCheckbox: {
        type: Boolean,
        required: true,
        default: false,
    },
    isItemCode: {
        type: Boolean,
        required: false,
        default: false,
    },
    dataItem: {
        type: Array,
        required: true,
        default: null,
    }
})
const showSuggest = (itemProfile:any) => {
    const suggestItemCode:any = []
    const itemDescription = String(itemProfile.item_description.value).slice(0, 3)
    const listObj = {
        thickness: {
            uom: itemProfile.thickness_uom.value,
            value: itemProfile.thickness_val.value,
        },
        length: {
            uom: itemProfile.length_uom.value,
            value: itemProfile.length_val.value,
        },
        width: {
            uom: itemProfile.width_uom.value,
            value: itemProfile.width_val.value,
        },
        height: {
            uom: itemProfile.height_uom.value,
            value: itemProfile.height_val.value,
        },
        outside: {
            uom: itemProfile.outside_diameter_uom.value,
            value: itemProfile.outside_diameter_val.value,
        },
        inside: {
            uom: itemProfile.inside_diameter_uom.value,
            value: itemProfile.inside_diameter_val.value,
        },
        volume: {
            uom: itemProfile.volume_uom.value,
            value: itemProfile.volume_val.value,
        },
    }
    console.log(listObj)
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
    <tr v-for="data, index in dataItem" :id="compId" :key="index + '-item'" class="bg-white border-b">
        <template v-if="isCheckbox">
            <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
                <input id="checkItem" v-model="data.isCheck" type="checkbox" name="checkItem" :checked="data.isCheck">
            </td>
        </template>
        <template v-if="isItemCode">
            <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
                <InventoryCommonFormPsTextInputSelect
                    v-model="data.item_code"
                    :item-suggest="showSuggest(data)"
                    :item-profile="data"
                    title="Item Code"
                    @show-suggest="showSuggest(data)"
                    @select-suggest="selectSuggest"
                />
            </td>
        </template>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.item_description.value">
                    {{ data.item_description.value }}
                </div>
                <div v-if="data.item_description.error" class="text-xs font-bold text-red-700">
                    {{ data.item_description.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.thickness_val.value">
                    {{ data.thickness_val.value }}
                </div>
                <div v-if="data.thickness_val.error" class="text-xs font-bold text-red-700">
                    {{ data.thickness_val.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.thickness_uom.value">
                    {{ data.thickness_uom.value }}
                </div>
                <div v-if="data.thickness_uom.error" class="text-xs font-bold text-red-700">
                    {{ data.thickness_uom.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.length_val.value">
                    {{ data.length_val.value }}
                </div>
                <div v-if="data.length_val.error" class="text-xs font-bold text-red-700">
                    {{ data.length_val.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.length_uom.value">
                    {{ data.length_uom.value }}
                </div>
                <div v-if="data.length_uom.error" class="text-xs font-bold text-red-700">
                    {{ data.length_uom.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.width_val.value">
                    {{ data.width_val.value }}
                </div>
                <div v-if="data.width_val.error" class="text-xs font-bold text-red-700">
                    {{ data.width_val.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.width_uom.value">
                    {{ data.width_uom.value }}
                </div>
                <div v-if="data.width_uom.error" class="text-xs font-bold text-red-700">
                    {{ data.width_uom.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.height_val.value">
                    {{ data.height_val.value }}
                </div>
                <div v-if="data.height_val.error" class="text-xs font-bold text-red-700">
                    {{ data.height_val.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.height_uom.value">
                    {{ data.height_uom.value }}
                </div>
                <div v-if="data.height_uom.error" class="text-xs font-bold text-red-700">
                    {{ data.height_uom.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.outside_diameter_val.value">
                    {{ data.outside_diameter_val.value }}
                </div>
                <div v-if="data.outside_diameter_val.error" class="text-xs font-bold text-red-700">
                    {{ data.outside_diameter_val.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.outside_diameter_uom.value">
                    {{ data.outside_diameter_uom.value }}
                </div>
                <div v-if="data.outside_diameter_uom.error" class="text-xs font-bold text-red-700">
                    {{ data.outside_diameter_uom.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.inside_diameter_val.value">
                    {{ data.inside_diameter_val.value }}
                </div>
                <div v-if="data.inside_diameter_val.error" class="text-xs font-bold text-red-700">
                    {{ data.inside_diameter_val.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.inside_diameter_uom.value">
                    {{ data.inside_diameter_uom.value }}
                </div>
                <div v-if="data.inside_diameter_uom.error" class="text-xs font-bold text-red-700">
                    {{ data.inside_diameter_uom.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.volume_val.value">
                    {{ data.volume_val.value }}
                </div>
                <div v-if="data.volume_val.error" class="text-xs font-bold text-red-700">
                    {{ data.volume_val.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.volume_uom.value">
                    {{ data.volume_uom.value }}
                </div>
                <div v-if="data.volume_uom.error" class="text-xs font-bold text-red-700">
                    {{ data.volume_uom.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.specification.value">
                    {{ data.specification.value }}
                </div>
                <div v-if="data.specification.error" class="text-xs font-bold text-red-700">
                    {{ data.specification.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.grade.value">
                    {{ data.grade.value }}
                </div>
                <div v-if="data.grade.error" class="text-xs font-bold text-red-700">
                    {{ data.grade.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.color.value">
                    {{ data.color.value }}
                </div>
                <div v-if="data.color.error" class="text-xs font-bold text-red-700">
                    {{ data.color.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.uom.value">
                    {{ data.uom.value }}
                </div>
                <div v-if="data.uom.error" class="text-xs font-bold text-red-700">
                    {{ data.uom.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.item_group.value">
                    {{ data.item_group.value }}
                </div>
                <div v-if="data.item_group.error" class="text-xs font-bold text-red-700">
                    {{ data.item_group.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.sub_item_group.value">
                    {{ data.sub_item_group.value }}
                </div>
                <div v-if="data.sub_item_group.error" class="text-xs font-bold text-red-700">
                    {{ data.sub_item_group.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.inventory_type.value">
                    {{ data.inventory_type.value }}
                </div>
                <div v-if="data.inventory_type.error" class="text-xs font-bold text-red-700">
                    {{ data.inventory_type.error }}
                </div>
            </div>
        </td>
    </tr>
</template>
