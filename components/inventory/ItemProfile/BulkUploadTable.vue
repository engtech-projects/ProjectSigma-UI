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
    isCheckbox: {
        type: Boolean,
        required: true,
        default: false,
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
        <div class="flex flex-col gap-2 w-full p-2">
            <div id="headline mb-4">
                <div class="basis-[10%] grow-1 shrink-0 flex flex-row justify-between items-center border-b rounded-t">
                    <div>
                        <h3 v-if="title" class="pl-4 text-md font-semibold text-gray-900 p-2">
                            {{ title }}
                        </h3>
                    </div>
                    <div v-if="isCheckbox" class="flex justify-end w-full mt-4">
                        <input type="submit" value="Submit" class="uppercase font-bold cursor-pointer w-full max-w-fit py-2 px-5 block mb-2 text-sm text-gray-100 dark:text-white text-center bg-green-600 border rounded border-green-950">
                    </div>
                </div>
            </div>
            <div id="itemDetails">
                <div id="content" class="overflow-auto max-h-96">
                    <table class="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <template v-if="isCheckbox">
                                    <th scope="col" class="p-2 border-0 border-b text-sm">
                                        <input id="checkAll" type="checkbox" name="checkAllItem">
                                    </th>
                                </template>
                                <template v-for="dataHeader, index in headerColumns" :key="index+'-header'">
                                    <InventoryItemProfileBulkUploadItemTh :title="dataHeader" />
                                </template>
                            </tr>
                        </thead>
                        <tbody>
                            <InventoryItemProfileBulkUploadItemTr :is-checkbox="isCheckbox" :data-item="data" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
