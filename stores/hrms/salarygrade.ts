import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useSalaryGradeStore = defineStore("salaryGradeStore", {
    state: () => ({
        isEdit: false,
        salaryGrade:
        {
            id: null,
            salary_grade_level: "",
            salary_grade_step: []
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
    }),
    actions: {
        async getSalaryGrade () {
            this.isLoading = true
            const { data, error } = await useHRMSApi(
                "/api/salary-grade-level",
                {
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data
                        this.pagination = {
                            first_page: response._data.first_page_url,
                            pages: response._data.links,
                            last_page: response._data.last_page_url,
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

        async createSalaryGrade () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/salary-grade-level",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.salaryGrade,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 201) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getSalaryGrade()
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

        async editSalaryGrade () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/salary-grade-level/" + this.salaryGrade.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.salaryGrade,
                    watch: false,
                }
            )
            if (data.value) {
                this.getSalaryGrade()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteSalaryGrade (id: number) {
            const { data, error } = await useFetch(
                "/api/projects/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getSalaryGrade()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        reset () {
            this.salaryGrade = {
                id: null,
                salary_grade_level: "",
                salary_grade_step: []
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
