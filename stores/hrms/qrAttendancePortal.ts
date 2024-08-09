import { defineStore } from "pinia"
export const CATEGORY_TIME_IN = "In"
export const CATEGORY_TIME_OUT = "Out"
export const ATTENDANCE_TYPE_FACIAL = "Facial"
export const ATTENDANCE_TYPE_QRCODE = "QR Code"

export const useQrAttendancePortal = defineStore("qrAttendancePortal", {
    state: () => ({
        qrAttendanceParams: {
            project_id: null as null | Number,
            department_id: null as null | Number,
            employee_code: null as null | String,
            offset: null as null | Number,
            result: null as null | String,
            log_type: null as null | String,
        },
        successMessage: null as null | String,
        errorMessage: null as null | String,
        tempEmployeeCode: null as null | String,
    }),
    getters: {},
    actions: {
        async saveAttendanceLogQr () {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/attendance/qr",
                {
                    method: "POST",
                    body: this.qrAttendanceParams,
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
