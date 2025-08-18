import { defineStore } from "pinia"
interface Settings {
    id: BigInteger,
    setting_name: String,
    value: BigInteger,
}
export const useHrmsSettingsStore = defineStore("hrmsSettings", {
    state: () => ({
        allSettings: {
            isLoading: false,
            data: [] as Settings[],
            successMessage: "",
        }
    }),
    actions: {
        async getAllSettings () {
            await useHRMSApiO(
                "/api/setup/settings",
                {
                    onRequest: () => {
                        this.allSettings.isLoading = true
                    },
                    onResponseError: ({ request }: any) => {
                        this.allSettings.isLoading = false
                        throw new Error(request._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.allSettings.isLoading = false
                        this.allSettings.data = response._data.data
                        this.allSettings.successMessage = response._data.message
                    },
                }
            )
        },
        async updateSetting (settingId: BigInteger, value: BigInteger) {
            return await useHRMSApiO(
                "/api/setup/settings/" + settingId,
                {
                    method: "PATCH",
                    body: { value },
                    onRequest: () => {
                        this.allSettings.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.allSettings.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: () => {
                        this.getAllSettings()
                    },
                }
            )
        },
    },
})
