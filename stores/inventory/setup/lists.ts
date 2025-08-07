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
            pagination: {
                page: 1,
                pageSize: 20,
                total: 0
            },
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
            pagination: {
                page: 1,
                pageSize: 20,
                total: 0
            },
            errorMessage: "",
            successMessage: "",
        },
        projectList: {
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
            await useInventoryApiO(
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
                            this.departmentList.list = response._data.data.data
                            this.departmentList.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    }
                }
            )
        },
        async getEmployeeList () {
            await useInventoryApiO(
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
                            this.employeeList.list = response._data.data.data
                            this.employeeList.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    }
                }
            )
        },
        async getUsersList () {
            await useInventoryApiO(
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
                            this.usersList.list = response._data.data.data
                            this.usersList.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    }
                }
            )
        },
        async getProjectList () {
            await useInventoryApiO(
                "/api/setup/lists/project",
                {
                    method: "GET",
                    params: this.projectList.params,
                    onRequest: () => {
                        this.projectList.isLoading = true
                        this.projectList.list = []
                    },
                    onResponse: ({ response }) => {
                        this.projectList.isLoading = false
                        if (response.ok) {
                            this.projectList.isLoaded = true
                            this.projectList.list = response._data.data.data
                            this.projectList.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        }
                    }
                }
            )
        },
    }
})
