import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const CURRENT_YES = "Yes"
export const CURRENT_NO = "No"
export const CURRENT_EMP = [
    CURRENT_YES,
    CURRENT_NO,
]

export const STATUS_CONTRACTEXT = "Contract Extended"
export const STATUS_PENDING = "Pending"
export const STATUS_INTERVIEWED = "Interviewed"
export const STATUS_REJECTED = "Rejected"
export const STATUS_HIRED = "Hired"
export const STATUS_FORHIRING = "For Hiring"
export const STATUS_TEST = "Test"
export const STATUS_INTERVIEW = "Interview"
export const STATUS_REFERENCECHECK = "Reference Checking"
export const STATUS_MEDICALEXAM = "Medical Examination"
export const STATUS = [
    STATUS_CONTRACTEXT,
    STATUS_PENDING,
    STATUS_INTERVIEWED,
    STATUS_REJECTED,
    STATUS_HIRED,
    STATUS_FORHIRING,
    STATUS_TEST,
    STATUS_INTERVIEW,
    STATUS_REFERENCECHECK,
    STATUS_MEDICALEXAM
]

export interface JobApplicationChildren {
    name: String,
    birthdate: String,
}
export interface JobApplicationElementaryEducationModel {
    elementary_name: String,
    elementary_education: String,
    elementary_period_attendance_to: String,
    elementary_period_attendance_from: String,
    elementary_year_graduated: String,
}
export interface JobApplicationSecondaryEducationModel {
    secondary_name: String,
    secondary_education: String,
    secondary_period_attendance_to: String,
    secondary_period_attendance_from: String,
    secondary_year_graduated: String,
}
export interface JobApplicationVocationalEducationModel {
    vocationalcourse_name: String,
    vocationalcourse_education: String,
    vocationalcourse_period_attendance_to: String,
    vocationalcourse_period_attendance_from: String,
    vocationalcourse_year_graduated: String,
}
export interface JobApplicationCollegeEducationModel {
    college_name: String,
    college_education: String,
    college_period_attendance_to: String,
    college_period_attendance_from: String,
    college_year_graduated: String,
}
export interface JobApplicationGraduateStudiesEducationModel {
    college_name: String,
    college_education: String,
    college_period_attendance_to: String,
    college_period_attendance_from: String,
    college_year_graduated: String,
}
export interface JobApplicationEducation {
    elementary_name: String,
    elementary_education: String,
    elementary_period_attendance_to: String,
    elementary_period_attendance_from: String,
    elementary_year_graduated: String,
    secondary_name: String,
    secondary_education: String,
    secondary_period_attendance_to: String,
    secondary_period_attendance_from: String,
    secondary_year_graduated: String,
    vocationalcourse_name: String,
    vocationalcourse_education: String,
    vocationalcourse_period_attendance_to: String,
    vocationalcourse_period_attendance_from: String,
    vocationalcourse_year_graduated: String,
    college_name: String,
    college_education: String,
    college_period_attendance_to: String,
    college_period_attendance_from: String,
    college_year_graduated: String,
    graduatestudies_name: String,
    graduatestudies_education: String,
    graduatestudies_period_attendance_to: String,
    graduatestudies_period_attendance_from: String,
    graduatestudies_year_graduated: String,
}
export interface JobApplicationWorkExperience {
    id: Number,
    inclusive_dates_from: String,
    inclusive_dates_to: String,
    position_title: String,
    dpt_agency_office_company: String,
    monthly_salary:String,
    status_of_appointment:String,
}
export interface ApplicantInformation {
    id: null | Number,
    manpowerrequests_id: null | Number,
    application_name: String,
    application_letter_attachment: undefined,
    resume_attachment: undefined,
    status: string,
    lastname: String,
    firstname: String,
    middlename: String,
    date_of_application: String,
    date_of_birth: String,
    per_address_street: String,
    per_address_brgy: String,
    per_address_city: String,
    per_address_zip: String,
    per_address_province: String,
    pre_address_street: String,
    pre_address_brgy: String,
    pre_address_city: String,
    pre_address_zip: String,
    pre_address_province: String,
    contact_info: null | Number,
    email: String,
    how_did_u_learn_about_our_company: String,
    desired_position: String,
    currently_employed: String,
    name_of_spouse: String,
    date_of_birth_spouse: String,
    occupation_spouse: String,
    telephone_spouse: null | Number,
    children: Array<JobApplicationChildren>,
    icoe_name: String,
    icoe_address: String,
    icoe_relationship: String,
    telephone_icoe: null | Number,
    workexperience: Array<JobApplicationWorkExperience>,
    education: Array<JobApplicationEducation>
}

