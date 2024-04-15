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
    fullname_last: string,
}
export interface SalaryGrade {
    id: number,
    fullname_last: string,
}
export interface UserEmployee {
    name: String,
    email: String,
    type: String,
    password: String,
    accessibilities: Array<number>,
    accessibilities_name: Array<String>,
    employee_id: Number | null,
    employee_details: Object,
}
export interface Employee {
    id: number,
    fullname_last: string,
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
            filter: "",
            successMessage: "",
            errorMessage: "",
        },
    }),

    getters: {
        filteredEmployeesList (state) : any[] {
            return state.allEmployeeEnum.list.filter((employee:any) => {
                return employee.fullname_last.includes(state.allEmployeeEnum.filter)
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
                            this.leaveEnum.list = response._data.data.data
                        }
                    },
                }
            )
        },
        async getProjectEnums () {
            await useProjectsApiO(
                "/api/projects/list",
                {
                    method: "GET",
                    params: this.projectEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.projectEnum.list = response._data.data
                        }
                    },
                }
            )
        },
        async getSalarygradeEnum () {
            await useHRMSApiO(
                "/api/position/list",
                {
                    method: "GET",
                    params: this.salarygradeEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.salarygradeEnum.list = response._data.data.data
                        }
                    },
                }
            )
        },
        async getUserEmployeeEnum () {
            await useHRMSApiO(
                "/api/position/list",
                {
                    method: "GET",
                    params: this.userEmployeeEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.userEmployeeEnum.list = response._data.data.data
                        }
                    },
                }
            )
        },
        async getNonuserEmployeeEnum () {
            await useHRMSApiO(
                "/api/position/list",
                {
                    method: "GET",
                    params: this.allEmployeeEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.allEmployeeEnum.list = response._data.data.data
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
                    onResponseError: ({ response }) => {
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
