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
            await useHRMSApiO(
                "/api/users",
                {
                    method: "POST",
                    params: this.createData.params,
                    onResponse: ({ response } : any) => {
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
        async editEmployeeAccount (id: string) {
            await useHRMSApiO(
                "/api/user" + id,
                {
                    method: "PATCH",
                    params: this.editData.params,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
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
        async editCurrentUser () {
            await useHRMSApiO(
                "/api/update-user",
                {
                    method: "PUT",
                    params: this.editCurrent.params,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
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

        async setUserAccessibilities (id: string) {
            await useHRMSApiO(
                "/api/users_accessibilities" + id,
                {
                    method: "PATCH",
                    params: this.editData.params,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
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
