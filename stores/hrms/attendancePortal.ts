import { defineStore } from "pinia"
import { LabeledFaceDescriptors, FaceMatcher } from "face-api.js"
const config = useRuntimeConfig()
export const CATEGORY_TIME_IN = "In"
export const CATEGORY_TIME_OUT = "Out"
export const GROUP_TYPE_PROJECT = "Project"
export const GROUP_TYPE_DEPARTMENT = "Department"

export interface SavedFaceDescriptor {
    id: number,
    employee: any,
    employee_id: any,
    patterns: any,
}

export const useAttendancePortal = defineStore("attendancePortal", {
    state: () => ({
        attendanceLogList: [],
        facialPatterList: [] as Array<SavedFaceDescriptor>,
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
        pagination: {},
        getParams: {
            date: null,
            employee_id: null,
        },
        currentDate: null,
        attendanceSession: null,
        lastSuccessLogEmployee: null,
        portal_token: null,
        ipAddress: null,
        errorMessage: "",
        successMessage: "",
    }),
    getters: {
        faceNames (state) {
            const faceNames = [] as any
            state.facialPatterList.forEach((face) => {
                faceNames[face.employee_id] = face.employee.fullname_last
            })
            return faceNames
        },
        labeledFaceDescriptorsID (state) {
            return state.facialPatterList.map((face) => {
                const pattern = typeof face.patterns === "string" ? JSON.parse(face.patterns) : face.patterns
                const descriptor = [new Float32Array(Object.values(pattern.descriptor))]
                return new LabeledFaceDescriptors(face.employee_id + "", descriptor)
            })
        },
        faceMatcher () {
            if (this.labeledFaceDescriptorsID.length > 0) {
                return new FaceMatcher(this.labeledFaceDescriptorsID, config.public.FACE_MAX_DESCRIPTOR_DISTANCE)
            }
        }
    },
    actions: {
        async getAllEmployeePattern () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAttendancePortalApi(
                "/api/attendance/facial-list",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.facialPatterList = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getCurrentDate () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAttendancePortalApi(
                "/api/attendance/current-date",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.currentDate = new Date(response._data.data)
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async checkSession () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAttendancePortalApi(
                "/api/attendance/portal-session",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.attendanceSession = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getTodayAttendanceLogs () {
            await useAttendancePortalApi(
                "/api/attendance/today-logs",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.attendanceLogList = response._data.data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getSearchAttedanceLog () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApi(
                "/api/attendance/all-attendance-logs",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.attendanceLogList = response._data.data.data
                            this.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
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
        async getEmployeePattern (id: any) {
            this.successMessage = ""
            this.errorMessage = ""
            await useAttendancePortalApi(
                "/api/attendance/facial-list/" + id,
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.facialPatterList = response._data.data
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
            await useAttendancePortalApiO(
                "/api/attendance/facial",
                {
                    method: "POST",
                    body: this.attendancePortalParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.lastSuccessLogEmployee = response._data.data
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
