<script lang="ts" setup>
import { useSalaryGradeStore } from "~/stores/hrms/salarygrade"

const salaryGradeStore = useSalaryGradeStore()
const boardLoading = ref(false)
const snackbar = useSnackbar()

async function handleSubmit () {
    try {
        boardLoading.value = true
        await salaryGradeStore.createSalaryGrade()
        if (salaryGradeStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: salaryGradeStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: salaryGradeStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: salaryGradeStore.errorMessage
        })
    } finally {
        boardLoading.value = false
        // accountType.clearMessages()
    }
}
</script>

<template>
    <LayoutBoards title="Create Salary Grade" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="salary_grade"
                        class="text-xs italic"
                    >Salary Grade Level</label>
                    <input
                        id="salaryGradeLevel"
                        v-model="salaryGradeStore.salaryGrade.salary_grade_level"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div class="flex flex-col">
                    <label
                        for="salary_grade"
                        class="text-md font-bold italic"
                    >Salary Grade Steps</label>
                    <div class="flex flex-col gap-2 bg-slate-100 p-3 rounded">
                        <div v-for="sg,i in salaryGradeStore.salaryGrade.salary_grade_step" :key="sg.id" class="flex gap-2">
                            <div class="flex flex-col gap-1 flex-1">
                                <label
                                    for="salary_grade"
                                    class="text-xs italic"
                                >STEP {{ i + 1 }}
                                </label>
                                <input
                                    id="salaryGradeLevel"
                                    v-model="salaryGradeStore.salaryGrade.salary_grade_step[i].step_name"
                                    type="number"
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Create Salary Grade
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
