import { defineStore } from "pinia"

const config = useRuntimeConfig()
const { token } = useAuth()

export const usePhaseStore = defineStore("phaseStore", {
    state: () => ({
        phase: {
            id: null,
            project_id: null,
            name: null,
            description: null,
            total_cost: null
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
        async getPhases (projectId: number) {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/phases?project_id=" + projectId,
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

        async createPhase () {
            this.successMessage = ""
            this.errorMessage = ""
            await useProjectsApi(
                "/api/phases",
                {
                    method: "POST",
                    body: this.phase,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.phase = response._data.data
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editPhase () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useProjectsApi(
                "/api/phases/" + this.phase.id,
                {
                    method: "PATCH",
                    body: this.phase,
                    watch: false,
                }
            )
            if (data.value) {
                this.getPhases(this.phase.project_id)
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deletePhase (id: number) {
            const { data, error } = await useProjectsApi(
                "/api/phases/" + id,
                {
                    method: "DELETE",
                    body: this.phase,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        reset () {
            this.phase = {
                id: null,
                project_id: null,
                name: null,
                description: null,
                total_cost: null
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
