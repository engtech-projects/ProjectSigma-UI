import { defineStore } from "pinia"

export const useSchedulesStore = defineStore({
    id: "mySchedulesStore",
    state: () => ({
        listSchedulesDept: {
            isLoading: false,
            params: {
                department_id: null,
                start_date: "",
                end_date: "",
            },
            data: [],
            successMessage: "",
        },
        createScheduleRequestDept: {
            isLoading: false,
            body: {
                groupType: "department",
                department_id: null as null | Number,
                daysOfWeek: [],
                startTime: "",
                endTime: "",
                startRecur: "",
                endRecur: "",
                scheduleType: "Regular",
            },
            successMessage: "",
        },
        updateScheduleRequestDept: {
            isLoading: false,
            show: false,
            body: {
                id: null as null | Number,
                groupType: "department",
                department_id: null as null | Number,
                daysOfWeek: [],
                startTime: "",
                endTime: "",
                startRecur: "",
                endRecur: "",
                scheduleType: "Regular",
            },
            successMessage: "",
        },
        listSchedulesEmployee: {
            isLoading: false,
            params: {
                employee_id: null,
                start_date: "",
                end_date: "",
            },
            data: [],
            successMessage: "",
        },
        createScheduleRequestEmployee: {
            isLoading: false,
            body: {
                groupType: "employee",
                employee_id: null as null | Number,
                daysOfWeek: [],
                startTime: "",
                endTime: "",
                startRecur: "",
                endRecur: "",
                scheduleType: "Regular",
            },
            successMessage: "",
        },
        updateScheduleRequestEmployee: {
            isLoading: false,
            show: false,
            body: {
                id: null as null | Number,
                groupType: "employee",
                employee_id: null as null | Number,
                daysOfWeek: [],
                startTime: "",
                endTime: "",
                startRecur: "",
                endRecur: "",
                scheduleType: "Regular",
            },
            successMessage: "",
        },
        listSchedulesProject: {
            isLoading: false,
            params: {
                project_id: null,
                start_date: "",
                end_date: "",
            },
            data: [],
            successMessage: "",
        },
        createScheduleRequestProject: {
            isLoading: false,
            body: {
                groupType: "project",
                project_id: null as null | Number,
                daysOfWeek: [],
                startTime: "",
                endTime: "",
                startRecur: "",
                endRecur: "",
                scheduleType: "Regular",
            },
            successMessage: "",
        },
        updateScheduleRequestProject: {
            isLoading: false,
            show: false,
            body: {
                id: null as null | Number,
                groupType: "project",
                project_id: null as null | Number,
                daysOfWeek: [],
                startTime: "",
                endTime: "",
                startRecur: "",
                endRecur: "",
                scheduleType: "Regular",
            },
            successMessage: "",
        },
        deleteScheduleRequest: {
            isLoading: false,
            successMessage: "",
        },
    }),
    actions: {
        async getSchedulesDept () {
            if (this.listSchedulesDept.params.department_id === null) {
                return
            }
            return await useHRMSApiO(
                "api/schedule",
                {
                    method: "GET",
                    params: this.listSchedulesDept.params,
                    onRequest: () => {
                        this.listSchedulesDept.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.listSchedulesDept.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.listSchedulesDept.isLoading = false
                        if (response.ok) {
                            this.listSchedulesDept.data = response._data.data
                            return response._data.data
                        }
                    },
                }
            )
        },
        async createScheduleDept () {
            return await useHRMSApiO(
                "api/schedule",
                {
                    method: "POST",
                    body: this.createScheduleRequestDept.body,
                    onRequest: () => {
                        this.createScheduleRequestDept.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createScheduleRequestDept.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.createScheduleRequestDept.isLoading = false
                        if (response.ok) {
                            this.createScheduleRequestDept.successMessage = response._data.message
                            return response._data.data
                        }
                    },
                }
            )
        },
        async updateScheduleDept () {
            return await useHRMSApiO(
                "api/schedule/" + this.updateScheduleRequestDept.body.id,
                {
                    method: "PATCH",
                    body: this.updateScheduleRequestDept.body,
                    onRequest: () => {
                        this.updateScheduleRequestDept.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.updateScheduleRequestDept.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.updateScheduleRequestDept.isLoading = false
                        if (response.ok) {
                            this.updateScheduleRequestDept.successMessage = response._data.message
                            return response._data.data
                        }
                    },
                }
            )
        },
        async getSchedulesEmployee () {
            if (this.listSchedulesEmployee.params.employee_id === null) {
                return
            }
            return await useHRMSApiO(
                "api/schedule",
                {
                    method: "GET",
                    params: this.listSchedulesEmployee.params,
                    onRequest: () => {
                        this.listSchedulesEmployee.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.listSchedulesEmployee.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.listSchedulesEmployee.isLoading = false
                        if (response.ok) {
                            this.listSchedulesEmployee.data = response._data.data
                            return response._data.data
                        }
                    },
                }
            )
        },
        async createScheduleEmployee () {
            return await useHRMSApiO(
                "api/schedule",
                {
                    method: "POST",
                    body: this.createScheduleRequestEmployee.body,
                    onRequest: () => {
                        this.createScheduleRequestEmployee.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createScheduleRequestEmployee.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.createScheduleRequestEmployee.isLoading = false
                        if (response.ok) {
                            this.createScheduleRequestEmployee.successMessage = response._data.message
                            return response._data.data
                        }
                    },
                }
            )
        },
        async updateScheduleEmployee () {
            return await useHRMSApiO(
                "api/schedule",
                {
                    method: "PATCH",
                    body: this.updateScheduleRequestEmployee.body,
                    onRequest: () => {
                        this.updateScheduleRequestEmployee.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.updateScheduleRequestEmployee.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.updateScheduleRequestEmployee.isLoading = false
                        if (response.ok) {
                            this.updateScheduleRequestEmployee.successMessage = response._data.message
                            return response._data.data
                        }
                    },
                }
            )
        },
        async getSchedulesProject () {
            if (this.listSchedulesProject.params.project_id === null) {
                return
            }
            return await useHRMSApiO(
                "api/schedule",
                {
                    method: "GET",
                    params: this.listSchedulesProject.params,
                    onRequest: () => {
                        this.listSchedulesProject.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.listSchedulesProject.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.listSchedulesProject.isLoading = false
                        if (response.ok) {
                            this.listSchedulesProject.data = response._data.data
                            return response._data.data
                        }
                    },
                }
            )
        },
        async createScheduleProject () {
            return await useHRMSApiO(
                "api/schedule",
                {
                    method: "POST",
                    body: this.createScheduleRequestProject.body,
                    onRequest: () => {
                        this.createScheduleRequestProject.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createScheduleRequestProject.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.createScheduleRequestProject.isLoading = false
                        if (response.ok) {
                            this.createScheduleRequestProject.successMessage = response._data.message
                            return response._data.data
                        }
                    },
                }
            )
        },
        async updateScheduleProject () {
            return await useHRMSApiO(
                "api/schedule",
                {
                    method: "PATCH",
                    body: this.updateScheduleRequestProject.body,
                    onRequest: () => {
                        this.updateScheduleRequestProject.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.updateScheduleRequestProject.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.updateScheduleRequestProject.isLoading = false
                        if (response.ok) {
                            this.updateScheduleRequestProject.successMessage = response._data.message
                            return response._data.data
                        }
                    },
                }
            )
        },
        async deleteSchedule (id: any) {
            return await useHRMSApiO(
                "api/schedule/" + id,
                {
                    method: "DELETE",
                    onRequest: () => {
                        this.deleteScheduleRequest.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.deleteScheduleRequest.isLoading = false
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.deleteScheduleRequest.isLoading = false
                        if (response.ok) {
                            this.deleteScheduleRequest.successMessage = response._data.message
                            return response._data.data
                        }
                    },
                }
            )
        }
    }
})
