import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"

export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]

export interface SubItemGroup {
    name: string | null,
}
export interface ItemGroup {
    name: string,
}
export interface NewItemProfile {
    id: number,
    sku: string,
    item_description: string,
    thickness_val: number,
    thickness_uom: number,
    length_val: number,
    length_uom: number,
    width_val: number,
    width_uom: number,
    height_val: number,
    height_uom: number,
    outside_diameter_val: number,
    outside_diameter_uom: number,
    inside_diameter_val: number,
    inside_diameter_uom: number,
    specification: string,
    volume: number,
    grade: string,
    color: string,
    uom: number,
    uom_group_id: string,
    uom_conversion_value: number,
    inventory_type: string,
    active_status: string,
    is_approved: boolean,
    is_edit: boolean,
}
export interface ItemProfile {
    itemss: Array<NewItemProfile>,
    approvals: Array<string>,
}

export const useItemProfileStore = defineStore("itemprofiles", {
    state: () => ({
        isEdit: false,
        newItemProfile: [] as NewItemProfile[],
        itemProfile: {
            id: null,
            sku: "",
            item_description: "",
            thickness_val: null,
            thickness_uom: null,
            length_val: null,
            length_uom: null,
            width_val: null,
            width_uom: null,
            height_val: null,
            height_uom: null,
            outside_diameter_val: null,
            outside_diameter_uom: null,
            inside_diameter_val: null,
            inside_diameter_uom: null,
            specification: "",
            volume: null,
            grade: "",
            color: "",
            uom: null,
            uom_group_id: "",
            uom_conversion_value: null,
            inventory_type: "",
            active_status: "",
            is_approved: false,
            is_edit: false,
        },
        formItemProfile: {} as ItemProfile,
        itemgroup: {} as ItemGroup,
        subitemgroup: {} as SubItemGroup,
        uom: {} as any,
        list: [],
        allRequests: {
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myApprovals: {
            isLoaded: false,
            list: [],
            params: {},
        },
        myRequests: {
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        approval: {
            params: {
                id: null,
                remarks: "",
            },
            errorMessage: "",
            successMessage: "",
        },
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    getters: {
        uomLength (state) {
            return state.uom.filter(function (data: any) {
                return data.group_id === 1 ? data : null
            })
        },
        uomWeight (state) {
            return state.uom.filter(function (data: any) {
                return data.group_id === 2 ? data : null
            })
        },
        uomVolume (state) {
            return state.uom.filter(function (data: any) {
                return data.group_id === 3 ? data : null
            })
        },
        uomArea (state) {
            return state.uom.filter(function (data: any) {
                return data.group_id === 4 ? data : null
            })
        },
        uomForce (state) {
            return state.uom.filter(function (data: any) {
                return data.group_id === 5 ? data : null
            })
        },
        uomDimension (state) {
            return state.uom.filter(function (data: any) {
                return data.group_id === 6 ? data : null
            })
        },
    },
    actions: {
        async getUOM () {
            const { data, error } = await useFetch(
                "/api/uom/resource",
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    onResponse: ({ response }) => {
                        this.uom = response._data.data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async getItemGroups () {
            const { data, error } = await useInventoryApi(
                "/api/item-group/list",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.itemgroup = response._data.data.data.map((val: any) => {
                                return {
                                    id: val.id,
                                    name: val.name,
                                }
                            })
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
        async getSubItemGroups (id: number) {
            const { data, error } = await useInventoryApi(
                "/api/item-group/resource/" + id,
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        this.subitemgroup = response._data.data.sub_groups
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async getItemProfile () {
            await useFetch(
                "/api/item-profile/resource",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useHRMSApi(
                "/api/item-profile/my-request",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequests.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useHRMSApi(
                "/api/item-profile/my-approvals",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovals.list = response._data.data
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
