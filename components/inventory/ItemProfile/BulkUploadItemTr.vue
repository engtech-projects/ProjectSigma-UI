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
                    :item-profile="dataItem[index]"
                    title="Item Code"
                    :is-standard="false"
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
                <div v-if="data.thickness.value">
                    {{ data.thickness.value }}
                </div>
                <div v-if="data.thickness.error" class="text-xs font-bold text-red-700">
                    {{ data.thickness.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.length.value">
                    {{ data.length.value }}
                </div>
                <div v-if="data.length.error" class="text-xs font-bold text-red-700">
                    {{ data.length.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.width.value">
                    {{ data.width.value }}
                </div>
                <div v-if="data.width.error" class="text-xs font-bold text-red-700">
                    {{ data.width.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.height.value">
                    {{ data.height.value }}
                </div>
                <div v-if="data.height.error" class="text-xs font-bold text-red-700">
                    {{ data.height.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.outside_diameter.value">
                    {{ data.outside_diameter.value }}
                </div>
                <div v-if="data.outside_diameter.error" class="text-xs font-bold text-red-700">
                    {{ data.outside_diameter.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.inside_diameter.value">
                    {{ data.inside_diameter.value }}
                </div>
                <div v-if="data.inside_diameter.error" class="text-xs font-bold text-red-700">
                    {{ data.inside_diameter.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.angle.value">
                    {{ data.angle.value }}
                </div>
                <div v-if="data.angle.error" class="text-xs font-bold text-red-700">
                    {{ data.angle.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.size.value">
                    {{ data.size.value }}
                </div>
                <div v-if="data.size.error" class="text-xs font-bold text-red-700">
                    {{ data.size.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.volume.value">
                    {{ data.volume.value }}
                </div>
                <div v-if="data.volume.error" class="text-xs font-bold text-red-700">
                    {{ data.volume.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.weight.value">
                    {{ data.weight.value }}
                </div>
                <div v-if="data.weight.error" class="text-xs font-bold text-red-700">
                    {{ data.weight.error }}
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
                <div v-if="data.volts.value">
                    {{ data.volts.value }}
                </div>
                <div v-if="data.volts.error" class="text-xs font-bold text-red-700">
                    {{ data.volts.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.plates.value">
                    {{ data.plates.value }}
                </div>
                <div v-if="data.plates.error" class="text-xs font-bold text-red-700">
                    {{ data.plates.error }}
                </div>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div v-if="data.part_number.value">
                    {{ data.part_number.value }}
                </div>
                <div v-if="data.part_number.error" class="text-xs font-bold text-red-700">
                    {{ data.part_number.error }}
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
