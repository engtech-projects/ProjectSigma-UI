import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export interface User {
    name: String,
    email: String,
    type: String,
    accessibilities: Array<number>,
    accessibilities_name: Array<String>,
    employee_details: Object,
}

export const useUserStore = defineStore("users", {
    state: () => ({
        isEdit: false,
        list: [],
        employeeUserList: [] as Array<User>,
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getUserEmployees () {
            await useFetch(
                "/api/users-employees-list",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.employeeUserList = response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        }
    },
})
