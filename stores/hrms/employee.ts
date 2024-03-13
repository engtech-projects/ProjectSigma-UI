import { defineStore } from "pinia"

const { token } = useAuth()
const config = useRuntimeConfig()
export interface Data {
    value : Array<{
        data: Array<{}>,
        message: String,
    }>
}
export interface Memos {
    name: String,
}
export interface Documents {
    Name: String,
}
export interface EmployeeAddress {
    id: Number,
    employee_id: Number,
    street: String,
    brgy: String,
    city: String,
    zip: String,
    province: String,
    type: String,
}
export interface RelatedPersonModel {
    id: Number,
    name:Number,
    employee_id: Number,
    zip: Number,
    brgy: String,
    city: String,
    contact_no: String,
    date_of_birth: String,
    occupation: String,
    province: String,
    age:String,
    relationship: String,
    street: String,
    type: String,
    updated_at: String,
    created_at: String,
    deleted_at: String,
}
export interface EmployeeAffiliation {
    id: Number,
    employee_id: Number,
    club_organization_name: String,
    membership_type: String,
    status: String,
    membership_exp_date: String,
}
export interface Contact_of_emergency {
    name: String,
    address: String,
    telephone: String,
    relationship: String,
}
export interface Hospitalization {
    is_previous_hospitalization: Boolean,
    previous_hospitalization_illness: String,
    is_previous_operations: Boolean,
    previous_operation_illness: String,
}
export interface Conviction {
    is_convicted: Boolean,
    offense: String
}
export interface DismissalInformation {
    is_dismissed: Boolean,
    offense: String,
}
export interface Spouse {
    name: String,
    birthdate: String,
}
export interface AdministrativeCaseInformation {
    is_administrative_case: Boolean,
    offense: String,
}
export interface Company_family_members {
    name: String,
    relationship: String,
    position: String
}
export interface EmployeeEducationModel {

}
export interface EmploymentRecord {
    id: Number,
    employee_id: Number,
    employment_status: String,
    position: String,
    department: String,
    division: String,
    section_program: String,
}
export interface EmploymentEligibility {
    id: Number,
    employee_id: Number,
    program_module: String,
    certificate_lvl: String,
    status: String,
    cert_exp_date: String,
}

export interface CompanyEmployments {
    id: Number,
    employeedisplay_id: String,
    company: String,
    date_hired: String,
    employee_id: String,
    imidiate_supervisor: String,
    pagibig_number: String,
    phic_number: String,
    sss_number: String,
    tin_number: String,
    created_at: String,
    updated_at: String,
    deleted_at: String,
}

