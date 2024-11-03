<script setup lang="ts">
import { useBOMStore } from "@/stores/inventory/bom"
const BOMStore = useBOMStore()
const { bomRequest } = storeToRefs(BOMStore)
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
})
</script>
<template>
    <div class="h-full w-full">
        <div id="itemDetails">
            <h5 v-if="title" class="text-xl font-medium text-gray-900 dark:text-white border-b p-2">
                {{ title }}
            </h5>
            <div id="content" class="overflow-auto max-h-96">
                <table class="table-auto w-full border-collapse">
                    <thead class="sticky top-0 bg-white">
                        <tr>
                            <th v-for="(dataHeader, index) in headerColumns" :key="index" scope="col" class="p-2 border-0 border-b text-sm">
                                {{ dataHeader.name }}
                            </th>
                            <th scope="col" class="p-2 border-0 border-b text-sm">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td v-for="(item, index) in bomRequest.items" :key="index">
                                {{ item }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
