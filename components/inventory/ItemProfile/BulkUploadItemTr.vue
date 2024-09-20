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
            <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
                <input id="checkItem" type="checkbox" name="checkItem" :checked="data.isCheck">
            </td>
        </template>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.item_description }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.thickness_val }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.length_val }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.width_val }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.height_val }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.outside_diameter_val }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.inside_diameter_val }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.volume_val }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.grade }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.color }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.uom }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.sub_item_group }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.item_group }}
        </td>
        <td class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.inventory_type }}
        </td>
    </tr>
</template>
