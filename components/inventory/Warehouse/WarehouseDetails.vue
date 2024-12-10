<script setup lang="ts">
import { useBOMStore } from "@/stores/inventory/bom"

interface HeaderColumn {
    name: string,
    id: string,
    style: string
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
    data: {
        type: Array<any>,
        required: true,
    },
})

const main = useBOMStore()
</script>
<template>
    <div
        class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
    >
        <div class="flex flex-col gap-2 w-full p-4">
            <LayoutPrint>
                <div id="itemDetails">
                    <div id="content" class="overflow-auto">
                        <table class="table-auto w-full border-collapse">
                            <thead>
                                <tr>
                                    <th v-for="(dataHeader, index) in headerColumns" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                                        {{ dataHeader.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="dataValue, index in data" :key="index" class="bg-white border-b">
                                    <td class="px-2 font-medium text-gray-900 whitespace-nowrap text-center">
                                        {{ dataValue.item_code }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </LayoutPrint>
        </div>
    </div>
</template>
