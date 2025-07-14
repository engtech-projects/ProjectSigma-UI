import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const POSITION_HEAD = "Head"
export const POSTION_STAFF = "Staff"
export const POSITION_TYPES = [
    POSITION_HEAD,
    POSTION_STAFF
]

export const usePositionStore = defineStore("positions", {
    state: () => ({
        isEdit: false,
        position:
        {
            id: null,
            department_name: null,
            name: null,
        },
        allRequests: {
            isLoaded: false,
            list: [],
            params: {
                name: "",
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),

    actions: {
        async getPosition () {
            const { data, error } = await useFetch(
                "/api/position/resource",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.allRequests.params,
                    onResponse: ({ response }) => {
                        this.allRequests.list = response._data.data
                        this.allRequests.pagination = {
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

        async createPosition () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/position/resource",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.position,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
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
        async editPosition () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/position/resource/" + this.position.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.position,
                    watch: false,
                }
            )
            if (data.value) {
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deletePosition (id: number) {
            const { data, error } = await useFetch(
                "/api/position/resource/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        reset () {
            this.$reset()
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
