<script setup lang="ts">
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const main = useItemProfileStore()
interface HeaderColumn {
    name: string,
    id: string,
}
defineProps({
    title: {
        type: String,
        required: true,
    },
    headerColumns: {
        type: Array<HeaderColumn>,
        required: true,
    },
    datas: {
        type: Array<any>,
        required: true,
    },
})
const activate = (id:number) => {
    main.activeItemProfile(id)
}
const deactivate = (id:number) => {
    main.inActiveItemProfile(id)
}
</script>
<template>
    <div class="h-full w-full">
        <div class="flex flex-col gap-2 w-full rounded-t">
            <div id="headline mb-4">
                <div class="w-full basis-[10%] grow-1 shrink-0 flex flex-row justify-between items-center border-b py-2 px-4">
                    <div class="flex flex-row gap-2 items-center justify-center">
                        <h3 class="text-lg font-bold">
                            {{ title }}
                        </h3>
                    </div>
                </div>
            </div>
            <div id="itemDetails">
                <div id="content" class="overflow-x-auto p-2">
                    <table class="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <template v-for="dataHeader, index in headerColumns" :key="index+'-header'">
                                    <InventoryItemProfileBulkUploadItemTh :title="dataHeader" />
                                </template>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data, index in datas" :key="index + '-item'" class="bg-white border-b">
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.item_description }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.thickness }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.length }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.width }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.height }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.outside_diameter }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.inside_diameter }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.angle }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.size }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.volume }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.weight }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.grade }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.volts }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.plates }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.part_number }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.color }}
                                </td>
                                <td class="text-sm px-2 py-3 font-medium text-gray-900 whitespace-nowrap text-start">
                                    {{ data.specification }}
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
