import { defineStore } from "pinia"
export const useItemBulkProfileStore = defineStore("itemBulkProfiles", {
    state: () => ({
        isEdit: false,
        listUnprocess: {
            data: [],
        },
        listDuplicates: {
            data: [],
        },
        listProcess: {
            data: [],
        },
        isLoading: false,
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async doBulkUpload (formData: any) {
            await useInventoryApiO(
                "/api/item-profile/bulk-upload",
                {
                    method: "POST",
                    body: formData,
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.listUnprocess.data = response._data.unprocessed
                            this.listDuplicates.data = response._data.duplicates
                            this.listProcess.data = response._data.processed
                            this.listProcess.data.map((data) => {
                                data.isCheck = false
                                data.item_code = ""
                                return data
                            })
                            this.errorMessage = ""
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async storeBulkUpload () {
            await useInventoryApi(
                "/api/item-profile/bulk-save",
                {
                    method: "POST",
                    body: {
                        processed: this.listProcess.data
                    },
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.successMessage = response._data.message
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
    },
})
