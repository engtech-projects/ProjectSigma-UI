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
            const { data, error } = await useProjectsApi(
                `/api/projects/${projectId}/items/${itemId}/work-schedules`,
                {
                    method: "GET",
                    params: this.getParams,
                    onResponse: ({ response }) => {
                        if (response.ok) {
                            this.list = response._data.data
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

        async createWorkSchedule () {
            this.successMessage = ""
            this.errorMessage = ""
            await useProjectsApi(
                `/api/projects/${this.workSchedule.project_id}/items/${this.workSchedule.item_id}/work-schedules`,
                {
                    method: "POST",
                    body: this.workSchedule,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.$reset()
                            this.getWorkSchedules(this.workSchedule.project_id, this.workSchedule.item_id)
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
        },

        async editWorkSchedule () {
            this.successMessage = ""
            this.errorMessage = ""
            const { data, error } = await useProjectsApi<any>(
                `/api/projects/${this.workSchedule.project_id}/items/${this.workSchedule.item_id}/work-schedules/${this.workSchedule.id}`,
                {
                    method: "PATCH",
                    body: this.workSchedule,
                    watch: false,
                    onResponse: ({ response }) => {
                        if (!response.ok) {
                            this.errorMessage = response._data.message
                        } else {
                            this.$reset()
                            this.getWorkSchedules(this.workSchedule.project_id, this.workSchedule.item_id)
                            this.successMessage = response._data.message
                        }
                    },
                }
            )
            if (data.value) {
                this.successMessage = data.value.message
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
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
