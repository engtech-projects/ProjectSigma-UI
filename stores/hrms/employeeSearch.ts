import { defineStore } from "pinia"

const { token } = useAuth()
const config = useRuntimeConfig()

export interface EmployeeSearch {
    employee_id: number,
    first_name: String,
    middle_name: String,
    last_name: String,
}
export const useEmployeeSearch = defineStore("employee", {
    state: () => ({
        searchEmployeeParams: {
            key: "",
            type: "AllEmployees"
        },
        searchEmployeeParamsNoAccount: {
            key: "",
            type: "NoAccounts",
        },
        searchResultList: [] as EmployeeSearch[],
    }),
    getters: {
    },
    actions: {
        async searchEmployees () {
            this.searchResultList = [] as EmployeeSearch[]
            await useHRMSApi(
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
                            this.searchResultList = response._data?.data
                        } else {
                            this.searchResultList = [] as EmployeeSearch[]
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async searchEmployeesNoAccount () {
            this.searchResultList = [] as EmployeeSearch[]
            await useHRMSApi(
                "/api/employee-search",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.searchEmployeeParamsNoAccount,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.searchResultList = response._data?.data
                        } else {
                            this.searchResultList = [] as EmployeeSearch[]
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
