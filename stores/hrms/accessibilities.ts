import { defineStore } from "pinia"
interface Accessibility {
    id: Number,
    accessibilities_name: String
}

export const useAccessbilities = defineStore("accessibilitiesStore", {
    state: () => ({
        access_list: [] as Accessibility[],
    }),
    getters: {
        formattedAccessibilities (state) {
            const formattedList = {} as any
            if (state.access_list.length <= 0) {
                return formattedList
            }
            state.access_list.forEach(function (accessibilty) {
                const moduleAccess = accessibilty.accessibilities_name.split(":")
                const mainModule = moduleAccess[0]
                const subModules = moduleAccess[1].split("_")
                if (!formattedList[mainModule]) {
                    formattedList[mainModule] = {}
                }
                let currentLevel = formattedList[mainModule]
                subModules.forEach(function (subModule, index) {
                    if (!currentLevel[subModule]) {
                        currentLevel[subModule] = {}
                    }
                    if (subModules.length - 1 === index) {
                        currentLevel[subModule] = { ...accessibilty, ...currentLevel[subModule] }
                    }
                    currentLevel = currentLevel[subModule]
                })
            })
            return formattedList
        },
    },
    actions: {
        async getListIfEmpty () {
            if (this.access_list.length <= 0) {
                return await this.getUserEmployees()
            }
        },
        async getUserEmployees () {
            await useHRMSApiO(
                "/api/accessibilities",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) { // Success
                            this.access_list = response._data.data
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
