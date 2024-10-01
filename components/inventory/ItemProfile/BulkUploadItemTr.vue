<script setup lang="ts">
const compId = useId()

defineProps({
    isCheckbox: {
        type: Boolean,
        required: true,
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
                <input id="checkItem" type="checkbox" name="checkItem" :checked="data.isCheck">
            </td>
        </template>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.item_description.value }}
                </div>
                <template v-if="data.item_description.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.item_description.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.thickness_val.value }}
                </div>
                <template v-if="data.thickness_val.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.thickness_val.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.thickness_uom.value }}
                </div>
                <template v-if="data.thickness_uom.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.thickness_uom.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.length_val.value }}
                </div>
                <template v-if="data.length_val.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.length_val.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.length_uom.value }}
                </div>
                <template v-if="data.length_uom.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.length_uom.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.width_val.value }}
                </div>
                <template v-if="data.width_val.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.width_val.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.width_uom.value }}
                </div>
                <template v-if="data.width_uom.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.width_uom.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.height_val.value }}
                </div>
                <template v-if="data.height_val.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.height_val.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.height_uom.value }}
                </div>
                <template v-if="data.height_uom.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.height_uom.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.outside_diameter_val.value }}
                </div>
                <template v-if="data.outside_diameter_val.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.outside_diameter_val.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.outside_diameter_uom.value }}
                </div>
                <template v-if="data.outside_diameter_uom.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.outside_diameter_uom.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.inside_diameter_val.value }}
                </div>
                <template v-if="data.inside_diameter_val.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.inside_diameter_val.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.inside_diameter_uom.value }}
                </div>
                <template v-if="data.inside_diameter_uom.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.inside_diameter_uom.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.volume_val.value }}
                </div>
                <template v-if="data.volume_val.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.volume_val.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.volume_uom.value }}
                </div>
                <template v-if="data.volume_uom.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.volume_uom.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.specification.value }}
                </div>
                <template v-if="data.specification.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.specification.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.grade.value }}
                </div>
                <template v-if="data.grade.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.grade.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.color.value }}
                </div>
                <template v-if="data.color.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.color.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.uom.value }}
                </div>
                <template v-if="data.uom.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.uom.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.item_group.value }}
                </div>
                <template v-if="data.item_group.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.item_group.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.sub_item_group.value }}
                </div>
                <template v-if="data.sub_item_group.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.sub_item_group.error }}
                    </div>
                </template>
            </div>
        </td>
        <td class="px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="flex flex-col gap-2">
                <div>
                    {{ data.inventory_type.value }}
                </div>
                <template v-if="data.inventory_type.error">
                    <div class="text-xs font-bold text-red-700">
                        {{ data.inventory_type.error }}
                    </div>
                </template>
            </div>
        </td>
    </tr>
</template>
