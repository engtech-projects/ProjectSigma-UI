import { defineStore } from "pinia"

export interface Approver {
    type: string,
    user_id: number | null,
    userselector: boolean
}
export interface Approval {
    id: string | null,
    form: string,
    approvals: Array<Approver>,
}
export interface SubItemGroup {
    name: string | null,
}
export interface ItemGroup {
    name: string,
    expand: boolean | true,
    sub_groups: Array<String> | null,
}
export const useItemStore = defineStore("itemgroups", {
    state: () => ({
        isEdit: false,
        formApproval: {} as Approval,
        list: [],
        itemgroup: {} as ItemGroup,
        subitemgroup: [] as Array<SubItemGroup>,
        pagination: {},
        getParams: {
            module: "Inventory"
        },
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getItemGroups () {
            const { data, error } = await useInventoryApi(
                "/api/item-group/resource",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data.map((val: any) => {
                            return {
                                id: val.id,
                                name: val.name,
                                expand: true,
                                sub_groups: val.sub_groups,
                            }
                        })
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async createItemGroup () {
            this.successMessage = ""
            this.errorMessage = ""
            await useInventoryApi(
                "/api/item-group/resource",
                {
                    method: "POST",
                    body: this.itemgroup,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            // this.getApproval()
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async editApprovals () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals/" + this.formApproval.id,
                {
                    method: "PATCH",
                    body: this.formApproval,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            // this.getApproval()
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async deleteApproval (id: number) {
            await useHRMSApiO(
                "/api/approvals/" + id,
                {
                    method: "DELETE",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            // this.getApproval()
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message
                    },
                }
            )
        },

    },
})