export const useJobapplicantStore = defineStore("jobapplicants", {
    state: () => ({
        isEdit: false,
        jobapplicant: {
            id: null as null | Number,
            manpowerrequests_id: null as null | Number,
            application_name: "" as String,
            application_letter_attachment: undefined,
            resume_attachment: undefined,
            status: "" as String,
            lastname: "" as String,
            firstname: "" as String,
            middlename: "" as String,
            date_of_application: "" as String,
            date_of_birth: "" as String,
            per_address_street: "" as String,
            per_address_brgy: "" as String,
            per_address_city: "" as String,
            per_address_zip: "" as String,
            per_address_province: "" as String,
            pre_address_street: "" as String,
            pre_address_brgy: "" as String,
            pre_address_city: "" as String,
            pre_address_zip: "" as String,
            pre_address_province: "" as String,
            contact_info: null as null | Number,
            email: "" as String,
            how_did_u_learn_about_our_company: "" as String,
            desired_position: "" as String,
            currently_employed: "",
            name_of_spouse: "" as String,
            date_of_birth_spouse: "" as String,
            occupation_spouse: "" as String,
            telephone_spouse: null as null | Number,
            children: [] as Array<JobApplicationChildren>,
            icoe_name: "" as String,
            icoe_address: "" as String,
            icoe_relationship: "" as String,
            telephone_icoe: null as null | Number,
            workexperience: [] as Array<JobApplicationWorkExperience>,
            education: {} as Array<JobApplicationEducation>
        } as unknown as ApplicantInformation,
        list: [],
        jobApplicantDetails: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getJobApplicantsDetails () {
            await useFetch(
                "/api/job-applicants-get",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.jobApplicantDetails = response._data.data
                    },
                }
            )
        },

        async addJobapplication (state) {
            this.successMessage = ""
            this.errorMessage = ""

            const formData = new FormData()

            formData.append("application_letter_attachment", state.jobapplicant.application_letter_attachment)
            formData.append("resume_attachment", state.jobapplicant.resume_attachment)
            formData.append("manpowerrequests_id", state.jobapplicant.manpowerrequests_id)
            formData.append("application_name", state.jobapplicant.application_name)
            formData.append("status", state.jobapplicant.status)
            formData.append("lastname", state.jobapplicant.lastname)
            formData.append("firstname", state.jobapplicant.firstname)
            formData.append("middlename", state.jobapplicant.middlename)
            formData.append("date_of_application", state.jobapplicant.date_of_application)
            formData.append("workexperience", state.jobapplicant.JobApplicationWorkExperience)

            await useFetch(
                "/api/job-applicants",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.jobapplicant,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getJobApplicantsDetails()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async editJobapplicant () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/manpower-requests/" + this.manpower.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.jobapplicant,
                    watch: false,
                }
            )
            if (data.value) {
                this.getJobApplicantsDetails()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deleteJobapplicant (id: number) {
            const { data, error } = await useFetch(
                "/api/manpower-requests/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getJobApplicantsDetails()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        // reset () {
        //     this.jobapplicant = {
        //         id: null,
        //         manpowerrequests_id: null,
        //         application_name: null,
        //         application_letter_attachment: undefined,
        //         resume_attachment: undefined,
        //         status: "",
        //         lastname: null,
        //         firstname: null,
        //         middlename: null,
        //         date_of_application: null,
        //         date_of_birth: null,
        //         address_street: null,
        //         address_city: null,
        //         address_zip: null,
        //         contact_info: null,
        //         email: null,
        //         how_did_u_learn_about_our_company: null,
        //         desired_position: null,
        //         currently_employed: "",
        //         name_of_spouse: null,
        //         date_of_birth_spouse: null,
        //         occupation_spouse: null,
        //         telephone_spouse: null,
        //         children: null,
        //         icoe_name: null,
        //         icoe_address: null,
        //         icoe_relationship: null,
        //         telephone_icoe: null,
        //         workexperience: null,
        //         education: null,
        //     }
        //     this.isEdit = false
        //     this.successMessage = ""
        //     this.errorMessage = ""
        // },

    },
})
