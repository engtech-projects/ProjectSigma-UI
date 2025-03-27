import { defineStore } from "pinia"

export const CURRENT_YES = "Yes"
export const CURRENT_NO = "No"
export const CURRENT_EMP = [
    CURRENT_YES,
    CURRENT_NO,
]

export const STATUS_CONTACTEXT = "Contact Extended"
export const STATUS_CONTRACTSIGNED = "Contract Signed"
export const STATUS_PENDING = "Pending"
export const STATUS_INTERVIEWED = "Interviewed"
export const STATUS_REJECTED = "Rejected"
export const STATUS_FORHIRING = "For Hiring"
export const STATUS_TEST = "Test"
export const STATUS_INTERVIEW = "Interview"
export const STATUS_REFERENCECHECK = "Reference Checking"
export const STATUS_MEDICALEXAM = "Medical Examination"
export const STATUS_PROCESSING = "Processing"
export const STATUS = [
    STATUS_FORHIRING,
    STATUS_REJECTED,
    STATUS_PROCESSING,
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
    monthly_salary: String,
    status_of_appointment: String,
}
export interface JobApplicantSearch {
    id: number,
    firstname: String,
    middlename: String,
    lastname: String,
}
export interface ApplicantInformation {
    id: null | Number,
    manpowerrequests_id: null | Number,
    application_name: String,
    application_letter_attachment: undefined,
    resume_attachment: undefined,
    status: String,
    firstname: String,
    middlename: String,
    lastname: String,
    name_suffix: String,
    nickname: String,
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
    telephone_spouse: null | String,
    children: Array<JobApplicationChildren>,
    icoe_name: String,
    icoe_address: String,
    icoe_relationship: String,
    icoe_occupation: String,
    icoe_date_of_birth: String,
    telephone_icoe: null | String,
    workexperience: Array<JobApplicationWorkExperience>,
    education: Array<JobApplicationEducation>
}

