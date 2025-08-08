import { defineStore } from "pinia"
interface WorkSchedule {
    project_id: number,
    item_id: number,
    start_date: String,
    end_date: String,
    description: String,
}

export const useWorkScheduleStore = defineStore("workschedule", {
    state: () => ({
        isEdit: false,
        viewState: false,
        workSchedule: {
            id: null,
            project_id: null,
            item_id: null,
            start_date: null,
            end_date: null,
            description: null,
        },
        list: [] as WorkSchedule[],
        pagination: {},
        getParams: {},
        errorMessage: "",
        successMessage: "",
        isLoading: {
            create: false,
            list: false,
        },
    }),
    actions: {
        async getWorkSchedules (projectId: number, itemId: number) {
            this.isLoading.list = true
            await useProjectsApi(
                `/api/projects/${projectId}/items/${itemId}/work-schedules`,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data.data
                        } else {
                            throw new Error(response._data?.message || "Failed to fetch work schedules")
                        }
                    },
                    onResponseError: ({ response }) => {
                        throw new Error(response?._data?.message || "Network error occurred")
                    }
                }
            )
        },
        async createWorkSchedule () {
            await useProjectsApi(
                `/api/projects/${this.workSchedule.project_id}/items/${this.workSchedule.item_id}/work-schedules`,
                {
                    method: "POST",
                    body: this.workSchedule,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.$reset()
                        this.getWorkSchedules(
                            this.workSchedule.project_id,
                            this.workSchedule.item_id
                        )
                        this.successMessage = response._data?.message || "Work schedule created successfully"
                    },
                    onResponseError: ({ response }) => {
                        throw new Error(response?._data?.message || "Network or server error occurred")
                    }
                }
            )
        },
        async editWorkSchedule () {
            await useProjectsApi(
                `/api/projects/${this.workSchedule.project_id}/items/${this.workSchedule.item_id}/work-schedules/${this.workSchedule.id}`,
                {
                    method: "PATCH",
                    body: this.workSchedule,
                    watch: false,
                    onResponse: ({ response }) => {
                        this.$reset()
                        this.getWorkSchedules(this.workSchedule.project_id, this.workSchedule.item_id)
                        this.successMessage = response._data.message
                    },
                    onResponseError: ({ response }) => {
                        throw new Error(response?._data?.message || "Network or server error occurred")
                    }
                }
            )
        },
        clearMessages () {
            this.errorMessage = ""
            this.successMessage = ""
        },

        reset () {
            this.$reset()
        },
    },
})
