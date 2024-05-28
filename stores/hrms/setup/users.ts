import { defineStore } from "pinia"
export const USER_ADMINISTRATOR = "Administrator"

export interface User {
    id: number | null,
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
                id: null,
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
                id: null,
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
        editCurrent: {
            params: {
                name: "",
                email: "",
                password: "",
                confirm_password: "",
                current_password: "",
                typechange: "",
            },
            errorMessage: "",
            successMessage: "",
        },
        employeeUserList: [] as Array<User>,
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async createEmployeeAccount () {
            this.createData.params.accessibilities = this.editData.params.accessibilities
            await useHRMSApiO(
                "/api/users",
                {
                    method: "POST",
                    body: this.createData.params,
                    onResponse: ({ response } : any) => {
                        if (response.ok) {
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
        async editEmployeeAccount () {
            await useHRMSApiO(
                "/api/users/" + this.editData.params.id,
                {
                    method: "PATCH",
                    body: this.editData.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.editData.successMessage = response._data.message
                            return response._data
                        } else {
                            this.editData.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getEmployeeAccount (id: Number) {
            await useHRMSApiO(
                "/api/user-account-by-employee-id/" + id,
                {
                    method: "GET",
                    params: id,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.editData.params = response._data.data
                            return response._data
                        } else {
                            this.editData.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async editCurrentUser () {
            await useHRMSApiO(
                "/api/update-user",
                {
                    method: "PUT",
                    params: this.editCurrent.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.$reset()
                            this.editCurrent.successMessage = response._data.message
                            return response._data
                        } else {
                            this.editCurrent.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async setUserAccessibilities (id: Number) {
            await useHRMSApiO(
                "/api/users_accessibilities" + id,
                {
                    method: "PATCH",
                    params: this.editData.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.$reset()
                            this.editData.successMessage = response._data.message
                            return response._data
                        } else {
                            this.editData.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
