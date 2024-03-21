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
        isDetail: false,
        manpower:
        {
            id: null,
            requesting_department: null,
            date_requested: null,
            date_required: null,
            position: null,
            employment_type: "",
            brief_description: null,
            job_description_attachment: undefined,
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
        myApprovalRequestList: [],
        myRequestList: [],
        manpowerHiringList: [],
        applicantDetails: [],
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
                        this.getDepartmentList = response._data.data
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
            await useFetch(
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
        },
        async getMyRequests () {
            await useFetch(
                "/api/manpower/my-requests",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.myRequestList = response._data.data
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useFetch(
                "/api/manpower/my-approvals",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.myApprovalRequestList = response._data.data
                    },
                }
            )
        },
        async getManpowerHiringRequests () {
            await useFetch(
                "/api/manpower/for-hiring",
                {
                    baseURL: config.public.HRMS_API_URL,
                    method: "GET",
                    headers: {
                        Authorization: token.value + "",
                        Accept: "application/json"
                    },
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.manpowerHiringList = response._data.data
                    },
                }
            )
        },
        async createManpower () {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("requesting_department", this.manpower.requesting_department)
            formData.append("date_requested", this.manpower.date_requested)
            formData.append("date_required", this.manpower.date_required)
            formData.append("position", this.manpower.position)
            formData.append("employment_type", this.manpower.employment_type)
            formData.append("brief_description", this.manpower.brief_description)
            formData.append("nature_of_request", this.manpower.nature_of_request)
            formData.append("age_range", this.manpower.age_range)
            formData.append("status", this.manpower.status)
            formData.append("gender", this.manpower.gender)
            formData.append("educational_requirement", this.manpower.educational_requirement)
            formData.append("preferred_qualifications", this.manpower.preferred_qualifications)
            formData.append("remarks", this.manpower.remarks)
            formData.append("request_status", this.manpower.request_status)
            formData.append("charged_to", this.manpower.charged_to)
            formData.append("breakdown_details", this.manpower.breakdown_details)
            formData.append("requested_by", this.manpower.requested_by)
            formData.append("job_description_attachment", this.manpower.job_description_attachment)
            formData.append("approvals", JSON.stringify(this.manpower.approvals))
            await useHRMSApiO(
                "/api/manpower-requests",
                {
                    method: "POST",
                    body: formData,
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
                throw new Error(this.errorMessage)
            }
        },
        async approveApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useHRMSApiO(
                "/api/manpower/approve-approval/" + id,
                {
                    method: "PUT",
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
        async denyApprovalForm (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useHRMSApiO(
                "/api/manpower/deny-approval/" + id,
                {
                    method: "POST",
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
                job_description_attachment: undefined,
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
