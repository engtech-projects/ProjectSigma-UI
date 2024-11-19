<script setup lang="ts">
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
    dataColumns: {
        type: Array<any>,
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in dataColumns" :key="index">
                            <td>
                                {{ item ? item.item_summary : "" }}
                            </td>
                            <td>
                                {{ item ? item.unit : "" }}
                            </td>
                            <td>
                                {{ item ? item.unit_price : "" }}
                            </td>
                            <td>
                                {{ item ? item.quantity : "" }}
                            </td>
                            <td>
                                {{ item ? item.amount : "" }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
