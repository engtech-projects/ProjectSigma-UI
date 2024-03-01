import { defineStore } from "pinia"

const { token } = useAuth()
const config = useRuntimeConfig()

export interface EmploymentInformation {
    company_name: String,
    immediate_superior: Array<{
        name: String,
        contact: String,
    }>,
    dates: Array<{
        from: String,
        to: String,
    }>,
    salary: Array<{
        start: Number,
        final: Number
    }>,
    address: Array<{
        id: Number,
        employee_id: Number,
        street: String,
        brgy: String,
        city: String,
        zip: String,
        province: String,
        type: String,
    }>,
    telephone_number: Number,
    position: String,
    duties_responsibilities: String,
    reason_for_leaving: String,
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
export interface Parents {
    father_name: String,
    mother_name: String,
}
export interface Children {
    id: Number,
    employee_id: Number,
    zip: Number,
    brgy: String,
    city: String,
    contact_no: String,
    date_of_birth: String,
    occupation: String,
    province: String,
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
export interface EmployeeRelatedPerson {
    id: Number,
    employee_id: Number,
    relationship: String,
    type: String,
    name: String,
    date_of_birth: String,
    street: String,
    brgy: String,
    city: String,
    zip: String,
    province: String,
    occupation: String,
    contact_no: String,
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
export interface EmployeeInformation {
    id: Number,
    employee_id: Number,
    first_name: String,
    middle_name: String,
    family_name: String,
    name_suffix: String,
    nick_name: String,
    cellphone: Number,
    land_line: Number,
    birthday: String
    place_of_birth: String,
    date_of_marriage: String,
    citizenship: String,
    blood_type: String,
    gender: String,
    religion: String,
    civil_status: String,
    height: String,
    weight: String,
    child: Array<Children>,
    employee_address: Array<EmployeeAddress>,
    contact_person: Array<EmployeeRelatedPerson>,
    employment_records: Array<EmploymentRecord>,
    employee_affiliation: Array<EmployeeAffiliation>,
    employee_education: Array<EmploymentEducation>,
    employment_eligibility: Array<EmploymentEligibility>,
    company_employments: Array<CompanyEmployments>,
    employee_uploads: Array<EmployeeUpload>
    employee_seminartraining: Array<EmployeeSeminarTraining>
}

export interface EmployeeSearch {
    employee_id: number,
    first_name: String,
    middle_name: String,
    last_name: String,
}
export const useEmployeeInfo = defineStore("employee", {
    state: () => ({
        information: {} as EmployeeInformation,
        employeeIsSearched: false as Boolean,
        employeeSearchList: {} as Array<EmployeeSearch>,
        searchEmployeeParams: {
            key: "",
        },
    }),
    getters: {
        fullname (state) {
            if (!state.information) {
                return ""
            }
            return state.information.first_name + " " + (state.information.middle_name || "") + " " + state.information.family_name + " " + (state.information.name_suffix || "")
        },
        presentAddress (state) {
            let preAddress = null
            if (!state.information) {
                return ""
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
        permanentAddress (state) {
            let perAddress = null
            if (!state.information) {
                return ""
            }
            if (state.information.employee_address) {
                state.information.employee_address.forEach((item) => {
                    if (item.type === "present") {
                        perAddress = item
                    }
                })
            }
            return perAddress
        },
        childrenInformation (state) {
            if (!state.information) {
                return ""
            }
            if (state.information.child) {
                return state.information.child
            }
        },
    },
    actions: {
        async searchEmployees () {
            this.employeeSearchList = [] as Array<EmployeeSearch>
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
