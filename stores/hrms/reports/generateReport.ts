import { defineStore } from "pinia"
export const useGenerateReportStore = defineStore("GenerateReport", {
    state: () => ({
        sssEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        pagibigEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        philhealthEmployeeRemitanceList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        sssGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        pagibigGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        philhealthGroupRemittance: {
            isLoading: false,
            isLoaded: false,
            list: [],
            chargingName: null,
            params: {
                charging_type: null,
            },
            pagination: {},
            errorMessage: null,
            successMessage: null,
        },
        sssRemittanceSummaryList: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: null,
            successMessage: null,
        }
    }),
    getters: {},
    actions: {
        async getSssEmployeeRemittance () {
            await useHRMSApiO(
                "/api/reports/sss-employee-remittance",
                {
                    method: "GET",
                    params: this.sssEmployeeRemitanceList.params,
                    onRequest: () => {
                        this.sssEmployeeRemitanceList.isLoading = true
                        this.sssEmployeeRemitanceList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.sssEmployeeRemitanceList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.sssEmployeeRemitanceList.isLoaded = true
                            this.sssEmployeeRemitanceList.list = response._data.data
                            this.sssEmployeeRemitanceList.successMessage = response._data.message
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
                        this.pagibigEmployeeRemitanceList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.pagibigEmployeeRemitanceList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.pagibigEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.pagibigEmployeeRemitanceList.isLoaded = true
                            this.pagibigEmployeeRemitanceList.list = response._data.data
                            this.pagibigEmployeeRemitanceList.successMessage = response._data.message
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
                        this.philhealthEmployeeRemitanceList.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.philhealthEmployeeRemitanceList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.philhealthEmployeeRemitanceList.isLoading = false
                        if (response.ok) {
                            this.philhealthEmployeeRemitanceList.isLoaded = true
                            this.philhealthEmployeeRemitanceList.list = response._data.data
                            this.philhealthEmployeeRemitanceList.successMessage = response._data.message
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
                        this.sssGroupRemittance.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.sssGroupRemittance.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.sssGroupRemittance.isLoaded = true
                            this.sssGroupRemittance.list = response._data.data.remittances
                            this.sssGroupRemittance.chargingName = response._data.data.charging
                            this.sssGroupRemittance.successMessage = response._data.message
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
                        this.pagibigGroupRemittance.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.pagibigGroupRemittance.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.pagibigGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.pagibigGroupRemittance.isLoaded = true
                            this.pagibigGroupRemittance.list = response._data.data.remittances
                            this.pagibigGroupRemittance.chargingName = response._data.data.charging
                            this.pagibigGroupRemittance.successMessage = response._data.message
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
                        this.philhealthGroupRemittance.list = []
                    },
                    onResponseError: ({ response } : any) => {
                        this.philhealthGroupRemittance.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.philhealthGroupRemittance.isLoading = false
                        if (response.ok) {
                            this.philhealthGroupRemittance.isLoaded = true
                            this.philhealthGroupRemittance.list = response._data.data.remittances
                            this.philhealthGroupRemittance.chargingName = response._data.data.charging
                            this.philhealthGroupRemittance.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getSssRemittanceSummary () {
            await useHRMSApiO(
                "/api/reports/sss-remittance-summary",
                {
                    method: "GET",
                    params: this.sssRemittanceSummaryList.params,
                    onRequest: () => {
                        this.sssRemittanceSummaryList.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        this.sssRemittanceSummaryList.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.sssRemittanceSummaryList.isLoading = false
                        if (response.ok) {
                            this.sssRemittanceSummaryList.isLoaded = true
                            this.sssRemittanceSummaryList.list = response._data.data
                            this.sssRemittanceSummaryList.successMessage = response._data.message
                        }
                    },
                }
            )
        },
    },
})