export interface EmployeeSeminarTraining {
    id: Number,
    employee_id: Number,
    name_title_training: String,
    inclusive_dates: String,
    venue: String,
    training_provider: String,
}
export interface EmployeeUpload {
    id: Number,
    employee_uploads: Number,
    employee_id: String,
    upload_type: String,
    file_location: String,
}
export interface EmployeeElementaryEducationModel {
    elementary_name: String,
    elementary_education: String,
    elementary_period_attendance_to: String,
    elementary_period_attendance_from: String,
    elementary_year_graduated: String,
}
export interface EmployeeSecondaryEducationModel {
    secondary_name: String,
    secondary_education: String,
    secondary_period_attendance_to: String,
    secondary_period_attendance_from: String,
    secondary_year_graduated: String,
}
export interface EmployeeVocationalEducationModel {
    vocationalcourse_name: String,
    vocationalcourse_education: String,
    vocationalcourse_period_attendance_to: String,
    vocationalcourse_period_attendance_from: String,
    vocationalcourse_year_graduated: String,
}
export interface EmployeeCollegeEducationModel {
    college_name: String,
    college_education: String,
    college_period_attendance_to: String,
    college_period_attendance_from: String,
    college_year_graduated: String,
}
export interface EmployeeGraduateStudiesEducationModel {
    college_name: String,
    college_education: String,
    college_period_attendance_to: String,
    college_period_attendance_from: String,
    college_year_graduated: String,
}
export interface StudiesModel {
    id: Number,
    employee_id: Number,
    date: String,
    title: String,
    type: String,
    created_at: String,
    deleted_at: String,
    updated_at: String,
}
export interface EmploymentEducation {
    id: Number,
    employee_id: Number,
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

export interface EmployeeInformation {
    id: null | Number,
    employee_id: null | Number,
    first_name: String,
    middle_name: String,
    family_name: String,
    name_suffix: String,
    nick_name: String,
    cellphone: null | Number,
    land_line: null | Number,
    birthday: String,
    place_of_birth: String,
    date_of_marriage: String,
    citizenship: String,
    blood_type: String,
    gender: String,
    religion: String,
    civil_status: String,
    height: String,
    weight: String,
    child: Array<RelatedPersonModel>,
    spouse: Array<RelatedPersonModel>,
    father: RelatedPersonModel,
    mother: RelatedPersonModel,
    contact_person: RelatedPersonModel,
    masterstudies: Array<StudiesModel>,
    doctorstudies: Array<StudiesModel>,
    professionalstudies: Array<StudiesModel>,
    employee_education_elementary: Array<EmployeeElementaryEducationModel>,
    employee_education_secondary: Array<EmployeeSecondaryEducationModel>,
    employee_education_vocationalcourse: Array<EmployeeVocationalEducationModel>,
    employee_education_college: Array<EmployeeCollegeEducationModel>,
    employee_education_graduatestudies: Array<EmployeeGraduateStudiesEducationModel>,
    employee_eligibility: Array<EmploymentEligibility>,
    employee_seminartraining: Array<EmployeeSeminarTraining>,
    employee_address: Array<EmployeeAddress>,
    employment_records: Array<EmploymentRecord>,
    employee_affiliation: Array<EmployeeAffiliation>,
    employee_education: Array<EmploymentEducation>,
    company_employments: Array<CompanyEmployments>,
    employee_uploads: Array<EmployeeUpload>
}

export interface EmployeeSearch {
    employee_id: number,
    first_name: String,
    middle_name: String,
    last_name: String,
}
export const useEmployeeInfo = defineStore("employee", {
    state: () => ({
        spouseData: {} as Spouse,
        information: {
            id: null as null | Number,
            employee_id: null as null | Number,
            first_name: "" as String,
            middle_name: "" as String,
            family_name: "" as String,
            name_suffix: "" as String,
            nick_name: "" as String,
            cellphone: null as null | Number,
            land_line: null as null | Number,
            birthday: "" as String,
            place_of_birth: "" as String,
            date_of_marriage: "" as String,
            citizenship: "" as String,
            blood_type: "" as String,
            gender: "" as String,
            religion: "" as String,
            civil_status: "" as String,
            height: "" as String,
            weight: "" as String,
            child: [] as Array<RelatedPersonModel>,
            spouse: [] as Array<RelatedPersonModel>,
            father: {} as RelatedPersonModel,
            mother: {} as RelatedPersonModel,
            contact_person: {} as RelatedPersonModel,
            masterstudies: [] as Array<StudiesModel>,
            doctorstudies: [] as Array<StudiesModel>,
            professionalstudies: [] as Array<StudiesModel>,
            employee_education_elementary: [] as Array<EmployeeElementaryEducationModel>,
            employee_education_secondary: [] as Array<EmployeeSecondaryEducationModel>,
            employee_education_vocationalcourse: [] as Array<EmployeeVocationalEducationModel>,
            employee_education_college: [] as Array<EmployeeCollegeEducationModel>,
            employee_education_graduatestudies: [] as Array<EmployeeGraduateStudiesEducationModel>,
            employee_eligibility: [] as Array<EmploymentEligibility>,
            employee_seminartraining: [] as Array<EmployeeSeminarTraining>,
            employee_address: [] as Array<EmployeeAddress>,
            employment_records: [] as Array<EmploymentRecord>,
            employee_affiliation: [] as Array<EmployeeAffiliation>,
            employee_education: [] as Array<EmploymentEducation>,
            company_employments: [] as Array<CompanyEmployments>,
            employee_uploads: [] as Array<EmployeeUpload>
        } as EmployeeInformation,
        employeeIsSearched: false as Boolean,
        employeeSearchList: {} as Array<EmployeeSearch>,
        searchEmployeeParams: {
            key: "",
            type: "AllEmployees",
        },
        errorMessage: "",
        successMessage: "",
    }),
    getters: {
        fullname (state) {
            if (!state.information) {
                return ""
            }
            return state.information.first_name + " " + (state.information.middle_name || "") + " " + state.information.family_name + " " + (state.information.name_suffix || "")
        },
        presentAddress (state) {
            let preAddress = ""
            if (!state.information) {
                return ""
            }
            if (state.information.employee_address) {
                state.information.employee_address.forEach((item) => {
                    if (item.type === "present") {
                        preAddress = item.street + " " + item.brgy + " " + item.city + " " + item.province
                    }
                })
            }
            return preAddress
        },
        permanentAddress (state) {
            let perAddress = ""
            if (!state.information) {
                return ""
            }
            if (state.information.employee_address) {
                state.information.employee_address.forEach((item) => {
                    if (item.type === "both" || item.type === "permanent") {
                        perAddress = item.street + " " + item.brgy + " " + item.city + " " + item.province
                    }
                })
            }
            return perAddress
        },
        presentAddressData (state) {
            let preAddress = {} as EmployeeAddress
            if (!state.information) {
                return preAddress
            }
            if (state.information.employee_address) {
                state.information.employee_address.forEach((item) => {
                    if (item.type === "present") {
                        preAddress = item
                    }
                })
            }
            return preAddress
        },
        permanentAddressData (state) {
            let perAddress = {} as EmployeeAddress
            if (!state.information) {
                return ""
            }
            if (state.information.employee_address) {
                state.information.employee_address.forEach((item) => {
                    if (item.type === "both" || item.type === "permanent") {
                        perAddress = item
                    }
                })
            }
            return perAddress
        },
        childrenInformation (state) {
            const childrenData = {} as RelatedPersonModel
            if (!state.information) {
                return childrenData
            }
            if (state.information.child) {
                return state.information.child
            }
        },
        spouseInformation (state) {
            if (!state.information) {
                return {} as RelatedPersonModel
            }
            return state.information.spouse
        },
    },
    actions: {
        async searchEmployees () {
            await useFetch(
                "/api/employee-search",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.searchEmployeeParams,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.employeeSearchList = response._data?.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async uploadDoc (formData : FormData) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee-uploads",
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getEmployeeInformation (id : Number) {
            this.$reset()
            const { data, error } = await useFetch(
                "/api/employee/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                }
            )
            if (data.value) {
                this.employeeIsSearched = true
                this.information = data.value.data
                return data
            } else if (error.value) {
                return error
            }
        },
    },
})
