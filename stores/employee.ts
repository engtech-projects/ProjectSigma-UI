import { defineStore } from "pinia"

const { token } = useAuth()
const config = useRuntimeConfig()

// export interface StaffInformationSheet {
//     companyInformation: Array<{
//         company: String,
//         date_hired: String,
//         employment_status: String,
//         position: String,
//         section_program: String,
//         department: String,
//         division: String,
//         imidiate_supervisor: String,
//         phic_number: String,
//         sss_number: String,
//         tin_number: String,
//         pagibig_number: String,
//     }>,
//     personalInformation: Array<{
//         employee_id: String,
//         family_name: String,
//         first_name: String,
//         middle_name: String,
//         blood_type: String,
//         civil_status: String,
//         date_of_birth: String,
//         gender: String,
//         father_name: String,
//         mother_name: String,
//         telephone_number: String,
//         religion: String,
//         mobile_number: String,
//     }>
// }

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
    address: String,
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
export interface Address {
    present_address: Array<{
        street: String,
        barangay: String,
        city: String,
        zipcode: number,
        province: String,
    }>
    permanent_address: Array<{
        street: String,
        barangay: String,
        city: String,
        zipcode: number,
        province: String,
    }>,
}
export interface Parents {
    father_name: String,
    mother_name: String
}
export interface Children {
    name: String,
    birthday: String
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
export interface Education {
    type: String,
    name: String,
    degree: String,
    dates_from: String,
    dates_to: String,
}
export interface Employement {
    department: String,
    id: Number,
    employee_id: Number,
    position: String,
    employment_status: String,
    section_program: String,
    created_at: String,
    updated_at: String,
    deleted_at: String,
}
export interface CompanyEmployments {
    company: String,
    date_hired: String,
    employee_id: Number,
    id: Number,
    imidiate_supervisor: Number,
    pagibig_number: Number,
    sss_number: Number,
    tin_number: Number,
    phic_number: Number,
    employeedisplay_id: String,
    created_at: String,
    updated_at: String,
    deleted_at: String,
}
export interface EmployeeInformation {
    employee_id: number,
    first_name: String,
    middle_name: String,
    last_name: String,
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
    phil_health: String,
    pag_ibig: String,
    tin: String,
    sss: String,
    employment_records: Array<Employement>
    company_employments: Array<CompanyEmployments>
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
        employeeSearchList: {} as Array<EmployeeSearch>,
        searchEmployeeParams: {
            key: "",
        },
    }),
    getters: {

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
                this.information = data.value.data
                return data
            } else if (error.value) {
                return error
            }
        },
    },
})
