import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

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
        },
        list: [],
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
                            this.getProject()
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

        async editProject () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
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
                this.getProject()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteProject (id: number) {
            const { data, error } = await useFetch(
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

        async attachEmployee (projectId: number, employeeIds: number[]) {
            this.successMessage = ""
            this.errorMessage = ""

            try {
                const { response, error } = await useHRMSApi(
                    `/api/project-monitoring/attach-employee/${projectId}`,
                    {
                        method: "PUT",
                        body: { employee_id: employeeIds },
                        watch: false,
                    }
                )

                if (error) {
                    throw new Error(error.message || "Failed to attach employee.")
                }

                if (response.status !== 200) {
                    this.errorMessage = response.data.message || "Failed to attach employee."
                } else {
                    this.getProject()
                    this.reset()
                    this.successMessage = response.data.message || "Employee attached successfully."
                }
            } catch (error) {
                this.errorMessage = error.message || "Error occurred while attaching employees."
            }
        },

        // async attachEmployee () {
        //     this.successMessage = ""
        //     this.errorMessage = ""
        //     await useFetch(
        //         "/api/project-monitoring/attach-employee/" + this.project.id,
        //         {
        //             baseURL: config.public.HRMS_API_URL,
        //             method: "PUT",
        //             headers: {
        //                 Authorization: token.value + "",
        //                 Accept: "application/json"
        //             },
        //             body: this.project,
        //             onResponse: ({ response }) => {
        //                 if (response.status !== 200) {
        //                     this.errorMessage = response._data.message
        //                 } else {
        //                     this.getProject()
        //                     this.reset()
        //                     this.successMessage = response._data.message
        //                 }
        //             },
        //         }
        //     )
        // },

        reset () {
            this.project = {
                id: null,
                contract_name: null,
                contract_id: null,
                contract_location: null
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
