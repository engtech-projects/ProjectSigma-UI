import { defineStore } from "pinia"
export const CATEGORY_TIME_IN = "In"
export const CATEGORY_TIME_OUT = "Out"
export const GROUP_TYPE_PROJECT = "Project"
export const GROUP_TYPE_DEPARTMENT = "Department"
export const useAttendancePortal = defineStore("attendancePortal", {
    state: () => ({
        attendanceLogList: [],
        facialPatterList: [],
        attendancePortalList: [],
        attendancePortalParams: {
            name_location: null,
            project_id: null as null | Number,
            department_id: null as null | Number,
            employee_id: null as null | Number,
            log_type: null as null | String,
            group_type: null as null | String,
            name: null as null | String
        },
        portal_token: null,
        ipAddress: null,
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getAllEmployeePattern () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/face-pattern/list",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.facialPatterList = response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getTodayLogs () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance/today-logs",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.attendanceLogList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getIPAddress () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/today-logs",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.attendanceLogList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getAttendancePortal () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance-portal/resource",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.attendancePortalList = response._data.data.data
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async saveOrUpdateEmployeePattern (pattern: any, id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("employee_id", id)
            formData.append("patterns", JSON.stringify(pattern))
            await useHRMSApiO(
                "/api/face-pattern/resource",
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async saveAttendanceLog () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance/facial",
                {
                    method: "POST",
                    body: this.attendancePortalParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async saveAttendancePortal () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance-portal/resource",
                {
                    method: "POST",
                    body: this.attendancePortalParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.portal_token = response._data.data.portal_token
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async deleteAttendancePortal (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance-portal/resource/" + id,
                {
                    method: "DELETE",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async updateAttendancePortal () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance-portal/resource",
                {
                    method: "PUT",
                    body: this.attendancePortalParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    },
})
