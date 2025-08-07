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
    uuid: null | String,
    position: null | String,
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
    position_id: null | Number,
    designator: null | Number,
    employee_id: null | Number,
    employees: Array<Employee>
    phases: Array<any>
    approvals: Array<Approval>
}

export const useRevisionStore = defineStore("revisionStore", {
    state: () => ({
        isEdit: false,
        viewState: false,
        information: {
            id: null,
            uuid: null,
            position: null,
            position_id: null,
            employee_id: null,
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
            designator: null,
            phases: [],
            employees: [],
            approvals: []
        } as Project,
        projectRevisionList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                project_key: ""
            },
            errorMessage: "",
            successMessage: "",
        },
        allRevisionList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            pagination: {},
            params: {
                project_key: ""
            },
            errorMessage: "",
            successMessage: "",
        },
        list: [] as Project[],
        pagination: {},
        revisionSelected: null,
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            create: false,
            list: false,
        },
        attachments: {
            form: {
                attachment_name: "",
                other_type: "",
                file: null,
            },
            list: [],
        },
    }),
    actions: {
        async copyToProjectRevisions (id: number) {
            await useProjectsApi(
                `/api/project-revisions/revision/${id}/copy-to-project`,
                {
                    method: "POST",
                    onRequest: () => {
                        this.isLoading.list = true
                    },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        if (response.ok) {
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getAllRevisions () {
            await useProjectsApi(
                "/api/project-revisions/revisions",
                {
                    method: "GET",
                    params: this.allRevisionList.params,
                    onRequest: () => {
                        this.allRevisionList.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.allRevisionList.isLoading = false
                        if (response.ok) {
                            this.allRevisionList.list = response._data.data
                            this.allRevisionList.pagination = {
                                first_page: response._data.meta.first,
                                pages: response._data.meta.links,
                                last_page: response._data.meta.last,
                            }
                            this.allRevisionList.successMessage = response._data.message
                        } else {
                            this.allRevisionList.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getRevisions () {
            await useProjectsApi(
                `/api/projects/${this.getParams.project_id}/revisions`,
                {
                    method: "GET",
                    onRequest: () => {
                        this.isLoading.list = true
                    },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        if (response.ok) {
                            this.list = response._data.data
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async restoreRevisions () {
            await useProjectsApi(
                `/api/projects/${this.getParams.project_id}/revert/${this.revisionSelected}`,
                {
                    method: "PUT",
                    onRequest: () => {
                        this.isLoading.list = true
                    },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        if (response.ok) {
                            this.list = response._data.data
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async replicateProject () {
            this.successMessage = ""
            this.errorMessage = ""
            await useProjectsApi(
                "/api/projects/replicate",
                {
                    method: "POST",
                    body: this.information,
                    watch: false,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.$reset()
                            this.getRevisions()
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
    },
})
