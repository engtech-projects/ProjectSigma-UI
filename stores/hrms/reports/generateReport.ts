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
    }),
    getters: {
        // sss
        totalSssEmployeeRemittance (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current) => {
                return accumulator + current.sss_employee_contribution
            }, 0)
        },
        totalSssEmployerRemittance (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current) => {
                return accumulator + current.sss_employer_contribution
            }, 0)
        },
        sssTotalContribution (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current) => {
                return accumulator + current.total_contribution
            }, 0)
        },
        totalSssEmployerCompensation (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current) => {
                return accumulator + current.sss_employer_compensation
            }, 0)
        },
        sssTotal (state): any {
            return state.sssEmployeeRemitanceList.list.reduce((accumulator, current) => {
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
            return state.pagibigEmployeeRemitanceList.list.reduce((accumulator, current) => {
                return accumulator + current.pagibig_employee_contribution
            }, 0)
        },
        totalPagibigEmployerRemittance (state): any {
            return state.pagibigEmployeeRemitanceList.list.reduce((accumulator, current) => {
                return accumulator + current.pagibig_employer_contribution
            }, 0)
        },
        pagibigTotalContribution (state): any {
            return state.pagibigEmployeeRemitanceList.list.reduce((accumulator, current) => {
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
    },
})
