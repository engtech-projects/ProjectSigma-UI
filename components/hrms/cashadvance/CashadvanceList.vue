<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { list: cashadvanceList } = storeToRefs(cashadvances)

// const snackbar = useSnackbar()
// const boardLoading = ref(false)

// const setEdit = (ovr) => {
//     isEdit.value = true
//     cashadvance.value = ovr
// }

// const deleteReq = async (req) => {
//     try {
//         boardLoading.value = true
//         await cashadvances.deleteRequest(req.id)
//         snackbar.add({
//             type: "success",
//             text: cashadvances.successMessage
//         })
//     } finally {
//         boardLoading.value = false
//     }
// }

// const changePaginate = (newParams) => {
//     getParams.value.page = newParams.page ?? ""
//     // getParams.value.syId = newParams.id ?? ""
//     // getParams.value.semId = newParams.semId ?? ""
//     // getParams.value.feeType = newParams.feeType ?? ""
//     // getParams.value.particularName = newParams.particularName ?? ""
// }

const cashadvanceData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    cashadvanceData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "Employee Name", id: "employee_id" },
    // { name: "Department", id: "department_id" },
    { name: "Project", id: "project_id" },
    { name: "Amount Requested", id: "amount_requested" },
    { name: "Amount Approved", id: "amount_approved" },
    { name: "Terms", id: "terms_of_cash_advance" },
    { name: "Remarks", id: "remarks" },
    { name: "Released by", id: "released_by" },
]

const actions = {
    showTable: true,
}

</script>

<template>
    <LayoutBoards title="Cash Advance" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="cashadvanceList"
                :actions="actions"
                @show-table="showInformation"
            />
        </div>
        <div v-if="showInformationModal">
            <Teleport to="body">
                <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                    <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                        <div class="flex gap-2 justify-between p-2">
                            <p class="text-slate-600">
                                Cash Advance (<span class="text-blue-500">{{ cashadvanceData.id }}</span>)
                            </p>
                            <button
                                @click="closeViewModal"
                            >
                                <Icon name="cil:x" color="green" class="w-4 h-4" />
                                Close
                            </button>
                        </div>
                        <div class="p-2">
                            <HrmsCashadvancePaymentForm />
                        </div>
                    </div>
                </div>
            </Teleport>
        </div>
    </LayoutBoards>
</template>
