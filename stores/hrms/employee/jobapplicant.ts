import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

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
export const STATUS = [
    STATUS_CONTACTEXT,
    STATUS_CONTRACTSIGNED,
    STATUS_PENDING,
    STATUS_INTERVIEWED,
    STATUS_REJECTED,
    STATUS_FORHIRING,
    STATUS_TEST,
    STATUS_INTERVIEW,
    STATUS_REFERENCECHECK,
    STATUS_MEDICALEXAM,
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
    telephone_spouse: null | String,
    children: Array<JobApplicationChildren>,
    icoe_name: String,
    icoe_address: String,
    icoe_relationship: String,
    telephone_icoe: null | String,
    workexperience: Array<JobApplicationWorkExperience>,
    education: Array<JobApplicationEducation>
}

export const useJobapplicantStore = defineStore("jobapplicants", {
    state: () => ({
        isEdit: false,
        isApplicantDetail: false,
        jobapplicant: {
            id: null,
            manpowerrequests_id: null,
            application_letter_attachment: undefined,
            resume_attachment: undefined,
            status: "",
            lastname: "",
            firstname: "",
            middlename: "",
            name_suffix: "",
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
                "/api/get-for-hiring",
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
                "/api/job-applicants/" + id,
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
        async getJobApplicant () {
            const { data, error } = await useFetch(
                "/api/job-applicants",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createJobapplicant () {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("manpowerrequests_id", this.jobapplicant.manpowerrequests_id)
            formData.append("application_name", this.jobapplicant.application_name)
            formData.append("application_letter_attachment", this.jobapplicant.application_letter_attachment)
            formData.append("resume_attachment", this.jobapplicant.resume_attachment)
            formData.append("lastname", this.jobapplicant.lastname)
            formData.append("firstname", this.jobapplicant.firstname)
            formData.append("middlename", this.jobapplicant.middlename)
            formData.append("name_suffix", this.jobapplicant.name_suffix)
            formData.append("status", this.jobapplicant.status)
            formData.append("date_of_application", this.jobapplicant.date_of_application)
            formData.append("date_of_birth", this.jobapplicant.date_of_birth)
            formData.append("per_address_street", this.jobapplicant.per_address_street)
            formData.append("per_address_brgy", this.jobapplicant.per_address_brgy)
            formData.append("per_address_city", this.jobapplicant.per_address_city)
            formData.append("per_address_zip", this.jobapplicant.per_address_zip)
            formData.append("per_address_province", this.jobapplicant.per_address_province)
            formData.append("pre_address_street", this.jobapplicant.pre_address_street)
            formData.append("pre_address_brgy", this.jobapplicant.pre_address_brgy)
            formData.append("pre_address_city", this.jobapplicant.pre_address_city)
            formData.append("pre_address_zip", this.jobapplicant.pre_address_zip)
            formData.append("pre_address_province", this.jobapplicant.pre_address_province)
            formData.append("contact_info", this.jobapplicant.contact_info)
            formData.append("email", this.jobapplicant.email)
            formData.append("how_did_u_learn_about_our_company", this.jobapplicant.how_did_u_learn_about_our_company)
            formData.append("desired_position", this.jobapplicant.desired_position)
            formData.append("currently_employed", this.jobapplicant.currently_employed)
            formData.append("place_of_birth", this.jobapplicant.place_of_birth)
            formData.append("blood_type", this.jobapplicant.blood_type)
            formData.append("date_of_marriage", this.jobapplicant.date_of_marriage)
            formData.append("sss", this.jobapplicant.sss)
            formData.append("philhealth", this.jobapplicant.philhealth)
            formData.append("pagibig", this.jobapplicant.pagibig)
            formData.append("tin", this.jobapplicant.tin)
            formData.append("citizenship", this.jobapplicant.citizenship)
            formData.append("religion", this.jobapplicant.religion)
            formData.append("height", this.jobapplicant.height)
            formData.append("weight", this.jobapplicant.weight)
            formData.append("father_name", this.jobapplicant.father_name)
            formData.append("mother_name", this.jobapplicant.mother_name)
            formData.append("gender", this.jobapplicant.gender)
            formData.append("civil_status", this.jobapplicant.civil_status)
            formData.append("name_of_spouse", this.jobapplicant.name_of_spouse)
            formData.append("date_of_birth_spouse", this.jobapplicant.date_of_birth_spouse)
            formData.append("occupation_spouse", this.jobapplicant.occupation_spouse)
            formData.append("telephone_spouse", this.jobapplicant.telephone_spouse)
            formData.append("children", JSON.stringify(this.jobapplicant.children))
            formData.append("icoe_name", this.jobapplicant.icoe_name)
            formData.append("icoe_relationship", this.jobapplicant.icoe_relationship)
            formData.append("telephone_icoe", this.jobapplicant.telephone_icoe)
            formData.append("workexperience", JSON.stringify(this.jobapplicant.workexperience))
            formData.append("education", JSON.stringify(this.jobapplicant.education))
            formData.append("icoe_street", this.jobapplicant.icoe_street)
            formData.append("icoe_brgy", this.jobapplicant.icoe_brgy)
            formData.append("icoe_city", this.jobapplicant.icoe_city)
            formData.append("icoe_province", this.jobapplicant.icoe_province)
            formData.append("icoe_zip", this.jobapplicant.icoe_zip)
            formData.append("remarks", this.jobapplicant.remarks)

            await useHRMSApiO(
                "/api/job-applicants",
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getJobApplicant()
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
        async updateJobapplicant () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/update-applicant/" + this.jobapplicant.id,
                {
                    method: "PUT",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.jobapplicant,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.reset()
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
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    onResponse: ({ response }) => {
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

        reset () {
            this.jobapplicant = {
                id: null,
                manpowerrequests_id: null,
                application_letter_attachment: undefined,
                resume_attachment: undefined,
                status: "",
                lastname: "",
                firstname: "",
                middlename: "",
                name_suffix: "",
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
                telephone_icoe: "",
                workexperience: [],
                education: [
                    {
                        elementary_name: null,
                        elementary_education: null,
                        elementary_period_attendance_to: null,
                        elementary_period_attendance_from: null,
                        elementary_year_graduated: null,
                        secondary_name: null,
                        secondary_education: null,
                        secondary_period_attendance_to: null,
                        secondary_period_attendance_from: null,
                        secondary_year_graduated: null,
                        vocationalcourse_name: null,
                        vocationalcourse_education: null,
                        vocationalcourse_period_attendance_to: null,
                        vocationalcourse_period_attendance_from: null,
                        vocationalcourse_year_graduated: null,
                        college_name: null,
                        college_education: null,
                        college_period_attendance_to: null,
                        college_period_attendance_from: null,
                        college_year_graduated: null,
                        graduatestudies_name: null,
                        graduatestudies_education: null,
                        graduatestudies_period_attendance_to: null,
                        graduatestudies_period_attendance_from: null,
                        graduatestudies_year_graduated: null,
                    }
                ],
                icoe_brgy: "",
                icoe_city: "",
                icoe_province: "",
                icoe_street: "",
                icoe_zip: "",
                remarks: "",

            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
