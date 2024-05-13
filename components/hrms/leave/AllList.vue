<script setup>
import { storeToRefs } from "pinia"
import { useLeaveRequest } from "~/stores/hrms/leaveRequest"

const leaveRequest = useLeaveRequest()

const { allList } = storeToRefs(leaveRequest)
const boardLoading = ref(false)

const leaveRequestData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    leaveRequestData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "EMPLOYEE NAME", id: "employee.fullname_last" },
    { name: "LEAVE AVAILMENT", id: "leave" },
    { name: "DATE FROM ", id: "date_of_absence_from" },
    { name: "DATE TO ", id: "date_of_absence_to" },
    { name: "REASONS", id: "reason_for_absence" },
    { name: "WITH PAY", id: "with_pay" },
    { name: "LEAVE STATUS", id: "request_status" },

]

const actions = {
    showTable: true,
}

</script>

<template>
    <LayoutBoards title="ALL LEAVE LIST" class="w-full mt-4" :loading="boardLoading">
        <!-- <pre>{{ allList }}</pre> -->
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                    <div class="flex gap-2 justify-between p-2">
                        <p>Leave Request Notice</p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                    <div class="p-2">
                        <HrmsLeaveRequestInformation :leave-data="leaveRequestData" />
                    </div>
                    <div class="flex gap-2 justify-end p-2">
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
