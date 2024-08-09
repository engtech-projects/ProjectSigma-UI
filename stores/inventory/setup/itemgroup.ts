import { defineStore } from "pinia"

const { token } = useAuth()

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
    edit: boolean | false,
    sub_groups: Array<String> | null,
}
export const useItemStore = defineStore("itemgroups", {
    state: () => ({
        isEdit: false,
        formApproval: {} as Approval,
        list: [],
        searchItemParams: {
            query: "",
        },
        itemgroup: {} as ItemGroup,
        subitemgroup: [] as Array<SubItemGroup>,
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getItemGroups () {
            const { data, error } = await useInventoryApi(
                "/api/item-group/resource",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data.data.data.map((val: any) => {
                                return {
                                    id: val.id,
                                    name: val.name,
                                    expand: true,
                                    edit: false,
                                    sub_groups: val.sub_groups,
                                }
                            })
                            this.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
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
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.$reset()
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async updateItemGroup (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useInventoryApi(
                "/api/item-group/resource/" + id,
                {
                    method: "PATCH",
                    body: this.itemgroup,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            // this.$reset()
                            // this.searchItemGroup()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async searchItemGroup () {
            await useInventoryApi(
                "/api/item-group/search",
                {
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.searchItemParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data?.data
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
        reset () {
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
