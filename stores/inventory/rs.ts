import { defineStore } from "pinia"

export interface RsDetails {
    office_project: String,
    equipment_no: String,
    list: any,
    project_address: String,
    request_to: String,
    conso_period: String,
    contact_number: String,
    remarks: String,
    smr: String,
}
export interface RsList {
    qty: String,
    unit: String,
    sku: String,
    item_description: String,
    specification: String,
    preferred_brand: String,
    reason_for_request: String,
    turn_over: String,
}

export const useRS = defineStore("rsStore", {
    state: () => ({
        rs: {
            isLoading: false,
            isLoaded: false,
            list: [] as Array<RsList>,
            form: {} as RsDetails,
            details: [] as Array<RsList>,
            params: {},
            pagination: {},
        },
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async fetchRs () {
            await useInventoryApi(
                "/api/rs/resource",
                {
                    method: "GET",
                    params: this.rs.params,
                    onRequest: () => {
                        this.rs.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.rs.isLoading = false
                        if (response.ok) {
                            this.rs.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async fetchRsDetails (id: any) {
            await useInventoryApi(
                "/api/rs/overview/" + id,
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.rs.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.rs.isLoading = false
                        if (response.ok) {
                            this.rs.details = response._data.data
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
        },
    },
})
