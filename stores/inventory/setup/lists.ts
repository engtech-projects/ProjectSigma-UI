import { defineStore } from "pinia"

export const useSetupListsStore = defineStore("setuplists", {
    state: () => ({
        departmentList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                page: 1,
                pageSize: 20,
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        employeeList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        usersList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                page: 1,
                pageSize: 20,
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        setupProjectsList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        warehouseList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
    }),
    actions: {
        async getDepartmentList () {
            await useInventoryApi(
                "/api/setup/lists/department",
                {
                    method: "GET",
                    params: this.departmentList.params,
                    onRequest: () => {
                        this.departmentList.isLoading = true
                        this.departmentList.list = []
                    },
                    onResponse: ({ response }) => {
                        this.departmentList.isLoading = false
                        if (response.ok) {
                            this.departmentList.isLoaded = true
                            this.departmentList.list = response._data.data
                            this.departmentList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    }
                }
            )
        },
        async getEmployeeList () {
            await useInventoryApi(
                "/api/setup/lists/employee",
                {
                    method: "GET",
                    params: this.employeeList.params,
                    onRequest: () => {
                        this.employeeList.isLoading = true
                        this.employeeList.list = []
                    },
                    onResponse: ({ response }) => {
                        this.employeeList.isLoading = false
                        if (response.ok) {
                            this.employeeList.isLoaded = true
                            this.employeeList.list = response._data.data
                            this.employeeList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    }
                }
            )
        },
        async getUsersList () {
            await useInventoryApi(
                "/api/setup/lists/users",
                {
                    method: "GET",
                    params: this.usersList.params,
                    onRequest: () => {
                        this.usersList.isLoading = true
                        this.usersList.list = []
                    },
                    onResponse: ({ response }) => {
                        this.usersList.isLoading = false
                        if (response.ok) {
                            this.usersList.isLoaded = true
                            this.usersList.list = response._data.data
                            this.usersList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    }
                }
            )
        },
        async getSetupProjectsList () {
            await useInventoryApi(
                "/api/setup/lists/project",
                {
                    method: "GET",
                    params: this.setupProjectsList.params,
                    onRequest: () => {
                        this.setupProjectsList.isLoading = true
                        this.setupProjectsList.list = []
                    },
                    onResponse: ({ response }) => {
                        this.setupProjectsList.isLoading = false
                        if (response.ok) {
                            this.setupProjectsList.isLoaded = true
                            this.setupProjectsList.list = response._data.data
                            this.setupProjectsList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    }
                }
            )
        },
        async getWarehouseList () {
            await useInventoryApi(
                "/api/setup/lists/warehouse",
                {
                    method: "GET",
                    params: this.warehouseList.params,
                    onRequest: () => {
                        this.warehouseList.isLoading = true
                        this.warehouseList.list = []
                    },
                    onResponse: ({ response }) => {
                        this.warehouseList.isLoading = false
                        if (response.ok) {
                            this.warehouseList.isLoaded = true
                            this.warehouseList.list = response._data.data
                            this.warehouseList.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        }
                    }
                }
            )
        },
    }
})
