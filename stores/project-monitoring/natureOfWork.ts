import { defineStore } from "pinia"

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
            const { data, error } = await useProjectsApi(
                "/api/nature-of-works",
                {
                    method: "GET",
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
    },
})
