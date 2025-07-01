import { defineStore } from "pinia"

const config = useRuntimeConfig()
const { token } = useAuth()

export const useResourceStore = defineStore("resourceStore", {
    state: () => ({
        resource: {
            id: null,
            task_id: 1,
            name_id: 1,
            description: null,
            quantity: null,
            unit: "",
            unit_cost: null,
            resource_count: 0,
            unit_count: 1
        },
        resourceNames: [],
        units: [],
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            list: false,
            create: false
        },
        isEdit: false
    }),
    actions: {
        async getResources () {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/resource-items",
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

        async getResourceNames () {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/resource-names",
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
                        this.resourceNames = response._data
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

        async getResourceUnits () {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/uom",
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
                        this.units = response._data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async getResource (id) {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/resource-items/" + id,
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
                        this.resource = response._data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createResource () {
            this.successMessage = ""
            this.errorMessage = ""
            await useProjectsApi(
                "/api/resource-items",
                {
                    method: "POST",
                    body: this.resource,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getResources()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editResource () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useProjectsApi(
                "/api/resource-items/" + this.resource.id,
                {
                    method: "PATCH",
                    body: this.resource,
                    watch: false,
                }
            )
            if (data.value) {
                this.getResources(this.resource.project_id)
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteResource (id: number) {
            const { data, error } = await useProjectsApi(
                "/api/resource-items/" + id,
                {
                    method: "DELETE",
                    body: this.resource,
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
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.resource = {
                id: null,
                task_id: 1,
                name_id: null,
                description: null,
                quantity: null,
                unit: "",
                unit_cost: null,
                resource_count: 0,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
