import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()
interface Employee {
    name: String,
}
interface Project {
    id: null | number,
    parent_project_id: null | number,
    contract_id: null | number,
    code: null | String,
    name: null | String,
    amount: null | Number,
    location: null | String,
    contract_date: null | String,
    duration: null | String,
    nature_of_work: null | String,
    implementing_office: null | String,
    noa_date: null | String,
    ntp_date: null | String,
    license: null | String,
    uuid: null | String,
    designation: null | Number,
    employee_id: null | Number,
    employees: Array<Employee>
}

export const useProjectStore = defineStore("projects", {
    state: () => ({
        isEdit: false,
        viewState: false,
        information:
        {
            id: null,
            uuid: null,
            parent_project_id: null,
            contract_id: null,
            code: null,
            name: null,
            amount: null,
            location: null,
            contract_date: null,
            duration: null,
            nature_of_work: null,
            implementing_office: null,
            noa_date: null,
            ntp_date: null,
            license: null,
            designation: null,
            employee_id: null,
            employees: []
        } as Project,
        list: [] as Project[],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            create: false,
            list: false,
        },
    }),
    actions: {
        async getProjectInformation (id: any) {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/projects/" + id,
                {
                    baseURL: config.public.PROJECTS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.information = response._data.data
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
        async getProject () {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/projects",
                {
                    baseURL: config.public.PROJECTS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        this.list = response._data.data
                        this.pagination = {
                            first_page: response._data.links.first,
                            pages: response._data.meta.links,
                            last_page: response._data.links.last,
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
                    baseURL: config.public.PROJECTS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.information,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
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
                "/api/projects/" + this.information.id,
                {
                    baseURL: config.public.PROJECTS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.information,
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
                    baseURL: config.public.PROJECTS_API_URL,
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
        async projectMemberList (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "api/project-monitoring/project-member-list/" + id,
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.information.employees = response._data.data
                        }
                    },
                }
            )
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
                            this.getProjectInformation(projectId)
                            this.projectMemberList(projectId)
                            this.successMessage = response._data.message || "Employee attached successfully."
                        }
                    },
                }
            )
        },

    },
})
