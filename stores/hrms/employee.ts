import { defineStore } from "pinia"
export const EMPLOYMENT_MOTHER = "mother"
export const EMPLOYMENT_FATHER = "father"
export const EMPLOYMENT_CONTACT_PERSON = "contact person"
export const EMPLOYMENT_SPOUSE = "spouse"
export const EMPLOYMENT_REFERENCE = "reference"
export const EMPLOYMENT_GUARDIAN = "guardian"
export const EMPLOYMENT_CHILD = "dependent/children"

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
    id: null | Number,
    name: String,
    employee_id: null | Number,
    zip: null | Number,
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

export interface EmployeeDTR {
    id: Number,
    dtr: Object,
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
    id: null | Number,
    employeedisplay_id: String,
    company: String,
    date_hired: String,
    position: String,
    department: String,
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
export interface EmployeeEducationModel {
    name: String,
    education: String,
    period_attendance_to: String,
    period_attendance_from: String,
    year_graduated: String,
    type:String,
    honors_received: String,
    employee_id: Number
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
export interface EmployeeInternal {
    id: Number,
    employee_id: Number,
    position: Object,
    employment_status: String,
    immediate_supervisor: String,
    actual_salary: String,
    work_location: String,
    hire_source: String,
    status: String,
    date_from: String,
    date_to: String,
    salary_grades: Number,
    department_id: Number,
    created_at: String,
    updated_at: String,
    deleted_at: String,
}
export interface EmployeeExternalwork {
    id: Number,
    employee_id: String,
    position_title: String,
    company_name: String,
    salary: String,
    status_of_appointment: String,
    date_from: String,
    date_to: String,
    created_at: String,
    updated_at: String,
    deleted_at: String,
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
export interface EmployeeSearch {
    employee_id: number,
    first_name: String,
    middle_name: String,
    last_name: String,
}
export interface DigitalSignature {
    id: null | number,
    url: string,
    image_type: string,
}
export interface LeaveCreditsData {
    leave_name: String,
    total_credits: Number,
    used: Number,
    balance: Number,
}
export interface EmployeeInformation {
value: any
    id: null | Number,
    employee_id: null | Number,
    profile_photo: DigitalSignature,
    digital_signature: DigitalSignature,
    first_name: String,
    middle_name: String,
    family_name: String,
    name_suffix: String,
    nick_name: String,
    cellphone: null | Number,
    land_line: null | Number,
    date_of_birth: String,
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
    employee_education_elementary:EmployeeEducationModel,
    employee_education_secondary: EmployeeEducationModel,
    employee_education_vocationalcourse: EmployeeEducationModel,
    employee_education_college: EmployeeEducationModel,
    employee_education_graduatestudies: Array<EmployeeGraduateStudiesEducationModel>,
    employee_eligibility: Array<EmploymentEligibility>,
    employee_seminartraining: Array<EmployeeSeminarTraining>,
    employee_internal: Array<EmployeeInternal>,
    employee_dtr: Array<EmployeeDTR>,
    employee_externalwork: Array<EmployeeExternalwork>,
    employee_address: Array<EmployeeAddress>,
    present_address: EmployeeAddress,
    permanent_address: EmployeeAddress,
    employment_records: Array<EmploymentRecord>,
    employee_affiliation: Array<EmployeeAffiliation>,
    employee_education: Array<EmploymentEducation>,
    company_employments: CompanyEmployments,
    employee_uploads: Array<EmployeeUpload>,
    leaveCredits: Array<LeaveCreditsData>,
}

export const useEmployeeInfo = defineStore("employee", {
    state: () => ({
        editable: false as boolean,
        spouseData: {} as Spouse,
        information: {
            id: null as null | Number,
            profile_photo: {
                id: null as null | number,
                url: "" as string,
                image_type: "" as string
            } as DigitalSignature,
            digital_signature: {
                id: null as null | number,
                url: "" as string,
                image_type: "" as string
            } as DigitalSignature,
            employee_id: null as null | Number,
            first_name: "" as String,
            middle_name: "" as String,
            family_name: "" as String,
            name_suffix: "" as String,
            nick_name: "" as String,
            cellphone: null as null | Number,
            land_line: null as null | Number,
            date_of_birth: "" as String,
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
            contact_person: {
                id: null,
                name: "",
                employee_id: null,
                zip: null,
                brgy: "",
                city: "",
                contact_no: "",
                date_of_birth: "",
                occupation: "",
                province: "",
                age: "",
                relationship: "",
                street: "",
                type: "",
                updated_at: "",
                created_at: "",
                deleted_at: "",
            } as RelatedPersonModel,
            masterstudies: [] as Array<StudiesModel>,
            doctorstudies: [] as Array<StudiesModel>,
            professionalstudies: [] as Array<StudiesModel>,
            employee_education_elementary: {} as EmployeeEducationModel,
            employee_education_secondary: {} as EmployeeEducationModel,
            employee_education_vocationalcourse: {} as EmployeeEducationModel,
            employee_education_college: {} as EmployeeEducationModel,
            employee_education_graduatestudies: [] as Array<EmployeeGraduateStudiesEducationModel>,
            employee_eligibility: [] as Array<EmploymentEligibility>,
            employee_seminartraining: [] as Array<EmployeeSeminarTraining>,
            employee_internal: [] as Array<EmployeeInternal>,
            employee_externalwork: [] as Array<EmployeeExternalwork>,
            employee_address: [] as Array<EmployeeAddress>,
            employment_records: [] as Array<EmploymentRecord>,
            employee_affiliation: [] as Array<EmployeeAffiliation>,
            employee_education: [] as Array<EmploymentEducation>,
            present_address: {
                id: null as null| Number,
                employee_id: null as null| Number,
                street: null as null| String,
                brgy: null as null| String,
                city: null as null| String,
                zip: null as null| String,
                province: null as null| String,
                type: null as null| String,
            } as EmployeeAddress,
            permanent_address: {
                id: null as null| Number,
                employee_id: null as null| Number,
                street: null as null| String,
                brgy: null as null| String,
                city: null as null| String,
                zip: null as null| String,
                province: null as null| String,
                type: null as null| String,
            } as EmployeeAddress,
            company_employments: {
                id: null,
                employeedisplay_id: "",
                company: "",
                date_hired: "",
                position: "",
                department: "",
                employee_id: "",
                imidiate_supervisor: "",
                pagibig_number: "",
                phic_number: "",
                sss_number: "",
                tin_number: "",
                created_at: "",
                updated_at: "",
                deleted_at: "",
            } as CompanyEmployments,
            employee_uploads: [] as Array<EmployeeUpload>,
            leaveCredits: [] as Array<LeaveCreditsData>
        } as EmployeeInformation,
        employeeIsSearched: false as Boolean,
        permanentAddressParams: {
            id: null as null| Number,
            employee_id: null as null| Number,
            street: null as null| String,
            brgy: null as null| String,
            city: null as null| String,
            zip: null as null| String,
            province: null as null| String,
            type: null as null| String,
        } as EmployeeAddress,
        presentAddressParams: {
            id: null as null| Number,
            employee_id: null as null| Number,
            street: null as null| String,
            brgy: null as null| String,
            city: null as null| String,
            zip: null as null| String,
            province: null as null| String,
            type: null as null| String,
        } as EmployeeAddress,
        errorMessage: "",
        successMessage: "",
        employeeList: [],
        filterAttendanceList: [],
        getParams: {},
    }),
    getters: {
        fullname (state) {
            if (!state.information) {
                return ""
            }
            return state.information.first_name + " " + (state.information.middle_name || "") + " " + state.information.family_name + " " + (state.information.name_suffix || "")
        },
        contactPersonAddress (state) {
            let contactAddress = ""
            if (!state.information) {
                return ""
            }
            if (state.information.contact_person) {
                contactAddress = state.information.contact_person.street + " " + state.information.contact_person.brgy + " " + state.information.contact_person.city + " " + state.information.contact_person.province
            }
            return contactAddress
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
        employeesList (state) {
            return state.employeeList.map((dpt:any) => {
                return {
                    id: dpt.id,
                    employee_id: dpt.employee_id,
                    first_name: dpt.first_name,
                    middle_name: dpt.middle_name,
                    last_name: dpt.last_name,
                }
            })
        }
    },
    actions: {
        async getEmployeeList () {
            const { data, error } = await useHRMSApi(
                "/api/employee/list",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.employeeList = response._data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async uploadDoc (formData : FormData) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/uploads",
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
            const { data, error } = await useHRMSApi<any>(
                "/api/employee/resource/" + id,
                {
                    method: "GET",
                    watch: false,
                }
            )
            if (error.value) {
                return error
            } else if (data.value) {
                this.employeeIsSearched = true
                this.information = data.value.data
                return data
            }
        },
        async getPublicEmployeeInformation (id : Number) {
            this.$reset()
            const { data, error } = await useHRMSApi<any>(
                "/api/employee/resource/v2/" + id,
                {
                    method: "GET",
                    watch: false,
                }
            )
            if (error.value) {
                return error
            } else if (data.value) {
                this.employeeIsSearched = true
                this.information = data.value.data
                return data
            }
        },
        async getLeaveCredits (id: Number) {
            await useHRMSApiO(
                "/api/employee/leave-credits/" + id,
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.information.leaveCredits = response._data.data
                            this.successMessage = response._data.message
                            return response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async saveRelatedPerson (formData : FormData) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/relatedperson",
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async updateRelatedPerson (formData : FormData, id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/relatedperson/" + id,
                {
                    method: "PUT",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async deleteRelatedPerson (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/relatedperson/" + id,
                {
                    method: "DELETE",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async updateEmployeeInformation (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/resource/" + id,
                {
                    method: "PUT",
                    body: this.information,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async saveEmployeeAddress (params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/address",
                {
                    method: "POST",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async updateEmployeeAddress (id: any, params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/address/" + id,
                {
                    method: "PUT",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async saveEmployeeSchool (params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/education",
                {
                    method: "POST",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async updateEmployeeSchool (id: any, params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/education/" + id,
                {
                    method: "PUT",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async deleteEmployeeSchool (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/address/" + id,
                {
                    method: "DELETE",
                    body: this.permanentAddressParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async updateEmployeeCompanyInfo (params: any, id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/companyemployment/" + id,
                {
                    method: "PUT",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async saveEmployeeCompanyInfo (params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/companyemployment",
                {
                    method: "POST",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async saveDigitalSignatureUpload (params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/images/upload/digital-signature/" + this.information.id,
                {
                    method: "POST",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async saveEmployeeProfilePicture (params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/images/upload/profile-picture/" + this.information.id,
                {
                    method: "POST",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async saveUpdateSeminarTraining (params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/seminartraining",
                {
                    method: "POST",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async updateSeminarTraining (formData: any, id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/relatedperson/" + id,
                {
                    method: "PUT",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async deleteSeminarTraining (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/seminartraining/" + id,
                {
                    method: "DELETE",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async saveUpdateExternalCareerData (params: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/seminartraining",
                {
                    method: "POST",
                    body: params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async updateExternalCareer (formData: any, id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/relatedperson/" + id,
                {
                    method: "PUT",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async deleteExternalCareer (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/employee/seminartraining/" + id,
                {
                    method: "DELETE",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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
        async getEmployeeDTR (employeeId: number, start:string, end:string) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance/dtr?employee_id=" + employeeId + "&cutoff_start=" + start + "&cutoff_end=" + end,
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.information.employee_dtr = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
