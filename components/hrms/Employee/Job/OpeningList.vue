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
        </LayoutBoards>
        <HrmsEmployeeJobHiringDetails v-if="isDetail" :manpower-data="manpower" class="w-full" @detail-selected="setDetail" />
    </div>
</template>
