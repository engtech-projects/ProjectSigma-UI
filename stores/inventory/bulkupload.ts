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
            await useInventoryApi(
                "/api/item-profile/bulk-upload",
                {
                    method: "POST",
                    body: formData,
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.listUnprocess.data = response._data.unprocessed
                            this.listDuplicates.data = response._data.duplicates
                            this.listProcess.data = response._data.processed
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
