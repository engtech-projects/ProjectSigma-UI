import { defineStore } from "pinia"

export interface Supplier {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export interface Payees {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export interface Employee {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export interface Users {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export interface Projects {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}

export interface Departments {
    name: String,
    stakeholdable_type: String,
    stakeholdable_id: Number,
    created_at: String,
    updated_at: String,
}
export interface ParticularGroups {
    id: Number,
    name: String,
    created_at: String,
    updated_at: String,
}
export interface JournalAccount {
    id: Number,
    account_number: String,
    account_name: String,
    account_description: String,
    bank_reconciliation: Boolean,
    is_active: Boolean,
    statement: String,
    details: Array<any>,
    deleted_at: String,
    created_at: String,
    updated_at: String,
}
export const useAccountingEnumStore = defineStore("accountingEnums", {
    state: () => ({
        test: true,
        supplierEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Supplier[],
            params: {
                type: "supplier",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        payeeEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Payees[],
            params: {
                type: "payee",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        employeeEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Employee[],
            params: {
                type: "employee",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        usersEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Users[],
            params: {
                type: "users",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        projectsEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Projects[],
            params: {
                type: "project",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        departmentEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as Departments[],
            params: {
                type: "department",
                key: "",
            },
            successMessage: "",
            errorMessage: "",
        },
        particularGroupsEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as ParticularGroups[],
            params: {
                key: "",
            },
        },
        journalAccountEnum: {
            isLoading: false,
            isLoaded: false,
            list: [] as JournalAccount[],
            params: {
                key: "",
            },
        },
    }),
    actions: {
        async getSupplierEnums () {
            this.supplierEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.supplierEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.supplierEnum.list = response._data.data.data
                            this.supplierEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getPayeesEnum () {
            this.payeeEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.payeeEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.payeeEnum.list = response._data.data.data
                            this.payeeEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getEmployeeEnums () {
            this.employeeEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.employeeEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.employeeEnum.list = response._data.data.data
                            this.employeeEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getProjectsEnums () {
            this.projectsEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.projectsEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.projectsEnum.list = response._data.data.data
                            this.projectsEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getDepartmentEnums () {
            this.departmentEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.departmentEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.departmentEnum.list = response._data.data.data
                            this.departmentEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async getUsersEnums () {
            this.usersEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-stakeholders",
                {
                    method: "GET",
                    params: this.usersEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.usersEnum.list = response._data.data.data
                            this.usersEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async searchParticularGroups () {
            this.particularGroupsEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-particular-groups",
                {
                    method: "GET",
                    params: this.particularGroupsEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.particularGroupsEnum.list = response._data.data
                            this.particularGroupsEnum.isLoaded = true
                        }
                    },
                }
            )
        },
        async searchJournalAccounts () {
            this.journalAccountEnum.isLoaded = true
            await useAccountingApi(
                "/api/search-journal-accounts",
                {
                    method: "GET",
                    params: this.journalAccountEnum.params,
                    onResponseError: ({ response }: any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.journalAccountEnum.list = response._data.data.data
                            this.journalAccountEnum.isLoaded = true
                        }
                    },
                }
            )
        }
    },
})
