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
    volume_uom: number,
    grade: string,
    color: string,
    uom: number,
    item_group: string,
    sub_item_group: string,
    uom_conversion_value: number,
    inventory_type: string,
    active_status: string,
    is_approved: boolean,
    is_edit: boolean,
}
export interface ItemProfile {
    item_profiles: Array<any>,
    approvals: Array<any>,
}

export const useItemProfileStore = defineStore("itemprofiles", {
    state: () => ({
        isEdit: false,
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
            volume_uom: null,
            grade: "",
            color: "",
            uom: null,
            uom_group_id: "",
            item_group: "",
            sub_item_group: "",
            uom_conversion_value: null,
            inventory_type: "",
            active_status: "Inactive",
            is_approved: false,
            is_edit: false,
        },
        addItemProfile: [] as Array<any>,
        formItemProfile: {} as ItemProfile,
        newItemProfile: [] as Array<NewItemProfile>,
        itemgroup: [] as any,
        subitemgroup: [] as any,
        uom: {} as any,
        list: [],
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myRequests: {
            isLoading: false,
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
        page: {
            list: {},
        },
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
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
                    watch: false,
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    onResponse: ({ response }) => {
                        this.uom = response._data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async getAllRequests () {
            await useInventoryApi(
                "/api/item-profile/new-request/all-request",
                {
                    method: "GET",
                    params: this.allRequests.params,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.allRequests.isLoaded = true
                            this.allRequests.list = response._data.data.data
                            this.allRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useInventoryApi(
                "/api/item-profile/new-request/my-request",
                {
                    method: "GET",
                    params: this.myRequests.params,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequests.isLoaded = true
                            this.myRequests.list = response._data.data.data
                            this.myRequests.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovals () {
            await useInventoryApi(
                "/api/item-profile/new-request/my-approvals",
                {
                    method: "GET",
                    params: this.myApprovals.params,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovals.isLoaded = true
                            this.myApprovals.list = response._data.data.data
                            this.myApprovals.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async storeItemProfile () {
            const { data, error } = await useFetch(
                "/api/item-profile/new-request/resource",
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "POST",
                    body: this.formItemProfile,
                    watch: false,
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
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
        async getItemGroups () {
            const { data, error } = await useInventoryApi(
                "/api/item-group/list",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.itemgroup = response._data.data.map((val: any) => {
                                return {
                                    id: val.name,
                                    name: val.name,
                                }
                            })
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
                        if (response.ok) {
                            this.subitemgroup = response._data.data.sub_groups.map((val: any) => {
                                return {
                                    id: val,
                                    name: val,
                                }
                            })
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
        async getItemProfile () {
            await useFetch(
                "/api/item-profile/list",
                {
                    baseURL: config.public.INVENTORY_API_URL,
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
        async showItemProfile (id: number) {
            await useFetch(
                "/api/item-profile/new-request/resource/" + id,
                {
                    baseURL: config.public.INVENTORY_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.page.list = response._data.data
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useInventoryApi(
                "/api/item-profile/new-request/my-approvals",
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
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useInventoryApi(
                "/api/approvals/approve/RequestItemProfiling/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyApprovalForm (id: string) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useInventoryApi(
                "/api/approvals/disapprove/RequestItemProfiling/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        }
                    },
                }
            )
        },
        approvalReset () {
            this.getAllRequests()
            this.getMyRequests()
            this.getMyApprovals()
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        reset () {
            this.formItemProfile = {} as ItemProfile
            this.successMessage = ""
            this.errorMessage = ""
        },
    },
})
