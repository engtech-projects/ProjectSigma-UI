import { defineStore } from "pinia"

export interface SalaryGradeStep {
    id: null | Number,
    step_name: String,
    monthly_salary_amount: Number,
}

export interface SalaryGrade {
    id: null | Number,
    salary_grade_level: String,
    salary_grade_step: SalaryGradeStep[],
}

export const useSalaryGradeStore = defineStore("salaryGradeStore", {
    state: () => ({
        isEdit: false,
        salaryGrade:
        {
            id: null,
            salary_grade_level: "",
            salary_grade_step: [
                {
                    id: null,
                    step_name: "1",
                    monthly_salary_amount: 0,
                } as SalaryGradeStep,
                {
                    id: null,
                    step_name: "2",
                    monthly_salary_amount: 0,
                } as SalaryGradeStep,
                {
                    id: null,
                    step_name: "3",
                    monthly_salary_amount: 0,
                } as SalaryGradeStep,
                {
                    id: null,
                    step_name: "4",
                    monthly_salary_amount: 0,
                } as SalaryGradeStep,
                {
                    id: null,
                    step_name: "5",
                    monthly_salary_amount: 0,
                } as SalaryGradeStep,
                {
                    id: null,
                    step_name: "6",
                    monthly_salary_amount: 0,
                } as SalaryGradeStep,
            ]
        } as SalaryGrade,
        list: [] as SalaryGrade[],
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
            await useHRMSApi(
                "/api/salary-grade-level",
                {
                    method: "POST",
                    body: this.salaryGrade,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 201) {
                            this.errorMessage = response._data.message
                        } else {
                            this.$reset()
                            this.getSalaryGrade()
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
            const { data, error } = await useHRMSApi(
                "/api/salary-grade-level/" + this.salaryGrade.id,
                {
                    method: "PATCH",
                    body: this.salaryGrade,
                    watch: false,
                }
            )
            if (data.value) {
                this.$reset()
                this.getSalaryGrade()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteSalaryGrade (id: number) {
            const { data, error } = await useHRMSApi(
                "/api/salary-grade-level/" + id,
                {
                    method: "DELETE",
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

    },
})
