import { defineStore } from "pinia"

export interface WarehouseDetails {
    name: String,
    location: String,
    owner_id: Number,
    owner_type: String,
}
export interface WarehousePss {
    id: Number,
    user_id: Number,
    warehouse_id: Number,
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
        logs: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        warehouse: {
            list: [] as Array<WarehouseDetails>,
            isLoading: false,
            isLoaded: false,
            inWarehouse: false
        },
        warehouseDetails: {} as WarehouseDetails,
        warehousePss: {
            list: [] as Array<WarehousePss>,
            isLoading: false,
            isLoaded: false,
            inWarehouse: false
        },
        warehousePssForm: {},
        params: {},
        isLoading: false,
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async updatePssWarehouse (id: any) {
            await useInventoryApi(
                "/api/warehouse/set-pss/" + id,
                {
                    method: "PATCH",
                    body: this.warehousePssForm,
                    onRequest: () => {
                        this.warehousePss.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.warehousePss.isLoading = false
                        if (response.ok) {
                            this.warehousePss.list = response._data.data.warehouse_pss
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchWarehouse () {
            this.warehouse.isLoaded = true
            await useInventoryApi(
                "/api/warehouse/resource",
                {
                    method: "GET",
                    params: this.params,
                    onRequest: () => {
                        this.warehouse.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.warehouse.isLoading = false
                        if (response.ok) {
                            this.warehouse.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchWarehouseDetails (id: any) {
            await useInventoryApi(
                "/api/warehouse/overview/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.warehousePss.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.warehousePss.isLoading = false
                        if (response.ok) {
                            this.warehouseDetails = response._data.warehouse
                            this.warehousePss.list = response._data.warehouse.warehouse_pss
                            this.warehousePss.inWarehouse = true
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchWarehouseLogs (id: any) {
            await useInventoryApi(
                "/api/warehouse/logs/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.logs.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.logs.isLoading = false
                        if (response.ok) {
                            this.logs.list = response._data.warehouse
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
        reloadResources () {
            this.$reset()
            this.fetchWarehouse()
        },
    },
})
