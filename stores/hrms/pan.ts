import { defineStore } from "pinia"

export interface ApprovalModel {
    id: Number,
    form: String,
    approvals: String,
    deleted_at: String,
    created_at: String,
    updated_at: String,
}
export interface PersonelActionNotice {
    id: Number,
    employee_id: Number,
    type: String,
    date_of_effictivity: String,
    section_department: String,
    designation_position: String,
    hire_source: String,
    work_location: String,
    new_section: String,
    new_location: String,
    new_employment_status: String,
    employement_status: String,
    employment_status: String,
    comment: String,
    new_position: String,
    type_of_termination: String,
    reasons_for_termination: String,
    eligible_for_rehire: String,
    last_day_worked: String,
    approvals: Array<ApprovalModel>,
    new_salary_grades: String,
    pan_job_applicant_id: Number,
    salary_grades: Number,
    salary_type: String,
    deleted_at: String,
    created_at: String,
    updated_at: String,
    created_by: String,
}

export const usePersonelActionNotice = defineStore("personelActionNotice", {
    state: () => ({
        personelActionNotice: {
            id: null as null | Number,
            employee_id: null as null | Number,
            type: "" as String,
            date_of_effictivity: "" as String,
            section_department: "" as String,
            designation_position: "" as String,
            hire_source: "" as String,
            work_location: "" as String,
            new_section: "" as String,
            new_location: "" as String,
            new_employment_status: "" as String,
            employement_status: "" as String,
            new_position: "" as String,
            type_of_termination: "" as String,
            reasons_for_termination: "" as String,
            eligible_for_rehire: "" as String,
            last_day_worked: "" as String,
            approvals: [] as Array<ApprovalModel>,
            new_salary_grades: "" as String,
            pan_job_applicant_id: null as null | Number,
            salary_grades: null as null | Number,
            salary_type: "" as String,
            deleted_at: "" as String,
            created_at: "" as String,
            updated_at: "" as String,
            created_by: "" as String,
        } as PersonelActionNotice,
        errorMessage: "",
        successMessage: "",
        errorHandler: [],
    }),
    actions: {
        async savePan () {
            this.successMessage = ""
            this.errorMessage = ""
            const requestData = JSON.parse(JSON.stringify(this.personelActionNotice))
            requestData.approvals = JSON.stringify(requestData.approvals)
            await useHRMSApi(
                "/api/employee-panrequest",
                {
                    method: "POST",
                    body: requestData,
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
        async getAllPan () {
            this.successMessage = ""
            this.errorMessage = ""
            const requestData = JSON.parse(JSON.stringify(this.personelActionNotice))
            requestData.approvals = JSON.stringify(requestData.approvals)
            await useHRMSApi(
                "/api/employee-panrequest",
                {
                    method: "POST",
                    body: requestData,
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
        async getPanApprovals () {
            this.successMessage = ""
            this.errorMessage = ""
            const requestData = JSON.parse(JSON.stringify(this.personelActionNotice))
            requestData.approvals = JSON.stringify(requestData.approvals)
            await useHRMSApi(
                "/api/get-pan-approvals",
                {
                    method: "POST",
                    body: requestData,
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
        async myPanRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            const requestData = JSON.parse(JSON.stringify(this.personelActionNotice))
            requestData.approvals = JSON.stringify(requestData.approvals)
            await useHRMSApi(
                "/api/get-panrequest",
                {
                    method: "POST",
                    body: requestData,
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
    },
})
