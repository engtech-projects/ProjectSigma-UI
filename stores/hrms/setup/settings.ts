import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()
interface Settings {
    id: BigInteger,
    setting_name: String,
    value: BigInteger,
    // title: String,
    // content: String,
    // start_date: String,
    // end_date: String
}
export const useMain = defineStore("Settings", {
    state: () => ({
        isEdit: false,
        settingsOne:
        {
            id: null,
            setting_name: "",
            value: "",
        },
        settingsTwo:
        {
            id: null,
            setting_name: "",
            value: "",
        },
        updateSettings: [] as Array<Settings>,
        list: [] as Array<Settings>,
        activeList: [] as Array<Settings>,
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getAll () {
            const { data, error } =
            await useFetch(
                "/api/settings",
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
                        this.updateSettings = response._data.data.data
                        // this.settingsOne.setting_name = response._data.data.data[0].setting_name
                        // this.settingsOne.setting_name = "test"
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
        // async createone () {
        //     this.successMessage = ""
        //     this.errorMessage = ""
        //     await useFetch(
        //         "/api/settings",
        //         {
        //             baseURL: config.public.HRMS_API_URL,
        //             method: "POST",
        //             headers: {
        //                 Authorization: token.value + "",
        //                 Accept: "application/json"
        //             },
        //             body: this.settings,
        //             watch: false,
        //             onResponse: ({ response }) => {
        //                 if (response.status !== 200) {
        //                     this.errorMessage = response._data.message
        //                 } else {
        //                     this.getAll()
        //                     this.reset()
        //                     this.successMessage = response._data.message
        //                 }
        //             },
        //         }
        //     )
        // },

        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },

        reset () {
            this.settingsOne = {
                id: null,
                setting_name: "",
                value: "",
            }
            this.settingsTwo = {
                id: null,
                setting_name: "",
                value: "",
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

        async editone () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/update-settings",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PUT",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.updateSettings,
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
                "/api/settings/" + id,
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
