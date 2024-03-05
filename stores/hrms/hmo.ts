import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const useHMOStore = defineStore("hmo", {
    state: () => ({
        isEdit: false,
        hmo: {
            hmo_id: null,
            hmo_name: null,
            hmo_employee: null,
            hmo_employeeShare: null,
        },
        editingItem: {
            hmo_id: null,
            hmo_name: null,
            hmo_employee: null,
            hmo_employeeShare: null,
        },
        hmolist: [],
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),

    actions: {
        async getHmo () {
            const { data, error } = await useFetch(
                "/api/hmo",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                }
            )
            if (data.value) {
                this.list = data.value.data
                return data
            } else if (error.value) {
                return error
            }
        },

        async createHmo () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/hmo",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.hmo,
                    watch: false,
                }
            )
            if (data.value) {
                this.getHmo()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async editHmo () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/hmo/" + this.hmo.hmo_id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.hmo,
                    watch: false,
                }
            )
            if (data.value) {
                this.successMessage = data.value.message
                this.getHmo()
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deleteHmo (hmoId : number) {
            const { data, error } = await useFetch(
                "/api/hmo/" + hmoId,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    watch: false,
                }
            )
            if (data.value) {
                this.getHmo()
                return data
            } else if (error.value) {
                return error
            }
        },

        reset () {
            this.hmo = {
                hmo_id: null,
                hmo_name: null,
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
