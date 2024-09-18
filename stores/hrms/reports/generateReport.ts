import { defineStore } from "pinia"
export const useGenerateReportStore = defineStore("GenerateReport", {
    state: () => ({
        sssEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        pagibigEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        philhealthEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        sssGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {},
            pagination: {},
        },
        pagibigGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {},
            pagination: {},
        },
        philhealthGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {},
            pagination: {},
        }
    }),
    getters: {
        // pagibig
        totalPagibigGroupRemittance (state): any {
            return state.pagibigGroupRemittance.list.reduce((accumulator, current: any) => {
                return accumulator + current.pagibig_employee_contribution
            }, 0)
        },
        totalPagibigEmployerGroupRemittance (state): any {
            return state.pagibigGroupRemittance.list.reduce((accumulator, current: any) => {
                return accumulator + current.pagibig_employer_contribution
            }, 0)
        },
        pagibigTotalGroupContribution (state): any {
            return state.pagibigGroupRemittance.list.reduce((accumulator, current: any) => {
                return accumulator + current.total_contribution
            }, 0)
        },
    },
    actions: {
        async getSssEmployeeRemitance () {
            await useHRMSApiO(
                "/api/reports/sss-employee-remittance",
                {
                    method: "GET",
                    params: this.sssEmployeeRemitanceList.params,
                    onRequest: () => {
                        this.sssEmployeeRemitanceList.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.sssEmployeeRemitanceList.isLoaded = true
                            this.sssEmployeeRemitanceList.list = response._data.data
                        }
                    },
                }
            )
        },
        async getPagibigEmployeeRemitance () {
            await useHRMSApiO(
                "/api/reports/pagibig-employee-remittance",
                {
                    method: "GET",
                    params: this.pagibigEmployeeRemitanceList.params,
                    onRequest: () => {
                        this.pagibigEmployeeRemitanceList.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.pagibigEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.pagibigEmployeeRemitanceList.isLoaded = true
                            this.pagibigEmployeeRemitanceList.list = response._data.data
                        }
                    },
                }
            )
        },
        async getPhilhealthEmployeeRemitance () {
            await useHRMSApiO(
                "/api/reports/philhealth-employee-remittance",
                {
                    method: "GET",
                    params: this.philhealthEmployeeRemitanceList.params,
                    onRequest: () => {
                        this.philhealthEmployeeRemitanceList.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.philhealthEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.philhealthEmployeeRemitanceList.isLoaded = true
                            this.philhealthEmployeeRemitanceList.list = response._data.data
                        }
                    },
                }
            )
        },
        async getSssGroupRemitance () {
            await useHRMSApiO(
                "/api/reports/sss-group-remittance",
                {
                    method: "GET",
                    params: this.sssGroupRemittance.params,
                    onRequest: () => {
                        this.sssGroupRemittance.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.sssGroupRemittance.isLoaded = true
                            this.sssGroupRemittance.list = response._data.data.remittances
                            this.sssGroupRemittance.chargingName = response._data.data.charging
                        }
                    },
                }
            )
        },
        async getPagibigGroupRemitance () {
            await useHRMSApiO(
                "/api/reports/pagibig-group-remittance",
                {
                    method: "GET",
                    params: this.pagibigGroupRemittance.params,
                    onRequest: () => {
                        this.pagibigGroupRemittance.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.pagibigGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.pagibigGroupRemittance.isLoaded = true
                            this.pagibigGroupRemittance.list = response._data.data.remittances
                            this.pagibigGroupRemittance.chargingName = response._data.data.charging
                        }
                    },
                }
            )
        },
        async getPhilhealthGroupRemitance () {
            await useHRMSApiO(
                "/api/reports/philhealth-group-remittance",
                {
                    method: "GET",
                    params: this.philhealthGroupRemittance.params,
                    onRequest: () => {
                        this.philhealthGroupRemittance.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.philhealthGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.philhealthGroupRemittance.isLoaded = true
                            this.philhealthGroupRemittance.list = response._data.data.remittances
                            this.philhealthGroupRemittance.chargingName = response._data.data.charging
                        }
                    },
                }
            )
        },
    },
})
