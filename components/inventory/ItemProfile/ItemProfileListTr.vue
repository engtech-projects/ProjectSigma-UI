<script setup lang="ts">
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const main = useItemProfileStore()

const compId = useId()

defineProps({
    dataItem: {
        type: Array,
        required: true,
        default: null,
    }
})

const activate = (id:number) => {
    main.activeItemProfile(id)
}
const deactivate = (id:number) => {
    main.inActiveItemProfile(id)
}
</script>
<template>
    <tr v-for="data, index in dataItem" :id="compId" :key="index + '-item'" class="bg-white border-b">
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.item_description }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            <!-- {{ data.thickness.abbreviated }} -->
            {{ data.thickness.full }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            <!-- {{ data.length.abbreviated }} -->
            {{ data.length.full }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            <!-- {{ data.width.abbreviated }} -->
            {{ data.width.full }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            <!-- {{ data.height.abbreviated }} -->
            {{ data.height.full }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            <!-- {{ data.outside_diameter.abbreviated }} -->
            {{ data.outside_diameter.full }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            <!-- {{ data.inside_diameter.abbreviated }} -->
            {{ data.inside_diameter.full }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            <!-- {{ data.volume.abbreviated }} -->
            {{ data.volume.full }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.specification }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.grade }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.color }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.uom }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.item_group }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.sub_item_group }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.inventory_type }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            {{ data.active_status }}
        </td>
        <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
            <div class="flex flex-row gap-2">
                <button v-if="data.active_status == 'Inactive'" class="text-xs uppercase bg-emerald-700 font-semibold text-white text-gray p-2.5 rounded-sm" @click="activate(data.id)">
                    Active
                </button>
                <button v-if="data.active_status == 'Active'" class="text-xs uppercase bg-red-700 font-semibold text-white text-gray p-2.5 rounded-sm" @click="deactivate(data.id)">
                    Inactive
                </button>
            </div>
        </td>
    </tr>
</template>
