import { defineStore } from "pinia"

export const EMPLOYMENT_STUDENTTRAINEE = "Student Trainee"
export const EMPLOYMENT_PROJECTHIRE = "Project Hire"
export const EMPLOYMENT_CONTRACTUAL = "Contractual"
export const EMPLOYMENT_REGULAR = "Regular"
export const EMPLOYMENT_TYPE = [
    EMPLOYMENT_STUDENTTRAINEE,
    EMPLOYMENT_PROJECTHIRE,
    EMPLOYMENT_CONTRACTUAL,
    EMPLOYMENT_REGULAR
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
export interface Manpower {
    id: null | number,
    requesting_department: null | string,
    date_requested: string,
    date_required: string,
    position_id: null | string,
    employment_type: string,
    brief_description: string,
    job_description_attachment: string,
    nature_of_request: string,
    age_range: string,
    status: string,
    gender: string,
    educational_requirement: string,
    preferred_qualifications: string,
    approvals: Array<any>,
    remarks: string,
    request_status: string,
    charged_to: null | string,
    breakdown_details: string,
}

export const useManpowerStore = defineStore("manpowers", {
    state: () => ({
        isEdit: false,
        isDetail: false,
        manpower:
        {
            id: null,
            requesting_department: null,
            date_requested: "",
            date_required: "",
            position_id: null,
            employment_type: "",
            brief_description: "",
            job_description_attachment: "",
            nature_of_request: "",
            age_range: "",
            status: "",
            gender: "",
            educational_requirement: "",
            preferred_qualifications: "",
            approvals: [],
            remarks: "",
            request_status: "",
            charged_to: null,
            breakdown_details: "",
        } as Manpower,
        list: [],
        myApprovalRequestList: [],
        myRequestList: [],
        manpowerHiringList: [],
        applicantDetails: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
    }),
    actions: {
        async getOne (id: any) {
            return await useHRMSApiO(
                "/api/manpower/resource/" + id,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            return response._data.data
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getManpower () {
            await useHRMSApi(
                "/api/manpower/resource",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data.data.data
                            this.pagination = {
                                first_page: response._data.data.first_page_url,
                                pages: response._data.data.links,
                                last_page: response._data.data.last_page_url,
                            }
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            await useHRMSApi(
                "/api/manpower/my-requests",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.myRequestList = response._data.data
                    },
                }
            )
        },
        async getMyApprovalRequests () {
            await useHRMSApi(
                "/api/manpower/my-approvals",
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        this.myApprovalRequestList = response._data.data
                    },
                }
            )
        },
        async getManpowerHiringRequests () {
            await useHRMSApi(
                "/api/manpower/for-hiring",
                {
                    method: "GET",
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
            formData.set("requesting_department", this.manpower.requesting_department)
            formData.set("date_requested", this.manpower.date_requested)
            formData.set("date_required", this.manpower.date_required)
            formData.set("position_id", this.manpower.position_id)
            formData.set("employment_type", this.manpower.employment_type)
            formData.set("brief_description", this.manpower.brief_description)
            formData.set("job_description_attachment", this.manpower.job_description_attachment)
            formData.set("nature_of_request", this.manpower.nature_of_request)
            formData.set("age_range", this.manpower.age_range)
            formData.set("status", this.manpower.status)
            formData.set("gender", this.manpower.gender)
            formData.set("educational_requirement", this.manpower.educational_requirement)
            formData.set("preferred_qualifications", this.manpower.preferred_qualifications)
            formData.set("approvals", JSON.stringify(this.manpower.approvals))
            formData.set("remarks", this.manpower.remarks)
            formData.set("request_status", this.manpower.request_status)
            formData.set("charged_to", this.manpower.charged_to)
            formData.set("breakdown_details", this.manpower.breakdown_details)
            await useHRMSApi(
                "/api/manpower/resource",
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.getManpower()
                            this.$reset()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
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
            const { data, error } = await useHRMSApiO(
                "/api/manpower/resource/" + this.manpower.id,
                {
                    method: "PATCH",
                    body: this.manpower,
                    watch: false,
                }
            )
            if (data.value) {
                this.getManpower()
                this.$reset()
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
            await useHRMSApiO(
                "/api/approvals/approve/ManpowerRequest/" + id,
                {
                    method: "POST",
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getMyApprovalRequests()
                            this.getManpower()
                            this.getMyRequests()
                            return response._data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyApprovalForm (id: String) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/ManpowerRequest/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponseError: ({ response }) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.getMyApprovalRequests()
                            this.getManpower()
                            this.getMyRequests()
                            return response._data
                        }
                    },
                }
            )
        },
        async deleteManpower (id: number) {
            const { data, error } = await useHRMSApiO(
                "/api/manpower/resource/" + id,
                {
                    method: "DELETE",
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
    },
})
