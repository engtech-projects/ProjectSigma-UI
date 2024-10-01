<script setup lang="ts">
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
</script>
<template>
    <div class="h-full w-full">
        <div class="flex flex-col gap-2 w-full border-2 border-solid border-gray-800 rounded-t">
            <div id="headline mb-4">
                <div class="w-full bg-gray-900 basis-[10%] grow-1 shrink-0 flex flex-row justify-between items-center border-b py-2 px-4">
                    <div class="flex flex-row gap-2 items-center justify-center">
                        <h3 class="text-lg font-bold text-white">
                            {{ title }}
                        </h3>
                    </div>
                </div>
            </div>
            <div id="itemDetails">
                <div v-if="data && data.length > 0" id="content" class="overflow-auto max-h-96">
                    <table class="table-auto w-full border-collapse">
                        <thead class="sticky top-0 bg-white">
                            <tr>
                                <template v-for="dataHeader, index in headerColumns" :key="index+'-header'">
                                    <InventoryWarehouseItemTh :title="dataHeader" />
                                </template>
                            </tr>
                        </thead>
                        <tbody>
                            <InventoryWarehouseItemTr :data-item="data" />
                        </tbody>
                    </table>
                </div>
                <div v-else class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                    <p class="text-center text-lg p-2">
                        NO DATA
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
