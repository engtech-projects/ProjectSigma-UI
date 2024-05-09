import { defineStore } from "pinia"

interface Announcement {
    title: String,
    content: String,
    start_date: String,
    end_date: String
}

export const useAnnouncements = defineStore("Announcements", {
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
            await useHRMSApi(
                "/api/announcement",
                {
                    method: "GET",
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
            await useHRMSApi(
                "/api/current-announcement",
                {
                    method: "GET",
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

            await useHRMSApiO(
                "/api/announcement",
                {
                    method: "POST",
                    body: this.announcement,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.$reset()
                            this.getAll()
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
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
            await useHRMSApiO(
                "/api/announcement/" + this.announcement.id,
                {
                    method: "PATCH",
                    body: this.announcement,
                    onResponse: ({ response }) => {
                        if (response.status >= 200 && response.status <= 299) {
                            this.reset()
                            this.getAll()
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },

        async deleteone (id: number) {
            const { data, error } = await useHRMSApi(
                "/api/announcement/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        this.$reset()
                        this.getAll()
                        this.successMessage = response._data.message
                    },
                }
            )
            if (error.value) {
                this.errorMessage = error.value.data.message
                throw new Error(this.errorMessage)
                return error
            }
            if (data.value) {
                this.getAll()
                return data
            }
        },
    },
})
