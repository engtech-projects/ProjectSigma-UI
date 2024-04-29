import { defineStore } from "pinia"

export const useFacialPattern = defineStore("facialPattern", {
    state: () => ({
        facialPatterList: [],
        currentMatch: { id: null, name: null },
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getAllEmployeePattern () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/face-pattern/resource",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.facialPatterList = response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },

        async saveOrUpdateEmployeePattern (pattern: any, id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("employee_id", id)
            formData.append("patterns", JSON.stringify(pattern))
            await useHRMSApiO(
                "/api/face-pattern/resource",
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
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

    },
})
