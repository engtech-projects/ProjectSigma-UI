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
        // sss
        totalSssEmployeeRemittance (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current: any) => {
                return accumulator + current.sss_employee_contribution
            }, 0)
        },
        totalSssEmployerRemittance (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current: any) => {
                return accumulator + current.sss_employer_contribution
            }, 0)
        },
        sssTotalContribution (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current: any) => {
                return accumulator + current.total_contribution
            }, 0)
        },
        totalSssEmployerCompensation (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current: any) => {
                return accumulator + current.sss_employer_compensation
            }, 0)
        },
        sssTotal (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current: any) => {
                return accumulator + current.total_sss
            }, 0)
        },
        totalAmountDue (): any {
            return (this.totalSssEmployeeRemittance +
                this.totalSssEmployerRemittance +
                this.sssTotalContribution +
                this.totalSssEmployerCompensation +
                this.sssTotal)
        },
        // pagibig
        totalPagibigEmployeeRemittance (state): any {
            return state.pagibigEmployeeRemitanceList.list.reduce((accumulator, current: any) => {
                return accumulator + current.pagibig_employee_contribution
            }, 0)
        },
        totalPagibigEmployerRemittance (state): any {
            return state.pagibigEmployeeRemitanceList.list.reduce((accumulator, current: any) => {
                return accumulator + current.pagibig_employer_contribution
            }, 0)
        },
        pagibigTotalContribution (state): any {
            return state.pagibigEmployeeRemitanceList.list.reduce((accumulator, current: any) => {
                return accumulator + current.total_contribution
            }, 0)
        },

        // project
        totalSssProjectRemittance (state): any {
            return state.sssGroupRemittance.list.reduce((accumulator, current: any) => {
                return accumulator + current.sss_employee_contribution
            }, 0)
        },
        totalSssEmployerGroupRemittance (state): any {
            return state.sssGroupRemittance.list.reduce((accumulator, current: any) => {
                return accumulator + current.sss_employer_contribution
            }, 0)
        },
        sssTotalGroupContribution (state): any {
            return state.sssGroupRemittance.list.reduce((accumulator, current: any) => {
                return accumulator + current.total_contribution
            }, 0)
        },
        totalSssEmployerGroupCompensation (state): any {
            return state.sssGroupRemittance.list.reduce((accumulator, current: any) => {
                return accumulator + current.sss_employer_compensation
            }, 0)
        },
        sssGroupTotal (state): any {
            return state.sssGroupRemittance.list.reduce((accumulator, current: any) => {
                return accumulator + current.total_sss
            }, 0)
        },
        totalGroupAmountDue (): any {
            return (this.totalSssProjectRemittance +
                this.totalSssEmployerGroupRemittance +
                this.sssTotalGroupContribution +
                this.totalSssEmployerGroupCompensation +
                this.sssGroupTotal)
        },

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
