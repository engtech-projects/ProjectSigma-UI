import { defineStore } from "pinia"

const config = useRuntimeConfig()
const { token } = useAuth()

export const useTaskStore = defineStore("taskStore", {
    state: () => ({
        task: {
            id: null,
            project_id: null,
            phase_id: null,
            name: null,
            description: null,
            quantity: null,
            unit: null,
            unit_price: null,
            amount: null
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            list: false,
            create: false,
            delete: false
        },
        isEdit: false
    }),
    actions: {
        async getTasks (projectId: number) {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/tasks?project_id=" + projectId,
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

        async createTask () {
            this.successMessage = ""
            this.errorMessage = ""
            await useProjectsApi(
                "/api/tasks",
                {
                    method: "POST",
                    body: this.task,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.task = response._data.data
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editTask () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useProjectsApi(
                "/api/task/" + this.task.id,
                {
                    method: "PATCH",
                    body: this.task,
                    watch: false,
                }
            )
            if (data.value) {
                this.getTasks(this.task.phase_id)
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteTask (id: number) {
            const { data, error } = await useProjectsApi(
                "/api/tasks/" + id,
                {
                    method: "DELETE",
                    body: this.task,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getTasks(this.task.phase_id)
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.task = {
                id: null,
                project_id: null,
                phase_id: null,
                name: null,
                description: null,
                quantity: null,
                unit: null,
                unit_price: null,
                amount: null
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
