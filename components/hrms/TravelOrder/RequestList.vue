<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

const travels = useTravelorderStore()
const { list: travelList, getParams, pagination, errorMessage, successMessage } = storeToRefs(travels)

const boardLoading = ref(false)
const showInformationModal = ref(false)
const modalData = ref(null)

const headers = [
    { name: "Requesting Office", id: "department.department_name" },
    { name: "Destination", id: "destination" },
    { name: "Purpose", id: "purpose_of_travel" },
    { name: "Duration", id: "duration_of_travel" },
    { name: "Remarks", id: "remarks" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}

const showInformation = (data) => {
    modalData.value = data
    showInformationModal.value = true
}

const closeViewModal = () => {
    showInformationModal.value = false
    modalData.value = null // Clear modal data on close
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <!-- <pre>{{ travelList }}</pre> -->
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="travelList ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                    <div class="flex gap-2 justify-between p-2">
                        <div />
                        <button @click="closeViewModal">
                            <Icon name="cil:x" color="green" class="w-4 h-4" />
                            Close
                        </button>
                    </div>
                    <div class="grid gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-gray-900 text-xl">Requesting Office: <span class="text-teal-600 font-medium">{{ modalData.department.department_name }}</span></span>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 divide-x gap-2 md:justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium ">Employee(s): </span> <span class="text-gray-900">{{ modalData.employees.map(employee => employee.name).join(', ') }}</span>
                        </div>
                        <div class="p-2 flex flex-col gap-2">
                            <span class="text-teal-600 font-medium">Destination: </span> {{ modalData.destination }}
                            <span class="text-teal-600 font-medium">Purpose of Travel: </span> {{ modalData.purpose_of_travel }}
                            <span class="text-teal-600 font-medium">Date of Travel: </span> {{ modalData.date_of_travel }}
                            <span class="text-teal-600 font-medium">Time of Travel: </span> {{ modalData.time_of_travel }}
                            <span class="text-teal-600 font-medium">Duration of Travel (days): </span> {{ modalData.duration_of_travel }}
                            <span class="text-teal-600 font-medium">Means of Transportation
                                : </span> {{ modalData.means_of_transportation }}
                        </div>
                        <div class="p-2 flex flex-col gap-2">
                            <span class="text-teal-600 font-medium">Remarks
                                : </span> {{ modalData.remarks }}
                            <span class="text-teal-600 font-medium">Request Status: </span> {{ modalData.request_status }}
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
