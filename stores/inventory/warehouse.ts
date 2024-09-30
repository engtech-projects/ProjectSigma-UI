import { defineStore } from "pinia"
export const useWarehouseStore = defineStore("warehouse", {
    state: () => ({
        Stocks: {
            data: [
                {
                    item_code: "Lorem",
                    stocks: "Lorem",
                }
            ],
        },
        isLoading: false,
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async fetchWarehouse (formData: any) {
            await useInventoryApi(
                "/api/item-profile/warehouse",
                {
                    method: "POST",
                    body: formData,
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.Stocks.data = response._data.unprocessed
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
