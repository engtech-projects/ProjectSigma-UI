<script setup>
import { storeToRefs } from "pinia"
import { useJobapplicantStore, CURRENT_EMP } from "@/stores/hrms/employee/jobapplicant"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"

const manpowers = useManpowerStore()
const { manpower } = storeToRefs(manpowers)

const jobapplicantstore = useJobapplicantStore()
const { jobapplicant, errorMessage, successMessage } = storeToRefs(jobapplicantstore)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const emit = defineEmits(["closeModal"])
const closeViewModal = () => {
    emit("closeModal")
}
jobapplicant.value.manpowerrequests_id = manpower.value.id

const submitForm = async () => {
    try {
        jobapplicant.value.manpowerrequests_id = manpower.value.id
        boardLoading.value = true
        await jobapplicantstore.createJobapplicant()
        snackbar.add({
            type: "success",
            text: jobapplicantstore.successMessage
        })
        manpowers.reloadResources()
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    } finally {
        jobapplicantstore.clearMessages()
        boardLoading.value = false
    }
}

const addChild = () => {
    jobapplicant.value.children.push({ name: "", birthdate: "" })
}

const delChild = (childIndex) => {
    jobapplicant.value.children.splice(childIndex, 1)
}

const addWork = () => {
    jobapplicant.value.workexperience.push({ inclusive_dates_from: "", inclusive_dates_to: "", position_title: "", dpt_agency_office_company: "", monthly_salary: "", status_of_appointment: "" })
}
const delWork = (index) => {
    jobapplicant.value.workexperience.splice(index, 1)
}

const handleAppLetterFileUpload = (event) => {
    const appLetter = event.target.files[0]
    jobapplicant.value.application_letter_attachment = appLetter
}
const handleResumeFileUpload = (event) => {
    const resume = event.target.files[0]
    jobapplicant.value.resume_attachment = resume
}

