import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()
interface Announcement {
    title: String,
    content: String,
    start_date: String,
    end_date: String
}
export const useMain = defineStore("Announcements", {
    state: () => ({
        isEdit: false,
        announcement:
        {
            id: null,
            title: "",
            content: "",
            start_date: "",
            end_date: "",
        },
        list: [] as Array<Announcement>,
        activeList: [] as Array<Announcement>,
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getAll () {
            const { data, error } =
            await useFetch(
                "/api/announcement",
                {
                    baseURL: config.public.HRMS_API_URL,
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
        async getactiveAll () {
            const { data, error } =
            await useFetch(
                "/api/announcement-list",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.activeList = response._data.data
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
        async createone () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/announcement",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.announcement,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getAll()
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

        reset () {
            this.announcement = {
                id: null,
                title: "",
                content: "",
                start_date: "",
                end_date: "",
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

        async editone () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/announcement/" + this.announcement.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.announcement,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.getAll()
                        this.reset()
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        async deleteone (id: number) {
            const { data, error } = await useFetch(
                "/api/announcement/" + id,
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
                this.getAll()
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
    },
})
