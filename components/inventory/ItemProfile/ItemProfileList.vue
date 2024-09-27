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
    data: {
        type: Array<any>,
        required: true,
    },
})
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
                            <InventoryItemProfileListTr :data-item="data" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
