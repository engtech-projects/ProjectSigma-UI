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
        <LayoutBoards :title="title" class="w-full">
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
        </LayoutBoards>
    </div>
</template>
