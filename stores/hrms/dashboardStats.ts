import { defineStore } from "pinia"
export interface Birthday {
    id: number,
    first_name: string,
    family_name: string,
    middle_name: string,
    date_of_birth: string,
    fullname_last: string,
    fullname_first: string,
}
export interface Late {
    id: number,
    first_name: string,
    family_name: string,
    middle_name: string,
    lates: string,
    fullname_last: string,
    fullname_first: string,
}
export interface Absent {
    id: number,
    first_name: string,
    family_name: string,
    middle_name: string,
    absences: string,
    fullname_last: string,
    fullname_first: string,
}
export const useDashboardStatisticsStore = defineStore("dashboardStats", {
    state: () => ({
        monthlyBirthdays: {
            isLoading: false,
            list: [] as Birthday[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        monthlyLates: {
            isLoading: false,
            list: [] as Late[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        monthlyAbsences: {
            isLoading: false,
            list: [] as Absent[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        monthlyLateAbsences: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                reload: false,
            },
            successMessage: "",
            errorMessage: "",
        },
        latesAbsenceStats: {
            isLoading: false,
            list: {} as any,
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        deptProjStats: {
            isLoading: false,
            list: {} as any,
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        genderStats: {
            isLoading: false,
            list: {} as any,
            params: {},
            successMessage: "",
            errorMessage: "",
        },
    }),

    getters: {
        latesAbsencesSummary (state) {
            return {
                lates: state.monthlyLates.list ? state.monthlyLates.list.length : 0,
                absents: state.monthlyAbsences.list ? state.monthlyAbsences.list.length : 0,
            }
        }
    },
    actions: {
        async getMonthlyBirthday () {
            await useHRMSApiO(
                "/api/employee/monthly/birthdays",
                {
                    method: "GET",
                    params: this.monthlyBirthdays.params,
                    onRequest: () => {
                        this.monthlyBirthdays.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.monthlyBirthdays.isLoading = false
                        if (response.ok) {
                            this.monthlyBirthdays.list = response._data.data ?? []
                        }
                    },
                }
            )
        },
        async getMonthlyLates () {
            await useHRMSApiO(
                "/api/employee/monthly/lates",
                {
                    method: "GET",
                    params: this.monthlyLates.params,
                    onRequest: () => {
                        this.monthlyLates.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.monthlyLates.isLoading = false
                        if (response.ok) {
                            this.monthlyLates.list = response._data ?? []
                        }
                    },
                }
            )
        },
        async getMonthlyLateAbsences () {
            await useHRMSApiO(
                "/api/employee/monthly/lates-absence",
                {
                    method: "GET",
                    params: this.monthlyLateAbsences.params,
                    onRequest: () => {
                        this.monthlyLateAbsences.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.monthlyLateAbsences.isLoading = false
                        if (response.ok) {
                            this.monthlyLateAbsences.isLoaded = true
                            this.monthlyLates.list = response._data.data?.lates ?? []
                            this.monthlyAbsences.list = response._data.data?.absence ?? []
                        }
                    },
                }
            )
        },
        async getMonthlyAbsences () {
            await useHRMSApiO(
                "/api/employee/monthly/absences",
                {
                    method: "GET",
                    params: this.monthlyAbsences.params,
                    onRequest: () => {
                        this.monthlyAbsences.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.monthlyAbsences.isLoading = false
                        if (response.ok) {
                            this.monthlyAbsences.list = response._data ?? []
                        }
                    },
                }
            )
        },
        async getLatesAbsenceStats () {
            await useHRMSApiO(
                "/api/employee/statistics/attendance-infractions",
                {
                    method: "GET",
                    params: this.latesAbsenceStats.params,
                    onRequest: () => {
                        this.latesAbsenceStats.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.latesAbsenceStats.isLoading = false
                        if (response.ok) {
                            this.latesAbsenceStats.list = response._data.data ?? {}
                        }
                    },
                }
            )
        },
        async getDeptProjStats () {
            await useHRMSApiO(
                "/api/employee/statistics/department",
                {
                    method: "GET",
                    params: this.deptProjStats.params,
                    onRequest: () => {
                        this.deptProjStats.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.deptProjStats.isLoading = false
                        if (response.ok) {
                            this.deptProjStats.list = response._data.data ?? {}
                        }
                    },
                }
            )
        },
        async getGenderStats () {
            await useHRMSApiO(
                "/api/employee/statistics/gender",
                {
                    method: "GET",
                    params: this.genderStats.params,
                    onRequest: () => {
                        this.genderStats.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        this.genderStats.isLoading = false
                        if (response.ok) {
                            this.genderStats.list = response._data.data ?? {}
                        }
                    },
                }
            )
        },
    },
})
