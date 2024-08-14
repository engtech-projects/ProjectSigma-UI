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

export const useItemProfileStore = defineStore("itemprofiles", {
    state: () => ({
        isEdit: false,
        itemProfile: {
            id: null,
            sku: "",
            qr_code: null,
            item_desc: "",
            thickness: "",
            length: "",
            width: "",
            height: "",
            outisde_diameter: "",
            inside_diameter: "",
            specification: "",
            grade: "",
            color: "",
            uom: "",
            item_group: "",
            subitem_group: "",
            item_type: "",
            convertions: "",
            status: "",
            approvals: [],
            request_by: [],
            verified_by: [],
            noted_by: [],
            request_status: ""
        },
        itemgroup: {} as ItemGroup,
        subitemgroup: [],
        uom: [],
        list: [],
        myApprovalRequestList: [],
        myRequestList: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getOne (id: any) {
            return await useHRMSApiO(
                "/api/travelorder-request/resource/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
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
                "/api/item-group/resource",
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
                "/api/travelorder-request/resource",
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
                "/api/travelorder-request/my-request",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequestList = response._data.data
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
                "/api/travelorder-request/my-approvals",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovalRequestList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },

        async createRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/travelorder-request/resource",
                {
                    method: "POST",
                    body: this.travel,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.$reset()
                            this.getMyApprovalRequests()
                            this.getItemProfile()
                            this.getMyRequests()
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
        async editRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/travelorder-request/resource/" + this.travel.id,
                {
                    method: "PATCH",
                    body: this.travel,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.$reset()
                            this.getMyApprovalRequests()
                            this.getItemProfile()
                            this.getMyRequests()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async deleteRequest (id: number) {
            const { data, error } = await useHRMSApi(
                "/api/travelorder-request/resource/" + id,
                {
                    method: "DELETE",
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.$reset()
                            this.getMyApprovalRequests()
                            this.getItemProfile()
                            this.getMyRequests()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
            if (error.value) {
                this.errorMessage = error.value.data.message
                throw new Error(this.errorMessage)
                return error
            }
            if (data.value) {
                this.getItemProfile()
                return data
            }
        },
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals/approve/TravelOrder/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getMyApprovalRequests()
                            this.getItemProfile()
                            this.getMyRequests()
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
            await useHRMSApiO(
                "/api/approvals/disapprove/TravelOrder/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getMyApprovalRequests()
                            this.getItemProfile()
                            this.getMyRequests()
                            return response._data
                        }
                    },
                }
            )
        },
    },
})