export const useJobapplicantStore = defineStore("jobapplicants", {
    state: () => ({
        isEdit: false,
        isApplicantDetail: false,
        addJobApplicantRequest: {
            isLoading: false,
            successMessage: "",
            errorMessage: "",
        },
        jobapplicant: {
            id: null,
            manpowerrequests_id: null,
            application_letter_attachment: undefined,
            resume_attachment: undefined,
            status: "",
            hiring_status: "",
            lastname: "",
            firstname: "",
            middlename: "",
            name_suffix: "",
            nickname: "",
            date_of_application: "",
            date_of_birth: "",
            per_address_street: "",
            per_address_brgy: "",
            per_address_city: "",
            per_address_zip: "",
            per_address_province: "",
            pre_address_street: "",
            pre_address_brgy: "",
            pre_address_city: "",
            pre_address_zip: "",
            pre_address_province: "",
            contact_info: "",
            email: "",
            how_did_u_learn_about_our_company: "",
            desired_position: "",
            currently_employed: "",
            place_of_birth: "",
            blood_type: "",
            date_of_marriage: "",
            sss: "",
            philhealth: "",
            pagibig: "",
            tin: "",
            atm: "",
            citizenship: "",
            religion: "",
            height: "",
            weight: "",
            father_name: "",
            mother_name: "",
            gender: "",
            civil_status: "",
            name_of_spouse: "",
            date_of_birth_spouse: "",
            occupation_spouse: "",
            telephone_spouse: "",
            children: [],
            icoe_name: "",
            icoe_relationship: "",
            icoe_occupation: "",
            icoe_date_of_birth: "",
            telephone_icoe: "",
            workexperience: [],
            education: [
                {
                    type: "elementary",
                    name: "",
                    education: "",
                    period_attendance_from: "",
                    period_attendance_to: "",
                    year_graduated: "",
                    honors_received: "",
                    degree_earned_of_school: "",
                },
                {
                    type: "secondary",
                    name: "",
                    education: "",
                    period_attendance_from: "",
                    period_attendance_to: "",
                    year_graduated: "",
                    honors_received: "",
                    degree_earned_of_school: "",
                },
                {
                    type: "vocational_course",
                    name: "",
                    education: "",
                    period_attendance_from: "",
                    period_attendance_to: "",
                    year_graduated: "",
                    honors_received: "",
                    degree_earned_of_school: "",
                },
                {
                    type: "college",
                    name: "",
                    education: "",
                    period_attendance_from: "",
                    period_attendance_to: "",
                    year_graduated: "",
                    honors_received: "",
                    degree_earned_of_school: "",
                },
                {
                    type: "graduate_studies",
                    name: "",
                    education: "",
                    period_attendance_from: "",
                    period_attendance_to: "",
                    year_graduated: "",
                    honors_received: "",
                    degree_earned_of_school: "",
                },
            ],
            icoe_brgy: "",
            icoe_city: "",
            icoe_province: "",
            icoe_street: "",
            icoe_zip: "",
            remarks: "",
        },
        list: [],
        allApplicantList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        jobApplicantDetails: [],
        searchJobApplicantParams: {
            key: "",
            type: "AllEmployees",
        },
        applicantSearchList: [] as Array<JobApplicantSearch>,
        pagination: {},
        getParams: {},
        jobApplicantIsSearch: false as Boolean,
        errorMessage: "",
        successMessage: "",
        showFormComponent: false,
        allJobApplicants: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                paginated: "true"
            },
            pagination: {},
        },
    }),
    getters: {
        fullname (state) {
            if (!state.jobapplicant) {
                return ""
            }
            return state.jobapplicant.firstname + " " + (state.jobapplicant.middlename || "") + " " + state.jobapplicant.lastname + " "
        },
    },
    actions: {
        async searchJobApplicants () {
            await useHRMSApi(
                "/api/job-applicants/hiring/for-pan",
                {
                    method: "POST",
                    body: this.searchJobApplicantParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.applicantSearchList = response._data?.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getJobApplicantInformation (id: Number) {
            await useHRMSApi(
                "/api/job-applicants/resource/" + id,
                {
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.jobApplicantIsSearch = true
                            this.jobapplicant = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getAllJobApplicant () {
            this.allJobApplicants.isLoaded = true
            await useHRMSApi(
                "/api/job-applicants/resource",
                {
                    method: "GET",
                    params: this.allJobApplicants.params,
                    onRequest: () => {
                        this.allJobApplicants.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allJobApplicants.isLoading = false
                        if (response.ok) {
                            this.allJobApplicants.list = response._data.data.data
                            this.allJobApplicants.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async createJobapplicant () {
            if (this.addJobApplicantRequest.isLoading) { return }
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            Object.keys(this.jobapplicant).forEach((key) => {
                if (!key.includes("attachment")) {
                    formData.append(key, JSON.stringify(this.jobapplicant[key]))
                } else {
                    formData.append(key, this.jobapplicant[key])
                }
            })

            return await useHRMSApiO(
                "/api/job-applicants/resource",
                {
                    method: "POST",
                    body: formData,
                    onRequest: () => {
                        this.addJobApplicantRequest.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.addJobApplicantRequest.errorMessage = response._data.message
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.addJobApplicantRequest.isLoading = false
                        if (response.ok) {
                            this.$reset()
                            this.addJobApplicantRequest.successMessage = response._data.message
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async updateJobapplicant () { // TO UPDATE APPLICANT.
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/job-applicants/resource/" + this.jobapplicant.id,
                {
                    method: "PUT",
                    body: this.jobapplicant,
                    onResponse: ({ response }: any) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.$reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async updateJobApplicantProcessing (id: any, processingData: any) { // TO UPDATE APPLICANT INSIDE MANPOWER REQUESTS.
            await useHRMSApiO(
                "/api/job-applicants/update-applicant-processing/" + id,
                {
                    method: "PUT",
                    body: processingData,
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.$reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async deleteJobapplicant (id: number) {
            const { data, error } = await useHRMSApiO(
                "/api/manpower-requests/" + id,
                {
                    method: "DELETE",
                    onResponse: ({ response }: any) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
    },
})
