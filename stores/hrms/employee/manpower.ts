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

export const FILL_STATUS_OPEN = "Open"
export const FILL_STATUS_HOLD = "Hold"
export const FILL_STATUS_FILLED = "Filled"
export const FILL_STATUS_PENDING = "Pending"

export const HIRING_STATUS_FOR_HIRING = "For Hiring"
export const HIRING_STATUS_REJECTED = "Rejected"
export const HIRING_STATUS_HIRED = "Hired"

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
    fill_status: string,
    gender: string,
    educational_requirement: string,
    preferred_qualifications: string,
    approvals: Array<any>,
    remarks: string,
    request_status: string,
    charged_to: null | string,
    breakdown_details: string,
    isLoading: boolean,
}

export const useManpowerStore = defineStore("manpowers", {
    state: () => ({
        createData: {
            isLoading: false,
            errorMessage: "",
            successMessage: "",
            params: {},
        },
        isEdit: false,
        isDetail: false,
        manpower: {
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
            fill_status: "",
            gender: "",
            educational_requirement: "",
            preferred_qualifications: "",
            approvals: [],
            remarks: "",
            request_status: "",
            charged_to: null,
            breakdown_details: "",
            job_applicants: [],
            isLoading: false,
        } as Manpower,
        allJobApplicants: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {
                hiring_status: "Rejected",
            },
            pagination: {},
        },
        applicantDetails: [],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        remarks: "",
        openPositions: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        onHoldPositions: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        filledPositions: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myApprovals: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        myRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        forHiringRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
        },
        storeApplicantRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            form: {
                manpowerrequests_id: null,
                data: []
            },
            pagination: {},
        }
    }),
    getters: {
        getAddedApplicants (state) {
            return state.allJobApplicants.list.filter(data => data.isCheck)
        }
    },
    actions: {
        async storeApplicants (applicant:any) {
            this.storeApplicantRequests.form.data = applicant
            await useHRMSApi(
                "/api/manpower/save-applicant",
                {
                    method: "POST",
                    body: this.storeApplicantRequests.form,
                    onRequest: () => {
                        this.storeApplicantRequests.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.storeApplicantRequests.isLoading = false
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.storeApplicantRequests.isLoading = false
                        if (response.ok) {
                            this.getOne(this.storeApplicantRequests.form.manpowerrequests_id)
                            this.reloadResources()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getOne (id: any): Promise<any> {
            return await useHRMSApiO(
                "/api/manpower/resource/" + id,
                {
                    method: "GET",
                    onRequest: () => {
                        this.manpower.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.manpower.isLoading = false
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.manpower.isLoading = false
                        if (response.ok) {
                            this.manpower = response._data.data
                            this.manpower.job_applicants = this.manpower.job_applicants.map((item:any) => {
                                return {
                                    ...item,
                                    processing_checklist: JSON.parse(item.pivot.processing_checklist)
                                }
                            })
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                        }
                    },
                }
            )
        },
        async getAllAvailableApplicant () {
            this.allJobApplicants.isLoaded = true
            await useHRMSApi(
                "/api/get-available-applicant",
                {
                    method: "GET",
                    params: this.allJobApplicants.params,
                    onRequest: () => {
                        this.allJobApplicants.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allJobApplicants.isLoading = false
                        if (response.ok) {
                            this.allJobApplicants.list = response._data.data
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getFilledPositions () {
            this.filledPositions.isLoaded = true
            await useHRMSApi(
                "/api/manpower/get-filled-positions",
                {
                    method: "GET",
                    params: this.filledPositions.params,
                    onRequest: () => {
                        this.filledPositions.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.filledPositions.isLoading = false
                        if (response.ok) {
                            this.filledPositions.list = response._data.data.data
                            this.filledPositions.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getOpenPositions () {
            this.openPositions.isLoaded = true
            await useHRMSApi(
                "/api/manpower/get-open-positions",
                {
                    method: "GET",
                    params: this.openPositions.params,
                    onRequest: () => {
                        this.openPositions.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.openPositions.isLoading = false
                        if (response.ok) {
                            this.openPositions.list = response._data.data.data
                            this.openPositions.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getHoldPositions () {
            this.onHoldPositions.isLoaded = true
            await useHRMSApi(
                "/api/manpower/get-onhold-positions",
                {
                    method: "GET",
                    params: this.onHoldPositions.params,
                    onRequest: () => {
                        this.onHoldPositions.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.onHoldPositions.isLoading = false
                        if (response.ok) {
                            this.onHoldPositions.list = response._data.data.data
                            this.onHoldPositions.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getAllRequests () {
            this.allRequests.isLoaded = true
            await useHRMSApi(
                "/api/manpower/resource",
                {
                    method: "GET",
                    params: this.allRequests.params,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allRequests.isLoading = false
                        if (response.ok) {
                            this.allRequests.list = response._data.data.data
                            this.allRequests.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyRequests () {
            this.myRequests.isLoaded = true
            await useHRMSApi(
                "/api/manpower/my-requests",
                {
                    method: "GET",
                    params: this.myRequests.params,
                    onRequest: () => {
                        this.myRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myRequests.isLoading = false
                        if (response.ok) {
                            this.myRequests.list = response._data.data.data
                            this.myRequests.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getMyApprovals () {
            this.myApprovals.isLoaded = true
            await useHRMSApi(
                "/api/manpower/my-approvals",
                {
                    method: "GET",
                    params: this.myApprovals.params,
                    onRequest: () => {
                        this.myApprovals.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.myApprovals.isLoading = false
                        if (response.ok) {
                            this.myApprovals.list = response._data.data.data
                            this.myApprovals.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getManpowerHiringRequests () {
            this.forHiringRequests.isLoaded = true
            await useHRMSApi(
                "/api/manpower/for-hiring",
                {
                    method: "GET",
                    params: this.forHiringRequests.params,
                    onRequest: () => {
                        this.forHiringRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.forHiringRequests.isLoading = false
                        if (response.ok) {
                            this.forHiringRequests.list = response._data.data.data
                            this.forHiringRequests.pagination = {
                                first_page: response._data.data.links.first,
                                pages: response._data.data.meta.links,
                                last_page: response._data.data.links.last,
                            }
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },

        async createManpower () {
            if (this.createData.isLoading) { return }
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.set("requesting_department", this.manpower.requesting_department ?? "")
            formData.set("date_requested", this.manpower.date_requested)
            formData.set("date_required", this.manpower.date_required)
            formData.set("position_id", this.manpower.position_id ?? "")
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
            formData.set("charged_to", this.manpower.charged_to ?? "")
            formData.set("breakdown_details", this.manpower.breakdown_details)
            await useHRMSApi(
                "/api/manpower/resource",
                {
                    method: "POST",
                    body: formData,
                    onRequest: () => {
                        this.createData.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createData.isLoading = false
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }) => {
                        this.createData.isLoading = false
                        if (response.ok) {
                            this.reloadResources()
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
                this.reloadResources()
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
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
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
        async denyApprovalForm (id: string) {
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
                    onResponseError: ({ response }: any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
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
                    onResponse: ({ response }: any) => {
                        this.successMessage = response._data.message
                    },
                }
            )
            if (data.value) {
                this.reloadResources()
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        reloadResources () {
            const backup = this.manpower.approvals
            const callFunctions = []
            if (this.allRequests.isLoaded) {
                callFunctions.push(this.getAllRequests)
            }
            if (this.myRequests.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            if (this.myApprovals.isLoaded) {
                callFunctions.push(this.getMyApprovals)
            }
            if (this.forHiringRequests.isLoaded) {
                callFunctions.push(this.getManpowerHiringRequests)
            }
            if (this.openPositions.isLoaded) {
                callFunctions.push(this.getOpenPositions)
            }
            if (this.allJobApplicants.isLoaded) {
                callFunctions.push(this.getAllAvailableApplicant)
            }
            this.$reset()
            this.manpower.approvals = backup
            callFunctions.forEach((element) => {
                element()
            })
        },
    },
})
