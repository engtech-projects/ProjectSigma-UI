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

export const useProjectStore = defineStore("projects", {
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
        myProjectList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                project_key: ""
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        list: [] as Project[],
        pagination: {},
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
        async getRevisions () {
            this.isLoading.list = true
            const { data, error } = await useProjectsApi(
                "/api/project-revisions/resource",
                {
                    method: "GET",
                    params: this.getParams,
                    onRequest: () => {
                        this.isLoading.list = true
                    },
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        if (response.ok) {
                            this.list = response._data.data
                            this.pagination = {
                                first_page: response._data.meta.first,
                                pages: response._data.meta.links,
                                last_page: response._data.meta.last,
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

        async replicateProject () {
            this.successMessage = ""
            this.errorMessage = ""
            await useProjectsApi(
                "/api/project-revisions/replicate",
                {
                    method: "POST",
                    body: this.information,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.$reset()
                            this.getRevisions()
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
    },
})
