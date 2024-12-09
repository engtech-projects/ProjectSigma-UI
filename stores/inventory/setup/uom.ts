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
        isLoading: false,
        isLoaded: false,
        pagination: {},
        getParams: {
            filter: "custom"
        },
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getUOM () {
            await useInventoryApiO(
                "/api/uom/resource?standard",
                {
                    method: "GET",
                    params: this.getParams,
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.isLoaded = true
                            this.list = response._data.data.data
                            if (this.getParams.filter === "custom") {
                                this.list.sort((a, b) => a.name.localeCompare(b.name))
                            }
                            this.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
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
