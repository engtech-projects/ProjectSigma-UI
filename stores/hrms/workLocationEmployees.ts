import { defineStore } from "pinia"

export const useWorkLocationEmployees = defineStore("WorkLocations", {
    state: () => ({
        employeeList: {
            isLoading: false,
            isLoaded: false,
            data: [],
            params: {
                type: "",
                id: "",
            },
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
    }),
    actions: {
        async getLocationEmployees () {
            await useHRMSApi(
                "/api/employee/location-employees",
                {
                    method: "GET",
                    params: this.employeeList.params,
                    onRequest: () => {
                        this.employeeList.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.employeeList.isLoading = false
                        if (response.ok) {
                            this.employeeList.data = response._data.data.data
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.employeeList.isLoaded) {
                callFunctions.push(this.getLocationEmployees)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        }
    },
})
