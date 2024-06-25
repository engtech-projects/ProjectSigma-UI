<script setup>

import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
const manpowers = useManpowerStore()
const { myRequestList: manpowerList } = storeToRefs(manpowers)
const employeeData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    employeeData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "Requesting Department", id: "requesting_department" },
    { name: "Position/Title", id: "position.name" },
    { name: "Date Requested", id: "date_requested" },
    { name: "Date Required", id: "date_required" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Requested by", id: "requested_by_user.name" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
}

const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="manpowerList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="w-full h-full bg-black bg-opacity-80 absolute top-0 left-0 flex justify-center items-center">
                <div class="bg-white p-4 max-w-[85%] min-w-[50%] max-h-[80%] min-h-[50%] mt-10 gap-2 rounded-md overflow-auto absolute">
                    <div class="flex gap-2 justify-between p-2">
                        <p>Application Information</p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                    <div class="grid gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-gray-900 text-4xl">POSITION {{ employeeData.position.name }}</span>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Requested Date: </span> <span class="text-gray-900">{{ employeeData.date_requested }}</span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Requested Required Date: </span> {{ employeeData.date_required }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> employment_type </span> {{ employeeData.employment_type }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> brief_description </span> {{ employeeData.brief_description }}
                        </div>
                        <!-- <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> job_description_attachment </span> {{ employeeData.job_description_attachment }}
                        </div> -->
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> nature_of_request </span> {{ employeeData.nature_of_request }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> age_range </span> {{ employeeData.age_range }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> status </span> {{ employeeData.status }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> gender </span> {{ employeeData.gender }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> educational_requirement </span> {{ employeeData.educational_requirement }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> preferred_qualifications </span> {{ employeeData.preferred_qualifications }}
                        </div>
                        <!-- <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> approvals </span> {{ employeeData.approvals }}
                        </div> -->
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> remarks </span> {{ employeeData.remarks }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> request_status </span> {{ employeeData.request_status }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> charged_to </span> {{ employeeData.charged_to }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> breakdown_details </span> {{ employeeData.breakdown_details }}
                        </div>
                    </div>
                    <div class="w-full">
                        <LayoutApprovalsListView :approvals="employeeData.approvals" />
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
