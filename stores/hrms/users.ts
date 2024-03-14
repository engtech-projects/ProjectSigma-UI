import { defineStore } from "pinia"

export interface User {
    name: String,
    email: String,
    type: String,
    password: String,
    accessibilities: Array<number>,
    accessibilities_name: Array<String>,
    employee_id: Number | null,
    employee_details: Object,
}

export const useUserStore = defineStore("users", {
    state: () => ({
        isEdit: false,
        list: [],
        createData: {
            params: {
                name: "",
                email: "",
                password: "",
                accessibilities: [] as Array<number>,
                employee_id: null,
                employee_details: {} as Object,
                accessibilities_name: [] as Array<String>,
                type: "",
            } as User,
            errorMessage: "",
            successMessage: "",
        },
        editData: {
            params: {
                name: "",
                email: "",
                password: "",
                accessibilities: [] as Array<number>,
                employee_id: null,
                employee_details: {} as Object,
                accessibilities_name: [] as Array<String>,
                type: "",
            } as User,
            errorMessage: "",
            successMessage: "",
        }
        employeeUserList: [] as Array<User>,
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getUserEmployees () {
            await useHRMSApi(
                "/api/users-employees-list",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) { // Success
                            this.employeeUserList = response._data.data
                        } else { // Error
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async createEmployeeAccount () {
            await useHRMSApiO(
                "/api/users",
                {
                    method: "POST",
                    params: this.createData.params,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.createData.successMessage = response._data.message
                            return response._data
                        } else {
                            this.createData.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
