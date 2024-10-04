import { defineStore } from "pinia"
const { token } = useAuth()

export const APPROVED = "Approved"
export const PENDING = "Pending"
export const DENIED = "Denied"
export const APPROVAL_NEW_ITEM_PROFILE = "New Item Profile"

export const REQ_STATUS = [
    APPROVED,
    PENDING,
    DENIED,
]

export interface NewItemProfile {
    id: number,
    item_code: string,
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
    item_group_list: Array<any>,
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
            item_code: "",
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
        addItemProfile: [] as Array<NewItemProfile>,
        formItemProfile: {} as ItemProfile,
        newItemProfile: [] as Array<NewItemProfile>,
        uom: {} as any,
        itemDetails: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
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
        async getApprovalByName (approvalName: String) {
            const { data } = await useHRMSApi<any>(
                "/api/get-form-requests/" + approvalName,
                {
                    method: "GET",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.formItemProfile.approvals = response._data.data.approvals.map((approv: any) => {
                                return {
                                    type: approv.type,
                                    status: "Pending",
                                    user_id: approv.user_id,
                                    userselector: approv.userselector,
                                    date_approved: "",
                                    remarks: "",
                                    employee: approv.employee,
                                }
                            })
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                return data.value.data.approvals.map((approv: any) => {
                    return {
                        type: approv.type,
                        status: "Pending",
                        user_id: approv.user_id,
                        userselector: approv.userselector,
                        date_approved: "",
                        remarks: "",
                        employee: approv.employee,
                    }
                })
            }
        },
        async getUOM () {
            const { data, error } = await useInventoryApi(
                "/api/uom/resource",
                {
                    method: "GET",
                    watch: false,
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
        async activeItemProfile (id: number) {
            await useInventoryApi(
                "/api/item-profile/" + id + "/activate",
                {
                    method: "PATCH",
                    watch: false,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.getItemProfile()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async inActiveItemProfile (id: number) {
            await useInventoryApi(
                "/api/item-profile/" + id + "/deactivate",
                {
                    method: "PATCH",
                    watch: false,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.getItemProfile()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getAllRequests () {
            await useInventoryApi(
                "/api/item-profile/new-request/all-request",
                {
                    method: "GET",
                    params: this.allRequests.params,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allRequests.isLoading = false
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
                    onRequest: () => {
                        this.myRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myRequests.isLoading = false
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
                    onRequest: () => {
                        this.myApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myApprovals.isLoading = false
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
            const { data, error } = await useInventoryApi(
                "/api/item-profile/new-request/resource",
                {
                    method: "POST",
                    body: this.formItemProfile,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.reloadResources()
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
        async getItemProfile () {
            await useInventoryApi(
                "/api/item-profile/list",
                {
                    method: "GET",
                    params: this.itemDetails.params,
                    onRequest: () => {
                        this.itemDetails.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.itemDetails.isLoading = false
                        if (response.ok) {
                            this.itemDetails.isLoaded = true
                            this.itemDetails.list = response._data.data.data
                            this.itemDetails.pagination = {
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
        async showItemProfile (id: number) {
            await useInventoryApi(
                "/api/item-profile/new-request/resource/" + id,
                {
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    watch: false,
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
        itemProfileReset () {
            this.addItemProfile = [] as Array<NewItemProfile>
            this.newItemProfile = [] as Array<NewItemProfile>
        },
        reloadResources () {
            const callFunctions = []
            if (this.allRequests.isLoaded) {
                callFunctions.push(this.getAllRequests)
            }
            if (this.myRequests.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            if (this.myApprovals.isLoaded) {
                callFunctions.push(this.getMyApprovals)
            }
            this.$reset()
            this.itemProfileReset()
            this.getUOM()
            this.getApprovalByName(APPROVAL_NEW_ITEM_PROFILE)
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
