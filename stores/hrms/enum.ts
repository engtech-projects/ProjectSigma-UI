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
export const useHrmsEnumsStore = defineStore("enums", {
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
            localFilter: {
                project_code: "",
            },
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
        userEmployeeHeadsEnum: {
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
            },
            localFilters: {
                multi: {
                    filterType: "",
                    filterData: "",
                },
                atm: "",
                name: "",
            },
            successMessage: "",
            errorMessage: "",
        },
    }),

    getters: {
        filteredEmployeesList (state) : any[] {
            return state.allEmployeeEnum.list.filter((employee:any) => {
                return employee.fullname_last.toLowerCase().includes(state.allEmployeeEnum.localFilters.name.toLowerCase()) &&
                (
                    !state.allEmployeeEnum.localFilters.multi.filterType ||
                    (
                        state.allEmployeeEnum.localFilters.multi.filterType === "Department" &&
                        (
                            !state.allEmployeeEnum.localFilters.multi.filterData ||
                            employee.department?.id === state.allEmployeeEnum.localFilters.multi.filterData
                        )
                    ) ||
                    (
                        state.allEmployeeEnum.localFilters.multi.filterType === "Project" &&
                        (
                            !state.allEmployeeEnum.localFilters.multi.filterData ||
                            employee.project?.id === state.allEmployeeEnum.localFilters.multi.filterData
                        )
                    ) ||
                    (
                        state.allEmployeeEnum.localFilters.multi.filterType === "SalaryType" &&
                        (
                            !state.allEmployeeEnum.localFilters.multi.filterData ||
                            employee.current_employment?.salary_type === state.allEmployeeEnum.localFilters.multi.filterData ||
                            (
                                state.allEmployeeEnum.localFilters.multi.filterData === "Monthly" &&
                                employee.current_employment?.salary_type === "Fixed"
                            )
                        )
                    )
                ) &&
                (
                    !state.allEmployeeEnum.localFilters.atm ||
                    (
                        (state.allEmployeeEnum.localFilters.atm === "Yes" && employee.company_employments?.atm && employee.company_employments?.atm.toLowerCase() !== "n/a") ||
                        (state.allEmployeeEnum.localFilters.atm === "No" && (!employee.company_employments.atm || employee.company_employments?.atm.toLowerCase() === "n/a"))
                    )

                )
            })
        },
        headByPosition (state: any): any {
            return (positionName: any) => state.userEmployeeHeadsEnum.list.find((user: any) => {
                return user.employee.current_position === positionName
            })
        },
        filteredProjectsList (state) : any[] {
            return state.projectEnum.list.filter((project:any) => {
                return project.project_code.toLowerCase().includes(state.projectEnum.localFilter.project_code.toLowerCase())
            })
        }
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
        async getUserEmployeeHeadsEnums () {
            this.userEmployeeHeadsEnum.isLoaded = true
            await useHRMSApiO(
                "/api/enums/employee-heads",
                {
                    method: "GET",
                    params: this.userEmployeeHeadsEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.userEmployeeHeadsEnum.list = response._data.data ?? []
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
                    params: this.allEmployeeEnum.localFilters.multi,
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
