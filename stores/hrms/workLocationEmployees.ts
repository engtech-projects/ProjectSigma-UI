import { defineStore } from "pinia"

export const useWorkLocationEmployees = defineStore("WorkLocations", {
    state: () => ({
        locationMembers: {
            isLoading: false,
            isLoaded: false,
            info: {
                id: null,
                name: "",
                type: "",
            },
            employees: [],
            params: {
                unassigned: 0,
                type: "",
                project_id: "",
                department_id: "",
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
                    params: this.locationMembers.params,
                    onRequest: () => {
                        this.locationMembers.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.locationMembers.isLoading = false
                        if (response.ok) {
                            this.locationMembers.info = response._data.data.location_information
                            this.locationMembers.employees = response._data.data.employees
                        }
                    },
                }
            )
        },
        reloadResources () {
            const callFunctions = []
            if (this.locationMembers.isLoaded) {
                callFunctions.push(this.getLocationEmployees)
            }
            this.$reset()
            callFunctions.forEach((element) => {
                element()
            })
        }
    },
})
