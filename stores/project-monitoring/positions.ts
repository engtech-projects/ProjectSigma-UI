import { defineStore } from "pinia"

export const usePositionStore = defineStore("positionStore", {
    state: () => ({
        position: {
            id: null,
            name: null,
            description: null
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        isEdit: false
    }),
    actions: {
        async getPositions () {
            this.isLoading = true
            const { data, error } = await useProjectsApi(
                "/api/positions",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.data.data
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
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

        async showPosition (id:any) {
            const { data, error } = await useProjectsApi(
                "/api/positions/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.position = response._data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createPosition () {
            this.successMessage = ""
            this.errorMessage = ""
            await useProjectsApi(
                "/api/positions",
                {
                    method: "POST",
                    body: this.position,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getPositions()
                            this.successMessage = "Position successfully created."
                        }
                    },
                }
            )
        },

        async editPosition () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useProjectsApi(
                "/api/positions/" + this.position.id,
                {
                    method: "PATCH",
                    body: this.position,
                    watch: false,
                }
            )
            if (data.value) {
                this.getPositions()
                this.successMessage = "Particular group successfully updated"
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deletePosition (id: number) {
            this.isLoading = true
            const { data, error } = await useProjectsApi(
                "/api/positions/" + id,
                {
                    method: "DELETE",
                    body: this.position,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.getPositions()
                        if (response._data.success) {
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                this.getPositions()
                this.successMessage = "Position successfully deleted."
                return data
            } else if (error.value) {
                this.errorMessage = "Something went wrong"
                return error
            }
        },

        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },

        reset () {
            this.position = {
                id: null,
                name: null,
                description: null
            }
        },
    },
})
