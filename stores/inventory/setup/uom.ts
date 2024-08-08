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
        listGroup: [],
        listCustom: [],
        listStandard: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    getters: {
        standard: (state) => {
            return state.list.map(function (data:any) {
                return data.is_standard ? data : null
            }).filter(function (data:any) {
                return data != null
            })
        },
        custom: (state) => {
            return state.list.map(function (data:any) {
                return data.is_standard ? null : data
            }).filter(function (data:any) {
                return data != null
            })
        }
    },
    actions: {
        async getUOM () {
            const { data, error } = await useFetch(
                "/api/uom/resource",
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
        async getGroupUOM () {
            const { data, error } = await useFetch(
                "/api/uom/group",
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    onResponse: ({ response }) => {
                        this.listGroup = response._data.data.data
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
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.successMessage = response._data.message
                            this.getUOM()
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
                "/api/uom/resource/" + this.uom.id,
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
                        this.getUOM()
                        this.reset()
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
                        this.successMessage = response._data.message
                        this.getUOM()
                        this.reset()
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
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
