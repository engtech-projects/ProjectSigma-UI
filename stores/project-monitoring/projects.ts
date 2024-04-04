import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()
interface Project {
    id: null | number,
    contract_name: null | String,
    contract_id: null | String
    contract_location: null | String
    contract_amount: null | number,
    contract_duration: null | String
    project_code: null | String
    project_identifier: null | String
    implementing_office: null | String
    nature_of_work: null | String
    date_of_noa: null | String
    date_of_contract: null | String
    date_of_ntp: null | String
    license: null | String
    employee_id: number[]
}

export const useProjectStore = defineStore("projects", {
    state: () => ({
        isEdit: false,
        project:
        {
            id: null,
            contract_name: null,
            contract_id: null,
            contract_location: null,
            contract_amount: 0,
            contract_duration: null,
            project_code: null,
            project_identifier: null,
            implementing_office: null,
            nature_of_work: null,
            date_of_noa: null,
            date_of_contract: null,
            date_of_ntp: null,
            license: null,
            employee_id: []
        } as Project,
        list: [] as Project[],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
    }),
    actions: {
        async getProject () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/projects",
                {
                    baseURL: config.public.PROJECT_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.data
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

        async createProject () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/projects",
                {
                    baseURL: config.public.PROJECT_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.project,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 201) {
                            this.errorMessage = response._data.message
                        } else {
                            this.$reset()
                            this.getProject()
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

        async editProject () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch<any>(
                "/api/projects/" + this.project.id,
                {
                    baseURL: config.public.PROJECT_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.project,
                    watch: false,
                }
            )
            if (data.value) {
                this.$reset()
                this.getProject()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteProject (id: number) {
            const { data, error } = await useFetch<any>(
                "/api/projects/" + id,
                {
                    baseURL: config.public.PROJECT_API_URL,
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
                this.getProject()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async attachEmployee (projectId: number | null, employeeIds: number[]) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                `/api/project-monitoring/attach-employee/${projectId}`,
                {
                    method: "PUT",
                    body: { employee_id: employeeIds },
                    watch: false,
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message || "Failed to attach employee."
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.$reset()
                            this.getProject()
                            this.successMessage = response._data.message || "Employee attached successfully."
                        }
                    },
                }
            )
        },

    },
})
