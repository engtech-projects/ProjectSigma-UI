import { defineStore } from "pinia"
export const useItemBulkProfileStore = defineStore("itemBulkProfiles", {
    state: () => ({
        isEdit: false,
        itemDetails: {
            listUnprocess: [
                {
                    isCheck: false,
                    item_description: "Lorem Ipsum",
                    thickness_val: "Lorem Ipsum",
                    length_val: "Lorem Ipsum",
                    width_val: "Lorem Ipsum",
                    height_val: "Lorem Ipsum",
                    outside_diameter_val: "Lorem Ipsum",
                    inside_diameter_val: "Lorem Ipsum",
                    volume_val: "Lorem Ipsum",
                    grade: "Lorem Ipsum",
                    color: "Lorem Ipsum",
                    uom: "Lorem Ipsum",
                    sub_item_group: "Lorem Ipsum",
                    item_group: "Lorem Ipsum",
                    inventory_type: "Lorem Ipsum",
                }
            ],
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
