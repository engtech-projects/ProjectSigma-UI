import { defineStore } from "pinia"

export interface EmployeeSearch {
    employee_id: number,
    first_name: String,
    middle_name: String,
    last_name: String,
}
export const useEmployeeSearch = defineStore("employeeSearchStore", {
    state: () => ({
        searchResultList: [] as EmployeeSearch[],
        employeesWithoutAccount: {
            isLoading: false,
            list: [] as EmployeeSearch[],
            params: {
                key: "",
                type: "NoAccounts",
            }
        },
        employeesWithAccount: {
            isLoading: false,
            list: [] as EmployeeSearch[],
            params: {
                key: "",
                type: "WithAccounts",
            }
        },
        employeesAll: {
            isLoaded: false,
            isLoading: false,
            list: [] as EmployeeSearch[],
            params: {
                key: "",
                type: "AllEmployees",
            }
        },
    }),
    getters: {
    },
    actions: {
        async searchEmployees () {
            this.employeesAll.isLoaded = true
            await useHRMSApi(
                "/api/employee/search",
                {
                    method: "POST",
                    body: this.employeesAll.params,
                    onRequest: () => {
                        this.employeesAll.isLoading = true
                    },
                    onResponse: ({ response }: any) => {
                        this.employeesAll.isLoading = false
                        if (response.ok) {
                            this.employeesAll.list = response._data?.data
                        } else {
                            this.employeesAll.list = [] as EmployeeSearch[]
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async searchEmployeesNoAccount () {
            await useHRMSApi(
                "/api/employee/search",
                {
                    method: "POST",
                    body: this.employeesWithoutAccount.params,
                    onRequest: () => {
                        this.employeesWithoutAccount.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.employeesWithoutAccount.isLoading = false
                        if (response.ok) {
                            this.employeesWithoutAccount.list = response._data?.data
                        } else {
                            this.employeesWithoutAccount.list = [] as EmployeeSearch[]
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async searchEmployeesWithAccount () {
            await useHRMSApi(
                "/api/employee/search",
                {
                    method: "POST",
                    body: this.employeesWithAccount.params,
                    onRequest: () => {
                        this.employeesWithAccount.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.employeesWithAccount.isLoading = false
                        if (response.ok) {
                            this.employeesWithAccount.list = response._data?.data
                        } else {
                            this.employeesWithAccount.list = [] as EmployeeSearch[]
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
