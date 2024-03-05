import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const EMPLOYMENT_PROBATIONARY = "Probationary"
export const EMPLOYMENT_REGULAR = "Regular/FullTime"
export const EMPLOYMENT_PARTTIME = "Part Time"
export const EMPLOYMENT_PROJECTBASED = "Project Based"
export const EMPLOYMENT_CONTRACTUAL = "Contractual"
export const EMPLOYMENT_TYPE = [
    EMPLOYMENT_PROBATIONARY,
    EMPLOYMENT_REGULAR,
    EMPLOYMENT_PARTTIME,
    EMPLOYMENT_PROJECTBASED,
    EMPLOYMENT_CONTRACTUAL
]

export const useLeaveStore = defineStore("leaves", {
    state: () => ({
        isEdit: false,
        leave:
        {
            id: null,
            leave_name: null,
            amt_of_leave: null,
            employment_type: [],
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getLeave () {
            const { data, error } = await useFetch(
                "/api/leave",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data.map((val) => {
                            return {
                                id: val.id,
                                leave_name: val.leave_name,
                                amt_of_leave: val.amt_of_leave,
                                orig_employment_type: val.employment_type,
                                employment_type: JSON.parse(val.employment_type),
                                employment_type_view: JSON.parse(val.employment_type).toString(),
                            }
                        })
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

        async createLeave () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/leave",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.leave,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getLeave()
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
        async editLeaves () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/leave/" + this.leave.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.leave,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getLeave()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.message
                return error
            }
        },
        async deleteLeave (id: number) {
            await useFetch(
                "/api/leave/" + id,
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
                        this.getLeave()
                    },
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message
                    },
                }
            )
        },

        reset () {
            this.leave = {
                id: null,
                leave_name: null,
                amt_of_leave: null,
                employment_type: [],
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
