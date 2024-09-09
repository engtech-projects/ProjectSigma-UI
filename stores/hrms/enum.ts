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
export const useEnumsStore = defineStore("enums", {
    state: () => ({
        positionEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Position[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        departmentEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Department[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        leaveEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Leave[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        projectEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Project[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        salarygradeEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as SalaryGrade[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        userEmployeeEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as UserEmployee[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        allEmployeeEnum: {
            isLoading: false,
            isLoaded: false,
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
                return employee.fullname_last.toLowerCase().includes(state.allEmployeeEnum.nameFilter.toLowerCase()) &&
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
                    ) ||
                    (
                        state.allEmployeeEnum.params.filterType === "SalaryType" &&
                        (
                            !state.allEmployeeEnum.params.filterData ||
                            employee.current_employment?.salary_type === state.allEmployeeEnum.params.filterData ||
                            (
                                state.allEmployeeEnum.params.filterData === "Monthly" &&
                                employee.current_employment?.salary_type === "Fixed"
                            )
                        )
                    )
                )
            })
        },
    },
    actions: {
        async getPositionEnums () {
            this.positionEnum.isLoaded = true
            await useHRMSApiO(
                "/api/position/list",
                {
                    method: "GET",
                    params: this.positionEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.positionEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
        async getDepartmentEnums () {
            this.departmentEnum.isLoaded = true
            await useHRMSApiO(
                "/api/department/list",
                {
                    method: "GET",
                    params: this.departmentEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.departmentEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
        async getLeaveEnums () {
            this.leaveEnum.isLoaded = true
            await useHRMSApiO(
                "/api/leave/list",
                {
                    method: "GET",
                    params: this.leaveEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.leaveEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
        async getProjectEnums () {
            this.projectEnum.isLoaded = true
            await useHRMSApiO(
                "/api/project-monitoring/list",
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
        async getSalarygradeEnums () {
            this.salarygradeEnum.isLoaded = true
            await useHRMSApiO(
                "/api/salary/list",
                {
                    method: "GET",
                    params: this.salarygradeEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.salarygradeEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
        async getUserEmployeeEnums () {
            this.userEmployeeEnum.isLoaded = true
            await useHRMSApiO(
                "/api/employee/users-list",
                {
                    method: "GET",
                    params: this.userEmployeeEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.userEmployeeEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
        async getEmployeeEnum () {
            this.allEmployeeEnum.isLoaded = true
            await useHRMSApiO(
                "/api/employee/list",
                {
                    method: "GET",
                    params: this.allEmployeeEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.allEmployeeEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
    },
})
