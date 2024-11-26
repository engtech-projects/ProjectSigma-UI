import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()
interface Employee {
    name: String,
}
interface Project {
    id: null | number,
    name: null | String,
    contract_id: null | String,
    location: null | String,
    amount: null | number,
    duration: null | String,
    code: null | String,
    parent_project_id: null | number,
    nature_of_work: null | String,
    noa_date: null | String,
    contract_date: null | String,
    ntp_date: null | String,
    license: null | String,
    employees: Array<Employee>,
}

export const useProjectStore = defineStore("projects", {
    state: () => ({
        isEdit: false,
        information:
        {
            id: null,
            name: null,
            contract_id: null,
            location: null,
            amount: 0,
            duration: null,
            code: null,
            parent_project_id: null,
            nature_of_work: null,
            noa_date: null,
            contract_date: null,
            ntp_date: null,
            license: null,
            employees: []
        } as Project,
        list: [] as Project[],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
    }),
    actions: {
        async getProjectInformation (id: any) {
            this.isLoading = true
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
            this.isLoading = true
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
                        this.isLoading = false
                        this.list = response._data
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

    },
})