</script>
<template>
    <form class="p-2" @submit.prevent="submitForm">
        <div class="grid md:grid-cols-3 md:gap-6">
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-2">
                    <label for="floating_application_letter_attachment" class="block  text-sm font-medium text-gray-900 dark:text-white">Application Letter Attachment</label>

                    <input
                        id="floating_application_letter_attachment"
                        class="block w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        type="file"
                        accept=".doc, .docx, .pdf"
                        @change="handleAppLetterFileUpload"
                    >
                    <p class="flex justify-center mx-auto text-xs text-gray-500 dark:text-gray-300 uppercase">
                        doc/docx/pdf
                    </p>
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-2">
                    <label for="floating_application_letter_attachment" class="block  text-sm font-medium text-gray-900 dark:text-white">Resume Attachment</label>

                    <input
                        id="floating_application_letter_attachment"
                        class="block w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        type="file"
                        accept=".doc, .docx, .pdf"
                        @change="handleResumeFileUpload"
                    >
                    <p class="flex justify-center mx-auto text-xs text-gray-500 dark:text-gray-300 uppercase">
                        doc/docx/pdf
                    </p>
                </div>
            </div>
        </div>

        <div class="flex justify-between">
            <label class="block text-sm font-medium text-gray-900 dark:text-white pb-4 col-span-2">I. Personal Information</label>

            <div class="relative z-0 mb-5 group">
                <input
                    id="floating_date_of_application"
                    v-model="jobapplicant.date_of_application"
                    type="date"
                    name="floating_date_of_application"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                >
                <label for="floating_date_of_application" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Application</label>
            </div>
        </div>
        <div class="grid md:grid-cols-4 md:gap-6">
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-2">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.lastname" title="Last Name" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-2">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.firstname" title="First Name" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-2">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.middlename" title="Middle Name" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-2">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.name_suffix" title="Suffix" />
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input
                    id="floating_date_of_birth"
                    v-model="jobapplicant.date_of_birth"
                    type="date"
                    name="floating_date_of_birth"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                >
                <label for="floating_date_of_birth" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
            </div>
        </div>
        <label class="block text-sm font-medium text-gray-900 dark:text-white pb-4 col-span-2">Address</label>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.per_address_street" title="Street" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.per_address_brgy" title="Barangay" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.per_address_city" title="City" />
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.per_address_zip" title="ZIP" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.per_address_province" title="Province" />
                </div>
            </div>
        </div>
        <label class="block text-sm font-medium text-gray-900 dark:text-white pb-4 col-span-2">Alternate Address</label>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.pre_address_street" title="Street" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.pre_address_brgy" title="Barangay" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.pre_address_city" title="City" />
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.pre_address_zip" title="ZIP" />
                </div>
            </div>
            <div>
                <div class="relative z-0 w-full mb-5 group col-span-3">
                    <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.pre_address_province" title="Province" />
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.contact_info" title="Contact Number" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.email" title="Email Address" />
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full mb-5 group col-span-3">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.how_did_u_learn_about_our_company" title="How did you learn about our company?" />
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.desired_position" title="Desired Position" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <select
                    v-model="jobapplicant.currently_employed"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                >
                    <option value="select" disabled selected>
                        -- Select --
                    </option>
                    <option v-for="currentlyEmp, index in CURRENT_EMP" :key="index" :value="currentlyEmp">
                        {{ currentlyEmp }}
                    </option>
                </select>
                <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Are you currently employed?</label>
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.place_of_birth" title="Place of Birth" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.citizenship" title="Citizenship" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <select
                    v-model="jobapplicant.gender"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                >
                    <option value="select" disabled selected>
                        -- Select --
                    </option>
                    <option value="male">
                        Male
                    </option>
                    <option value="female">
                        Female
                    </option>
                </select>
                <label for="floating_gender" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.blood_type" title="Blood Type" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.religion" title="Religion" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <select
                    v-model="jobapplicant.civil_status"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
                >
                    <option value="select" disabled selected>
                        -- Select --
                    </option>
                    <option value="single">
                        Single
                    </option>
                    <option value="married">
                        Married
                    </option>
                    <option value="widowed">
                        Widowed
                    </option>
                    <option value="legally_separated">
                        Legally Separated
                    </option>
                </select>
                <label for="floating_civiStatus" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Civil Status</label>
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <input
                    id="floating_dateOfMarriage"
                    v-model="jobapplicant.date_of_marriage"
                    type="date"
                    name="floating_dateOfMarriage"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                >
                <label for="floating_dateOfMarriage" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Marriage</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.height" title="Height" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.weight" title="Weight" />
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.sss" title="SSS #" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.father_name" title="Father's Name" />
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.philhealth" title="PhilHealth #" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.mother_name" title="Mother's Name" />
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.pagibig" title="PAGIBIG #" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.tin" title="TIN #" />
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <label class="block text-sm font-medium text-gray-900 dark:text-white pb-4 col-span-2">II. Family Background</label>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.name_of_spouse" title="Name of Spouse" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input
                    id="floating_date_of_birth_spouse"
                    v-model="jobapplicant.date_of_birth_spouse"
                    type="date"
                    name="floating_date_of_birth_spouse"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                >
                <label for="floating_date_of_birth_spouse" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.occupation_spouse" title="Occupation(Spouse)" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.telephone_spouse" title="Telephone #" />
            </div>
        </div>
        <label class="block text-sm font-medium text-gray-900 dark:text-white pb-4 italic">Children</label>
        <div v-for="(child, childIndex) in jobapplicant.children" :key="childIndex" class="grid md:grid-cols-4 md:gap-6">
            <div class="relative z-0 w-full mb-5 group col-span-2">
                <LayoutFormPsTextInputTemplate1 v-model="child.name" title="Name of Child" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input
                    id="floating_children_birthdate"
                    v-model="child.birthdate"
                    type="date"
                    name="floating_children_birthdate"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                >
                <label for="floating_children_birthdate" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
            </div>
            <button class="delete-button" @click.prevent="delChild(childIndex)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-red-600"
                ><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
        </div>
        <div>
            <button class="add-button " @click.prevent="addChild">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-green-600 "
                ><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
        </div>
        <label class="block text-sm font-medium text-gray-900 dark:text-white pb-4 italic">In Case of Emergency</label>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.icoe_name" title="Name" />
            </div>
        </div>
        <div>
            <div class="relative z-0 w-full mb-5 group">
                <div class="grid grid-cols-5">
                    <div>
                        <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.icoe_street" title="Street" />
                    </div>
                    <div>
                        <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.icoe_brgy" title="Barangay" />
                    </div>
                    <div>
                        <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.icoe_city" title="City" />
                    </div>
                    <div>
                        <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.icoe_province" title="Province" />
                    </div>
                    <div>
                        <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.icoe_zip" title="ZIP" />
                    </div>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.icoe_relationship" title="Relationship" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.telephone_icoe" title="Telephone #" />
            </div>
        </div>
        <label class="block text-sm font-medium text-gray-900 dark:text-white pb-4 italic">III. Educational Background</label>

        <div>
            <div class="grid grid-cols-5 gap-4">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[0].name" title="Name of Elementary School" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[0].education" title="Basic Education/Degree/Course" placeholder="" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[0].period_attendance_from" title="Period of Attendance (From)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[0].period_attendance_to" title="Period of Attendance (To)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[0].year_graduated" title="Year Graduated" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[0].honors_received" title="Honors Received" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[0].degree_earned_of_school" title="Degree Earned" />
            </div>
            <div class="grid grid-cols-5 gap-4">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[1].name" title="Name of Secondary School" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[1].education" title="Basic Education/Degree/Course" placeholder="" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[1].period_attendance_from" title="Period of Attendance (From)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[1].period_attendance_to" title="Period of Attendance (To)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[1].year_graduated" title="Year Graduated" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[1].honors_received" title="Honors Received" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[1].degree_earned_of_school" title="Degree Earned" />
            </div>
            <div class="grid grid-cols-5 gap-4">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[2].name" title="Name of Vocational School" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[2].education" title="Basic Education/Degree/Course" placeholder="" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[2].period_attendance_from" title="Period of Attendance (From)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[2].period_attendance_to" title="Period of Attendance (To)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[2].year_graduated" title="Year Graduated" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[2].honors_received" title="Honors Received" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[2].degree_earned_of_school" title="Degree Earned" />
            </div>
            <div class="grid grid-cols-5 gap-4">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[3].name" title="Name of College" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[3].education" title="Basic Education/Degree/Course" placeholder="" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[3].period_attendance_from" title="Period of Attendance (From)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[3].period_attendance_to" title="Period of Attendance (To)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[3].year_graduated" title="Year Graduated" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[3].honors_received" title="Honors Received" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[3].degree_earned_of_school" title="Degree Earned" />
            </div>
            <div class="grid grid-cols-5 gap-4">
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[4].name" title="Graduate Studies School" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[4].education" title="Basic Education/Degree/Course" placeholder="" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[4].period_attendance_from" title="Period of Attendance (From)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[4].period_attendance_to" title="Period of Attendance (To)" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[4].year_graduated" title="Year Graduated" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[4].honors_received" title="Honors Received" />
                <LayoutFormPsTextInputTemplate1 v-model="jobapplicant.education[4].degree_earned_of_school" title="Degree Earned" />
            </div>
        </div>

        <label class="block text-sm font-medium text-gray-900 dark:text-white pb-4 italic">IV. Work Experience</label>
        <div v-for="(wrk, index) in jobapplicant.workexperience" :key="index" class="grid md:grid-cols-3 md:gap-4">
            <div class="relative z-0 w-full mb-5 group">
                <div class="flex-1">
                    From
                    <input
                        id="floating_date_of_application"
                        v-model="wrk.inclusive_dates_from"
                        type="date"
                        name="floating_date_of_application"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    >

                    To
                    <input
                        id="floating_date_of_application"
                        v-model="wrk.inclusive_dates_to"
                        type="date"
                        name="floating_date_of_application"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    >
                </div>
                <label for="floating_inclusiveDates" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Inclusive Dates(mm/dd/yyyy)</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="wrk.position_title" title="Position Title(Write in full)" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="wrk.dpt_agency_office_company" title="Department/Agency/Office/Company" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="wrk.monthly_salary" input-type="number" input-step="0.01" title="Monthly Salary" />
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <LayoutFormPsTextInputTemplate1 v-model="wrk.status_of_appointment" title="Status of Appointment" />
            </div>
            <button v-if="index > 0" class="delete-button" @click.prevent="delWork(index)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-red-600"
                ><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
        </div>
        <div>
            <button class="add-button" @click.prevent="addWork">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-green-600 "
                ><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
        </div>
        <div class="flex gap-4">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
            </button>
            <button type="reset" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Reset
            </button>
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic transition-opacity delay-1000"
        >
            {{ successMessage }}
        </p>
    </form>
</template>
