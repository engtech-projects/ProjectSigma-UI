import { defineStore } from "pinia"
export const useEnumsStore = defineStore("enums", {
    state: () => ({
        positionEnum: {
            list: [],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        departmentEnum: {
            list: [],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        leaveEnum: {
            list: [],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        projectEnum: {
            list: [],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        salarygradeEnum: {
            list: [],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        userEmployeeEnum: {
            list: [],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        nonuserEmployeeEnum: {
            list: [],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        employeeEnum: {
            list: [],
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
            return state.employeeEnum.list.filter((employee:any) => {
                return employee.fullname_last.includes(state.employeeEnum.filter)
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
                            this.positionEnum.list = response._data.data.data
                        }
                    },
                }
            )
        },
        async getDepartmentEnums () {
            await useHRMSApiO(
                "/api/department-list",
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
        async getProjectEnum () {
            await useHRMSApiO(
                "/api/position/list",
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
                    params: this.nonuserEmployeeEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.nonuserEmployeeEnum.list = response._data.data.data
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
                    params: this.employeeEnum.params,
                    onResponseError: ({ response }) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.employeeEnum.list = response._data.data
                        }
                    },
                }
            )
        },
    },
})
