import { defineStore } from "pinia"
interface Employee {
    employee_id: number,
    name: String,
}
interface Approval {
    type: string;
    status: string;
    remarks: null | string;
    user_id: number;
    date_approved: null | string;
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
    approvals: Array<Approval>
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
            phases: [],
            approvals: []
        } as Project,
        list: [] as Project[],
        myProjectList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                status: ProjectStatus.MY_PROJECTS
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        draftList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                status: ProjectStatus.DRAFT
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        proposalList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                status: ProjectStatus.PROPOSAL
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        biddingList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                status: ProjectStatus.BIDDING
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        onHoldList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                status: ProjectStatus.ON_HOLD
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        awardedList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                status: ProjectStatus.AWARDED
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        archivedList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                status: ProjectStatus.ARCHIVED
            },
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
            const { data, error } = await useProjectsApi(
                "/api/projects/" + id,
                {
                    method: "GET",
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
                status: ProjectStatus.DRAFT
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
                                first_page: response._data.first_page_url,
                                pages: response._data.links,
                                last_page: response._data.last_page_url,
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
                                first_page: response._data.first_page_url,
                                pages: response._data.links,
                                last_page: response._data.last_page_url,
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
        async getBiddingProjects () {
            this.biddingList.isLoading = true
            const { data, error } = await useProjectsApi(
                "/api/projects",
                {
                    method: "GET",
                    params: this.biddingList.params,
                    onRequest: () => {
                        this.biddingList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.biddingList.isLoading = false
                        if (response.ok) {
                            this.biddingList.list = response._data.data
                            this.biddingList.pagination = {
                                first_page: response._data.first_page_url,
                                pages: response._data.links,
                                last_page: response._data.last_page_url,
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
        async getOnHoldProjects () {
            this.onHoldList.isLoading = true
            const { data, error } = await useProjectsApi(
                "/api/projects",
                {
                    method: "GET",
                    params: this.onHoldList.params,
                    onRequest: () => {
                        this.onHoldList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.onHoldList.isLoading = false
                        if (response.ok) {
                            this.onHoldList.list = response._data.data
                            this.onHoldList.pagination = {
                                first_page: response._data.first_page_url,
                                pages: response._data.links,
                                last_page: response._data.last_page_url,
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
        async getAwardedProjects () {
            this.awardedList.isLoading = true
            const { data, error } = await useProjectsApi(
                "/api/projects",
                {
                    method: "GET",
                    params: this.awardedList.params,
                    onRequest: () => {
                        this.awardedList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.awardedList.isLoading = false
                        if (response.ok) {
                            this.awardedList.list = response._data.data
                            this.awardedList.pagination = {
                                first_page: response._data.first_page_url,
                                pages: response._data.links,
                                last_page: response._data.last_page_url,
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
        async getArchivedProjects () {
            this.archivedList.isLoading = true
            const { data, error } = await useProjectsApi(
                "/api/projects",
                {
                    method: "GET",
                    params: this.archivedList.params,
                    onRequest: () => {
                        this.archivedList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.archivedList.isLoading = false
                        if (response.ok) {
                            this.archivedList.list = response._data.data
                            this.archivedList.pagination = {
                                first_page: response._data.first_page_url,
                                pages: response._data.links,
                                last_page: response._data.last_page_url,
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
        async getMyProjects () {
            this.myProjectList.isLoading = true

            const { data, error } = await useProjectsApi(
                "/api/projects",
                {
                    method: "GET",
                    params: this.myProjectList.params,
                    onRequest: () => {
                        this.myProjectList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myProjectList.isLoading = false
                        if (response.ok) {
                            this.myProjectList.list = response._data.data
                            this.myProjectList.pagination = {
                                first_page: response._data.first_page_url,
                                pages: response._data.links,
                                last_page: response._data.last_page_url,
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
            await useProjectsApi(
                "/api/projects",
                {
                    method: "POST",
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
            await useProjectsApi(
                "/api/project-revisions/change-to-proposal",
                {
                    method: "POST",
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
            const { data, error } = await useProjectsApi<any>(
                "/api/projects/" + this.information.id,
                {
                    method: "PATCH",
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
            const { data, error } = await useProjectsApi<any>(
                "/api/projects/change-summary-rates",
                {
                    method: "POST",
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
            const { data, error } = await useProjectsApi<any>(
                "/api/projects/" + id,
                {
                    method: "DELETE",
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
