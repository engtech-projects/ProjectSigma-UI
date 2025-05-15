<script setup>
import { useNcpoStore } from "~/stores/inventory/procurement/ncpo"
const mainStore = useNcpoStore()
const { ncpoRequest } = storeToRefs(mainStore)

const isShowTable = ref(true)
const isShowSecondPage = ref(false)
const isShowThirdPage = ref(false)
const selectedItem = ref(null)

const poHeaders = [
    { name: "PO No.", id: "poNo" },
    { name: "Date", id: "date" },
]

const actions = {
    showTable: true,
    edit: false,
    delete: false,
    custom: true
}
const poDetails = [
    { poNo: 1, date: "2022-02-26" },
    { poNo: 2, date: "2022-02-26" },
    { poNo: 3, date: "2022-02-26" },
]
const showInformation = (item) => {
    selectedItem.value = item
    isShowTable.value = false
    isShowSecondPage.value = true
    isShowThirdPage.value = false
}

const goBack = () => {
    if (isShowThirdPage.value) {
        isShowThirdPage.value = false
        isShowSecondPage.value = true
    } else {
        isShowTable.value = true
        isShowSecondPage.value = false
        isShowThirdPage.value = false
        selectedItem.value = null
    }
}

const showThirdPage = () => {
    isShowTable.value = false
    isShowSecondPage.value = false
    isShowThirdPage.value = true
}

</script>
<template>
    <div class="flex flex-col md:flex-cols gap-4">
        <div v-if="isShowTable" class="flex-1 rounded-md p-4 bg-white">
            <LayoutPsTable
                :header-columns="poHeaders"
                :actions="{ ...actions, custom: false }"
                :datas="poDetails ?? []"
                class="rounded-md shadow-sm"
                @show-table="showInformation"
            />
        </div>
        <div v-else-if="isShowSecondPage" class="flex-1 rounded-md p-4 bg-white">
            <div class="flex justify-end">
                <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="goBack">
                    <Icon name="mdi:close" class="h-5 w-5" />
                </button>
            </div>
            <div v-if="selectedItem" class="mt-4 p-4 bg-white rounded-md border border-gray-300">
                <InventoryPurchaseOrderDetails :title="`PURCHASE ORDER DETAILS`" :on-create="showThirdPage" />
            </div>
        </div>
        <div v-else class="border border-gray-300 flex-1 rounded-md p-4 bg-white">
            <div class="flex justify-end">
                <button class="text-gray-500 hover:text-white hover:bg-red-600" @click="goBack">
                    <Icon name="mdi:close" class="h-5 w-5" />
                </button>
            </div>
            <PrintTableFormat>
                <InventoryNoticeOfChangePOItemForm v-model="ncpoRequest.form" title="NOTICE OF CHANGES IN PURCHASE ORDER (NCPO)" />
            </PrintTableFormat>
        </div>
    </div>
</template>
