import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useDepartmentStore = defineStore("departments", {
    state: () => ({
        isEdit: false,
        department:
        {
            id: null,
            department_name: null,
        },
        departmentList: [],
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    getters: {
        departmentsList (state) {
            return state.departmentList.map((dpt) => {
                return {
                    id: dpt.id,
                    department_name: dpt.department_name,
                }
            })
        }
    },
    actions: {
        async getDepartmentList () {
            const { data, error } = await useFetch(
                "/api/department-list",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.departmentList = response._data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async getDepartment () {
            const { data, error } = await useFetch(
                "/api/departments",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
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
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
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
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
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
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
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
