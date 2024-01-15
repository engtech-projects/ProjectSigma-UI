import { defineStore } from "pinia"
// const { data: token } = useAuth()
const config = useRuntimeConfig()

export const useDepartmentStore = defineStore("departments", {
    state: () => ({
        isEdit: false,
        department:
    {
        id: null,
        department_name: null,
    },
        list: [],
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getDepartment () {
            const { data, error } = await useFetch(
                "/api/departments",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    params: this.getParams,
                }
            )
            if (data.value) {
                this.list = data.value.data.data
                return data
            } else if (error.value) {
                return error
            }
        },

        async createDepartment () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/departments",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    body: this.department,
                    watch: false,
                }
            )
            if (data.value) {
                this.getDepartment()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async editDepartmentName () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/departments/" + this.department.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    body: this.department,
                    watch: false,
                }
            )
            if (data.value) {
                this.getDepartment()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deleteDepartment (id : number) {
            const { data, error } = await useFetch(
                "/api/departments/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    watch: false,
                }
            )
            if (data.value) {
                this.getDepartment()
                return data
            } else if (error.value) {
                return error
            }
        },

        reset () {
            this.department = {
                id: null,
                department_name: null,
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
