<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()
const debouncedGetData = useDebouncedFn(() => {
    pan.getMyApprovals()
}, 500)
onMounted(() => {
    if (!myApprovals.value.isLoaded) {
        debouncedGetData()
    }
})
watch(
    () => ({ ...pan.myApprovals.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            pan.myApprovals.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
const { myApprovals } = storeToRefs(pan)
const headers = [
    { name: "REQUEST TYPE", id: "type" },
    { name: "DATE REQUESTED", id: "request_created_at" },
    { name: "DATE EFFECTIVITY", id: "date_of_effictivity" },
    { name: "REQUEST STATUS", id: "request_status" },
]
const actions = {
    showTable: true,
}

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? ""
}

</script>
<template>
    <LayoutBoards title="" class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination
                v-if="myApprovals.list.length"
                :links="myApprovals.pagination"
                @change-params="changePaginate"
            />
        </div>
        <HrmsEmployeePanInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
