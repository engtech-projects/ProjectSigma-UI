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
    contract_name: string,
    contract_id: string,
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
    department: any,
    project: any,
}
export const useEnumsStore = defineStore("enums", {
    state: () => ({
        positionEnum: {
            list: [] as Position[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        departmentEnum: {
            list: [] as Department[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        leaveEnum: {
            list: [] as Leave[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        projectEnum: {
            list: [] as Project[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        salarygradeEnum: {
            list: [] as SalaryGrade[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        userEmployeeEnum: {
            list: [] as UserEmployee[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        allEmployeeEnum: {
            list: [] as Employee[],
            params: {
                filterType: "",
                filterData: "",
            },
            nameFilter: "",
            successMessage: "",
            errorMessage: "",
        },
    }),

    getters: {
        filteredEmployeesList (state) : any[] {
            return state.allEmployeeEnum.list.filter((employee:any) => {
                return employee.fullname_last.includes(state.allEmployeeEnum.nameFilter) &&
                (
                    !state.allEmployeeEnum.params.filterType ||
                    (
                        state.allEmployeeEnum.params.filterType === "Department" &&
                        (
                            !state.allEmployeeEnum.params.filterData ||
                            employee.department?.id === state.allEmployeeEnum.params.filterData
                        )
                    ) ||
                    (
                        state.allEmployeeEnum.params.filterType === "Project" &&
                        (
                            !state.allEmployeeEnum.params.filterData ||
                            employee.project?.id === state.allEmployeeEnum.params.filterData
                        )
                    )
                )
            })
        },
    },
    actions: {
        async getPositionEnums () {
            await useHRMSApiO(
                "/api/position/list",
                {
                    method: "GET",
                    params: this.positionEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.positionEnum.list = response._data.data
                        }
                    },
                }
            )
        },
        async getDepartmentEnums () {
            await useHRMSApiO(
                "/api/department/list",
                {
                    method: "GET",
                    params: this.departmentEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.departmentEnum.list = response._data.data
                        }
                    },
                }
            )
        },
        async getLeaveEnums () {
            await useHRMSApiO(
                "/api/position/list",
                {
                    method: "GET",
                    params: this.leaveEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.leaveEnum.list = response._data.data
                        }
                    },
                }
            )
        },
        async getProjectEnums () {
            await useHRMSApiO(
                "/api/project-monitoring/list",
                {
                    method: "GET",
                    params: this.projectEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.projectEnum.list = response._data.projects
                        }
                    },
                }
            )
        },
        async getSalarygradeEnums () {
            await useHRMSApiO(
                "/api/salary/list",
                {
                    method: "GET",
                    params: this.salarygradeEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.salarygradeEnum.list = response._data.data
                        }
                    },
                }
            )
        },
        async getUserEmployeeEnums () {
            await useHRMSApiO(
                "/api/employee/users-list",
                {
                    method: "GET",
                    params: this.userEmployeeEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.userEmployeeEnum.list = response._data.data
                        }
                    },
                }
            )
        },
        async getEmployeeEnum () {
            await useHRMSApiO(
                "/api/employee/list",
                {
                    method: "GET",
                    params: this.allEmployeeEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.allEmployeeEnum.list = response._data.data
                        }
                    },
                }
            )
        },
    },
})
