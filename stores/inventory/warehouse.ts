import { defineStore } from "pinia"

export interface WarehouseDetails {
    name: String,
    location: String,
    pss: String,
    project_code: String,
}

export const useWarehouseStore = defineStore("warehouseStore", {
    state: () => ({
        stocks: {
            data: [
                {
                    item_code: "Lorem",
                    stocks: "Lorem",
                }
            ],
        },
        warehouse: {} as WarehouseDetails,
        params: {},
        isLoading: false,
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async fetchWarehouse () {
            await useInventoryApi(
                "/api/item-profile/warehouse",
                {
                    method: "GET",
                    params: this.params,
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.stocks.data = response._data.data
                            this.warehouse.name = response._data.data.name
                            this.warehouse.location = response._data.data.location
                            this.warehouse.pss = response._data.data.pss
                            this.warehouse.project_code = response._data.data.project_code
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
