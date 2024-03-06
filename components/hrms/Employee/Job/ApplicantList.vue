<script setup>
import { storeToRefs } from "pinia"
import { useJobapplicantStore } from "@/stores/employee/jobapplicant"
const jobapplicants = useJobapplicantStore()
const { jobApplicantDetails: applicantDetail } = storeToRefs(jobapplicants)

// const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>

<template>
    <div class="flex flex-col items-end gap-4">
        <LayoutEditBoards title="Applicant Details" class="w-full" :loading="boardLoading">
            <div class="text-gray-600 text-sm p-2 shadow-lg">
                <div v-for="(applicant, index) in applicantDetail" :key="index" class="border rounded-lg p-4 mb-2">
                    <span class="text-lg font-semibold mb-4">
                        Applicant {{ index + 1 }}
                    </span>
                    <div class="grid grid-cols-4 gap-4">
                        <div>
                            <p class="font-semibold">
                                Application Name:
                            </p>
                            <p>
                                {{ applicant.application_name }}
                            </p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Application Letter Attachment:
                            </p>
                            <p class="truncate">
                                {{ applicant.application_letter_attachment }}
                            </p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Resume:
                            </p>
                            <p class="truncate">
                                {{ applicant.resume_attachment }}
                            </p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Status:
                            </p>
                            <p class="truncate">
                                {{ applicant.status }}
                            </p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Full Name:
                            </p>
                            <p>{{ applicant.firstname }} {{ applicant.middlename }} {{ applicant.lastname }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Date of Birth:
                            </p>
                            <p>{{ applicant.date_of_birth }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Contact Info:
                            </p>
                            <p>{{ applicant.contact_info }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Email:
                            </p>
                            <p>{{ applicant.email }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Desired Position:
                            </p>
                            <p>{{ applicant.desired_position }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Date of Application:
                            </p>
                            <p>{{ applicant.date_of_application }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                How did you learn about our company?
                            </p>
                            <p>{{ applicant.how_did_u_learn_about_our_company }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Currently Employed:
                            </p>
                            <p>{{ applicant.currently_employed }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Name of Spouse:
                            </p>
                            <p>{{ applicant.name_of_spouse }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Date of Birth (Spouse):
                            </p>
                            <p>{{ applicant.date_of_birth_spouse }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Contact Number (Spouse):
                            </p>
                            <p>{{ applicant.telephone_spouse }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Occupation (Spouse):
                            </p>
                            <p>{{ applicant.occupation_spouse }}</p>
                        </div>
                        <!-- <div>
                            <p class="font-semibold">
                                Children:
                            </p>
                            <p>{{ applicant.children }}</p>
                        </div> -->
                        <!-- <div>
                            <p class="font-semibold">
                                Education:
                            </p>
                            <p>{{ applicant.education }}</p>
                        </div> -->
                        <div>
                            <p class="font-semibold">
                                In Case of Emergency:
                            </p>
                            <p>{{ applicant.icoe_name }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Address:
                            </p>
                            <p>{{ applicant.icoe_address }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Relationship:
                            </p>
                            <p>{{ applicant.icoe_relationship }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                Telephone:
                            </p>
                            <p>{{ applicant.telephone_icoe }}</p>
                        </div>
                        <div>
                            <p class="font-semibold">
                                In Case of Emergency:
                            </p>
                            <p>{{ applicant.icoe_name }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic"
            >
                {{ successMessage }}
            </p> -->
        </LayoutEditBoards>
    </div>
</template>
