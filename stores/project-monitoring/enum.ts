import { defineStore } from "pinia"
export interface Position {
    id: number,
    name: string,
    position_type: string,
}
export interface Department {
    id: number,
    department_name: string,
}
export interface Leave {
    id: number,
    fullname_last: string,
}
export interface Project {
    id: number,
    project_monitoring_id: number,
    project_code: string,
    status: string,
    contract_name: string,
    contract_id: string,
    projects: {
        id: number,
        project_code: string,
        contract_name: string,
        contract_id: string,
        completion_status: string,
    },
}
export interface SalaryGrade {
    id: number,
    salary_grade_level: string,
    step_name: string,
}
export interface UserEmployee {
    id: Number | null,
    name: String,
    email: String,
    type: String,
    password: String,
    accessibilities: Array<number>,
    accessibilities_name: Array<String>,
    employee_id: Number | null,
    employee_details: Object,
    employee: any,
}
export interface Employee {
    id: number,
    fullname_last: string,
    fullname_first: string,
    department: any,
    project: any,
}
export const useProjectEnumsStore = defineStore("enums", {
    state: () => ({
        projectEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Project[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
    }),

    getters: {
    },
    actions: {
        async getProjectEnums () {
            this.projectEnum.isLoaded = true
            await useProjectsApiO(
                "/api/projects",
                {
                    method: "GET",
                    params: this.projectEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.projectEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
    },
})
