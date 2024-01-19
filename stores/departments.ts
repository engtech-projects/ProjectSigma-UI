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
        pagination: {},
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
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createDepartment () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/departments",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    body: this.department,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getDepartment()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
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
        async deleteDepartment (id: number) {
            const { data, error } = await useFetch(
                "/api/departments/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getDepartment()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
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
