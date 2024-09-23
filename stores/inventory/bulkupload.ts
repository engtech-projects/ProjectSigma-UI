import { defineStore } from "pinia"
export const useItemBulkProfileStore = defineStore("itemBulkProfiles", {
    state: () => ({
        isEdit: false,
        listUnprocess: {
            data: [
                {
                    isCheck: false,
                    item_description: "Lorem Ipsum",
                    thickness_val: "Lorem Ipsum",
                    thickness_uom: "Lorem Ipsum",
                    length_val: "Lorem Ipsum",
                    length_uom: "Lorem Ipsum",
                    width_val: "Lorem Ipsum",
                    width_uom: "Lorem Ipsum",
                    height_val: "Lorem Ipsum",
                    height_uom: "Lorem Ipsum",
                    outside_diameter_val: "Lorem Ipsum",
                    outside_diameter_uom: "Lorem Ipsum",
                    inside_diameter_val: "Lorem Ipsum",
                    inside_diameter_uom: "Lorem Ipsum",
                    volume_val: "Lorem Ipsum",
                    volume_uom: "Lorem Ipsum",
                    specification: "Lorem Ipsum",
                    grade: "Lorem Ipsum",
                    color: "Lorem Ipsum",
                    uom: "Lorem Ipsum",
                    sub_item_group: "Lorem Ipsum",
                    item_group: "Lorem Ipsum",
                    inventory_type: "Lorem Ipsum",
                }
            ],
        },
        listDuplicates: {
            data: [
                {
                    isCheck: false,
                    item_description: "Lorem Ipsum",
                    thickness_val: "Lorem Ipsum",
                    thickness_uom: "Lorem Ipsum",
                    length_val: "Lorem Ipsum",
                    length_uom: "Lorem Ipsum",
                    width_val: "Lorem Ipsum",
                    width_uom: "Lorem Ipsum",
                    height_val: "Lorem Ipsum",
                    height_uom: "Lorem Ipsum",
                    outside_diameter_val: "Lorem Ipsum",
                    outside_diameter_uom: "Lorem Ipsum",
                    inside_diameter_val: "Lorem Ipsum",
                    inside_diameter_uom: "Lorem Ipsum",
                    volume_val: "Lorem Ipsum",
                    volume_uom: "Lorem Ipsum",
                    specification: "Lorem Ipsum",
                    grade: "Lorem Ipsum",
                    color: "Lorem Ipsum",
                    uom: "Lorem Ipsum",
                    sub_item_group: "Lorem Ipsum",
                    item_group: "Lorem Ipsum",
                    inventory_type: "Lorem Ipsum",
                }
            ],
        },
        listProcess: {
            data: [
                {
                    isCheck: false,
                    item_description: "Lorem Ipsum",
                    thickness_val: "Lorem Ipsum",
                    thickness_uom: "Lorem Ipsum",
                    length_val: "Lorem Ipsum",
                    length_uom: "Lorem Ipsum",
                    width_val: "Lorem Ipsum",
                    width_uom: "Lorem Ipsum",
                    height_val: "Lorem Ipsum",
                    height_uom: "Lorem Ipsum",
                    outside_diameter_val: "Lorem Ipsum",
                    outside_diameter_uom: "Lorem Ipsum",
                    inside_diameter_val: "Lorem Ipsum",
                    inside_diameter_uom: "Lorem Ipsum",
                    volume_val: "Lorem Ipsum",
                    volume_uom: "Lorem Ipsum",
                    specification: "Lorem Ipsum",
                    grade: "Lorem Ipsum",
                    color: "Lorem Ipsum",
                    uom: "Lorem Ipsum",
                    sub_item_group: "Lorem Ipsum",
                    item_group: "Lorem Ipsum",
                    inventory_type: "Lorem Ipsum",
                }
            ],
        },
        isLoading: false,
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
                        this.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.listUnprocess = response._data.data
                            this.listDuplicates = response._data.data
                            this.listProcess = response._data.data
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
