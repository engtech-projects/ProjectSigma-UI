import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const UOM_STANDARD = "Standard"
export const UOM_CUSTOM = "Custom"

export const useUOM = defineStore("UOM", {
    state: () => ({
        isEdit: false,
        isStandard: false,
        uom: {
            id: null,
            name: "",
            symbol: "",
            group_id: null,
            is_standard: null,
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        typeUOM () {
            if (this.isStandard) {
                this.getParams = {
                    filter: "standard",
                }
            } else {
                this.getParams = {
                    filter: "custom",
                }
            }
        },
        async getUOM () {
            this.typeUOM()
            const { data, error } = await useFetch(
                "/api/uom/resource?standard",
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
                "/api/uom/resource",
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: {
                        id: this.uom.id,
                        name: this.uom.name,
                        symbol: this.uom.symbol,
                        // is_standard: this.isStandard,
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.reset()
                        if (response.ok) {
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                        this.getUOM()
                    },
                }
            )
        },
        async editUOM () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/uom/resource/" + this.uom.id,
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: {
                        id: this.uom.id,
                        name: this.uom.name,
                        symbol: this.uom.symbol,
                        is_standard: this.isStandard,
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getUOM()
                            this.reset()
                        } else {
                            this.errorMessage = response._data.message
                        }
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
        async deleteUOM (id : number) {
            const { data, error } = await useFetch(
                "/api/uom/resource/" + id,
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getUOM()
                            this.reset()
                        } else {
                            this.errorMessage = response._data.message
                        }
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
            this.uom = {
                id: null,
                name: "",
                group_id: null,
                symbol: "",
                is_standard: null,
            }
            this.isEdit = false
            this.errorMessage = ""
            this.successMessage = ""
        },
    },
})
