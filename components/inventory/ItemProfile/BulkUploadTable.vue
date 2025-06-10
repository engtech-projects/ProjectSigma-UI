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
    titleColor: {
        type: String,
        required: true,
    },
    isCheckbox: {
        type: Boolean,
        required: true,
        default: false,
    },
    isItemCode: {
        type: Boolean,
        required: false,
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
    icon: {
        type: String,
        required: true,
    },
})
const isChecked = ref(false)
const checkAll = (data:any) => {
    data.forEach((element:any) => {
        if (isChecked.value) {
            element.isCheck = true
        } else {
            element.isCheck = false
        }
    })
    return data
}
const emit = defineEmits(["doStoreBulkUpload"])
const doBulkUpload = () => {
    emit("doStoreBulkUpload")
}
</script>
<template>
    <div class="h-full w-full">
        <div class="flex flex-col gap-2 w-full border-2 border-solid border-gray-800 rounded-t">
            <div id="headline mb-4">
                <div class="w-full bg-gray-900 basis-[10%] grow-1 shrink-0 flex flex-row justify-between items-center border-b py-2 px-4">
                    <div class="flex flex-row gap-2 items-center justify-center">
                        <Icon :name="icon" :class="titleColor+' h-5 w-5 lg:h-5 lg:w-5'" />
                        <h3 v-if="title" :class="titleColor+' text-lg font-bold'">
                            {{ title }}
                        </h3>
                    </div>
                    <div v-if="isCheckbox" class="flex justify-end items-center w-full">
                        <input
                            type="submit"
                            value="Submit"
                            class="hover:text-green-600 hover:bg-gray-100 hover:border-green-600 uppercase font-bold cursor-pointer w-full max-w-fit py-2 px-5 block text-sm text-gray-100 text-center bg-green-600 border rounded border-green-950"
                            @click="doBulkUpload"
                        >
                    </div>
                </div>
            </div>
            <div id="itemDetails">
                <div v-if="data && data.length > 0" id="content" class="overflow-auto max-h-96">
                    <table class="table-auto w-full border-collapse">
                        <thead class="sticky top-0 bg-white">
                            <tr>
                                <template v-if="isCheckbox">
                                    <th scope="col" class="border-0 border-b text-sm">
                                        <input
                                            id="checkAll"
                                            v-model="isChecked"
                                            class="cursor-pointer"
                                            type="checkbox"
                                            name="checkAllItem"
                                            @change="checkAll(data)"
                                        >
                                    </th>
                                </template>
                                <template v-if="isItemCode">
                                    <th scope="col" class="border-0 border-b text-sm">
                                        Item Code
                                    </th>
                                </template>
                                <template v-for="dataHeader, index in headerColumns" :key="index+'-header'">
                                    <InventoryItemProfileBulkUploadItemTh :title="dataHeader" />
                                </template>
                            </tr>
                        </thead>
                        <tbody>
                            <InventoryItemProfileBulkUploadItemTr :is-checkbox="isCheckbox" :is-item-code="isItemCode" :data-item="data" />
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
