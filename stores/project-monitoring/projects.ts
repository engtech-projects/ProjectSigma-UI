import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()
interface Employee {
    employee_id: number,
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
    phases: Array<any>
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
            employees: [],
            phases: []
        } as Project,
        list: [] as Project[],
        draftList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        proposalList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
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
        async getProjectsInformation (id: any) {
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
        async getDraftProjects () {
            this.draftList.isLoading = true
            this.draftList.params = {
                status: "draft"
            }
            const { data, error } = await useProjectsApi(
                "/api/projects",
                {
                    method: "GET",
                    params: this.draftList.params,
                    onRequest: () => {
                        this.draftList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.draftList.isLoading = false
                        if (response.ok) {
                            this.draftList.list = response._data.data
                            this.draftList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
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
        async getProposalProjects () {
            this.proposalList.isLoading = true
            this.proposalList.params = {
                status: "proposal"
            }
            const { data, error } = await useProjectsApi(
                "/api/projects",
                {
                    method: "GET",
                    params: this.proposalList.params,
                    onRequest: () => {
                        this.proposalList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.proposalList.isLoading = false
                        if (response.ok) {
                            this.proposalList.list = response._data.data
                            this.proposalList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
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
        async getProject (id: number) {
            this.isLoading.list = true
            const { data, error } = await useProjectsApi(
                "/api/projects/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        this.information = response._data
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
                            this.getDraftProjects()
                            this.getProposalProjects()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async publishProposal (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/project-revisions/change-to-proposal",
                {
                    baseURL: config.public.PROJECTS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: { id },
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getDraftProjects()
                            this.getProposalProjects()
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
                this.getDraftProjects()
                this.getProposalProjects()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async editRates (rate: any) {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch<any>(
                "/api/projects/change-summary-rates",
                {
                    baseURL: config.public.PROJECTS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: rate,
                    watch: false,
                }
            )
            if (data.value) {
                this.getProject(this.information.id)
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
                this.getDraftProjects()
                this.getProposalProjects()
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
                            this.getProjectsInformation(projectId)
                            this.projectMemberList(projectId)
                            this.successMessage = response._data.message || "Employee attached successfully."
                        }
                    },
                }
            )
        },

    },
})
