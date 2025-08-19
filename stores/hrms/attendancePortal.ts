import { defineStore } from "pinia"
import { LabeledFaceDescriptors, FaceMatcher } from "face-api.js"
const config = useRuntimeConfig()
export const CATEGORY_TIME_IN = "In"
export const CATEGORY_TIME_OUT = "Out"
export const GROUP_TYPE_PROJECT = "Project"
export const GROUP_TYPE_DEPARTMENT = "Department"
export const ATTENDANCE_TYPE_FACIAL = "Facial"
export const ATTENDANCE_TYPE_QRCODE = "QR Code"

export interface SavedFaceDescriptor {
    id: number,
    employee: any,
    employee_id: any,
    patterns: any,
}

export const useAttendancePortal = defineStore("attendancePortal", {
    state: () => ({
        allAttendancePortals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            errorMessage: "",
            successMessage: "",
        },
        createAttendancePortal: {
            isLoading: false,
            isLoaded: false,
            data: {
                name_location: null,
                assignments: [] as null | Array<any>,
                employee_id: null as null | Number,
                log_type: null as null | String,
                name: null as null | String,
            },
            errorMessage: "",
            successMessage: "",
        },
        attendanceLogs: {
            isLoaded: false,
            list: [],
            params: {
                date: null,
                employee_id: null,
                project_id: null as null | Number,
                department_id: null as null | Number,
                attendance_type: null as null | String,
            },
            pagination: {},
        },
        attendanceLogList: [],
        facialPatterList: [] as Array<SavedFaceDescriptor>,
        attendancePortalParams: {
            name_location: null,
            assignments: [] as null | Array<any>,
            employee_id: null as null | Number,
            log_type: null as null | String,
            name: null as null | String,
            page: 1,
        },
        getParams: {
            date: null,
            employee_id: null,
        },
        currentDate: new Date(),
        currentTime: new Date(),
        attendanceSession: null,
        lastSuccessLogEmployee: null,
        portal_token: null,
        ipAddress: null,
        errorMessage: "",
        successMessage: "",
        newAttendanceLog: {
            isLoading: false,
            data: {
                employee_id: null as null | Number,
                log_type: null as null | String,
                assignment_type: null as null | Number,
                department_id: null as null | Number,
                project_id: null as null | Number,
            },
            successMessage: "",
            errorMessage: "",
        }
    }),
    getters: {
        faceNames (state) {
            const faceNames = [] as any
            state.facialPatterList.forEach((face) => {
                faceNames[face.employee_id] = face.employee?.fullname_last
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
                "/api/attendance/current-date-time",
                {
                    method: "GET",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.currentDate = new Date(response._data.date)
                            this.currentTime = new Date(response._data.time)
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
                            this.attendanceLogList = response._data.data
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
                    params: this.attendanceLogs.params,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.attendanceLogs.isLoaded = true
                            this.attendanceLogs.list = response._data.data
                            this.attendanceLogs.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async deleteLog (id: any) {
            return await useHRMSApiO(
                "/api/attendance/log/" + id,
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
                    body: this.newAttendanceLog.data,
                    onRequest: () => {
                        this.newAttendanceLog.isLoading = true
                    },
                    onResponse: ({ response }: any) => {
                        this.newAttendanceLog.isLoading = false
                        if (response.ok) {
                            this.lastSuccessLogEmployee = response._data.data
                            this.newAttendanceLog.successMessage = response._data.message
                            return response._data
                        } else {
                            this.newAttendanceLog.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getAttendancePortal () {
            this.allAttendancePortals.isLoaded = true
            await useHRMSApi(
                "/api/attendance-portal/resource",
                {
                    method: "GET",
                    params: this.allAttendancePortals.params,
                    onRequest: () => {
                        this.allAttendancePortals.isLoading = true
                    },
                    onResponse: ({ response }: any) => {
                        this.allAttendancePortals.isLoading = false
                        if (response.ok) {
                            this.allAttendancePortals.list = response._data.data
                            this.allAttendancePortals.pagination = {
                                first_page: response._data.links.first,
                                pages: response._data.meta.links,
                                last_page: response._data.links.last,
                            }
                            return response._data
                        } else {
                            this.allAttendancePortals.errorMessage = response._data.message
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
                            this.attendancePortalParams = {
                                name_location: null,
                                assignments: [] as null | Array<any>,
                                employee_id: null as null | Number,
                                log_type: null as null | String,
                                name: null as null | String,
                                page: 1,
                            }
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
