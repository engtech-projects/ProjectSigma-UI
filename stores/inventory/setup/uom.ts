import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const UOM_STANDARD = "Standard"
export const UOM_CUSTOM = "Custom"

export const useUOM = defineStore("UOM", {
    state: () => ({
        isEdit: false,
        uom: {
            id: null,
            name: "",
            symbol: "",
            group_id: null,
            is_standard: null,
        },
        list: [],
        listCustom: [],
        listStandard: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getUOM () {
            const { data, error } = await useFetch(
                "/api/uom",
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
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

        async addUOM () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/uom",
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.uom,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getUOM()
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
        async editUOM () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/uom/" + this.uom.id,
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.uom,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getContribution()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deleteContribution (id : number) {
            const { data, error } = await useFetch(
                "/api/uom/" + id,
                {
                    baseURL: config.public.INVENTORY_API_URL,
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
                this.getContribution()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        reset () {
            this.uom = {
                id: null,
                name: "",
                group_id: null,
                symbol: "",
                is_standard: null,
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
