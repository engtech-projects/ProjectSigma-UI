import { defineStore } from "pinia"
const { token } = useAuth()
const config = useRuntimeConfig()

export const EMPLOYEMENT_STUDENTTRAINEE = "Student Trainee"
export const EMPLOYEMENT_PROJECTHIRE = "Project Hire"
export const EMPLOYEMENT_CONTRACTUAL = "Contractual"
export const EMPLOYEMENT_REGULAR = "Regular"
export const EMPLOYMENT_TYPE = [
    EMPLOYEMENT_STUDENTTRAINEE,
    EMPLOYEMENT_PROJECTHIRE,
    EMPLOYEMENT_CONTRACTUAL,
    EMPLOYEMENT_REGULAR
]

export const NATURE_NEW = "New/Addition"
export const NATURE_REPLACEMENT = "Replacement"
export const NATURE_REQUESTS = [
    NATURE_NEW,
    NATURE_REPLACEMENT
]

export const STATUS_SINGLE = "Single"
export const STATUS_MARRIED = "Married"
export const STATUS_NOPREFERENCE = "No Preference"
export const STATUS = [
    STATUS_SINGLE,
    STATUS_MARRIED,
    STATUS_NOPREFERENCE
]

export const GENDER_MALE = "Male"
export const GENDER_FEMALE = "Female"
export const GENDER_NOPREFERENCE = "No Preference"
export const GENDER = [
    GENDER_MALE,
    GENDER_FEMALE,
    GENDER_NOPREFERENCE
]

export const REQUEST_PENDING = "Pending"
export const REQUEST_APPROVED = "Approved"
export const REQUEST_FILLED = "Filled"
export const REQUEST_HOLD = "Hold"
export const REQUEST_CANCELLED = "Cancelled"
export const REQUEST_DISAPPROVED = "Disapproved"
export const REQUEST_STATUS = [
    REQUEST_PENDING,
    REQUEST_APPROVED,
    REQUEST_FILLED,
    REQUEST_HOLD,
    REQUEST_CANCELLED,
    REQUEST_DISAPPROVED
]

export const useManpowerStore = defineStore("manpowers", {
    state: () => ({
        isEdit: false,
        manpower:
        {
            id: null,
            requesting_department: null,
            date_requested: null,
            date_required: null,
            position: null,
            employment_type: "",
            brief_description: null,
            job_description_attachment: null,
            nature_of_request: "",
            age_range: null,
            status: "",
            gender: "",
            educational_requirement: null,
            preferred_qualifications: null,
            approvals: null,
            remarks: null,
            request_status: "",
            charged_to: null,
            breakdown_details: null,
            requested_by: null
        },
        list: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
    }),
    actions: {
        async getDepartmentList () {
            const { data, error } = await useFetch(
                "/api/manpower-requests",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.departmentList = response._data.data
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async getManpower () {
            const { data, error } = await useFetch(
                "/api/manpower-requests",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.list = response._data.data.data
                        this.pagination = {
                            first_page: response._data.data.first_page_url,
                            pages: response._data.data.links,
                            last_page: response._data.data.last_page_url,
                        }
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },

        async createManpower () {
            this.successMessage = ""
            this.errorMessage = ""
            await useFetch(
                "/api/manpower-requests",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "POST",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.manpower,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.status !== 200) {
                            this.errorMessage = response._data.message
                        } else {
                            this.getManpower()
                            this.reset()
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },
        async editManpower () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useFetch(
                "/api/manpower-requests/" + this.manpower.id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "PATCH",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    body: this.manpower,
                    watch: false,
                }
            )
            if (data.value) {
                this.getManpower()
                this.reset()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async deleteManpower (id: number) {
            const { data, error } = await useFetch(
                "/api/manpower-requests/" + id,
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "DELETE",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    watch: false,
                    onResponse: ({ response }) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.getManpower()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

        reset () {
            this.manpower = {
                id: null,
                requesting_department: null,
                date_requested: null,
                date_required: null,
                position: null,
                employment_type: "",
                brief_description: null,
                job_description_attachment: null,
                nature_of_request: "",
                age_range: null,
                status: "",
                gender: "",
                educational_requirement: null,
                preferred_qualifications: null,
                approvals: null,
                remarks: null,
                request_status: "",
                charged_to: null,
                breakdown_details: null,
                requested_by: null
            }
            this.isEdit = false
            this.successMessage = ""
            this.errorMessage = ""
        },

    },
})
