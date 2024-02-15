import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useAllowanceStore = defineStore("Allowances", {
    state: () => ({
        isEdit: false,
        allowance:
        {
            id: null,
            position_id: "",
            amount: null,
        },
        positionList: [],
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    getters: {
        positionAllowances (state) {
            return state.positionList.map((pos) => {
                return {
                    name: pos.name,
                    id: pos.allowances?.id || null,
                    position_id: pos.id,
                    amount: pos.allowances?.amount || 0,
                }
            })
        }
    },
    actions: {
        async getPositionAllowances () {
            const { data, error } = await useFetch(
                "/api/allowance-list",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.positionList = response._data.data
                        // console.log(this.positionList)
                        // this.pagination = {
                        //     first_page: response._data.data.first_page_url,
                        //     pages: response._data.data.links,
                        //     last_page: response._data.data.last_page_url,
                        // }
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createAllowance () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/allowance",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.allowance,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getPositionAllowances()
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
        async editAllowance () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/allowance/" + this.allowance.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.allowance,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getPositionAllowances()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deleteAllowance (id: number) {
            const { data, error } = await useFetch(
                "/api/allowance/" + id,
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
                this.getPositionAllowances()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        reset () {
            this.allowance = {
                id: null,
                position_id: "",
                amount: null,
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
