<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/employee/manpower"
import { useJobapplicantStore } from "@/stores/employee/jobapplicant"

const manpowers = useManpowerStore()
const { manpower } = storeToRefs(manpowers)
const jobapplicantstore = useJobapplicantStore()
const { jobapplicant } = storeToRefs(jobapplicantstore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const handleStatusChange = async (applicant) => {
    try {
        jobapplicant.value = applicant
        boardLoading.value = true
        await jobapplicantstore.editJobapplicant()
        if (jobapplicantstore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: jobapplicantstore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: jobapplicantstore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: jobapplicantstore.errorMessage
        })
    } finally {
        jobapplicantstore.clearMessages()
        boardLoading.value = false
    }
}

</script>

<template>
    <div>
        <LayoutDisplayBoards title="Applicant Details" class="w-full shadow-lg" :loading="boardLoading">
            <div v-for="(applicant, index) in manpower.job_applicants" :key="index" class="border border-teal-500 rounded-lg mb-8">
                <h2 class="flex text-xl font-semibold mb-2 bg-slate-100 p-2 rounded-t-lg">
                    Applicant #{{ index + 1 }}
                    <!-- {{ applicant.firstname }} {{ applicant.middlename }} {{ applicant.lastname }} -->
                </h2>
                <div class="grid grid-cols-3 gap-8 p-4">
                    <div>
                        <p class="font-semibold italic">
                            Application Letter Attachment:
                        </p>
                        <p class="truncate">
                            {{ applicant.application_letter_attachment }}
                        </p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Resume:
                        </p>
                        <p class="truncate">
                            {{ applicant.resume_attachment }}
                        </p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Status:
                            <HrmsEmployeeJobStatusSet v-model:status="applicant.status" v-model:remarks="applicant.remarks" @change="handleStatusChange(applicant)" />
                        </p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Desired Position:
                        </p>
                        <p>{{ applicant.desired_position }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Date of Application:
                        </p>
                        <p>{{ applicant.date_of_application }}</p>
                    </div>
                </div>
                <hr>
                <div class="grid grid-cols-3 gap-8 p-4">
                    <div>
                        <p class="font-semibold italic">
                            Personal Information:
                        </p>
                        <p>{{ applicant.firstname }} {{ applicant.middlename }} {{ applicant.lastname }} {{ applicant.name_suffix }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Date of Birth:
                        </p>
                        <p>{{ applicant.date_of_birth }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Contact Info:
                        </p>
                        <p>{{ applicant.contact_info }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Email:
                        </p>
                        <p>{{ applicant.email }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Present Address:
                        </p>
                        <p>{{ applicant.pre_address_street }} {{ applicant.pre_address_brgy }} {{ applicant.pre_address_city }} {{ applicant.pre_address_province }} {{ applicant.pre_address_zip }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Permanent Address:
                        </p>
                        <p>{{ applicant.per_address_street }} {{ applicant.per_address_brgy }} {{ applicant.per_address_city }} {{ applicant.per_address_province }} {{ applicant.per_address_zip }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Name of Spouse:
                        </p>
                        <p>{{ applicant.name_of_spouse }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Date of Birth (Spouse):
                        </p>
                        <p>{{ applicant.date_of_birth_spouse }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Contact Number (Spouse):
                        </p>
                        <p>{{ applicant.telephone_spouse }}</p>
                    </div>
                    <div v-for="(child, childIndex) in JSON.parse(applicant.children)" :key="childIndex">
                        <p class="font-semibold italic">
                            Children:
                        </p>
                        <p>Name: {{ child.name }}</p>
                        <p>Birthdate: {{ child.birthdate }}</p>
                    </div>
                </div>
                <hr>
                <div class="grid grid-flow-col auto-cols-max gap-8 p-4">
                    <div v-for="(work, workIndex) in JSON.parse(applicant.workexperience)" :key="workIndex">
                        <p class="font-semibold italic">
                            Work Experience:
                        </p>
                        <div>
                            <p>Position: {{ work.position_title }}</p>
                            <p>Department/Agency/Office/Company: {{ work.dpt_agency_office_company }}</p>
                            <p>Status of Appointment: {{ work.status_of_appointment }}</p>
                            <p>Inclusive Dates From: {{ work.inclusive_dates_from }}</p>
                            <p>Inclusive Dates To: {{ work.inclusive_dates_to }}</p>
                            <p>Monthly Salary: {{ work.monthly_salary }}</p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="grid grid-cols-3 gap-8 p-4">
                    <div>
                        <p class="font-semibold italic">
                            How did your learn about our company?
                        </p>
                        <p>{{ applicant.how_did_u_learn_about_our_company }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Currently Employed?
                        </p>
                        <p>{{ applicant.currently_employed }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            In Case of Emergency:
                        </p>
                        <p>{{ applicant.icoe_name }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Address:
                        </p>
                        <p>{{ applicant.icoe_street }} {{ applicant.icoe_brgy }} {{ applicant.icoe_city }}, {{ applicant.icoe_province }}, {{ applicant.icoe_zip }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Relationship:
                        </p>
                        <p>{{ applicant.icoe_relationship }}</p>
                    </div>
                    <div>
                        <p class="font-semibold italic">
                            Telephone:
                        </p>
                        <p>{{ applicant.telephone_icoe }}</p>
                    </div>
                    <div v-for="(educ, educIndex) in JSON.parse(applicant.education)" :key="educIndex">
                        <p class="font-semibold italic">
                            Education:
                        </p>
                        <div class="flex gap-8 min-w-max">
                            <div>
                                <p class="font-semibold italic">
                                    Elementary
                                </p>
                                <p>Name of School: {{ educ.elementary_name }}</p>
                                <p>From: {{ educ.elementary_period_attendance_from }}</p>
                                <p>To: {{ educ.elementary_period_attendance_to }}</p>
                                <p>Year Graduated: {{ educ.elementary_year_graduated }}</p>
                            </div>
                            <div>
                                <p class="font-semibold italic">
                                    Secondary
                                </p>
                                <p>Name of School: {{ educ.secondary_name }}</p>
                                <p>From: {{ educ.secondary_period_attendance_from }}</p>
                                <p>To: {{ educ.secondary_period_attendance_to }}</p>
                                <p>Year Graduated: {{ educ.secondary_year_graduated }}</p>
                            </div>
                            <div>
                                <p class="font-semibold italic">
                                    Vocational Course
                                </p>
                                <p>{{ educ.vocationalcourse_name }}</p>
                                <p>From: {{ educ.vocationalcourse_period_attendance_from }}</p>
                                <p>To: {{ educ.vocationalcourse_period_attendance_to }}</p>
                                <p>Year Graduated: {{ educ.vocationalcourse_year_graduated }}</p>
                            </div>
                            <div>
                                <p class="font-semibold italic">
                                    College
                                </p>
                                <p>{{ educ.college_name }}</p>
                                <p>From: {{ educ.college_period_attendance_from }}</p>
                                <p>To: {{ educ.college_period_attendance_to }}</p>
                                <p>Year Graduated: {{ educ.college_year_graduated }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDisplayBoards>
    </div>
</template>
