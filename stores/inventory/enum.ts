import { defineStore } from "pinia"

export interface Itemgroup {
    id: number,
    name: any,
    sub_groups: any,
}
export interface UserEmployee {
    id: Number | null,
    name: String,
    email: String,
    type: String,
    password: String,
    accessibilities: Array<number>,
    accessibilities_name: Array<String>,
    employee_id: Number | null,
    employee_details: Object,
    employee: any,
}
export interface Item {
    id: Number | null,
    item_name: String,
    item_id: Number | null,
    uom_id: Number | null,
    unit_price: String,
    quantity: Number | null,
    uom: Array<any>,
}
export const useInventoryEnumsStore = defineStore("inventoryEnums", {
    state: () => ({
        test: true,
        itemGroupEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Itemgroup[],
            nameFilter: "",
            successMessage: "",
            errorMessage: "",
        },
        userEmployeeEnum: {
            list: [] as UserEmployee[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        itemEnum: {
            list: [] as Item[],
            params: {},
            isLoading: false,
            isLoaded: false,
            successMessage: "",
            errorMessage: "",
        },
    }),
    actions: {
        async getItemGroups () {
            this.itemGroupEnum.isLoaded = true
            await useInventoryApi(
                "/api/item-group/list",
                {
                    method: "GET",
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.itemGroupEnum.list = response._data.data.map((val: any) => {
                                return {
                                    id: val.id,
                                    name: val.name,
                                    sub_groups: val.sub_groups,
                                }
                            })
                        }
                    },
                }
            )
        },
        async getUserEmployeeEnums () {
            await useHRMSApiO(
                "/api/employee/users-list",
                {
                    method: "GET",
                    params: this.userEmployeeEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.userEmployeeEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
        async getItems () {
            await useInventoryApiO(
                "/api/bom/resource",
                {
                    method: "GET",
                    params: this.itemEnum.params,
                    onRequest: () => {
                        this.itemEnum.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.itemEnum.isLoading = false
                        if (response.ok) {
                            this.itemEnum.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
    },
})
