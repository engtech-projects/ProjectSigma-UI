import { defineStore } from "pinia"

export const useMyDtrStore = defineStore("myDTRSTORE", {
    state: () => ({
        employee_dtr: {
            dtr: {},
        } as any,
        employee_dtr_v2: {
            dtr: {},
        } as any,
        v2IsLoading: false,
        successMessage: "",
        errorMessage: "",
    }),
    getters: {
        dtrUniqueSchedules (state) {
            if (!state.employee_dtr) {
                return []
            }
            const allScheds = Object.values(state.employee_dtr.dtr).map((sched:any) => {
                return [...sched.schedules_attendances]
            }).flat(1)
            return allScheds.filter((sched: any, index: any) => {
                return index === allScheds.findIndex((find: any) => {
                    return sched.start_time_human === find.start_time_human &&
                        sched.end_time_human === find.end_time_human
                })
            })
        },
        dtrUniqueOvertime (state) {
            if (!state.employee_dtr) {
                return []
            }
            const allScheds = Object.values(state.employee_dtr.dtr).map((sched:any) => {
                return [...sched.overtime]
            }).flat(1)
            return allScheds.filter((sched: any, index: any) => {
                return index === allScheds.findIndex((find: any) => {
                    return sched.start_time_human === find.start_time_human &&
                        sched.end_time_human === find.end_time_human
                })
            })
        },
        dtrUniqueSchedulesV2 (state) {
            if (!state.employee_dtr_v2) {
                return []
            }
            const allScheds = Object.values(state.employee_dtr_v2.dtr).map((sched:any) => {
                return [...sched.metadata.summary.schedules]
            }).flat(1)
            return allScheds.filter((sched: any, index: any) => {
                return index === allScheds.findIndex((find: any) => {
                    return sched.start_time_sched === find.start_time_sched &&
                        sched.end_time_sched === find.end_time_sched
                })
            })
        },
        dtrUniqueOvertimeV2 (state) {
            if (!state.employee_dtr_v2) {
                return []
            }
            const allScheds = Object.values(state.employee_dtr_v2.dtr).map((sched:any) => {
                return [...sched.metadata.summary.overtimes]
            }).flat(1)
            return allScheds.filter((sched: any, index: any) => {
                return index === allScheds.findIndex((find: any) => {
                    return sched.start_time_sched === find.start_time_sched &&
                        sched.end_time_sched === find.end_time_sched
                })
            })
        },
    },
    actions: {
        async getEmployeeDTR (employeeId: number, start:string, end:string) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance/dtr",
                {
                    params: {
                        employee_id: employeeId,
                        cutoff_start: start,
                        cutoff_end: end,
                    },
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.employee_dtr = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getEmployeeDTRV2 (employeeId: number, start:string, end:string) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/v2/attendance/dtr",
                {
                    params: {
                        employee_id: employeeId,
                        cutoff_start: start,
                        cutoff_end: end,
                    },
                    method: "GET",
                    onRequest: () => {
                        this.v2IsLoading = true
                    },
                    onResponse: ({ response }: any) => {
                        this.v2IsLoading = false
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.employee_dtr_v2 = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    }
})
