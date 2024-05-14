import { defineStore } from "pinia"

interface Accessibility {
    id: Number,
    accessibilities_name: String
}

export const useAccessbilities = defineStore("accessibilitiesStore", {
    state: () => ({
        list: [] as Accessibility[],
    }),
    getters: {
        formattedAccessibilities (state) {
            const formattedList = {}
            if (state.list.length <= 0) {
                return formattedList
            }
            state.list.forEach(function (accessibilty) {
                const moduleAccess = accessibilty.accessibilities_name.split(":")
                const newAccess = accessibilty
                newAccess.accessibilities_name = moduleAccess[1]
                if (!Object.keys(formattedList).includes(moduleAccess[0])) {
                    formattedList[moduleAccess[0]] = []
                }
                formattedList[moduleAccess[0]].push(newAccess)
            })
            return formattedList
        },
    },
    actions: {
        async getListIfEmpty () {
            if (this.list.length <= 0) {
                return await this.getUserEmployees()
            }
        },
        async getUserEmployees () {
            await useHRMSApiO(
                "/api/accessibilities",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) { // Success
                            this.list = response._data.data
                            return response._data
                        } else { // Error
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
