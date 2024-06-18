<script setup>
import { storeToRefs } from "pinia"
import { useFailToLogStore } from "@/stores/hrms/attendance/failtolog"

const failtologs = useFailToLogStore()

const { myRequestList } = storeToRefs(failtologs)

const headers = [
    { name: "Date", id: "date" },
    { name: "Time", id: "time" },
    { name: "Log Type", id: "log_type" },
    { name: "Reason", id: "reason" },
]
const actions = {
    showTable: true,
}
const infoModalData = ref(null)
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequestList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <HrmsAttendanceFailtologInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
        :show-approvals="false"
    />
</template>
