import { defineStore } from "pinia"

const config = useRuntimeConfig()
const { token } = useAuth()

interface NatureOfWork {
    name: string | null
}

export const useNatureOfWorkStore = defineStore("natureOfWorkStore", {
    state: () => ({
        list: [] as Array<NatureOfWork>,
        errorMessage: "",
        successMessage: "",
        isLoading: {
            list: false,
            create: false,
            delete: false
        },
        isEdit: false
    }),
    actions: {
        async getNatureOfWorks () {
            this.isLoading.list = true
            const { data, error } = await useFetch(
                "/api/nature-of-works",
                {
                    baseURL: config.public.PROJECTS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    onResponse: ({ response }) => {
                        this.isLoading.list = false
                        this.list = response._data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        reset () {
            this.successMessage = ""
            this.errorMessage = ""
            this.list = []
        },
    },
})
