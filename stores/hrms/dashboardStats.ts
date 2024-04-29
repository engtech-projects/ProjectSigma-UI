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
            list: [] as Birthday[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        monthlyLates: {
            list: [] as Late[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        monthlyAbsences: {
            list: [] as Absent[],
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        latesAbsenceStats: {
            list: {} as any,
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        deptProjStats: {
            list: {} as any,
            params: {},
            successMessage: "",
            errorMessage: "",
        },
        genderStats: {
            list: {} as any,
            params: {},
            successMessage: "",
            errorMessage: "",
        },
    }),

    getters: {
    },
    actions: {
        async getMonthlyBirthday () {
            await useHRMSApiO(
                "/api/employee/monthly/birthdays",
                {
                    method: "GET",
                    params: this.monthlyBirthdays.params,
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
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
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        if (response.ok) {
                            this.monthlyLates.list = response._data.data ?? []
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
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        if (response.ok) {
                            this.monthlyAbsences.list = response._data.data ?? []
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
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
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
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
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
                    onResponseError: ({ response } : any) => {
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response } : any) => {
                        if (response.ok) {
                            this.genderStats.list = response._data.data ?? {}
                        }
                    },
                }
            )
        },
    },
})
