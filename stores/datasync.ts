import { defineStore } from "pinia"

export const useDataSyncStore = defineStore("dataSyncStore", {
    state: () => ({
        url: "",
        api: "",
        params: {},
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        isEdit: false
    }),
    actions: {
        async syncAccountingData () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                this.url,
                {
                    method: "POST",
                    params: this.params,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response._data.success) {
                            this.successMessage = response._data.message
                        }
                        if (!response._data.success) {
                            this.errorMessage = response._data.message
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
        async syncHrmsData () {
            this.isLoading = true
            const { data, error } = await useHRMSApi(
                this.url,
                {
                    method: "POST",
                    params: this.params,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.successMessage = response._data.message
                        if (response._data.success) {
                            this.successMessage = response._data.message
                        }
                        if (!response._data.success) {
                            this.errorMessage = response._data.message
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

        async syncProjectData () {
            this.isLoading = true
            const { data, error } = await useProjectsApi(
                this.url,
                {
                    method: "POST",
                    params: this.params,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.successMessage = response._data.message
                        if (response._data.success) {
                            this.successMessage = response._data.message
                        }
                        if (!response._data.success) {
                            this.errorMessage = response._data.message
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

        async syncInventoryData () {
            this.isLoading = true
            const { data, error } = await useInventoryApi(
                this.url,
                {
                    method: "POST",
                    params: this.params,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.isLoading = false
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
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async sync () {
            if (this.api === "accounting") {
                await this.syncAccountingData()
            }
            if (this.api === "hrms") {
                await this.syncHrmsData()
            }
            if (this.api === "project") {
                await this.syncProjectData()
            }
            if (this.api === "inventory") {
                await this.syncInventoryData()
            }
        },

        reset () {
            this.url = ""
            this.api = ""
            this.errorMessage = ""
            this.successMessage = ""
        },
    },
})
