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
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
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
            params: {},
            localFilter: {
                name: "",
            },
            inWarehouse: false
        },
        warehouseDetails: {} as WarehouseDetails,
        warehousePss: {
            list: [] as Array<WarehousePss>,
            isLoading: false,
            isLoaded: false,
            inWarehouse: false
        },
        itemHistory: {
            list: [],
            isLoading: false,
            isLoaded: false,
            params: {},
            pagination: {},
        },
        list: [] as Array<WarehouseDetails>,
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
                    params: this.logs.params,
                    onRequest: () => {
                        this.logs.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.logs.isLoading = false
                        if (response.ok) {
                            this.logs.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchWarehouseStocks (id: any) {
            await useInventoryApi(
                "/api/warehouse/stocks/" + id,
                {
                    method: "GET",
                    params: this.stocks.params,
                    onRequest: () => {
                        this.stocks.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.stocks.isLoading = false
                        if (response.ok) {
                            this.stocks.list = response._data.data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getItemHistory (id: any) {
            return await useInventoryApi(
                "/api/warehouse/item/" + id,
                {
                    method: "GET",
                    onRequest: () => {
                        this.itemHistory.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.itemHistory.isLoading = false
                        if (response.ok) {
                            this.itemHistory.list = response._data.data.data
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
    getters: {
        filteredwarehouseList (state): any[] {
            return state.warehouse.list.filter((warehouse: any) => {
                return warehouse.name.toLowerCase().includes(state.warehouse.localFilter.name.toLowerCase())
            })
        }
    }
})
