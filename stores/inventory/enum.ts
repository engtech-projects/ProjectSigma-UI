import { defineStore } from "pinia"

export interface Itemgroup {
    id: number,
    name: any,
    sub_groups: any,
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
    },
})
