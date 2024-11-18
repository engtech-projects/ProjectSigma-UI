import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useStakeHolderTypesStore = defineStore("stakeHolderTypesStore", {
    state: () => ({
        stakeHolderType: {
            stakehodler_type_id: null,
            stakeholder_type_name: null,
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
        async getStakeHolderTypes () {
            this.isLoading = true
            const { data, error } = await useFetch(
                "/api/stakeholder-type",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.list = response._data.stakeholder_type
                        this.pagination = {
                            first_page: response._data.first_page_url,
                            pages: response._data.links,
                            last_page: response._data.last_page_url,
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

        async createStakeHolderType () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/stakeholder-type",
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.stakeHolderType,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getStakeHolderTypes()
                            // this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editStakeHolderType () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/stakeholder-type/" + this.stakeHolderType.stakehodler_type_id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.stakeHolderType,
                    watch: false,
                }
            )
            if (data.value) {
                this.getStakeHolderTypes()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteStakeHolderType (id: number) {
            const { data, error } = await useFetch(
                "/api/stakeholder-type/" + id,
                {
                    baseURL: config.public.ACCOUNTING_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + ""
                    },
                    body: this.stakeHolderType,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getStakeHolderTypes()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = "Error"
                return error
            }
        },

        reset () {
            this.stakeHolderType = {
                stakehodler_type_id: null,
                stakeholder_type_name: null,
            }
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
