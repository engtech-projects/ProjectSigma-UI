<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()
const { myRequests } = storeToRefs(pan)
const debouncedGetData = useDebounceFn(() => {
    pan.getMyRequests()
}, 500)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        debouncedGetData()
    }
})
watch(
    () => ({ ...pan.myRequests.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            pan.myRequests.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)

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
    myRequests.value.params.page = newParams.page ?? ""
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="myRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequests.list"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination
                v-if="myRequests.list.length"
                :links="myRequests.pagination"
                @change-params="changePaginate"
            />
        </div>
        <HrmsEmployeePanInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
