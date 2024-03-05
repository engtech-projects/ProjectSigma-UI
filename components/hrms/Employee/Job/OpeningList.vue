<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/employee/manpower"
const manpowers = useManpowerStore()

const { manpowerHiringList: manpowerList, manpower, getParams, errorMessage, successMessage, pagination, isDetail } = storeToRefs(manpowers)

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

const headers = [
    { name: "Position/Title", id: "position" },
    { name: "Requesting Department", id: "requesting_department" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Request Status", id: "request_status" },
    // { name: "Number of Applicants", id: "jobapplicants" },
]
const actions = {
    showTable: false,
    edit: false,
    detail: true
}

// const snackbar = useSnackbar()
const boardLoading = ref(false)

const setDetail = (jobapp) => {
    isDetail.value = true
    manpower.value = jobapp
    if (jobapp && typeof jobapp === "object") {
        const formattedApplicants = jobapp.job_applicants.map((applicant, index) => {
            return `${index + 1}. ${applicant.lastname}, ${applicant.firstname} ${applicant.middlename}`
        })

        manpower.value = {
            Position: jobapp.position,
            "Requesting Department": jobapp.requesting_department,
            "Brief Description": jobapp.brief_description,
            "Charged To": jobapp.charged_to,
            "Employment Type": jobapp.employment_type,
            "Nature of Request": jobapp.nature_of_request,
            "Date Requested": jobapp.date_requested,
            "Date Required": jobapp.date_required,
            "Age Range": jobapp.age_range,
            Status: jobapp.status,
            Gender: jobapp.gender,
            "Prefered Qualifications": jobapp.prefered_qualifications,
            "Educational Requirement": jobapp.educational_requirement,
            Remarks: jobapp.remarks,
            "Request Status": jobapp.request_status,
            Applicants: formattedApplicants.join("\n\n\n")
        }
    }
}

// const showTable = (manpr) => {
//     if (manpr && typeof manpr === "object") {
//         const formattedApplicants = manpr.job_applicants.map((applicant, index) => {
//             return `${index + 1}. ${applicant.firstname} ${applicant.middlename} ${applicant.lastname}`
//         })

//         modalData.value = {
//             Position: manpr.position,
//             "Requesting Department": manpr.requesting_department,
//             "Brief Description": manpr.brief_description,
//             "Employment Type": manpr.employment_type,
//             "Nature of Request": manpr.nature_of_request,
//             "Prefered Qualifications": manpr.prefered_qualifications,
//             "Educational Requirement": manpr.educational_requirement,
//             "Date Requested": manpr.date_requested,
//             "Date Required": manpr.date_required,
//             Applicants: formattedApplicants.join("\n\n")
//         }
//         // openModal()
//     }
// }

// const showApplicantDetails = (applicantDetails) => {
//     applicantData.value = applicantDetails
//     openApplicantModal()
// }

// const isModalVisible = ref(false)
// const isApplicantModalVisible = ref(false)
// const modalData = ref(null)
// const applicantData = ref(null)
// const showFormComponent = ref(false)

// const openModal = () => {
//     isModalVisible.value = true
// }
// const openApplicantModal = () => {
//     isApplicantModalVisible.value = true
// }

// const closeModal = () => {
//     isModalVisible.value = false
// }

// const closeApplicantModal = () => {
//     isApplicantModalVisible.value = false
// }

// const addApplicant = () => {
//     showFormComponent.value = true
// }

// const closeForm = () => {
//     showFormComponent.value = false
// }

</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <LayoutBoards title="Open Positions" class="w-full" :loading="boardLoading">
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2 ">
                <LayoutPsTable
                    :header-columns="headers"
                    :datas="manpowerList"
                    :actions="actions"
                    @detail-row="setDetail"
                />
            </div>
            <div class="flex justify-center mx-auto p-2">
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

            <!-- <Teleport to="body">
                <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70" @click="closeModal">
                    <div class="bg-white p-4 w-8/12 h-4/6 ml-64 gap-2 rounded-md shadow-lg overflow-auto absolute" @click.stop>
                        <h2 class="text-lg font-semibold pb-2">
                            Job Details
                        </h2>
                        <button class="rounded hover:text-red-600 absolute top-3 right-2" @click="closeModal">
                            <Icon name="f7:multiply-square" class="h-6 w-6" />
                        </button>
                        <div v-if="modalData" class="rounded p-2 grid grid-cols-2 ">
                            <div>
                                <div class="w-full border-collapse">
                                    <div>
                                        <tr v-for="(modalValue, index) in modalData" :key="index" class="hover:bg-gray-100">
                                            <td class="border px-4 py-2 font-semibold">
                                                {{ index }}
                                            </td>
                                            <td class="border px-4 py-2">
                                                <template v-if="index === 'Applicants'">
                                                    <span class="cursor-pointer text-blue-500" @click="openApplicantModal(modalValue)">{{ modalValue }}</span>
                                                </template>
                                                <template v-else>
                                                    {{ modalValue }}
                                                </template>
                                            </td>
                                        </tr>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col justify-start">
                                <button v-if="!showFormComponent" class="hover:text-green-500 flex-1" @click="addApplicant">
                                    <Icon name="pajamas:file-addition" class="h-4 w-4 " />
                                    Add Applicant
                                </button>
                                <button v-if="showFormComponent" class="flex justify-end rounded hover:text-red-600" @click="closeForm">
                                    <Icon name="f7:multiply-square" class="h-4 w-4" />
                                </button>
                                <HrmsEmployeeJobApplicationForm v-if="showFormComponent" class="pt-2" />
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="isApplicantModalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90" @click="closeModal">
                    <div class="bg-white p-4 w-8/12 h-4/6 ml-64 gap-2 rounded-md shadow-lg overflow-auto absolute" @click.stop>
                        <h2 class="text-lg font-semibold pb-2">
                            Applicant Details
                        </h2>
                        <button class="rounded hover:text-red-600 absolute top-3 right-2" @click="closeApplicantModal">
                            <Icon name="f7:multiply-square" class="h-6 w-6" />
                        </button>
                        <div v-if="applicantData" class="rounded p-2 grid grid-cols-2 ">
                            applicant details
                        </div>
                    </div>
                </div>
            </Teleport> -->
        </LayoutBoards>
        <HrmsEmployeeJobHiringDetails v-if="isDetail" :manpower-data="manpower" class="w-full" @detail-selected="setDetail" />
    </div>
</template>
