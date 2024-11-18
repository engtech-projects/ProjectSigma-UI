import { defineStore } from "pinia"

export interface Supplier {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export interface Employee {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export interface Users {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export interface Projects {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}

export interface Departments {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export const useAccountingEnumStore = defineStore("accountingEnums", {
    state: () => ({
        test: true,
        supplierEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Supplier[],
            params: {
                type: "supplier",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        employeeEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Employee[],
            params: {
                type: "employee",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        usersEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Users[],
            params: {
                type: "users",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        projectsEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Projects[],
            params: {
                type: "projects",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        departmentEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Departments[],
            params: {
                type: "department",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
    }),
    actions: {
        async getSupplierEnums () {
            this.supplierEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.supplierEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.supplierEnum.list = response._data.data.data
                            this.supplierEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getEmployeeEnums () {
            this.employeeEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.employeeEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.employeeEnum.list = response._data.data.data
                            this.employeeEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getProjectsEnums () {
            this.projectsEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.projectsEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.projectsEnum.list = response._data.data.data
                            this.projectsEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getDepartmentEnums () {
            this.departmentEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.departmentEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.departmentEnum.list = response._data.data.data
                            this.departmentEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getUsersEnums () {
            this.usersEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.usersEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.usersEnum.list = response._data.data.data
                            this.usersEnum.isLoaded = true
                        }
                    },
                }
            )
        },
    },
})
