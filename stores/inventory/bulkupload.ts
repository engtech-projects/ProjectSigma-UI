import { defineStore } from "pinia"
export const useItemProfileStore = defineStore("itemprofiles", {
    state: () => ({
        isEdit: false,
        itemDetails: {
            listUnprocess: [],
            listDuplicates: [],
            listProcess: [],
            isLoading: false,
        },
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async doBulkUpload (event: any) {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append("data", file)
            await useInventoryApi(
                "/api/item-profile/do-bulk-upload",
                {
                    method: "POST",
                    body: formData,
                    onRequest: () => {
                        this.itemDetails.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.itemDetails.isLoading = false
                        if (response.ok) {
                            this.itemDetails.listUnprocess = response._data.data
                            this.itemDetails.listDuplicates = response._data.data
                            this.itemDetails.listProcess = response._data.data
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
