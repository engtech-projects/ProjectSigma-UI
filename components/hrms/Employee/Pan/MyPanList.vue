<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()
pan.myPanRequest()
const { myPanList, myRequestPagination: pagination, getParamsMyList } = storeToRefs(pan)
const boardLoading = ref(false)

const headers = [
    { name: "REQUEST TYPE", id: "type" },
    { name: "DATE REQUESTED", id: "request_created_at" },
    { name: "DATE EFFECTIVITY", id: "date_of_effictivity" },
    { name: "REQUEST STATUS", id: "request_status" },
]

const actions = {
    showTable: true,
}
const changePaginate = (newParams) => {
    getParamsMyList.value.page = newParams.page ?? ""
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
</script>

<template>
    <LayoutBoards title="" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myPanList"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="myPanList.length"
                :links="pagination"
                @change-params="changePaginate"
            />
        </div>
        <HrmsEmployeePanInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
