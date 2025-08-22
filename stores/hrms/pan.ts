import { defineStore } from "pinia"

export interface ApprovalModel {
    id: Number,
    form: String,
    approvals: String,
    deleted_at: String,
    created_at: String,
    updated_at: String,
}
export interface Department
{
    id: Number,
    department_name: String
    created_at: String,
    deleted_at: String,
}
export interface PersonelActionNotice {
    id: Number,
    type: String,
    date_of_effictivity: String,
    pan_job_applicant_id: Number,
    employee_id: Number,
    company_id_num: null | String,
    section_department_id: null | Number,
    projects: Array<Number>
    designation_position: Number,
    hire_source: String,
    work_location: String,
    employment_status: String,
    comments: String,
    type_of_termination: String,
    reasons_for_termination: String,
    eligible_for_rehire: String,
    last_day_worked: String,
    approvals: Array<ApprovalModel>,
    salary_grades: Number,
    salary_type: String,
    deleted_at: String,
    created_at: String,
    updated_at: String,
    created_by: String,
}
export const usePersonelActionNotice = defineStore("personelActionNotice", {
    state: () => ({
        createData: {
            isLoading: false,
            errorMessage: "",
            successMessage: "",
            params: {},
        },
        personelActionNotice: {
            id: null as null | Number,
            type: "" as String,
            date_of_effictivity: "" as String,
            pan_job_applicant_id: null as null | Number,
            employee_id: null as null | Number,
            company_id_num: null as null | String,
            section_department_id: null as null | Number,
            projects: [] as Array<Number>,
            designation_position: null as Number | null,
            hire_source: null as String | null,
            work_location: null as String | null,
            employment_status: null as String | null,
            salary_grades: null as null | Number,
            salary_type: null as String | null,
            type_of_termination: "" as String,
            reasons_for_termination: "" as String,
            eligible_for_rehire: "" as String,
            last_day_worked: "" as String,
            approvals: [] as Array<ApprovalModel>,
            deleted_at: "" as String,
            created_at: "" as String,
            updated_at: "" as String,
            created_by: "" as String,
        } as PersonelActionNotice,
        errorMessage: "",
        remarks: "",
        successMessage: "",
        errorHandler: [],
        allPagination: {},
        myRequestPagination: {},
        getParams: {
            employee: "",
        },
        getParamsMyList: {},
        allRequests: {
            isLoading: false,
            isLoaded: false,
            list: [],
            params: {},
            pagination: {},
            fetchData: {
                data: ref(),
                status: ref(),
                error: ref(),
                refresh: ref(),
            },
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
    }),
    actions: {
        async savePan () {
            if (this.createData.isLoading) { return }
            this.successMessage = ""
            this.errorMessage = ""
            const requestData = JSON.parse(JSON.stringify(this.personelActionNotice))
            requestData.approvals = JSON.stringify(requestData.approvals)
            await useHRMSApiO(
                "/api/pan/resource",
                {
                    method: "POST",
                    body: requestData,
                    onRequest: () => {
                        this.createData.isLoading = true
                    },
                    onResponseError: ({ response }: any) => {
                        this.createData.isLoading = false
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.createData.isLoading = false
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
        async generateCompanyIdNum () {
            await useHRMSApi(
                "/api/pan/generate-company-id-num",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.personelActionNotice.company_id_num = response._data.data ?? ""
                        } else {
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async getOne (id: any) {
            return await useHRMSApiO(
                "/api/pan/resource/" + id,
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
        async getAllRequest () {
            this.successMessage = ""
            this.errorMessage = ""
            this.allRequests.isLoaded = true
            const { data, status, error, refresh } = await useHRMSApi(
                "/api/pan/resource",
                {
                    method: "GET",
                    params: this.allRequests.params,
                    watch: false,
                    onRequest: () => {
                        this.allRequests.isLoading = true
                    },
                    onResponse: ({ response }) => {
                        this.allRequests.isLoading = false
                        if (response.ok) {
                            this.allRequests.list = response._data.data || []
                            this.allRequests.pagination = {
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
            this.allRequests.fetchData.data = data
            this.allRequests.fetchData.status = status
            this.allRequests.fetchData.error = error
            this.allRequests.fetchData.refresh = refresh
        },
        async getMyApprovals () {
            this.successMessage = ""
            this.errorMessage = ""
            this.myApprovals.isLoaded = true
            await useHRMSApi(
                "/api/pan/my-approvals",
                {
                    method: "GET",
                    params: this.myApprovals.params,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myApprovals.list = response._data.data ?? []
                            this.myApprovals.pagination = {
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
        async getMyRequests () {
            this.successMessage = ""
            this.errorMessage = ""
            this.myRequests.isLoaded = true
            await useHRMSApi(
                "/api/pan/my-request",
                {
                    method: "GET",
                    params: this.myRequests.params,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.myRequests.list = response._data.data ?? []
                            this.myRequests.pagination = {
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
        async approvedPanRequest (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useHRMSApiO(
                "/api/approvals/approve/EmployeePanRequest/" + id,
                {
                    method: "POST",
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async denyRequest (id: string) {
            this.successMessage = ""
            this.errorMessage = ""
            const formData = new FormData()
            formData.append("id", id)
            formData.append("remarks", this.remarks)
            await useHRMSApiO(
                "/api/approvals/disapprove/EmployeePanRequest/" + id,
                {
                    method: "POST",
                    body: formData,
                    onResponse: ({ response }: any) => {
                        if (response.ok) {
                            this.reloadResources()
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        reloadResources () {
            const backup = this.personelActionNotice.approvals
            const callFunctions = []
            if (this.allRequests.isLoaded) {
                callFunctions.push(this.getAllRequest)
            }
            if (this.myApprovals.isLoaded) {
                callFunctions.push(this.getMyApprovals)
            }
            if (this.myRequests.isLoaded) {
                callFunctions.push(this.getMyRequests)
            }
            this.$reset()
            this.personelActionNotice.approvals = backup
            callFunctions.forEach((element) => {
                element()
            })
        }
    },
})
