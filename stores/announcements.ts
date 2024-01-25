import { defineStore } from "pinia"
const config = useRuntimeConfig()

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
        positionList: [],
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getAll () {
            const { data, error } = await useFetch(
                "/api/announcement/",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        console.log(response)
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async create () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/announcement",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    body: this.announcement,
                    watch: false,
                    onResponse: ({ response }) => {
                        console.log(response)
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async edit () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/announcement/" + this.announcement.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    body: this.announcement,
                    watch: false,
                }
            )
        },
        async delete(id: number) {
            const { data, error } = await useFetch(
                "/api/allowance/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    // headers: {
                    //     Authorization: token.value + ""
                    // },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
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

    },
})
