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
    }),
    getters: {
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
    },
})
